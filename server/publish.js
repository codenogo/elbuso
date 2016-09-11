// AUCTIONS
Meteor.publish('auctions', function(){
	return Auctions.find();
});
Meteor.publish('auctionImages', function(){
    return AuctionImages.find();
});
Meteor.publish('auctionAttachments', function(){
    return AuctionAttachments.find();
});
Meteor.publish('bidding', function(){
  return Bidding.find();
});
Meteor.publish('singleAuction', function(id){
  check(id, String);
  return Auctions.find({_id: id});
});


//DEALS
Meteor.publish('deals', function(){
	return Deals.find();
});
Meteor.publish('dealImages', function(){
    return DealImages.find();
});
Meteor.publish('dealAttachments', function(){
    return DealAttachments.find();
});
Meteor.publish('singleDeal', function(id){
  check(id, String);
  return Deals.find({_id: id});
});
Meteor.publish('new-deals', function(){
    return DealAttachments.find({published: false});
});


//BANNERS
Meteor.publish('banners', function(){
	return Banners.find();
});
Meteor.publish('bannerImages', function(){
    return BannerImages.find();
});




//FAVOURITES
Meteor.publish('favourites', function(userId){
  check(userId, String);
  return Favourites.find({user: userId});
});
Meteor.publish('dealFavourites', function(id){
  check(id, String);
  return Favourites.find({deal: id});
});
Meteor.publish('auctionFavourites', function(id){
  check(id, String);
  return Favourites.find({auction: id});
});



//CATEGORIES
Meteor.publish('categories', function(){
  return Categories.find();
});
Sortable.collections = ['categories'];



//SUPPORT
Meteor.publish('support', function(){
  return Support.find();
});
Meteor.publish('mySupport', function(userId){
  check(userId, String);
  return Support.find({ "participants": {"$elemMatch":{"party":userId}} })
});
Meteor.publish('mySupportNotifications', function(userId){
  check(userId, String);
  return Support.find({ isOpen: true, "participants": {"$elemMatch":{"party":userId}} })
});
Meteor.publish('singleSupport', function(id){
  check(id, String);
  return Support.find({_id: id});
});



//RESERVATIONS
Meteor.publish('auctionReservation', function(){
  return AuctionReservation.find();
});
Meteor.publish('dealReservation', function(){
  return DealReservation.find();
});
Meteor.publish('transactions', function(){
  return Transactions.find();
});



//USERS
Meteor.publish('Meteor.users', function(){
	return Meteor.users.find();
});
Meteor.publish(null, function (){
  return Meteor.roles.find()
});
Meteor.publish('singleUser', function(id){
  check(id, String);
  return Meteor.users.find({_id: id});
});
Meteor.publish('userImage', function(){
  return UserImage.find();
});


//SUB-USERS
Meteor.publish('subUserInvitation', function(){
  return SubUserInvitation.find();
});
Meteor.publish('mySubInvites', function(id){
  check(id, String);
  return SubUserInvitation.find({parentUser: id});
});
Meteor.publish('singleSubInvites', function(linkId){
  check(linkId, String);
  return SubUserInvitation.find({_id: linkId});
});


//COUNTRIES & CURRENCY
Meteor.publish('countries', function(skipCount) {
  var positiveIntegerCheck = Match.Where(function(x) {
    check(x, Match.Integer);
    return x >= 0;
  });
  check(skipCount, positiveIntegerCheck);

  Counts.publish(this, 'countryCount', Countries.find(), {
    noReady: true
  });

  return Countries.find({}, {
    limit: 15,
    // limit: parseInt(Meteor.settings.public.recordsPerPage),
    skip: skipCount
  });
});
Meteor.publish('countryList', function(){
  return Countries.find({published: true});
});
Meteor.publish('singleCountry', function(countryId){
  check(countryId, String);
  return Countries.find({_id: countryId});
});
Meteor.publish(null, function (){
  return Currency.find()
});




//LANGUAGES & TRANSLATION
Meteor.publish('language', function(){
  return Language.find();
});
Meteor.publish('publishedLanguage', function(){
  return Language.find({published: true});
});




// LOCATIONS
Meteor.publish('locations', function(){
  return Locations.find();
});
Meteor.publish('myLocations', function(userId){
  check(userId, String);
  return Locations.find({author: userId});
});
