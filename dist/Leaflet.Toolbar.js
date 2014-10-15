(function(window, document, undefined) {

"use strict";

L.ToolbarAction = L.Class.extend({
	
	options: {
		className: 'leaflet-toolbar-action',
		html: ''
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
L.Toolbar = L.Class.extend({
	
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

	_initToolbarContainer: function() {
		var className = 'leaflet-toolbar ' + this.options.className,
			tmp = L.DomUtil.create('div'),
			container = L.DomUtil.create('ul', className, tmp),
			action,
			actionButton, link;

		/* TODO: Is it a problem that the order of toolbar actions will not be guaranteed? */
		for (var actionName in this._actions) {
			if (this._actions.hasOwnProperty(actionName)) {
				action = this._actions[actionName];

				actionButton = L.DomUtil.create('li', 'leaflet-toolbar-action', container);
				L.DomUtil.addClass(actionButton, action.options.className);

				link = L.DomUtil.create('a', '', actionButton);
				link.innerHTML = action.options.html;
				link.setAttribute('href', '#');
				link.setAttribute('data-leaflet-toolbar-action', actionName);

			}
		}

		this._htmlString = tmp.innerHTML;
	},

	attachHandlers: function(domNode) {
		var actionButtons = domNode.querySelectorAll('.leaflet-toolbar-action a'),
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

		console.log(event.target);

		action.trigger(this._arguments);
	}

});

L.toolbar = function(actions) {
	return new L.Toolbar(actions);
};
L.ToolbarGroup = L.Toolbar.extend({});
L.Toolbar = L.Toolbar || {};

L.Toolbar.Control = L.Toolbar.extend({
	initialize: function(actions, options) {
		L.Toolbar.prototype.initialize.call(this, actions, options);

		this._container = new L.Control.Toolbar(options);
	},

	onAdd: function(map) {
		var toolbar = this.getHTML();

		this._container
			.addTo(map)
			.setContent(toolbar);

		this.attachHandlers(this._container.getContainer().childNodes[0]);
	},

	onRemove: function(map) {
		map.removeLayer(this._container);
	}
});

L.Control.Toolbar = L.Control.extend({
	onAdd: function() {
		return L.DomUtil.create('div', 'leaflet-control-toolbar');
	},

	setContent: function(html) {
		var container = this.getContainer();

		if (typeof html === 'string') {
			container.innerHTML = html;
		} else {
			container.appendChild(html);
		}

		return this;
	}
});
// A convenience class for built-in popup toolbars.

L.Toolbar = L.Toolbar || {};

L.Toolbar.Popup = L.Toolbar.extend({

	initialize: function(latlng, actions, options) {
		L.Toolbar.prototype.initialize.call(this, actions, options);

		var	toolbarOptions = L.extend(this.options, {
				icon: new L.DivIcon({
					html: this.getHTML(),
					className: this.options.className
				})
			});

		this._container = new L.Marker(latlng, toolbarOptions);
	},

	onAdd: function(map) {
		this._map = map;

		this._container.addTo(map);

		this.attachHandlers(this._container._icon);
	},

	onRemove: function() {
		// TODO

		delete this._map;
	},

	setLatLng: function(latlng) {
		this._container.setLatLng(latlng);

		return this;
	}
	
});

}(window, document));