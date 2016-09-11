Template.auctionManager.onCreated(function() {
	var self = this;
	self.autorun(function(){
		self.subscribe('auctions');
		self.subscribe('auctionImages');
	});
});

Template.auctionManager.helpers({
	auctions: ()=> {
		return Auctions.find({});
	}
});