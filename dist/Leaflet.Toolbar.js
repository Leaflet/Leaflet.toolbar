(function(window, document, undefined) {

"use strict";

L.ToolbarAction = L.Class.extend({
	
	options: {
		className: 'leaflet-toolbar-action',
		html: '',
		tooltip: '',
		secondaryActions: []
	},

	initialize: function(action, options) {
		if (options && options.className) {
			options.className = this.options.className + ' ' + options.className;
		}
		L.setOptions(this, options);

		this._action = action;
	},

	_addButton: function(container, actionName) {
		var actionButton, link;

		actionButton = L.DomUtil.create('li', '', container);

		link = L.DomUtil.create('a', '', actionButton);
		link.innerHTML = this.options.html;
		link.setAttribute('href', '#');
		link.setAttribute('data-leaflet-toolbar-action', actionName); // TODO: Remove this
		link.setAttribute('title', this.options.tooltip);

		L.DomUtil.addClass(link, 'leaflet-toolbar-action');
		L.DomUtil.addClass(link, this.options.className);
	},

	_onClick: function(event) {
		L.DomEvent.stopPropagation(event);

		this._context = {};
		this._action.apply(this._context, this._arguments);
	},

	_attachHandler: function(button, args) {
		this._arguments = args;
		L.DomEvent.on(button, 'click', this._onClick, this);
	},

	_attachSecondaryHandlers: function() {

	},

	_addSecondaryActions: function(container) {
		var l = this.options.secondaryActions.length,
			secondaryActions = L.DomUtil.create('ul', container);

		L.DomUtil.addClass(secondaryActions, 'leaflet-toolbar-secondary');

		for (var i = 0; i < l; i++) {
			L.DomUtil.create('li', '', secondaryActions);
		}
	}

});

L.toolbarAction = function(action, options) {
	return new L.ToolbarAction(action, options);
};
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
L.ToolbarGroup = L.Toolbar.extend({});
L.Toolbar = L.Toolbar || {};

L.Toolbar.Control = L.Toolbar.extend({

	statics: {
		baseClass: L.Toolbar.baseClass + ' leaflet-control-toolbar'
	},

	initialize: function(actions, options) {
		L.Toolbar.prototype.initialize.call(this, actions, options);

		this._container = new L.Control.Toolbar(options);
	},

	onAdd: function(map) {
		this._container.addTo(map);

		L.Toolbar.prototype.onAdd.call(this, map, this._container.getContainer());
	},

	onRemove: function(map) {
		map.removeLayer(this._container);
	}
});

L.Control.Toolbar = L.Control.extend({
	onAdd: function() {
		return L.DomUtil.create('div', '');
	}
});
// A convenience class for built-in popup toolbars.

L.Toolbar = L.Toolbar || {};

L.Toolbar.Popup = L.Toolbar.extend({

	statics: {
		baseClass: L.Toolbar.baseClass + ' leaflet-popup-toolbar'
	},

	initialize: function(latlng, actions, options) {
		L.Toolbar.prototype.initialize.call(this, actions, options);

		var	toolbarOptions = L.extend(this.options, {
				icon: new L.DivIcon({
					html: '',
					className: this.options.className
				})
			});

		this._marker = new L.Marker(latlng, toolbarOptions);
	},

	onAdd: function(map) {
		this._map = map;
		this._marker.addTo(map);

		map.on('click', function() {
			map.removeLayer(this);
		});

		L.Toolbar.prototype.onAdd.call(this, map, this._marker._icon);

		this._setStyles();
	},

	onRemove: function(map) {
		map.removeLayer(this._container);

		delete this._map;
	},

	setLatLng: function(latlng) {
		this._container.setLatLng(latlng);

		return this;
	},

	_onClick: function(event) {
		L.Toolbar.prototype._onClick.call(this, event);

		this._map.removeLayer(this);
	},

	_setStyles: function() {
		var container = this._getContainer(),
			toolbar = container.querySelectorAll('.leaflet-toolbar')[0],
			buttons = container.querySelectorAll('.leaflet-toolbar-action'),
			buttonHeights = [],
			toolbarWidth = 0,
			toolbarHeight,
			tipSize,
			anchor;

		/* Calculate the dimensions of the toolbar. */
		for (var i = 0, l = buttons.length; i < l; i++) {
			buttonHeights.push(parseInt(L.DomUtil.getStyle(buttons[i], 'height'), 10));
			toolbarWidth += parseInt(L.DomUtil.getStyle(buttons[i], 'width'), 10);
		}
		toolbar.style.width = toolbarWidth + 'px';

		/* Create and place the toolbar tip. */
		this._tipContainer = L.DomUtil.create('div', 'leaflet-toolbar-tip-container', container);
		this._tipContainer.style.width = toolbarWidth + 'px';

		this._tip = L.DomUtil.create('div', 'leaflet-toolbar-tip', this._tipContainer);

		/* Set the anchor point. */
		toolbarHeight = Math.max.apply(undefined, buttonHeights);
		tipSize = parseInt(L.DomUtil.getStyle(this._tip, 'width'), 10);

		anchor = new L.Point(toolbarWidth/2, toolbarHeight + 0.7071*tipSize);

		container.style.marginLeft = (-anchor.x) + 'px';
		container.style.marginTop = (-anchor.y) + 'px';
	},

	_getContainer: function() {
		return this._marker._icon;
	}
});

}(window, document));