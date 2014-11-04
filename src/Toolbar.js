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
		var args = [].slice.call(arguments);

		this._arguments = this.options.parameters.apply(undefined, args);

		map.addLayer(this);
	},

	onAdd: function(map, container) {
		var className = this.constructor.baseClass + ' ' + this.options.className,
			toolbarContainer = L.DomUtil.create('ul', className, container),
			action, button;

		/* TODO: Is it a problem that the order of toolbar actions will not be guaranteed? */
		for (var actionName in this._actions) {
			if (this._actions.hasOwnProperty(actionName)) {
				action = this._actions[actionName];

				if (this.options.filter(action)) {
					action.setArguments(this._arguments);
					
					button = action._addButton(toolbarContainer, actionName);

					/* Fire toolbar-wide events on click. */
					L.DomEvent.on(button, 'click', this._onClick, this);
				}
			}
		}
	},

	_onClick: function(event) {
		L.DomEvent.stopPropagation(event);
	}
});

L.toolbar = function(actions) {
	return new L.Toolbar(actions);
};