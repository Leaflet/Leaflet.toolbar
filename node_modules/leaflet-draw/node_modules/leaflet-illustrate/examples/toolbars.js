L.Draw.DrawToolbar = L.Toolbar.Control.extend({
	actions: function(map) { 
		return [
			new L.Draw.Polyline(map, {
				toolbarIcon: new L.ToolbarIcon({ className: 'leaflet-draw-polyline' })
			}),

			new L.Draw.Polygon(map, {
				toolbarIcon: new L.ToolbarIcon({ className: 'leaflet-draw-polygon' })
			})
		];
	}
});

L.Draw.Edit = L.EditToolbar.Edit.extend({
	options: {},

	initialize: function(map, options) {
		L.setOptions(this, options);
		L.EditToolbar.Edit.prototype.initialize.call(this, map, options);
	}
});

L.Draw.Delete = L.Handler.extend({
	initialize: function(map, options) {
		L.setOptions(this, options);
	},

	enable: function() {
		map.removeLayer(this.options.feature);
	}
});

L.Draw.EditToolbar = L.Toolbar.Popup.extend({
	actions: function(map, shape) {
		return [
			new L.Draw.Edit(map, { 
				featureGroup: new L.FeatureGroup().addLayer(shape),
				toolbarIcon: new L.ToolbarIcon({ className: 'leaflet-draw-edit-edit' })
			}),

			new L.Draw.Delete(map, {
				feature: shape,
				toolbarIcon: new L.ToolbarIcon({ className: 'leaflet-draw-edit-remove' })
			})
		];
	}
});