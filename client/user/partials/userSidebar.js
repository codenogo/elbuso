Template.userSidebar.onCreated(function() {
	var self = this;
	self.autorun(function() {
		self.subscribe('auctionReservation');
		self.subscribe('dealReservation');
		var userId = Meteor.userId();
		self.subscribe('mySupportNotifications', userId);
	});

});

Template.userSidebar.onRendered(function() {
	
})

Template.userSidebar.helpers({
	hasNewMessage: function(){
		var userId = Meteor.userId();

		//if there is a new message and a I am not the creator and it is unread, then show it as 1
		var readStatus = Support.find().map(function(arr){
			var array = arr.message;
			var lastObj = array.slice(-1)[0];
			var readStatus = lastObj.read;
			var lastAuthor = lastObj.author;
			if (lastAuthor !== userId){
				if (readStatus == false){
					return 1;
				} else {
					return 0;
				}
			} else {
				return 0;
			}
		});
		//get the sum of all the "1" or "0" from above. If the result is greater than "0" then there is a notification.
		var sum = readStatus.reduce((a, b) => a + b, 0);
		if (sum >= 1){
			return true;
		}
	},
	newMessageCount: function(){
		var userId = Meteor.userId();

		//if there is a new message and a I am not the creator and it is unread, then show it as 1
		var readStatus = Support.find().map(function(arr){
			var array = arr.message;
			var lastObj = array.slice(-1)[0];
			var readStatus = lastObj.read;
			var lastAuthor = lastObj.author;
			if (lastAuthor !== userId){
				if (readStatus == false){
					return 1;
				} else {
					return 0;
				}
			} else {
				return 0;
			}
		});
		//get the sum of all the "1" or "0" from above. If the result is greater than "0" then there is a notification.
		var sum = readStatus.reduce((a, b) => a + b, 0);
		return sum;
	},
	count: function() {
		var userId = Meteor.userId();
		var auctions = AuctionReservation.find({user: userId, paid: false}).count();
		var deals = DealReservation.find({user: userId, paid: false}).count();
		var total = (auctions + deals);
		if (total === 0){
			return ('0');
		} else if (total <= 1) {
			return ('1 item');
		} else if(total > 1) {
			return (total + ' ' + 'items')
		}
	},
	cartItem: function() {
		var userId = Meteor.userId();
		var auctions = AuctionReservation.find({user: userId, paid: false}).count();
		var deals = DealReservation.find({user: userId, paid: false}).count();
		var total = (auctions + deals);
		if (total > 0){
			return true;
		}
	},
	sellerVerified: function (){
		var me = Meteor.userId();
		var verified = Meteor.users.findOne({'_id': me, 'verification': true });
		if (verified){
			return true;
		}
	},
	unverifiedSellersAvailable: function(){
		var sellersNo = Meteor.users.find({'roles.__global_roles__':'seller', 'verification': false, 'submission': true}).count();
		if (sellersNo > 0){
			return true;
		}
	},
	sellerNo: function(){
		var count = Meteor.users.find({'roles.__global_roles__':'seller', 'verification': false, 'submission': true}).count();
		return count;
	}
});

Template.userSidebar.events({
	'click .sidebar-link': function(event){
		// event.preventDefault();
		$("#sidebar-btn").toggleClass('closed-button');
		$("body").toggleClass('show-menu');
		
	}
});