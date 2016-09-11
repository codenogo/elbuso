Template.locations.onCreated(function() {
	var self = this;
	self.autorun(function(){
		var userId = Meteor.userId();
		self.subscribe('myLocations', userId);
	});
});

Template.locations.helpers({
	location: ()=> {
		return Locations.find();
	}
});

Template.locations.events({
	'click .new-location': ()=> {
		Session.set('newLocation', true);
	},
	'click .close-new': ()=> {
		Session.set('newLocation', false);
	}
});