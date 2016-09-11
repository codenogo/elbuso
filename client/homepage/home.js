
// Template.home.onCreated(function() {
// 	Meteor.subscribe('auctionImages');
// 	Meteor.subscribe('auctions');
// 	Meteor.subscribe('deals');
// 	Meteor.subscribe('dealImages');
// });
Template.home.onCreated(function() {
	var self = this;
	self.autorun(function(){
		self.subscribe('auctions');
		self.subscribe('auctionImages');
		self.subscribe('deals');
		self.subscribe('dealImages');
	});
});
//helper to show the data of auctions in a list view
Template.home.helpers({
	auctions: ()=> {
		//found how to limit the homepage auctions to 3. Yay!!
		return Auctions.find({isOpen: true, isPublished: true}, {limit: 3}).fetch().reverse();
	},
	deals: ()=> {
		return Deals.find({isOpen: true, published: true}).fetch().reverse();
	},
	formattedDate: function(){
		return moment(this.createdAt).format("ddd, hA");
	}
});