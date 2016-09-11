SubUserInvitation = new Mongo.Collection('subUserInvitation');
SubUserInvitation.allow({
	insert: function(userId, doc) {
		return !!userId;
	},
	update: function(userId, doc) {
		return !!userId;
	}
});


//the usable fields will be
//invitationToken
//parentUser
//_id





subUserSchema = new SimpleSchema({
    
    firstname: {
        type: String,
        label: 'first name'
    },
    lastname: {
        type: String,
        label: 'last name'
    },
    email: {
        type: String,
        regEx: SimpleSchema.RegEx.Email,
        label: 'email address',
        unique: true,
		// custom: function () {
			
		// }
    },
    permission: {
		type: String,
		label: "the roles that this user will be allowed to perform",
	    autoform: {
	      	type: 'universe-select',
	      	afFieldInput: {
	        	multiple: false
	      	},
		    options: [
		    	{
		    		label: 'redeeming: this user can only redeem items', 
                	value: 'redeem'
                },
                {
		    		label: 'manager: this user can list deals, invite other sub-users and redeem items', 
                	value: 'manager'
                },
		    ]
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
    parentUser: {
		type: String,
		label: "parent user",
		autoValue: function() {
			if (this.isInsert) {
				var userId = Meteor.userId();
				if (Roles.userIsInRole(userId, ['manager'])){
					return Meteor.users.findOne({_id: this.userId }).profile.parentUser
				} else {
					return this.userId
				}
			} else if (this.isUpsert) {
				var userId = Meteor.userId();
				if (Roles.userIsInRole(userId, ['manager'])){
					var parent = Meteor.users.findOne({_id: this.userId }).profile.parentUser
					return {$setOnInsert: parent};
				} else {
					return {$setOnInsert: this.userId};
				}
			} else {
				this.unset();  // Prevent user from supplying their own value
			}
		},
		autoform: {
			type: "hidden"
		}
	},
	subAuthor: {
		type: String,
		label: "Author",
		optional: true,
		autoValue: function() {
			if (this.isInsert) {
				var userId = Meteor.userId();
				if (Roles.userIsInRole(userId, ['manager'])){
					return this.userId
				}
			} else if (this.isUpsert) {
				var userId = Meteor.userId();
				if (Roles.userIsInRole(userId, ['manager'])){
					return {$setOnInsert: this.userId};
				}
			} else {
				this.unset();  // Prevent user from supplying their own value
			}
		},
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
	removeSubUserInvitation: function(id){
		check(id, String);
		SubUserInvitation.remove(id);
	},
	deactivateInvite: function(linkId, activeState){
        check(linkId, String);
        SubUserInvitation.update(linkId, {
            $set: {
                active: !activeState
            }
        });
    }
});
SubUserInvitation.attachSchema(subUserSchema);