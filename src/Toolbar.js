L.Toolbar = L.Class.extend({
	
	statics: {
		baseClass: 'leaflet-toolbar'
	},

	options: {
		className: '',
		filter: function() { return true; }
	},

	initialize: function(actions, options) {
		L.setOptions(this, options);

		this._actions = actions;
	},

	addTo: function(map) {
		this._arguments = [].slice.call(arguments);

		map.addLayer(this);
	},

	onAdd: function(map, container) {
		var className = this.constructor.baseClass + ' ' + this.options.className,
			toolbarContainer = L.DomUtil.create('ul', className, container),
			action;

		/* TODO: Is it a problem that the order of toolbar actions will not be guaranteed? */
		for (var actionName in this._actions) {
			if (this._actions.hasOwnProperty(actionName)) {
				action = this._actions[actionName];
				action._addButton(toolbarContainer, actionName);
			}
		}
	},

	/* TODO: Move this functionality into L.ToolbarAction*/
	attachHandlers: function(container) {
		var actionButtons = container.querySelectorAll('a.leaflet-toolbar-action'),
			l = actionButtons.length,
			actionName,
			action, i;

		for (i = 0; i < l; i++) {
			actionName = actionButtons[i].getAttribute('data-leaflet-toolbar-action');
			action = this._actions[actionName];

			action._attachHandler(actionButtons[i], this._arguments);
		}
	}

});

L.toolbar = function(actions) {
	return new L.Toolbar(actions);
};