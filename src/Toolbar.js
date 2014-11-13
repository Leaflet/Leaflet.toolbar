L.Toolbar = L.Class.extend({
	
	statics: {
		baseClass: 'leaflet-toolbar'
	},

	includes: [L.Mixin.Events],

	options: {
		className: '',
		filter: function() { return true; },
		parameters: function() { return arguments; }
	},

	initialize: function(options) {
		L.setOptions(this, options);
	},

	addTo: function(map) {
		this._arguments = [].slice.call(arguments);

		map.addLayer(this);
	},

	onAdd: function() {
		var className = this.constructor.baseClass + ' ' + this.options.className,
			toolbarContainer = L.DomUtil.create('ul', className, this.getContainer()),
			icon, i, l;

		this._actions = this.actions.apply(undefined, this._arguments);
		l = this._actions.length;

		for (i = 0; i < l; i++) {
			icon = this._actions[i].options.toolbarIcon || new L.ToolbarIcon();
			icon.onAdd(toolbarContainer, this._actions[i]);
		}
	},

	actions: function() {
		return [];
	}
});

L.toolbar = function(actions) {
	return new L.Toolbar(actions);
};