Meteor.methods({
	deactivateUserEmail: function (email, html) {
		Email.send({
			to: email,
			from: 'Elbuso <hello@elbuso.com>',
			subject: 'Your account has been deactivated',
			html: html
		});
	}
});