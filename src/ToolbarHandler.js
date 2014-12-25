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
}