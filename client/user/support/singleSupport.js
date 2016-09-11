Template.singleSupport.onCreated(function() {
	var self = this;
	self.autorun(function() {
		var id = FlowRouter.getParam('id');
		self.subscribe('singleSupport', id);
	});
});
Template.singleSupport.onRendered(function () {
	var template = this;
	this.autorun(function () {
		if (template.subscriptionsReady()) {
			Tracker.afterFlush(function () {
				$('.message-box').scrollTop($('.all-messages').height() - $('.message-box').height());
			});
		}
	});
});
Template.singleSupport.helpers({
	support: () =>{
		var id = FlowRouter.getParam('id');
		return Support.findOne({_id: id});
	},
	date: function(){
		var lastDate = this.createdAt;
		return moment(lastDate).fromNow();
	},
	isMine: function(){
		var userId = Meteor.userId();
		var author = this.author;
		if (author === userId){
			return true;
		}
	},
	isOpen: function(){
		var id = FlowRouter.getParam('id');
		var openSate = Support.findOne({_id: id}).isOpen;
		if (openSate === true){
			return true;
		}
	},
	authorImage: function(){
		var authorId = this.author;
		var authorImage = Meteor.users.findOne({_id: authorId}).image;
		return authorImage;
	},
	unreadCount: function(){
		var userId = Meteor.userId();
		var id = FlowRouter.getParam('id');
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
		var id = FlowRouter.getParam('id');
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
	},
	//this will just check whether there are any existing unread messages all through this conversation so that closing can be toggled
	ifUnreadExist: function(){
		var id = FlowRouter.getParam('id');
		var array = Support.findOne({_id: id}).message;
		var unread = Support.findOne({_id: id}).message.map(function(msg){
			if (msg.read == false){
				// return(msg)
				return(msg.read == false);
			}
		});
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
});
Template.singleSupport.events({
	'blur .new-msg' : function (event) {

		//WHEN THE USER STARTS TYPING A NEW MESSAGE THE UNREAD FLAG IS REMOVED

        var id = FlowRouter.getParam('id');
        var userId = Meteor.userId();
		var message = Support.findOne({_id: id}).message;

		//loop through all the messages and update each individually
		var set = {}, i, l;
		for(i=0,l=message.length;i<l;i++) {
			if(message[i].author !== userId) {
				set['message.' + i + '.read'] = true;
			}
		}
		Support.update(id, {$set:set});
    },
	'submit .add-a-message': function (event, template) {
		event.preventDefault();
		var id = FlowRouter.getParam('id');
		var newMessageVar = event.target.newMessage.value;
        var currentDate = new Date();
        var author = Meteor.userId();
		if (newMessageVar != '') {
			Support.update(id, {
				$push: {
		            message: {
	            		message: newMessageVar,
	            		author: author,
	            		createdAt: currentDate,
	            		read: false
	            	}
	            }, function(error){
	            	if (error){
	            		Bert.alert(error.reason, 'danger');
	            	}
	            }
	        });
	        $(".add-a-message").trigger('reset');
		}
    },
    'click .close-support': function(event, openState){
    	event.preventDefault();
		var id = FlowRouter.getParam('id');
		Support.update(id, {
			$set: {
				isOpen: !openState,
			}
		});
    },
    'click .open-support': function(event){
    	event.preventDefault();
		var id = FlowRouter.getParam('id');
		Support.update(id, {
			$set: {
				isOpen: true,
			}
		});
    }
})