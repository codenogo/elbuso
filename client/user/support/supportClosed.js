Template.supportClosed.onCreated(function() {
	var self = this;
	self.autorun(function(){
		var userId = Meteor.userId();
		self.subscribe('mySupport', userId);
	});
});
Template.supportClosed.helpers({
	support: function(){
		var userId = Meteor.userId();
		return Support.find({isOpen: false}).fetch().reverse();
	}
})