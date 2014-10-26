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

		this._initToolbarContainer();
	},

	addTo: function(map) {
		this._arguments = [].slice.call(arguments);

		map.addLayer(this);
	},

	onAdd: function() {},

	_initToolbarContainer: function() {
		var className = this.constructor.baseClass + ' ' + this.options.className,
			tmp = L.DomUtil.create('div'),
			container = L.DomUtil.create('ul', className, tmp),
			action,
			actionButton, link;

		/* TODO: Is it a problem that the order of toolbar actions will not be guaranteed? */
		for (var actionName in this._actions) {
			if (this._actions.hasOwnProperty(actionName)) {
				action = this._actions[actionName];

				actionButton = L.DomUtil.create('li', '', container);

				link = L.DomUtil.create('a', '', actionButton);
				link.innerHTML = action.options.html;
				link.setAttribute('href', '#');
				link.setAttribute('data-leaflet-toolbar-action', actionName);
				link.setAttribute('title', action.options.tooltip);

				L.DomUtil.addClass(link, 'leaflet-toolbar-action');
				L.DomUtil.addClass(link, action.options.className);

			}
		}

		this._htmlString = tmp.innerHTML;
	},

	attachHandlers: function(domNode) {
		var actionButtons = domNode.querySelectorAll('a.leaflet-toolbar-action'),
			i, l;

		for (i = 0, l = actionButtons.length; i < l; i++) {
			L.DomEvent.on(actionButtons[i], 'click', this._onClick, this);
		}
	},

	getHTML: function() {
		return this._htmlString;
	},

	_onClick: function(event) {
		var icon = event.target,
			actionName = icon.getAttribute('data-leaflet-toolbar-action'),
			action = this._actions[actionName];

		L.DomEvent.stopPropagation(event);

		action.trigger(this._arguments);
	}

});

L.toolbar = function(actions) {
	return new L.Toolbar(actions);
};