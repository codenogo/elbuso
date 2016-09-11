Template.locationItem.onRendered(function() {
  GoogleMaps.load({key: 'AIzaSyC-o3gWc4wXZvMamAo5xBhtimaON8ASq78', libraries: 'geometry,places'});
});
Template.locationItem.onCreated(function() {
	this.editMode = new ReactiveVar(false);
	GoogleMaps.ready('location', function(map) {
		// Add a marker to the map once it's ready
		var marker = new google.maps.Marker({
			position: map.options.center,
			map: map.instance
		});
	});
});
Template.locationItem.helpers({
	updateLocationId: function() {
		return this._id;
	},
	editMode: function(){
		return Template.instance().editMode.get();
	},
	showMap: function() {
		var lat = Locations.findOne({_id: this._id}).location.lat;
		var lng = Locations.findOne({_id: this._id}).location.lng;
	    if (GoogleMaps.loaded()) {
			// Map initialization options
			return {
				center: new google.maps.LatLng(lat, lng),
				zoom: 17
			};
	    }
	}
});
Template.locationItem.events({
	'click .delete-location': function() {
		var id = this._id;
		Meteor.call('deleteLocation', id);
		Bert.alert('you have deleted a location', 'danger')
	},
	'click .update-location': function(event, template) {
		template.editMode.set(!template.editMode.get());
	}
});