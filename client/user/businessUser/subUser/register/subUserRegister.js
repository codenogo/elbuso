Template.subUserRegister.onCreated(function() {
    var self = this;
    self.autorun(function() {
        self.subscribe('countryList');
        var linkId = FlowRouter.getParam('id');
        self.subscribe('singleSubInvites', linkId);
    });
});
//signup
Template.subUserRegister.helpers({
    country: function(){
        return Countries.find({published: true});
    },
    invite: function(){
        var linkId = FlowRouter.getParam('id');
        return SubUserInvitation.findOne({_id: linkId});
    },
    companyName: function(){
        var linkId = FlowRouter.getParam('id');
        var parentUserId = SubUserInvitation.findOne({_id: linkId}).parentUser;
        return Meteor.users.findOne({_id: parentUserId}).profile.company.companyName;
    }
});
Template.subUserRegister.events({
    'submit .subUserRegister': function(event) {
        event.preventDefault();
        var firstnameVar = event.target.firstname.value;
        var lastnameVar = event.target.lastname.value;
        var codeVar = event.target.countryCode.value;
        var phoneVar = event.target.phoneNumber.value;
        var emailVar = event.target.registerEmail.value;
        var passwordVar = event.target.registerPassword.value;

        var linkId = FlowRouter.getParam('id');
        var parentUser = SubUserInvitation.findOne({_id: linkId}).parentUser;
        console.log(parentUser);
        var permission = SubUserInvitation.findOne({_id: linkId}).permission;
        var activeState = SubUserInvitation.findOne({_id: linkId}).active;

        var phoneVarNo = (phoneVar * 1);
        $('.processing').removeClass('hidden');
        $('.submit').addClass('hidden');
        var phoneNos = Meteor.users.find().map((user) =>{
            return user.profile.personalPhone.phoneNumber;
        });
        var phoneExists = ( jQuery.inArray(phoneVarNo, phoneNos));
        if (phoneExists === -1){
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
                    company:{
                        companyName: '0'
                    },
                    parentUser: parentUser
                },
                email: emailVar,
                password: passwordVar,
            }, function(error){
    		    if(error){
    		    	Bert.alert( error.reason, 'danger'); 
    		        // console.log(error); 
                    $('.processing').addClass('hidden');
                    $('.submit').removeClass('hidden');
    		    } else {
                    Roles.addUsersToRoles( Meteor.userId(), [ 'sub-user', permission ], Roles.GLOBAL_GROUP);
    		    	FlowRouter.go('verify-phone');
    		        Bert.alert( 'Welcome. You are signed up as a sub-user', 'success'); 

                    //verify the sub-user's email once they create their account
                    Meteor.users.update(Meteor.userId(), {$set: {"emails.0.verified" :true}});
                    Meteor.call( 'deactivateInvite', linkId, activeState);
    		    }
    		});
        } else {
            Bert.alert( 'sorry, this phone number already exists, please enter another', 'danger' );
            $('.processing').addClass('hidden');
            $('.submit').removeClass('hidden');
        } 
    }
});