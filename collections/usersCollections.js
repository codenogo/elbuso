Users = Meteor.users;
UserImage = new FS.Collection('userImage', {
   stores: [new FS.Store.GridFS('userImage', {path: '~/uploads'})]
});
//only allow users who are signed in to add/update an auction
Users.allow({
	insert: function(userId, doc) {
		// return !!userId;
        return true;
	},
	update: function(userId, doc) {
		return true;
	}
});
UserImage.allow({
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


//This is the default address schema
AddressSchema = new SimpleSchema({
    formattedAddress: {
        type: String,
        optional: true
    },
    geopoint: {
        type: [Number], //[longitude, latitude]
        decimal: true,
        optional: true
    },
    city: {
        type: String,
        optional: true
    },
    postalCode: {
        type: String,
        optional: true
    },
    country: {
        type: String,
        optional: true
    },
    countryName: {
        type: String,
        optional: true
    }
});
UserCountry = new SimpleSchema({
    name: {
        type: AddressSchema,
        label: 'Address',
        autoform: {
            type: 'google-places-input'
        }
    }
});
companySchema = new SimpleSchema({
    companyName: {
        type: String
    },
    companyRegistration: {
        type: String,
        optional: true,
    },
    companyWebsite: {
        type: String,
        // regEx: SimpleSchema.RegEx.Url,
        optional: true
    },
    companyEmail: {
        type: String,
        regEx: SimpleSchema.RegEx.Email,
        optional: true
    },
    companyPhone: {
        type: String,
        optional: true,
        autoform: {
            afFieldInput: {
                type: "tel"
            }
        }
    }
});

UserProfile = new SimpleSchema({
    buyerType: {
        type: String,
        label: 'Select the type of buyer that you are',
        autoform: {
            type: "select-radio",
            options: [
                {
                    label: "company",
                    value: 'company'
                },
                {
                    label: "individual",
                    value: 'individual'
                }
            ]
        }
    },
    firstname: {
        type: String
    },
    lastname: {
        type: String,
        optional: true
    },
    personalPhone: {
        type: Object,
    },
    'personalPhone.countryCode': {
        type: String,
    },
    'personalPhone.phoneNumber': {
        type: Number,
    },
    'personalPhone.phoneVerification': {
        type: Boolean,
        defaultValue: false,
        optional: true,
        autoform: {
            type: "hidden"
        }
    },
    company: {
        type: companySchema,
        // optional: true
    },
    country: {
        type: UserCountry,
        label: 'location',
        optional: true
    },
    zip: {
        type: String,
        label: 'zip',
        optional: true
    },
    parentUser: {
        type: String,
        autoform: {
            type: "hidden"
        }
    },
});

UserSchema = new SimpleSchema({
    username: {
        type: String,
        optional: true
        // For accounts-password, either emails or username is required, but not both. It is OK to make this
        // optional here because the accounts-password package does its own validation.
        // Third-party login packages may not require either. Adjust this schema as necessary for your usage.
    },
    image: {
        type: String,
        optional: true,
        autoform: {
            afFieldInput: {
                type: "cfs-file",
                collection: "userImage",
                accept: 'image/*',
                label: "update your profile photo here"
            }
        }
    },
    emails: {
        type: Array,
        // For accounts-password, either emails or username is required, but not both. It is OK to make this
        // optional here because the accounts-password package does its own validation.
        // Third-party login packages may not require either. Adjust this schema as necessary for your usage.
    },
    "emails.$": {
        type: Object
    },
    "emails.$.address": {
        type: String,
        regEx: SimpleSchema.RegEx.Email,
        label: 'email address'
    },
    "emails.$.verified": {
        type: Boolean,
        optional: true,
        autoform: {
            type: "hidden"
        }
    },
    profile: {
        type: UserProfile
        // optional: true
    },
    // Make sure this services field is in your schema if you're using any of the accounts packages
    services: {
        type: Object,
        optional: true,
        blackbox: true,
        autoform: {
			type: "hidden"
		}
    },
    // Add `roles` to your schema if you use the meteor-roles package.
    // Option 1: Object type
    // If you specify that type as Object, you must also specify the
    // `Roles.GLOBAL_GROUP` group whenever you add a user to a role.
    // Example:
    // Roles.addUsersToRoles(userId, ["admin"], Roles.GLOBAL_GROUP);
    // You can't mix and match adding with and without a group since
    // you will fail validation in some cases.
    roles: {
        type: Object,
        optional: true,
        blackbox: true,
        autoform: {
			type: "hidden"
		}
    },
    // In order to avoid an 'Exception in setInterval callback' from Meteor
    heartbeat: {
        type: Date,
        optional: true,
        autoform: {
			type: "hidden"
		}
    },
    verification: {
        type: Boolean,
        defaultValue: false,
        optional: true,
        autoform: {
            type: "hidden"
        }
    },
    verificationBanner: {
        type: Boolean,
        defaultValue: false,
        optional: true,
        autoform: {
            type: "hidden"
        }
    },
    submission: {
        type: Boolean,
        defaultValue: false,
        optional: true,
        autoform: {
            type: "hidden"
        }
    },
    active: {
        type: Boolean,
        defaultValue: true,
        optional: true,
        autoform: {
            type: "hidden"
        }
    },
    customerId: {
        type: String,
        optional: true,
        autoform: {
            type: "hidden"
        }
    },
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
});

Meteor.methods({
    toggleVerification: function(id, verificationState){
        check(id, String);
        Meteor.users.update(id, {
            $set: {
                verification: !verificationState
            }
        });
    },
    deactivate: function(id, activeState){
        check(id, String);
        Meteor.users.update(id, {
            $set: {
                active: !activeState
            }
        });
    },
    submissionToggle: function(id){
        check(id, String);
        Meteor.users.update(id, {
            $set: {
                submission: true
            }
        });
    },
    verifyPhone: function(id){
        check(id, String);
        Meteor.users.update(id, {
            $set: {
                'profile.personalPhone.phoneVerification': true
            }
        });
    },
    updateUser: function(id){
        Meteor.users.update(id);
    },
    deleteUser: function(id, imageId){
        Meteor.users.remove(id);
        UserImage.remove(imageId);
        FlowRouter.go('users');
    },
    sendVerificationLink: function() {
    var userId = Meteor.userId();
        if ( userId ) {
            return Accounts.sendVerificationEmail(userId);
        }
    }
});







Meteor.users.attachSchema(UserSchema);
