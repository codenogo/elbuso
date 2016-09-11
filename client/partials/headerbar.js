Template.headerBar.onCreated(function() {
  var self = this;
  self.autorun(function(){
    self.subscribe("new-deals");
  });
});

Template.headerBar.helpers({
	lastLetter: function() {
		return _.str.truncate(Meteor.user().profile.lastname, 1, '.');
	},
	firstLetter: function() {
		return _.str.truncate(Meteor.user().profile.firstname, 1, ' ');
	},
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
	hasNotification: function(){
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
		var userCount = Meteor.users.find({'roles.__global_roles__':'seller', 'verification': false, 'submission': true}).count();
		var notCount = (sum + userCount);
		if (notCount >= 1){
			return true;
		}
	},
	notificationsCount: function(){
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
		var userCount = Meteor.users.find({'roles.__global_roles__':'seller', 'verification': false, 'submission': true}).count();
		return(sum + userCount);
	},
	hasNewDeal: function(){
		var dealCount = Deals.find({published: false}).count();
		if (dealCount >= 1){
			return true;
		}
	},
	dealCount: function(){
		return Deals.find({published: false}).count();
	}
});