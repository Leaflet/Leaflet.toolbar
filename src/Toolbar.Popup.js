// A convenience class for built-in popup toolbars.

L.Toolbar = L.Toolbar || {};

L.Toolbar.Popup = L.Toolbar.extend({

	initialize: function(actions, options) {
		L.Toolbar.prototype.initialize.call(this, actions, options);

		var toolbar = this.getContainer();

		this._container = new L.Popup()
			.setContent(toolbar);
	},

	onAdd: function(map) {
		this._map = map;

		this._container.openOn(map);
	},

	onRemove: function(map) {
		map.closePopup(this._container);

		delete this._map;
	},

	setLatLng: function(latlng) {
		this._container.setLatLng(latlng);

		return this;
	}
	
});