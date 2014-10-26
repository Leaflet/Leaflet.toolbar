L.ToolbarAction = L.Class.extend({
	
	options: {
		className: 'leaflet-toolbar-action',
		html: '',
		tooltip: ''
	},

	initialize: function(action, options) {
		if (options && options.className) {
			options.className = this.options.className + ' ' + options.className;
		}
		L.setOptions(this, options);

		this._action = action;
	},

	trigger: function(args) {
		this._action.apply(undefined, args);
	}

});