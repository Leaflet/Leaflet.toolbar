(function(window, document, undefined) {

"use strict";

L.Toolbar = L.Class.extend({
	statics: {
		baseClass: 'leaflet-toolbar'
	},

	includes: L.Mixin.Events,

	options: {
		className: '',
		filter: function() { return true; },
		actions: {}
	},

	initialize: function(actions, options) {
		L.setOptions(this, options);

		/* So that this can be called without an arguments to create an empty toolbar: new L.Toolbar() */
		this._actions = actions || [];
	},

	addTo: function(map) {
		this._arguments = [].slice.call(arguments);

		map.addLayer(this);

		return this;
	},

	onAdd: function() {},

	appendToContainer: function(container) {
		var baseClass = this.constructor.baseClass + '-' + this._calculateDepth(),
			className = baseClass + ' ' + this.options.className,
			Action, action,
			i, l;

		this._container = container;
		this._ul = L.DomUtil.create('ul', className, container);

		l = this._actions.length;

		for (i = 0; i < l; i++) {
			Action = this._createHandler(this._actions[i]);

			action = new Action();
			action._createIcon(this, this._ul, this._arguments);
		}
	},

	_createHandler: function(Handler) {
		var args = this._arguments,
			type = Handler.prototype.type,
			options = this.options.actions[type] ? this.options.actions[type] : {},

			H = Handler.extend({
				options: L.extend({}, Handler.prototype.options, options),
				initialize: function() {
					Handler.prototype.initialize.apply(this, args);
				}
			});

		return H;
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
L.ToolbarHandler = L.Handler.extend({
	statics: {
		baseClass: 'leaflet-toolbar-icon'
	},

	options: {
		toolbarIcon: {
			html: '',
			className: '',
			hideOnClick: false,
			tooltip: ''
		},
		subToolbar: new L.Toolbar()
	},

	initialize: function(map, options) {
		var defaultIconOptions = L.ToolbarHandler.prototype.options.toolbarIcon;

		L.setOptions(this, options);
		this.options.toolbarIcon = L.extend({}, defaultIconOptions, this.options.toolbarIcon);

		L.Handler.prototype.initialize.call(this, map);
	},

	enable: function() {
		var subToolbar = this.options.subToolbar;

		L.Handler.prototype.enable.call(this);

		/* Ensure that only one action in a toolbar will be active at a time. */
		if (this.toolbar._active) { this.toolbar._active.disable(); }
		this.toolbar._active = this;

		if (subToolbar._actions.length > 0) {
			subToolbar.show();
		}
	},

	disable: function() {
		var subToolbar = this.options.subToolbar;

		L.Handler.prototype.disable.call(this);

		if (subToolbar._actions.length > 0) {
			subToolbar.hide();
		}
	},

	addHooks: function() {},
	
	removeHooks: function() {},

	_createIcon: function(toolbar, container, args) {
		var iconOptions = this.options.toolbarIcon;

		this.toolbar = toolbar;
		this._icon = L.DomUtil.create('li', '', container);
		this._link = L.DomUtil.create('a', '', this._icon);

		this._link.innerHTML = iconOptions.html;
		this._link.setAttribute('href', '#');
		this._link.setAttribute('title', iconOptions.tooltip);

		L.DomUtil.addClass(this._link, this.constructor.baseClass);
		if (iconOptions.className) {
			L.DomUtil.addClass(this._link, iconOptions.className);
		}

		L.DomEvent.on(this._link, 'click', this.enable, this);

		/* Add secondary toolbar */
		this._addSubToolbar(toolbar, this._icon, args);
	},

	_addSubToolbar: function(toolbar, container, args) {
		var subToolbar = this.options.subToolbar;

		/* For calculating the nesting depth. */
		subToolbar.parentToolbar = toolbar;

		if (subToolbar._actions.length > 0) {
			/* Make a copy of args so as not to pollute the args array used by other actions. */
			args = [].slice.call(args);
			args.push(this);
			
			subToolbar.addTo.apply(subToolbar, args);
			subToolbar.appendToContainer(container);
		}
	}
});

L.ToolbarHandler.extendOptions = function(options) {
	this.extend({ options: options });
};
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

		L.DomEvent.on(this._ul, 'click', L.DomEvent.stopPropagation);

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
			icons = toolbar.querySelectorAll('.leaflet-toolbar-icon'),
			buttonHeights = [],
			toolbarWidth = 0,
			toolbarHeight,
			tipSize,
			anchor;

		/* Calculate the dimensions of the toolbar. */
		for (var i = 0, l = icons.length; i < l; i++) {
			if (icons[i].parentNode.parentNode === toolbar) {
				buttonHeights.push(parseInt(L.DomUtil.getStyle(icons[i], 'height'), 10));
				toolbarWidth += Math.ceil(parseFloat(L.DomUtil.getStyle(icons[i], 'width')));
			}
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

})(window, document);