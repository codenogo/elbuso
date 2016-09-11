Meteor.methods({
	verifiedSellerEmail: function (email, html) {
		Email.send({
			to: email,
			from: 'Elbuso <hello@elbuso.com>',
			subject: 'Your seller account has been verified',
			html: html
		});
	}
});