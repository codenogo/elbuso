Template.supportPreview.helpers({
	authorImage: function(){
		var id = this._id;
		var authorId = Support.findOne({_id: id}).author;
		var authorImage = Meteor.users.findOne({_id: authorId}).image;
		return authorImage;
	},
	isOpen: function(){
		var id = this._id;
		var openSate = Support.findOne({_id: id}).isOpen;
		if (openSate === true){
			return true;
		}
	},
	messagePreview: function() {
		var id = this._id;
		var array = Support.findOne({_id: id}).message;
		var lastObj = array.slice(-1)[0];
		var lastMessage = lastObj.message;
		return _.str.prune(lastMessage, 50);
	},
	date: function(){
		var id = this._id;
		var array = Support.findOne({_id: id}).message;
		var lastObj = array.slice(-1)[0];
		var lastDate = lastObj.createdAt;
		return moment(lastDate).fromNow();
	},
	unreadCount: function(){
		var userId = Meteor.userId();
		var id = this._id;
		var array = Support.findOne({_id: id}).message;
		var unread = Support.findOne({_id: id}).message.map(function(msg){
			if (msg.read == false){
				// return(msg)
				return(msg.read == false);
			}
		});
		var lastObj = array.slice(-1)[0];
		var lastAuthor = lastObj.author;
		if (lastAuthor !== userId){
			var numOfTrue = 0;
			for(var i=0;i<unread.length;i++){
			    if(unread[i] === true) {
			       numOfTrue++;
			    }
			}
			return numOfTrue;
		}
	},
	ifUnread: function(){
		var userId = Meteor.userId();
		var id = this._id;
		var array = Support.findOne({_id: id}).message;
		var unread = Support.findOne({_id: id}).message.map(function(msg){
			if (msg.read == false){
				// return(msg)
				return(msg.read == false);
			}
		});
		var lastObj = array.slice(-1)[0];
		var lastAuthor = lastObj.author;
		if (lastAuthor !== userId){
			var numOfTrue = 0;
			for(var i=0;i<unread.length;i++){
			    if(unread[i] === true) {
			       numOfTrue++;
			    }
			}
			if(numOfTrue >= 1){
				return true
			}
		}
	}
})