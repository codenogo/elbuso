Template.adminUserMenu.helpers({
	unverifiedUsers: function(){
		var verifiedUsers = Meteor.users.find({'roles.__global_roles__':'seller', 'verification':false, 'submission': true,  'profile.company.companyName': { $exists: true}, 'profile.company.companyPhone': { $exists: true}, 'profile.country.name.formattedAddress': { $exists: true}, 'profile.personalPhone.phoneVerification': true }).count();
		if (verifiedUsers > 0){
			return true;
		}
	},
	unverifiedUsersNo: function(){
		return Meteor.users.find({'roles.__global_roles__':'seller', 'verification':false, 'submission': true, 'profile.company.companyName': { $exists: true}, 'profile.company.companyPhone': { $exists: true}, 'profile.country.name.formattedAddress': { $exists: true}, 'profile.personalPhone.phoneVerification': true }).count();
	}
});