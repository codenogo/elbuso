Template.subUser.onCreated(function() {
	var self = this;
	self.autorun(function() {
		self.subscribe('userImage');
		self.subscribe('Meteor.users');
		self.subscribe('countryList');
	});
});
Template.subUser.helpers({
	users: function(){
		var userId = Meteor.userId();
		if (Roles.userIsInRole(userId, ['manager'])){
			var parentId = Meteor.users.findOne({_id: Meteor.userId()}).profile.parentUser;
		} else {
			var parentId = Meteor.userId();
		}
		return Meteor.users.find({'profile.parentUser': parentId});
	}
});