Template.changePassword.events({  
    'submit #change-password': function(event, template) {
        event.preventDefault();
        var resetPasswordForm = $(event.currentTarget),
            currentPassword = resetPasswordForm.find('#current-password').val(),
            newPassword = resetPasswordForm.find('#new-password').val(),
            newPasswordRepeated = resetPasswordForm.find('#new-password-repeated').val();

        // You will want to validate your passwords better than this
        if (newPassword !== newPasswordRepeated) {
            Bert.alert( "Your passwords don't match." , 'danger' );
            return false;
        } else {
            Accounts.changePassword(currentPassword, newPassword, function(error) {
                if (error) {
                    Bert.alert( error.reason , 'danger' );
                } else {
                    message = 
                    Bert.alert( 'You have changed your password!' , 'success' );
                    FlowRouter.go('profile');
                    var name = Meteor.users.findOne({_id: Meteor.userId()}).profile.firstname;
                    var email = Meteor.users.findOne({_id: Meteor.userId()}).emails[0].address;
                    var data = {
                        name: name
                    };
                    var html = Blaze.toHTMLWithData(Template.changePasswordTemplate, data);
                    Meteor.call('passwordChangeEmail', email, html);
                }
            });
        }
        return false;
    }
});