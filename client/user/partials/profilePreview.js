Template.profilePreview.onCreated(function() {
	//subscribe to only my country
	var self = this;
	self.autorun(function() {
		var id = Meteor.userId();
		var isAdmin = Meteor.users.findOne({_id: id, 'roles.__global_roles__': 'admin'});
		if (!isAdmin){
			self.subscribe('countryList');
		}
	});
});
Template.profilePreview.helpers({
	firstLetter: function() {
		return _.str.truncate(Meteor.user().profile.firstname, 1, ' ');
	},
	lastLetter: function() {
		return _.str.truncate(Meteor.user().profile.lastname, 1, ' ');
	},
	companyLetter: function() {
		return _.str.truncate(Meteor.user().profile.company.companyName, 1, ' ');
	},
	country: function(){
		var countryId = Meteor.user().profile.country.name;
		return Countries.findOne({_id: countryId}).name;
	},
	sellerVerified: function (){
		var me = Meteor.userId();
		var verified = Meteor.users.findOne({'_id': me, 'verification': true });
		if (verified){
			return true;
		}
	},
	hasSubmitted: function (){
		var me = Meteor.userId();
		var verified = Meteor.users.findOne({'_id': me, 'submission': true });
		if (verified){
			return true;
		}
	},
	verificationHelpText: function(){
		return ('You are presently not verified by Elbuso since your details are being analysed by the team. Presently, you will not be able to post a deal or bid at an auction.')
	},
	hasCompanyName: function() {
		var me = Meteor.userId();
		var coName = Meteor.users.findOne({'_id': me}).profile.company.companyName;
		if (coName){
			return true;
		}
	},
	hasLocation: function() {
		var me = Meteor.userId();
		var location = Meteor.users.findOne({'_id': me}).profile.country.name;
		if (location){
			return true;
		}
	},
	parentCompanyName: function() {
		var me = Meteor.userId();
		var parentUser = Meteor.users.findOne({'_id': me}).profile.parentUser;
		return Meteor.users.findOne({'_id': parentUser}).profile.company.companyName;
	}
});