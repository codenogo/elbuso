Template.deals.onCreated(function() {
	var self = this;
	self.autorun(function(){
		self.subscribe('deals');
		self.subscribe('dealImages');
		self.subscribe('categories');
	});
});
Template.deals.helpers({
	getDeals: function() {
		return DealSearch.getData({
			transform: function(matchText, regExp) {
				return matchText.replace(regExp, "<b>$&</b>")
			},
			sort: {isoScore: -1}
		});
	},
	isLoading: function() {
		return DealSearch.getStatus().loading;
	},
	deals: ()=> {
		return Deals.find({published: true}).fetch().reverse();
	},
	allDeals: ()=> {
		return Deals.find({}).fetch().reverse();
	},
	myDeals: ()=> {
		var userId = Meteor.userId();
		if (Roles.userIsInRole(userId, ['sub-user'])){
			var parentUser = Meteor.users.findOne({_id: Meteor.userId()}).profile.parentUser
			return Deals.find({author: parentUser, published: false}).fetch().reverse();
		} else {
			return Deals.find({author: userId, published: false}).fetch().reverse();
		}

	},
	formattedDate: function(){
		return moment(this.createdAt).format("ddd, hA");
	}
});
Template.deals.events({
	"keyup .dealsearch": function(e) {
		var text = $(e.target).val().trim();
		DealSearch.search(text);
	},
});

var options = {
  keepHistory: 1000 * 60 * 5,
  localSearch: true
};
var fields = ['name'];
DealSearch = new SearchSource('deals', fields, options);
