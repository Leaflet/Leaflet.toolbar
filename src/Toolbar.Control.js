L.Toolbar = L.Toolbar || {};

L.Toolbar.Control = L.Toolbar.extend({

	statics: {
		baseClass: L.Toolbar.baseClass + ' leaflet-control-toolbar'
	},

	initialize: function(actions, options) {
		L.Toolbar.prototype.initialize.call(this, actions, options);

		this._leaflet_obj = new L.Control.Toolbar(this.options);
	},

	onAdd: function(map) {
		this._leaflet_obj.addTo(map);

		L.Toolbar.prototype.onAdd.call(this, map, this.getContainer());
	},

	onRemove: function(map) {
		map.removeLayer(this._leaflet_obj);
	},

	getContainer: function() {
		return this._leaflet_obj.getContainer();
	}
});

L.Control.Toolbar = L.Control.extend({
	onAdd: function() {
		return L.DomUtil.create('div', '');
	}
});