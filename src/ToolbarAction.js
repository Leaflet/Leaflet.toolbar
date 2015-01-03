L.ToolbarAction = L.Handler.extend({
	statics: {
		baseClass: 'leaflet-toolbar-icon'
	},

	options: {
		toolbarIcon: {
			html: '',
			className: '',
			tooltip: ''
		},
		subToolbar: new L.Toolbar()
	},

	initialize: function(options) {
		var defaultIconOptions = L.ToolbarAction.prototype.options.toolbarIcon;

		L.setOptions(this, options);
		this.options.toolbarIcon = L.extend({}, defaultIconOptions, this.options.toolbarIcon);
	},

	enable: function() {
		var subToolbar = this.options.subToolbar;

		if (this._enabled) { return; }
		this._enabled = true;

		if (this.addHooks) { this.addHooks(); }

		if (subToolbar.options.actions.length > 0) {
			subToolbar._show();
		}
	},

	disable: function() {
		var subToolbar = this.options.subToolbar;

		if (!this._enabled) { return; }
		this._enabled = false;

		if (this.removeHooks) { this.removeHooks(); }

		if (subToolbar.options.actions.length > 0) {
			subToolbar._hide();
		}
	},

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

		if (subToolbar.options.actions.length > 0) {
			/* Make a copy of args so as not to pollute the args array used by other actions. */
			args = [].slice.call(args);
			args.push(this);
			
			subToolbar.addTo.apply(subToolbar, args);
			subToolbar.appendToContainer(container);
		}
	}
});

L.ToolbarAction.extendOptions = function(options) {
	return this.extend({ options: options });
};