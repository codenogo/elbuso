// Define gateway variable
var gateway;

Meteor.startup(function () {
  // var env;
  // Pick Braintree environment based on environment defined in Meteor settings.
  // if (Meteor.settings.public.env === 'Production') {
  //   env = Braintree.Environment.Production;
  // } else {
  //   env = Braintree.Environment.Sandbox;
  // }
  // Initialize Braintree connection:
  gateway = BrainTreeConnect({
      environment: Braintree.Environment.Sandbox,
      publicKey: 'dwn34xxcwtqkwhcc',
      privateKey: 'a46c29e66672d27068c56e5a087afdc6',
      merchantId: 'npqjj6wpk82wxc9s'
  });
});

Meteor.methods({
    getClientToken: function (clientId) {
        var generateToken = Meteor.wrapAsync(gateway.clientToken.generate, gateway.clientToken);
        var options = {};
        if (clientId) {
            options.clientId = clientId;
        }
        var response = generateToken(options);
        return response.clientToken;
    },
    btCreateCustomer: function(){
        var user = Meteor.user();
        var customerData = {
            email: user.emails[0].address
        };

        // Calling the Braintree API to create our customer!
        gateway.customer.create(customerData, function(error, response){
            if (error){
                console.log(error);
            } else {
            // If customer is successfuly created on Braintree servers,
            // we will now add customer ID to our User
                Meteor.users.update(user._id, {
                    $set: {
                        customerId: response.customer.id
                    }
                });
            }
        });
    },
    createTransaction: function(nonceFromTheClient, totalAmt, idPool) {
        check(nonceFromTheClient, String);
        check(totalAmt, Number);
        check(idPool, Array);
        var user = Meteor.user();
        var userId = Meteor.userId();
        var amount = ( totalAmt + ".00");
        var date = new Date();
        // Let's create transaction.
        gateway.transaction.sale({
            amount: amount,
            paymentMethodNonce: nonceFromTheClient, // Generated nonce passed from client
            customer: {
                id: user.customerId
            },
            options: {
                submitForSettlement: true, // Payment is submitted for settlement immediatelly
                storeInVaultOnSuccess: true // Store customer in Braintree's Vault
            }
        }, function (err, success) {
            if (err) {
                console.log(err);
            } else {
                // When payment's successful, add "paid" role to current user.
                // Roles.addUsersToRoles(user._id, 'paid', Roles.GLOBAL_GROUP)
                var auctions = AuctionReservation.find({user: userId, paid: false}, {_id:{$in: idPool}}).count();
        		var deals = DealReservation.find({user: userId, paid: false}, {_id:{$in: idPool}}).count();
                if(auctions > 0){
                    //return a pool of auction reserved ids
                    var auctionIds = AuctionReservation.find({user: userId, paid: false}, {_id:{$in: idPool}}).map(function(auction){
                        return auction._id;
                    });
                    //loop through the auctions array and render each _id as a single string that can have the methods done on
                    auctionIds.forEach(function(item){
                        AuctionReservation.update(item, {
                            $set: {
                                paid: true
                            }
                        });
                    });
                }
                if(deals > 0){
                    //return a pool of auction reserved ids
                    var dealIds = DealReservation.find({user: userId, paid: false}, {_id:{$in: idPool}}).map(function(deal){
                        return deal._id;
                    });
                    //loop through the deals array and render each _id as a single string that can have the methods done on
                    dealIds.forEach(function(item){
                        DealReservation.update(item, {
                            $set: {
                                paid: true
                            }
                        });
                    });
                }
                Transactions.insert({
                    user: user._id,
                    reservarionsId: idPool,
                    customerId: user.customerId,
                    amount: totalAmt,
                    //currency
                    createdAt: date,
                });
            }
        });
    }

});
