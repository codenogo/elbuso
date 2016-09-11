Template.currencyEditItem.onCreated(function(){
	this.editMode = new ReactiveVar(false);
});
Template.currencyEditItem.helpers({
	country: function(){
		return Countries.find();
	},
	isPublished: function(){
		var countryId = this._id;
		var countryState = Countries.findOne({_id: countryId}).published;
		if (countryState === true){
			return true;
		}
	},
	smallIso: function (){
		var countryId = this._id;
		var iso = Countries.findOne({_id: countryId}).isoCode;
		return iso.toLowerCase();
	},
	mycurrencyName: function(){
		var countryId = this._id;
		var currencyIso = Countries.findOne({_id: countryId}).currencyIso;
		var currencyName = Currency.findOne({currencyIso: currencyIso}).currencyName;
		return currencyName;
	},
	mycurrencySymbol: function(){
		var countryId = this._id;
		var currencyIso = Countries.findOne({_id: countryId}).currencyIso;
		var currencySymbol = Currency.findOne({currencyIso: currencyIso}).currencySymbol;
		return currencySymbol;
	},
	updateCurrencyId: function() {
		return this._id;
	},
	editMode: function(){
		return Template.instance().editMode.get();
	},
	currency: function(){
		return Currency.find();
	},
	isDefaultCurrency: function(){
		var countryId = Template.parentData()._id;
		var currencyId = this._id;
		var countryCurrencyIso = Countries.findOne({_id: countryId}).currencyIso;
		var currencyIso = Currency.findOne({_id: currencyId}).currencyIso;
		if (countryCurrencyIso === currencyIso){
			return true;
		}
	}
});
Template.currencyEditItem.events({
	'click .edit-state': function(event, template) {
		template.editMode.set(!template.editMode.get());
	},
	'submit .select-currency': function(event, template) {
        event.preventDefault();
        var id = this._id;
        var currency = event.target.currencyList.value;
        Countries.update(id, {$set: {
            "currencyIso": currency
        }}, (error) => {
            if (error){
                Bert.alert(error.reason, 'danger');
            }
        });
        template.editMode.set(!template.editMode.get());
    }
});