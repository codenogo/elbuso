Template.recoverPassword.events({
	'submit .recover-password': function(event, template){
		event.preventDefault();
		template.find('.popup-error-message').innerHTML = "";
		var email = template.find('#reset-email').value.trim();
		Accounts.forgotPassword({email: email}, function(err) {
			if (err){
				if (err.message === 'User not found [403]') {
					Bert.alert('There is no account registered with this email', 'danger');
					// $('.popup-error-message').addClass('is-visible');
					// template.find('.popup-error-message').innerHTML = "!";
				}else{
					// console.log(err.message);
					Bert.alert('Sorry but something went wrong', 'danger');
					// $('.popup-error-message').addClass('is-visible');
					// template.find('.popup-error-message').innerHTML = "We are sorry but something went wrong.";
				}
			}else{
				$('.popup-error-message').removeClass('is-visible');
				var content	= ('A recovery email has been sent to' + ' ' + email);
				Bert.alert( content , 'success' );
			}
		});
		return false;
	}
});