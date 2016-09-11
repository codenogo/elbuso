Template.verifyPhone.rendered = function(){
    var element = $(".complete-profile-warning");
    if(!element.hasClass("hidden")){
        element.addClass("hidden"); 
    }
}

Template.verifyPhone.helpers({
    myPhoneNumber: function(){
        var currentUserId = Meteor.userId();
        var countryCode = Meteor.users.findOne({_id: currentUserId}).profile.personalPhone.countryCode;
        var phoneNumber = Meteor.users.findOne({_id: currentUserId}).profile.personalPhone.phoneNumber;
        return ('+' + countryCode + ' ' + phoneNumber);
    }
});
Template.verifyPhone.events({
    'submit .phone-verification' ( event, template ) {
        event.preventDefault();
        var verificationCodeVar = event.target.verificationCode.value;
        // console.log(verificationCodeVar);
        var id = Meteor.userId();
        var verification = Meteor.users.findOne({_id: id}).profile.personalPhone.phoneVerification;
        $('.processing').removeClass('hidden');
        $('.submit').addClass('hidden');
        if (verificationCodeVar === '888888'){
            Meteor.call( 'verifyPhone', id, verification, ( error, response ) => {
                // if ( error ) {
                //     Bert.alert( error.reason, 'danger' );
                // } else {
                //     Bert.alert( 'Your phone number is verified', 'success' );
                // }
                Bert.alert( 'Your phone number is verified', 'success' );
                FlowRouter.go('edit-profile');
            });
            // Bert.alert( `A verification email has been sent to ${ email }!`, 'success' );
        } else {
            Bert.alert( 'You have entered the wrong verification number', 'danger' );
            $('.submit').removeClass('hidden');
            $('.processing').addClass('hidden');
        }
        
    }
});