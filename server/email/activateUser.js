Meteor.methods({
	activateUserEmail: function (email, html) {
		Email.send({
			to: email,
			from: 'Elbuso <hello@elbuso.com>',
			subject: 'Your account has been re-activated',
			html: html
		});
	}
});