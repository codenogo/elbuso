EmailTemplates = new Mongo.Collection('emailTemplates');
//only allow users who are signed in to add/update an email
EmailTemplates.allow({
	insert: function(userId, doc) {
		return !!userId;
	},
	update: function(userId, doc) {
		return !!userId;
	}
});




//this is the schema that will be used to get the content that goes into the auctions collection
EmailTemplateSchema = new SimpleSchema({
	name: {
		type: String,
		label: "Auction Name"
	},
	description: {
		type: String,
		label: "Description",
		autoform: {
	    	afFieldInput: {
		        type: 'summernote',
		        rows: 5,
		        class: 'editor',
		        settings: {
					toolbar: [
						//check auctionsCollection schema (http://summernote.org/deep-dive/#customization)
						['style', ['bold', 'underline', 'clear']],
						['para', ['ul']],
						['insert', ['link']]
					]
		        }
	    	}
	    }
	},
	isPublished: {
		type: Boolean,
		defaultValue: true,
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
});



Meteor.methods({
    togglePublishEmail: function(id, isPublishedState){
    	check(id, String);
        EmailTemplates.update(id, {
            $set: {
                isPublished: !isPublishedState
            }
        });
    }
});
//here we actually attach the schema above to the collection that we had created earlier
EmailTemplates.attachSchema ( EmailTemplateSchema );
