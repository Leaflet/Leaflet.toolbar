(function(window, document, undefined) {

"use strict";

L.ToolbarIcon = L.Class.extend({

	statics: {
		baseClass: 'leaflet-toolbar-icon',
		baseClassSecondary: 'leaflet-toolbar-secondary'
	},

	options: {
		html: '',
		className: '',
		hideOnClick: false
	},

	initialize: function(options) {
		L.setOptions(this, options);
	},

	onAdd: function(action, container) {
		var actionButton, link,
			childActions = action.options.childActions,
			childIcon,
			childActionContainer;

		actionButton = L.DomUtil.create('li', '', container);

		link = L.DomUtil.create('a', '', actionButton);
		link.innerHTML = this.options.html;
		link.setAttribute('href', '#');
		link.setAttribute('title', this.options.tooltip);

		L.DomUtil.addClass(link, this.constructor.baseClass);
		if (this.options.className) {
			L.DomUtil.addClass(link, this.options.className);
		}

		L.DomEvent.on(link, 'click', action.enable, action);

		/* Add child actions. */
		childActionContainer = L.DomUtil.create('ul', this.constructor.baseClassSecondary, actionButton);

		for (var i = 0, l = childActions.length; i < l; i++) {
			childIcon = childActions[i].options.toolbarIcon;
			childIcon.onAdd(childActions[i], childActionContainer);
		}
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

		L.DomEvent.on(this.getContainer(), 'click', function(event) {
			L.DomEvent.stopPropagation(event);
			map.removeLayer(this);
		}, this);

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

	_setStyles: function() {
		var container = this.getContainer(),
			toolbar = container.querySelectorAll('.leaflet-toolbar')[0],
			icons = container.querySelectorAll('.leaflet-toolbar-icon'),
			buttonHeights = [],
			toolbarWidth = 0,
			toolbarHeight,
			tipSize,
			anchor;

		/* Calculate the dimensions of the toolbar. */
		for (var i = 0, l = icons.length; i < l; i++) {
			buttonHeights.push(parseInt(L.DomUtil.getStyle(icons[i], 'height'), 10));
			toolbarWidth += Math.ceil(parseFloat(L.DomUtil.getStyle(icons[i], 'width')));
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