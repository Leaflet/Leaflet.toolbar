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

	initialize: function(actions, options) {
		L.setOptions(this, options);
		this._actions = actions;
	},

	addTo: function(map) {
		this._arguments = [].slice.call(arguments);

		map.addLayer(this);
	},

	/* TODO: Each toolbar icon should have a property pointing back to the toolbar (mostly for nested toolbars) */
	onAdd: function() {
		var className = this.constructor.baseClass + ' ' + this.options.className,
			toolbarContainer = L.DomUtil.create('ul', className, this.getContainer()),
			icon, action,
			i, l;

		l = this._actions.length;

		for (i = 0; i < l; i++) {
			action = this._actions[i].apply(undefined, this._arguments);
			icon = action.options.toolbarIcon;
			icon.onAdd(action, toolbarContainer);
		}
	}
});

L.toolbar = function(actions) {
	return new L.Toolbar(actions);
};