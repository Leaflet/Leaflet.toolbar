L.ColorPicker = L.ToolbarHandler.extend({
	options: {
		toolbarIcon: new L.ToolbarIcon({ className: 'leaflet-color-picker', html: '<span class="fa fa-eyedropper"></span>' })
	},

	initialize: function(map, options) {
		L.setOptions(this, options);
		L.ToolbarHandler.prototype.initialize.call(this, map, options);
	}
});

L.Edit.Color = L.ToolbarHandler.extend({
	options: {
		toolbarIcon: new L.ToolbarIcon({ className: 'leaflet-color-swatch' })
	},

	initialize: function(map, shape, options) {
		this._shape = shape;

		L.setOptions(this, options);
		L.ToolbarHandler.prototype.initialize.call(this, map, options);
	},

	addHooks: function() {
		L.ToolbarHandler.prototype.addHooks.call(this);

		this._shape.setStyle({ color: this.options.color });
		this.disable();
	}
});