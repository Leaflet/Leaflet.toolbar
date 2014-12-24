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
		var iconOptions = this.options.toolbarIcon,
			actionButton, link;

		this.toolbar = toolbar;

		actionButton = L.DomUtil.create('li', '', container);

		link = L.DomUtil.create('a', '', actionButton);
		link.innerHTML = iconOptions.html;
		link.setAttribute('href', '#');
		link.setAttribute('title', iconOptions.tooltip);

		L.DomUtil.addClass(link, this.constructor.baseClass);
		if (iconOptions.className) {
			L.DomUtil.addClass(link, iconOptions.className);
		}

		L.DomEvent.on(link, 'click', this.enable, this);

		/* Add secondary toolbar */
		this._addSubToolbar(toolbar, actionButton, args);
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