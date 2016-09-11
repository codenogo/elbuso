Template.subUserInvitations.onCreated(function() {
	var self = this;
	self.autorun(function() {
		var id = Meteor.userId();
		self.subscribe('mySubInvites', id);
	});
});
Template.subUserInvitations.helpers({
	invitations: function(){
		return SubUserInvitation.find({active: true});
	}
});