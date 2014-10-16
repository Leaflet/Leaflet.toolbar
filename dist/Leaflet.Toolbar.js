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
		baseClassName: 'leaflet-toolbar',
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
		var className = this.options.baseClassName + ' ' + this.options.className,
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

	options: {
		baseClassName: L.Toolbar.prototype.options.baseClassName + ' leaflet-control-toolbar'
	},

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
		return L.DomUtil.create('div', '');
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

	options: {
		baseClassName: L.Toolbar.prototype.options.baseClassName + ' leaflet-popup-toolbar',
	},

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

		this._setStyles();

		this.attachHandlers(this._container._icon);
	},

	onRemove: function() {
		// TODO

		delete this._map;
	},

	setLatLng: function(latlng) {
		this._container.setLatLng(latlng);

		return this;
	},

	_getToolbarActionWidth: function() {
		// var mockToolbar = L.DomUtil.create('ul', 'leaflet-toolbar'),
		// 	mockToolbarAction = L.DomUtil.create('a', 'leaflet-toolbar-action', mockToolbar);

		// TODO: Figure out why this isn't returning a value.
		// return L.DomUtil.getStyle(mockToolbarAction, 'width');
		return 26;
	},

	_setStyles: function() {
		var toolbar = this._container._icon.querySelectorAll('.leaflet-toolbar')[0],
			actionWidth = this._getToolbarActionWidth(),
			anchor;

		toolbar.style.width = Object.keys(this._actions).length*actionWidth + 'px';

		anchor = new L.Point(Object.keys(this._actions).length*actionWidth/2, actionWidth);
		this._container._icon.style.marginLeft = (-anchor.x) + 'px';
		this._container._icon.style.marginTop = (-anchor.y) + 'px';
	}
	
});

}(window, document));