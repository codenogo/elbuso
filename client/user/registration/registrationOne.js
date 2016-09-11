Template.registrationOne.onCreated(function() {
  Session.set('chooseType', true);
  Session.set('newBuyer', false);
  Session.set('newSeller', false);
});
Template.registrationOne.events({
	'click .register-buyer': ()=> {
		Session.set('newBuyer', true);
		Session.set('chooseType', false);
		Session.set('newSeller', false);
	},
	'click .register-seller': ()=> {
		Session.set('newSeller', true);
		Session.set('chooseType', false);
		Session.set('newBuyer', false);
	},
});
