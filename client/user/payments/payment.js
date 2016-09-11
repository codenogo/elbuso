
Template.payment.onRendered(function() {
  Meteor.call('getClientToken', function(error, clientToken) {
    if (error) {
      console.log(error);
    } else {
      braintree.setup(clientToken, "dropin", {
        container: "payment-form", // Injecting into <div id="payment-form"></div>
        onPaymentMethodReceived: function (response) {
          // When we submit the payment form,
          // it'll create new customer first...
          var nonce = response.nonce;
          var totalAmt = Session.get('totalAmount');
        //   var currency = Session.get('currency');
          var idPool = Session.get('reservationIdPool');

          Meteor.call('btCreateCustomer', function(error, success) {
            if (error) {
              throw new Meteor.Error('customer-creation-failed');
            } else {
              // ... and when the customer is successfuly created,
              // call method for creating a transaction (finally!)
              Meteor.call('createTransaction', nonce, totalAmt, idPool, function(error, success) {
                if (error) {
                  Bert.alert(error.reason, 'danger');
                } else {
                  Bert.alert('Your items have been reserved', 'success');
                  FlowRouter.go('confirmation');
                }
              });
            }
          });
        }
      });
    }
  });
});
