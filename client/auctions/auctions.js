Template.auctions.onCreated(function() {
	var self = this;
	self.autorun(function(){
		// self.subscribe('auctions');
		self.subscribe('auctionImages');
		self.subscribe('categories');
	});
});

Template.auctions.helpers({
	getPackages: function() {
		return PackageSearch.getData({
			transform: function(matchText, regExp) {
				return matchText.replace(regExp, "<b>$&</b>")
			},
			sort: {isoScore: -1}
		});
	},
	isLoading: function() {
		return PackageSearch.getStatus().loading;
	},
	auctions: function(){
		return Auctions.find({bidding:false, isOpen: true, isPublished: true}).fetch().reverse();
	},
	allAuctions: function(){
		return Auctions.find({}).fetch().reverse();
	},
	auctionsBidding: function(){
		var userId = Meteor.userId();
		//find an auction where the user is one of the bidders
		if (Roles.userIsInRole(userId, ['sub-user'])){
			var parentUser = Meteor.users.findOne({_id: Meteor.userId()}).profile.parentUser
			return Auctions.find({bidding:true, isOpen: true}, {$elemMatch:{Bidders: parentUser}}).fetch().reverse();
		} else {
			return Auctions.find({bidding:true, isOpen: true}, {$elemMatch:{Bidders: userId}}).fetch().reverse();
		}

	},
});

Template.auctions.events({
	"keyup .auctionsearch": function(e) {
		var text = $(e.target).val().trim();
		PackageSearch.search(text);
	},
});

Template.auctions.onRendered(function() {
	PackageSearch.search('');
});


var options = {
  keepHistory: 1000 * 60 * 5,
  localSearch: true
};
var fields = ['name'];
PackageSearch = new SearchSource('auctions', fields, options);
