Template.supportOpen.onCreated(function() {
	var self = this;
	self.autorun(function(){
		var userId = Meteor.userId();
		self.subscribe('mySupport', userId);
	});
});
Template.supportOpen.helpers({
	support: function(){
		var userId = Meteor.userId();
		return Support.find({isOpen: true}).fetch().reverse();
	}
})