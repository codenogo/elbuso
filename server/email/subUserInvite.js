Meteor.methods({
	subUserInviteEmail: function (email, html, companyName) {
		Email.send({
			to: email,
			from: 'Elbuso <hello@elbuso.com>',
			subject: "You've been invited as a sub user for" + " " + companyName + " " + "on Elbuso",
			html: html
		});
	}
});