Template.buyers.onCreated(function() {
	var self = this;
	self.autorun(function() {
		self.subscribe('userImage');
		self.subscribe('Meteor.users');
	});
});
Template.buyers.helpers({
	users: function(){
		return Meteor.users.find({'roles.__global_roles__':'buyer'});
	},
	buyersAvailable: function(){
		var buyersNo = Meteor.users.find({'roles.__global_roles__':'buyer'}).count();
		if (buyersNo > 0){
			return true
		}
	},
	buyerNo: function(){
		var count = Meteor.users.find({'roles.__global_roles__':'buyer'}).count();
		if (count === 0){
			return ('no buyer');
		} else if (count ===1){
			return ('1 buyer');
		} else if (count > 1){
			return (count + ' ' + 'buyer')
		}
	}
});