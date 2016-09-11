Language = new Mongo.Collection('language');

Language.allow({
	insert: function(userId, doc) {
		return !!userId;
	},
	update: function(userId, doc) {
		return !!userId;
	}
});

LanguageSchema = new SimpleSchema({
	name: {
		type: String,
		label: "Name"
	},
	countries: {
		type: [String],
		label: "countries",
		autoform: {
        	type: 'universe-select',
        	afFieldInput: {
	        	multiple: true,
	        	min: 1,
	        	valuesLimit: 200
	      	},
            options: function () {
                var options = [];
                Countries.find().forEach(function (element) {
                    options.push({
                        label: element.name, value: element.isoCode
                    })
                });
                return options;
            }
        },
		optional: true,
	},
    isPublished: {
		type: Boolean,
		defaultValue: true,
		optional: true,
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
	toggleLanguage: function(id, languageState){
		check(id, String);
		Language.update(id, {
			$set: {
				isPublished: !languageState
			}
		});
	},
	deleteLanguage: function(id){
		Language.remove(id);
	}
});
//here we actually attach the schema above to the collection that we had created earlier
Language.attachSchema ( LanguageSchema );
