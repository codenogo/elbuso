Countries = new Mongo.Collection('countries');
Countries.allow({
	insert: function(userId, doc) {
		return true;
	},
	update: function(userId, doc) {
		return true;
	},
	remove: function(userId, doc) {
		return true;
	}
});

Meteor.methods({
	toggleCountryPublish: function(id, enabledState){
		check(id, String);
        Countries.update(id, {
            $set: {
                published: !enabledState
            }
        });
    },
});