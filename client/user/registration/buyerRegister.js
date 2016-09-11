Template.buyerRegister.onCreated(function() {
    var self = this;
    self.autorun(function() {
        self.subscribe('Meteor.users');
        self.subscribe('countryList');
    });
});
Template.buyerRegister.helpers({
    country: function(){
        return Countries.find({published: true});
    },
    myCountry: function(){
        // var result="";
        // var requestUrl = "http://ip-api.com/json";
        // $.ajax({
        //     url: requestUrl,
        //     type: 'GET',
        //     async: false,  
        //     success: function(json) {
        //         result = ("My country is: " + json.countryCode);
        //     },
        //     error: function(err){
        //         console.log("Request failed, error= " + err);
        //     }
        // });
        // var countryCode = this.isoCode;
        // if(result == countryCode){
        //     return true;
        // }
    }
});
Template.buyerRegister.events({
    'submit .buyerRegister': function(event, template) {
        event.preventDefault();
        var firstnameVar = event.target.firstname.value;
        var lastnameVar = event.target.lastname.value;
        var codeVar = event.target.countryCode.value;
        var phoneVar = event.target.phoneNumber.value;
        var emailVar = event.target.registerEmail.value;
        var passwordVar = event.target.registerPassword.value;

        
        var phoneVarNo = (phoneVar * 1);
        $('.processing').removeClass('hidden');
        $('.submit').addClass('hidden');
        // var phoneNos = Meteor.users.find().map((user) =>{
        //     return user.profile.personalPhone.phoneNumber;
        // });
        // var phoneExists = ( jQuery.inArray(phoneVarNo, phoneNos));
        // if (phoneExists === -1){
            Accounts.createUser({
                profile: {
                    buyerType: 'individual',
                    firstname: firstnameVar,
                    lastname: lastnameVar,
                    personalPhone: {
                        countryCode: codeVar,
                        phoneNumber: phoneVar,
                        phoneVerification: false
                    },
                    company: {
                        companyName: '0'
                    },
                    parentUser: '0'
                },
                email: emailVar,
                password: passwordVar,
            }, function(error){
                if(error){
                    FlowRouter.go('register');
                    Bert.alert( error.reason, 'danger'); 
                    // console.log(error); 
                    $('.processing').addClass('hidden');
                    $('.submit').removeClass('hidden');
                } else {
                    Roles.addUsersToRoles( Meteor.userId(), ['buyer'], Roles.GLOBAL_GROUP);
                    FlowRouter.go('verify-phone');
                    Bert.alert( 'Welcome. You are signed up as a buyer', 'success'); 
                    Meteor.call( 'sendVerificationLink', ( error, response ) => {
                        if ( error ) {
                            Bert.alert( error.reason, 'danger' );
                        }
                    });
                }
            });
        // } else {
        //     Bert.alert( 'sorry, this phone number already exists, please enter another', 'danger' );
        //     $('.processing').addClass('hidden');
        //     $('.submit').removeClass('hidden');
        // }        
    }
});