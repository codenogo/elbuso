Template.unverifiedSellers.onCreated(function() {
	var self = this;
	self.autorun(function() {
		self.subscribe('userImage');
		self.subscribe('Meteor.users');
	});
});
Template.unverifiedSellers.helpers({
	users: function(){
		return Meteor.users.find({'roles.__global_roles__':'seller', 'verification': false, 'submission': true});
	},
	unverifiedSellersAvailable: function(){
		var sellersNo = Meteor.users.find({'roles.__global_roles__':'seller', 'verification': false, 'submission': true}).count();
		if (sellersNo > 0){
			return true;
		}
	},
	sellerNo: function(){
		var count = Meteor.users.find({'roles.__global_roles__':'seller', 'verification': false, 'submission': true}).count();
		if (count === 0){
			return ('no submitted seller');
		} else if (count ===1){
			return ('1 submitted seller');
		} else if (count > 1){
			return (count + ' ' + 'submitted seller')
		}
	}
});