// FS.debug = true;
Deals = new Mongo.Collection('deals');
DealImages = new FS.Collection('dealImages', {
   stores: [new FS.Store.GridFS('dealImages', {path: '~/uploads'})]
});
DealAttachments = new FS.Collection('dealAttachments', {
   stores: [new FS.Store.GridFS('dealAttachments', {path: '~/uploads'})]
});

//only allow users who are signed in to add/update an auction
Deals.allow({
	insert: function(userId, doc) {
		return !!userId;
	},
	update: function(userId, doc) {
		return true;
	}
});
DealImages.allow({
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
DealAttachments.allow({
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


//this is the schema that will be used to get the content that goes into the deals collection
DealSchema = new SimpleSchema({

	name: {
		type: String,
		label: "Name"
	},
    category: {
		type: String,
        autoform: {
			type: "hidden"
		}
	},
	currency: {
		type: String,
		label: "the currency to be used",
	    autoform: {
	      	type: 'universe-select',
	      	afFieldInput: {
	        	multiple: false
	      	},
		    options: function () {
                var options = [];
                var publishedCurr = Countries.find({published: true}).map(function(country){
                	var countryCurrency = country.currencyIso;
                	return countryCurrency;
                });
                Currency.find({ "currencyIso": { $in: publishedCurr } }).forEach(function (currency) {
                	var currencyIso = currency.currencyIso;
                	var currencyName = currency.currencyName;
                	var label = (currencyName + ' ' + '(' + ' ' + currencyIso + ' ' + ')' );
                    options.push({
                        // label: country.name,
                        label: label,
                        value: currencyIso
                    })
                });
                return options;
            }
	    }
	},
	price: {
		type: Number,
		label: "Purchase value before discount",
		min: 1
	},
	Rate: {
		type: Number,
		label: "Discount Rate (%)",
		min: 1,
		max: 99
	},
	maximumTotalUnits: {
		type: Number,
		label: "Maximum number units available for purchase",
		min: 1
	},
	maximumTotalReservations: {
		type: Number,
		label: "Maximum value available for purchase in this deal (after discount)",
		min: 1
	},
	reservationFee: {
		type: Number,
		label: "Reservation Rate: the percentage which will go to Elbuso",
		defaultValue: 1,
		min: 1,
		max:99
	},
	unitType: {
    	type: String,
	    label: 'Type of deal',
	    autoform: {
	        type: "select-radio",
	        options: [
	            {
	                label: "Single product/ service",
	                value: 'single'
	            },
	            {
	                label: "Assortment",
	                value: 'assortment'
	            }
	        ]
	    }
	},
	maximumUserUnits: {
		type: Number,
		label: "Maximum number of units a single user can reserve",
		min: 1,
		max: 9999
	},
	redeemValueToggle: {
    	type: String,
	    label: 'Can a user collect the deal in bits',
	    autoform: {
	        type: "select-radio",
	        options: [
	            {
	                label: "Yes they can",
	                value: 'yes'
	            },
	            {
	                label: "No they cannot",
	                value: 'no'
	            }
	        ]
	    }
	},
	minRedeemValue: {
		type: Number,
		optional: true,
		label: "minimum amount a user can collect",
		min: 1,
		max: 999999999
	},
	image: {
        type: String,
        autoform: {
        	afFieldInput: {
        		type: "fileUpload",
		        collection: "dealImages",
		        accept: 'image/*',
		        label: "add an image of the deal here"
        	}
        }
    },
    secondaryImage: {
        type: [String],
        optional: true,
        label: "add other images (optional)"
    },
    "secondaryImage.$":{
    	autoform: {
        	afFieldInput: {
        		type: "fileUpload",
		        collection: "dealImages",
		        accept: 'image/*'
        	}
        }
    },
    selectLive: {
    	type: String,
	    label: 'Select when the deal goes live',
	    autoform: {
	        type: "select-radio",
	        options: [
	            {
	                label: "immediately",
	                value: 'immediately'
	            },
	            {
	                label: "custom time",
	                value: 'custom'
	            }
	        ]
	    }
	},
    goingLiveDate: {
		type: Date,
		label: "the date the deal will go live",
		autoform: {
			afFieldInput: {
		        type: "bootstrap-datetimepicker",
		        dateTimePickerOptions: {
		        	useCurrent: false
		        }
		    }
		}
	},
    closingDate: {
		type: Date,
		label: "closing date",
		autoform: {
			afFieldInput: {
		        type: "bootstrap-datetimepicker",
		        dateTimePickerOptions: {
		        	useCurrent: false,
		        	defaultDate: false
		        }
		    }
		}
	},
	redeemMoreToggle: {
    	type: String,
	    label: 'Can a reserving user redeem more after the deal closes and more items are available?',
	    autoform: {
	        type: "select-radio",
	        options: [
	            {
	                label: "Yes they can",
	                value: 'yes'
	            },
	            {
	                label: "No they Cannot",
	                value: 'no'
	            }
	        ]
	    }
	},
	finalRedeemDate: {
		type: Date,
		label: "the final date additional resetvation can be redeemed",
		autoform: {
			afFieldInput: {
		        type: "bootstrap-datetimepicker",
		        dateTimePickerOptions: {
		        	useCurrent: false
		        }
		    }
		}
	},
	finalCollectionDate: {
		type: Date,
		label: "the final date a user can collect their reservation",
		autoform: {
			afFieldInput: {
		        type: "bootstrap-datetimepicker",
		        dateTimePickerOptions: {
		        	useCurrent: false
		        }
		    }
		}
	},
	location: {
		type: Object,
		optional: true,
		label: 'set the pick up location for the deal',
		autoform: {
			type: 'map',
			afFieldInput: {
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

	locations: {
		type: [String],
		label: "use my locations",
		optional: true,
	    autoform: {
	      	type: 'universe-select',
	      	afFieldInput: {
	        	multiple: true
	      	},
		    options: function () {
                var options = [];
                Locations.find().forEach(function (location) {
                	var locationId = location._id;
                	var locationName = location.Name;
                    options.push({
                        label: locationName,
                        value: locationId
                    })
                });
                return options;
            }
	    }
	},
    description: {
		type: String,
		label: "Description",
		autoform: {
	    	afFieldInput: {
		        type: 'summernote',
		        class: 'editor',
		        settings: {
					toolbar: [
						// [groupName, [list of button]]
						['style', ['bold', 'underline', 'clear']],
						// ['font', ['strikethrough', 'superscript', 'subscript']],
						// ['fontsize', ['fontsize']],
						// ['color', ['color']],
						['para', ['ul']],
						// ['height', ['height']]
						['insert', ['link']]
					]
		        }
	    	}
	    }
	},
	attachments: {
        type: [String],
        optional: true,
        label: "add attachments to this deal (optional)"
    },
    "attachments.$":{
    	autoform: {
        	afFieldInput: {
        		type: "fileUpload",
		        collection: "dealAttachments",
        	}
        }
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
				var userId = Meteor.userId();
				if (Roles.userIsInRole(userId, ['sub-user'])){
					return Meteor.users.findOne({_id: this.userId }).profile.parentUser
				} else {
					return this.userId
				}
			} else if (this.isUpsert) {
				var userId = Meteor.userId();
				if (Roles.userIsInRole(userId, ['sub-user'])){
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
				if (Roles.userIsInRole(userId, ['sub-user'])){
					return this.userId
				}
			} else if (this.isUpsert) {
				var userId = Meteor.userId();
				if (Roles.userIsInRole(userId, ['sub-user'])){
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
	},
	published: {
        type: Boolean,
        defaultValue: false,
        optional: true,
        autoform: {
            type: "hidden"
        }
    },
    isOpen: {
        type: Boolean,
        defaultValue: true,
        optional: true,
        autoform: {
            type: "hidden"
        }
    }
});


Meteor.methods({
	deleteDeal: function(id, imageId){
		Deals.remove(id);
		DealImages.remove(imageId);
		// DealAttachments.remove(attachmentId);
		FlowRouter.go('deals');
	},
	togglePublishDeal: function(id, publishDealState){
		check(id, String);
        Deals.update(id, {
            $set: {
                published: !publishDealState
            }
        });
    },
    toggleOpenDeal: function(id, openDealState){
    	check(id, String);
        Deals.update(id, {
            $set: {
                isOpen: !openDealState
            }
        });
    }
});
//here we actually attach the schema above to the collection that we had created earlier
Deals.attachSchema ( DealSchema );
