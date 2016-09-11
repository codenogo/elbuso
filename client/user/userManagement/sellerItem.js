Template.sellerItem.helpers({
	firstLetter: function() {
		var selfId = this._id;
		return _.str.truncate(Meteor.users.findOne({_id: selfId}).username, 1, ' ');
	},
	isVerified: function(){
		var userId = this._id;
		var userVerified = Meteor.users.findOne({_id: userId, verification: true});
		if (userVerified) {
			return true;
		}
	},
	hasCompletedProfile: function(){
		var userId = this._id;
		var companyProfile = Meteor.users.findOne({'_id': userId, 'profile.company.companyName': { $exists: true}, 'profile.company.companyPhone': { $exists: true}, 'profile.country.name.formattedAddress': { $exists: true} });
		if (companyProfile){
			return true;
		}
	},
	isVerifiedSeller: function(){
		var selfId = this._id;
		var isVerified = Meteor.users.findOne({_id: selfId, 'roles.__global_roles__': 'seller', 'verification': true});
		if (isVerified){
			return true;
		}
	},
	isActive: function(){
		var id = this._id;
		var isActive = Meteor.users.findOne({_id: id}).active;
		if (isActive === true){
			return true;
		}
	},
});

Template.sellerItem.events({
	'click .verify-seller': function(){
		Meteor.call('toggleVerification', this._id, this.verification);
	},
});