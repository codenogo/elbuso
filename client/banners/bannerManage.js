Template.bannerManage.onCreated(function() {
  var self = this;
  self.autorun(function(){
    self.subscribe('banners');
    self.subscribe('bannerImages');
  });
});
Template.bannerManage.helpers({
	banners: ()=> {
		return Banners.find({});
	}
});

//show and hide new banner section
Template.bannerManage.events({
	'click .new-banner-btn': ()=> {
		Session.set('newBanner', true);
	}
});
Template.bannerManage.events({
	'click .close-new': ()=> {
		Session.set('newBanner', false);
	}
});