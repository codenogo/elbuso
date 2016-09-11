Template.resetPassword.onCreated( function() {
    this.autorun(function() {
		var resetPasswordToken = FlowRouter.getParam('token');

	});
});

Template.resetPassword.events({
	'submit .reset-password': function(e, t) {
	    e.preventDefault();
	    
	    var resetPasswordForm = $(e.currentTarget),
	        password = resetPasswordForm.find('.new-password').val(),
	        passwordConfirm = resetPasswordForm.find('.repeat-new-password').val();
	        resetPasswordToken = FlowRouter.getParam('token');
	    if (password === passwordConfirm) {
	    	Accounts.resetPassword(
		      	resetPasswordToken, 
		      	password, 
		      	function(err) {
			        if (err) {
			        	Bert.alert( 'We are sorry but something went wrong.' , 'danger' );
			        } else {
			        	Bert.alert( 'Your password as been updated!' , 'success' );
			        	FlowRouter.go('home');
			        }
		    	}
		    );
		} else {
			Bert.alert( "Your passwords don't match." , 'danger' );
		}
		return false;
	}
});