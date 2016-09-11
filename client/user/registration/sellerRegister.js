Template.sellerRegister.onCreated(function() {
    var self = this;
    self.autorun(function() {
        self.subscribe('countryList');
    });
});
//signup
Template.sellerRegister.helpers({
    country: function(){
        return Countries.find({published: true});
    },
    whyPhone: function (){
        return ('your phone number is important for security as well as verification purposes');
    }
});
Template.sellerRegister.events({
    'submit .sellerRegister': function(event) {
        event.preventDefault();
        var firstnameVar = event.target.firstname.value;
        var lastnameVar = event.target.lastname.value;
        var companyNameVar = event.target.companyname.value;
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
                    buyerType: 'company',
                	firstname: firstnameVar,
                	lastname: lastnameVar,
                    personalPhone: {
                        countryCode: codeVar,
                        phoneNumber: phoneVar,
                        phoneVerification: false
                    },
                    company: {
                        companyName: companyNameVar
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
                    Roles.addUsersToRoles( Meteor.userId(), ['seller'], Roles.GLOBAL_GROUP);
    		    	FlowRouter.go('verify-phone');
    		        Bert.alert( 'Welcome. You are signed up as a seller', 'success'); 
                    
    		    }
    		});
        // } else {
        //     Bert.alert( 'sorry, this phone number already exists, please enter another', 'danger' );
        //     $('.processing').addClass('hidden');
        //     $('.submit').removeClass('hidden');
        // } 
    }
});