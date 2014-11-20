(function(window, document, undefined) {

"use strict";

L.ToolbarIcon = L.Class.extend({

	statics: {
		baseClass: 'leaflet-toolbar-icon'
	},

	options: {
		html: '',
		className: '',
		hideOnClick: false
	},

	initialize: function(options) {
		L.setOptions(this, options);
	},

	onAdd: function(toolbar, action, container, args) {
		var actionButton, link;

		actionButton = L.DomUtil.create('li', '', container);

		link = L.DomUtil.create('a', '', actionButton);
		link.innerHTML = this.options.html;
		link.setAttribute('href', '#');
		link.setAttribute('title', this.options.tooltip);

		/* TODO: Verify: does this.constructor work? */
		L.DomUtil.addClass(link, this.constructor.baseClass);
		if (this.options.className) {
			L.DomUtil.addClass(link, this.options.className);
		}

		L.DomEvent.on(link, 'click', action.enable, action);

		/* Add secondary toolbar */
		this._addSubToolbar(toolbar, action, actionButton, args);


	},

	_addSubToolbar: function(toolbar, action, container, args) {
		var subToolbar = action.options.subToolbar,
			addHooks = action.addHooks,
			removeHooks = action.removeHooks;

		if (subToolbar._actions.length > 0) {
			args.push(action);
			subToolbar.parentToolbar = toolbar;

			/* Modify action#addHooks to show the toolbar when the action is enabled. */
			action.addHooks = function() {
				subToolbar.show();
				addHooks.call(this);
			};

			/* Modify action#removeHooks to hide the toolbar when the action is disabled. */
			action.removeHooks = function() {
				removeHooks.call(this);
				subToolbar.hide();
			};

			subToolbar.addTo.apply(subToolbar, args);
			subToolbar.appendToContainer(container);
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
		filter: function() { return true; }
	},

	initialize: function(actions, options) {
		L.setOptions(this, options);
		this._actions = actions || [];
	},

	addTo: function(map) {
		this._arguments = [].slice.call(arguments);

		map.addLayer(this);
	},

	onAdd: function() {},

	appendToContainer: function(container) {
		var baseClass = this.constructor.baseClass + '-' + this._calculateDepth(),
			className = baseClass + ' ' + this.options.className,
			icon, action,
			i, l;

		this._container = container;
		this._ul = L.DomUtil.create('ul', className, container);

		l = this._actions.length;

		for (i = 0; i < l; i++) {
			action = this._actions[i].apply(undefined, this._arguments);
			icon = action.options.toolbarIcon;
			icon.onAdd(this, action, this._ul, this._arguments);
		}
	},

	hide: function() {
		this._ul.style.display = 'none';
	},

	show: function() {
		this._ul.style.display = 'block';
	},

	_calculateDepth: function() {
		var depth = 0,
			toolbar = this.parentToolbar;

		while (toolbar) {
			depth += 1;
			toolbar = toolbar.parentToolbar;
		}

		return depth;
	}
});

L.toolbar = function(actions) {
	return new L.Toolbar(actions);
};
L.ToolbarGroup = L.Toolbar.extend({});
L.Toolbar = L.Toolbar || {};

L.Toolbar.Control = L.Toolbar.extend({

	statics: {
		baseClass: 'leaflet-control-toolbar ' + L.Toolbar.baseClass
	},

	initialize: function(actions, options) {
		L.Toolbar.prototype.initialize.call(this, actions, options);

		this._control = new L.Control.Toolbar(this.options);
	},

	onAdd: function(map) {
		this._control.addTo(map);

		this.appendToContainer(this._control.getContainer());
	},

	onRemove: function(map) {
		map.removeLayer(this._control);
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
		baseClass: 'leaflet-popup-toolbar ' + L.Toolbar.baseClass
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

		this.appendToContainer(this._marker._icon);

		L.DomEvent.on(this._container, 'click', function(event) {
			L.DomEvent.stopPropagation(event);
			map.removeLayer(this);
		}, this);

		this._setStyles();
	},

	onRemove: function(map) {
		map.removeLayer(this._marker);

		delete this._map;
	},

	setLatLng: function(latlng) {
		this._marker.setLatLng(latlng);

		return this;
	},

	_setStyles: function() {
		var container = this._container,
			toolbar = this._ul,
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