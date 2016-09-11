Template.support.onCreated(function() {
	var self = this;
	self.autorun(function(){
		var userId = Meteor.userId();
		self.subscribe('mySupport', userId);
	});
});
Template.support.helpers({
	support: function(){
		var userId = Meteor.userId();
		return Support.find().fetch().reverse();
	}
})