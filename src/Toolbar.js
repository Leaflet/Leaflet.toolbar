L.Toolbar = L.Class.extend({
	
	options: {
		className: '',
		filter: function() { return true; }
	},

	initialize: function(actions, options) {
		var i, l, id;

		L.setOptions(this, options);

		/* Add toolbar actions to an actions object. */
		for (i = 0, l = actions.length; i < l; i++) {
			id = L.stamp(actions[i]);
			this._actions[id] = actions[i];
		}

		this._initToolbarContainer();
	},

	addTo: function(map) {
		this._arguments = [].slice.call(arguments);

		map.addLayer(this);
	},

	_initToolbarContainer: function() {
		var className = 'leaflet-toolbar ' + this.options.className,
			tmp = L.DomUtil.create('div'),
			container = L.DomUtil.create('ul', className, tmp),
			actionButton;

		for (var id in this._actions) {
			if (this._actions.hasOwnProperty(id)) {
				actionButton = L.DomUtil.create('li', 'leaflet-toolbar-action', container);
				actionButton.setAttribute('data-leaflet-toolbar-action', id);
			}
		}

		this._htmlString = tmp.innerHTML;
	},

	attachHandlers: function(domNode) {
		var actionContainers = domNode.childNodes,
			id,
			i, l;

		for (i = 0, l = actionContainers.length; i < l; i++) {
			id = actionContainers[i].getAttribute('data-leaflet-toolbar-action');
			L.DomUtil.on(actionContainers[i], 'click', this._actions[id], undefined);
		}
	},

	getHTML: function() {
		return this._htmlString;
	},

	_onClick: function(event) {
		var icon = event.target,
			action = icon._action;

		action.trigger(this._arguments);
	}

});

L.toolbar = function(actions) {
	return new L.Toolbar(actions);
};