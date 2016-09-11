Template.verifiedSellers.onCreated(function() {
	var self = this;
	self.autorun(function() {
		self.subscribe('userImage');
		self.subscribe('Meteor.users');
	});
});
Template.verifiedSellers.helpers({
	users: function(){
		return Meteor.users.find({'roles.__global_roles__':'seller', 'verification': true});
	},
	verifiedSellersAvailable: function(){
		var sellersNo = Meteor.users.find({'roles.__global_roles__':'seller', 'verification': true}).count();
		if (sellersNo > 0){
			return true
		}
	},
	sellerNo: function(){
		var count = Meteor.users.find({'roles.__global_roles__':'seller', 'verification': true}).count();
		if (count === 0){
			return ('no verified seller');
		} else if (count ===1){
			return ('1 verified seller');
		} else if (count > 1){
			return (count + ' ' + 'verified seller')
		}
	}
});