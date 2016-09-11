Locations = new Mongo.Collection('locations');

Locations.allow({
	insert: function(userId, doc) {
		return !!userId; 
	},
	update: function(userId, doc) {
		return !!userId;
	}
});

LocationSchema = new SimpleSchema({
	Name: {
		type: String,
		label: "Name"
	},
	location: {
		type: Object,
		label: 'location of this outlet',
		autoform: {
			type: 'map',
			afFieldInput: {
				// type: 'map',
				geolocation: true,
	            searchBox: true,
	            width:'100%',
	            zoom: 13,
	            autolocate: true,
	            mapType: 'hybrid',
	            googleMap: {
	            	mapTypeControl: false
	            }
			}
		}
	},
	'location.lat': {
		type: Number,
		decimal: true
	},
	'location.lng': {
		type: Number,
		decimal: true
	},
    isPublished: {
		type: Boolean,
		defaultValue: true,
		optional: true,
		autoform: {
			type: "hidden"
		}
	},
	author: {
		type: String,
		label: "Author",
		autoValue: function() {
			if (this.isInsert) {
				return this.userId
			} else if (this.isUpsert) {
				return {$setOnInsert: this.userId};
			} else {
				this.unset();  // Prevent user from supplying their own value
			}
		},
		autoform: {
			type: "hidden"
		}
	},
	//givi was here
	// Force value to be current date (on server) upon insert
	// and prevent updates thereafter.
	createdAt: {
		type: Date,
		autoValue: function() {
			if (this.isInsert) {
				return new Date();
			} else if (this.isUpsert) {
				return {$setOnInsert: new Date()};
			} else {
				this.unset();  // Prevent user from supplying their own value
			}
		},
		autoform: {
			type: "hidden"
		}
	},
	// Force value to be current date (on server) upon update
	// and don't allow it to be set upon insert.
	updatedAt: {
		type: Date,
		autoValue: function() {
			if (this.isUpdate) {
				return new Date();
			}
		},
		denyInsert: true,
		optional: true,
		autoform: {
			type: "hidden"
		}
	}
})




Meteor.methods({
	toggleLocation: function(id, locationState){
		check(id, String);
		Locations.update(id, {
			$set: {
				isPublished: !locationState
			}
		});
	},
	deleteLocation: function(id){
		Locations.remove(id);
	}
});
//here we actually attach the schema above to the collection that we had created earlier 
Locations.attachSchema ( LocationSchema );