L.Draw.DRAWTOOLBAR = [
	function(map) {
		return new L.Draw.Polyline(map, {
			toolbarIcon: new L.ToolbarIcon({ className: 'leaflet-draw-polyline' })
		});
	},
	function(map) {
		return new L.Draw.Polygon(map, {
			toolbarIcon: new L.ToolbarIcon({ className: 'leaflet-draw-polygon' })
		});
	}
];

L.Draw.Edit = L.EditToolbar.Edit.extend({
	enable: function() {
		L.EditToolbar.Edit.prototype.enable.call(this);
		
		this._map.on('click', function() {
			this.disable();
		}, this);
	}
});

L.Draw.Delete = L.ToolbarHandler.extend({
	initialize: function(map, options) {
		L.setOptions(this, options);
	},

	enable: function() {
		map.removeLayer(this.options.feature);
	}
});

L.Draw.EDITTOOLBAR = [
	function(map, shape) {
		return new L.Draw.Edit(map, { 
			featureGroup: new L.FeatureGroup().addLayer(shape),
			toolbarIcon: new L.ToolbarIcon({ className: 'leaflet-draw-edit-edit' })
		});
	},
	function(map, shape) {
		return new L.Draw.Delete(map, {
			feature: shape,
			toolbarIcon: new L.ToolbarIcon({ className: 'leaflet-draw-edit-remove' })
		});
	}
];