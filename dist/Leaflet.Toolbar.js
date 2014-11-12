(function(window, document, undefined) {

"use strict";

L.ToolbarIcon = L.Class.extend({
	options: {
		html: '',
		className: ''
	},

	initialize: function(options) {
		L.setOptions(this, options);
	},

	onAdd: function(container, action) {
		var actionButton, link;

		actionButton = L.DomUtil.create('li', '', container);

		link = L.DomUtil.create('a', '', actionButton);
		link.innerHTML = this.options.html;
		link.setAttribute('href', '#');
		link.setAttribute('title', this.options.tooltip);

		L.DomUtil.addClass(link, 'leaflet-toolbar-icon');
		if (this.options.className) {
			L.DomUtil.addClass(link, this.options.className);
		}

		L.DomEvent.on(link, 'click', action.enable, action);
	}
});

L.toolbarIcon = function(options) {
	return new L.ToolbarIcon(options);
};
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
			actions = this.actions.apply(undefined, this._arguments),
			l = actions.length,
			icon,
			i;

		for (i = 0; i < l; i++) {
			icon = actions[i].options.toolbarIcon || new L.ToolbarIcon();
			icon.onAdd(toolbarContainer, actions[i]);
		}
	},

	actions: function() {
		return [];
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

		this._leaflet_obj = new L.Control.Toolbar(this.options);
	},

	onAdd: function(map) {
		this._leaflet_obj.addTo(map);

		L.Toolbar.prototype.onAdd.call(this, map, this.getContainer());
	},

	onRemove: function(map) {
		map.removeLayer(this._leaflet_obj);
	},

	getContainer: function() {
		return this._leaflet_obj.getContainer();
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

		this._leaflet_obj = new L.Marker(latlng, toolbarOptions);
	},

	onAdd: function(map) {
		this._map = map;
		this._leaflet_obj.addTo(map);

		map.on('click', function() {
			map.removeLayer(this);
		});

		L.Toolbar.prototype.onAdd.call(this, map, this.getContainer());

		this._setStyles();
	},

	onRemove: function(map) {
		map.removeLayer(this._leaflet_obj);

		delete this._map;
	},

	setLatLng: function(latlng) {
		this._leaflet_obj.setLatLng(latlng);

		return this;
	},

	getContainer: function() {
		return this._map ? this._leaflet_obj._icon : undefined;
	},

	_onClick: function(event) {
		L.Toolbar.prototype._onClick.call(this, event);
		this._map.removeLayer(this);
	},

	_setStyles: function() {
		var container = this.getContainer(),
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
	}
});

}(window, document));