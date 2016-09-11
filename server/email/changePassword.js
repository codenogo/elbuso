Meteor.methods({
	passwordChangeEmail: function (email, html) {
		// check(to, [String]);
		// this.unblock();
		Email.send({
			to: email,
			from: 'Elbuso <hello@elbuso.com>',
			subject: 'Your password has changed',
			html: html
		});
	}
});