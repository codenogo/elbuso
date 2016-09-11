Auctions = new Mongo.Collection('auctions');
AuctionImages = new FS.Collection('auctionImages', {
   stores: [new FS.Store.GridFS('auctionImages', {path: '~/uploads'})]
});
AuctionAttachments = new FS.Collection('auctionAttachments', {
   stores: [new FS.Store.GridFS('auctionAttachments', {path: '~/uploads'})]
});

//only allow users who are signed in to add/update an auction
Auctions.allow({
	insert: function(userId, doc) {
		return !!userId;
	},
	update: function(userId, doc) {
		return !!userId;
	}
});
AuctionImages.allow({
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
AuctionAttachments.allow({
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




//this is the schema that will be used to get the content that goes into the auctions collection
AuctionSchema = new SimpleSchema({
	name: {
		type: String,
		label: "Auction Name"
	},
    category: {
		type: String,
        autoform: {
			type: "hidden"
		}
	},
	currency: {
		type: String,
		label: "currency based on published countries",
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
	minimumPrice: {
		type: Number,
		label: "Minimum Purchase value per customer (in the selected currency)",
		min: 1
	},
	maximumPrice: {
		type: Number,
		label: "Maximum Purchase value per customer (in the selected currency)",
	},
	maximumValue: {
		type: Number,
		label: "Maximum total reservation value for the Auction (in the selected currency)",
	},
	StartRate: {
		type: Number,
		label: "Starting Discount Rate in the Auction (in percentage %)",
		min: 1,
		max: 100
	},
	reservationFee: {
		type: Number,
		label: "Reservation rate: the percentage which will go to Elbuso",
		min: 1,
		max:99
	},
	targetted: {
		type: Number,
		label: "Maximum number of people to reserve the Auction",
		min: 1
	},
	Bidders: {
        type: [String],
        label: 'Select the Bidders for this auction. Only verified sellers will be selectable',
        autoform: {
        	type: 'universe-select',
        	afFieldInput: {
	        	multiple: true,
	        	min: 2,
	        	valuesLimit: 10
	      	},
            options: function () {
                var options = [];
                Meteor.users.find({'roles.__global_roles__':'seller', 'profile.company.companyName': { $exists: true}, 'verification': true }).forEach(function (element) {
                    options.push({
                        label: element.profile.company.companyName, value: element._id
                    })
                });
                return options;
            }
        }
    },
	image: {
        type: String,
        autoform: {
        	afFieldInput: {
        		type: "fileUpload",
        		accept: 'image/*',
		        collection: "auctionImages",
		        label: "add an image of the auction"
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
		        collection: "auctionImages",
		        accept: 'image/*'
        	}
        }
    },
	selectLive: {
    	type: String,
	    label: 'Select when the auction goes live',
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
		label: "the date the auction will go live",
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
	    label: 'Can a reserving user redeem more after the auction closes and more items are available?',
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
	attachments: {
        type: [String],
        optional: true,
        label: "add attachments to this auction"
    },
    "attachments.$":{
    	autoform: {
        	afFieldInput: {
        		type: "fileUpload",
		        collection: "auctionAttachments",
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
	},
	isOpen: {
        type: Boolean,
        defaultValue: true,
        optional: true,
        autoform: {
            type: "hidden"
        }
    },
    bidding: {
        type: Boolean,
        defaultValue: false,
        optional: true,
        autoform: {
            type: "hidden"
        }
    }
});



Meteor.methods({
	deleteAuction: function(id, imageId){
		Auctions.remove(id);
		AuctionImages.remove(imageId);
		FlowRouter.go('auctions');
	},
	toggleOpenAuction: function(id, openAuctionState){
		check(id, String);
        Auctions.update(id, {
            $set: {
                isOpen: !openAuctionState
            }
        });
    },
    togglePublishAuction: function(id, isPublishedState){
    	check(id, String);
        Auctions.update(id, {
            $set: {
                isPublished: !isPublishedState
            }
        });
    },
    toggleBidding: function(id, biddingState){
    	check(id, String);
        Auctions.update(id, {
            $set: {
                bidding: !biddingState
            }
        });
    }
});
//here we actually attach the schema above to the collection that we had created earlier
Auctions.attachSchema ( AuctionSchema );
