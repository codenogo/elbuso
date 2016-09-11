Template.changePhone.onCreated(function() {
    var self = this;
    self.autorun(function() {
        self.subscribe('countryList');
    });
});
Template.changePhone.helpers({
    country: function(){
        return Countries.find({published: true});
    },
    isCurrentCode: function(){
        var userId = Meteor.userId();
        var currentCode = Meteor.users.findOne({_id: userId}).profile.personalPhone.countryCode;
        var codeValue = this.countryCode;
        if (codeValue == currentCode){
            return true;
        }
    }
});
Template.changePhone.events({
    'submit #change-phone': function(event, template) {
        event.preventDefault();
        var userId = Meteor.userId();
        var countryCode = event.target.countryCode.value;
        var phoneNumber = event.target.phoneNumber.value;
        var personalPhone = (countryCode + '' + phoneNumber);
        console.log(personalPhone);
        Meteor.users.update(userId, {$set: {
            "profile.personalPhone.countryCode": countryCode,
            "profile.personalPhone.phoneNumber": phoneNumber,
            'profile.personalPhonephoneVerification': false
        }}, (error) => {
            if (error){
                Bert.alert(error.reason, 'danger');
            } else {
                Bert.alert('A verification message will be sent to your new number shortly', 'success');
                FlowRouter.go('verify-phone');
            }
        });
    }
});

//hide the overlay for email verification
Template.changePhone.onRendered(function(){
    $('.fixed-layer').addClass('hidden');
});
