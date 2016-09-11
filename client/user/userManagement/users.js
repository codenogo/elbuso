Template.users.onCreated(function() {
	var self = this;
	self.autorun(function() {
		self.subscribe('userImage');
		self.subscribe('Meteor.users');
		self.subscribe('countryList');
	});
});
Template.users.helpers({
	users: function(){
		return Meteor.users.find();
	},
	userNo: function(){
		var count = Meteor.users.find().count();
		if (count === 0){
			return ('no user');
		} else if (count ===1){
			return ('1 user');
		} else if (count > 1){
			return (count + ' ' + 'users')
		}
	}
});