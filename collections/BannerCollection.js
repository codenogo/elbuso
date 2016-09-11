Banners = new Mongo.Collection('banners');

BannerImages = new FS.Collection('bannerImages', {
   stores: [new FS.Store.GridFS('bannerImages')]
});

Banners.allow({
	insert: function(userId, doc) {
		return !!userId; 
	},
	update: function(userId, doc) {
		return !!userId;
	}
});
BannerImages.allow({
	insert: function(userId, doc) {
		return true;
	},
	update: function(userId, doc) {
		return true;
	},
	download: function(userId, doc) {
		return true;
	},
	remove: function(userId, doc) {
		return true;
	}
});

BannerSchema = new SimpleSchema({
	image: {
        type: String,
        autoform: {
        	afFieldInput: {
        		type: "fileUpload",
		        collection: "bannerImages",
		        accept: 'image/*',
		        label: "add a banner image"
        	}
        }
    },
	title: {
		type: String,
		label: "Name"
	},
	link : {
		type: String,
		regEx: SimpleSchema.RegEx.Url,
		optional: true,
		label: "link"
	},
	subtitle: {
		type: String,
		label: "Subtitle"
	},
    isPublished: {
		type: Boolean,
		defaultValue: false,
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
	toggleShowing: function(id, publishedState){
		check(id, String);
		Banners.update(id, {
			$set: {
				isPublished: !publishedState
			}
		});
	},
	deleteBanner: function(id, imageId){
		Banners.remove(id);
		BannerImages.remove(imageId);
	}
});
//here we actually attach the schema above to the collection that we had created earlier 
Banners.attachSchema ( BannerSchema );