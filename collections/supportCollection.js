Support = new Mongo.Collection('support');
Support.allow({
	insert: function(userId, doc) {
		return !!userId;
	},
	update: function(userId, doc) {
		return true;
	}
});

Meteor.methods({
	deleteThread: function(id){
		Support.remove(id);
	}
});