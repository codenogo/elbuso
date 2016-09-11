Meteor.subscribe('Meteor.users');
Meteor.subscribe('userImage');

Template.editProfile.onCreated(function() {
	this.subscribe('countryList');
});
Template.editProfile.onRendered(function() {
	GoogleMaps.load({
  		key: 'AIzaSyC-o3gWc4wXZvMamAo5xBhtimaON8ASq78', 
  		libraries: 'geometry,places'
  	});
});
Template.editProfile.helpers ({
    currentUser: function () {
		return Meteor.user({_id: this.userId});
	}
});

Template.editProfile.events ({
	'click .update-profile': function(){
		$('html, body').animate({scrollTop : 0},800);
		return false;
	}
});