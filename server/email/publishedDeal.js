Meteor.methods({
	publishedDealEmail: function (email, html) {
		Email.send({
			to: email,
			from: 'Elbuso <hello@elbuso.com>',
			subject: 'Your have been added to an auction',
			html: html
		});
	}
});