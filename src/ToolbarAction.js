L.ToolbarAction = L.Handler.extend({
	statics: {
		baseClass: 'leaflet-toolbar-icon'
	},

	options: {
		html: '',
		className: '',
		tooltip: '',
		subToolbar: new L.Toolbar()
	},

	initialize: function(options) {
		L.setOptions(this, options);

		// Retrocompat.
		L.setOptions(this, this.options.toolbarIcon);
		// End retrocompat.
	},

	addHooks: function () {
		if (this.options.onEnable) {
			this.options.onEnable.call(this);
		}
	},

	removeHooks: function () {
		if (this.options.onDisable) {
			this.options.onDisable.call(this);
		}
	},

	_createIcon: function(toolbar, container, args) {

		this.toolbar = toolbar;
		this._icon = L.DomUtil.create('li', '', container);
		this._link = L.DomUtil.create('a', '', this._icon);

		this._link.innerHTML = this.options.html;
		this._link.setAttribute('href', '#');
		this._link.setAttribute('title', this.options.tooltip);

		L.DomUtil.addClass(this._link, this.constructor.baseClass);
		if (this.options.className) {
			L.DomUtil.addClass(this._link, this.options.className);
		}

		L.DomEvent.on(this._link, 'click', this.enable, this);

		/* Add secondary toolbar */
		this._addSubToolbar(toolbar, this._icon, args);
	},

	_addSubToolbar: function(toolbar, container, args) {
		var subToolbar = this.options.subToolbar,
			addHooks = this.addHooks,
			removeHooks = this.removeHooks;

		/* For calculating the nesting depth. */
		subToolbar.parentToolbar = toolbar;

		if (subToolbar.options.actions.length > 0) {
			/* Make a copy of args so as not to pollute the args array used by other actions. */
			args = [].slice.call(args);
			args.push(this);

			subToolbar.addTo.apply(subToolbar, args);
			subToolbar.appendToContainer(container);

			this.addHooks = function(map) {
				if (typeof addHooks === 'function') { addHooks.call(this, map); }
				subToolbar._show();
			};

			this.removeHooks = function(map) {
				if (typeof removeHooks === 'function') { removeHooks.call(this, map); }
				subToolbar._hide();
			};
		}
	}
});

L.toolbarAction = function toolbarAction(options) {
	return new L.ToolbarAction(options);
};

L.ToolbarAction.extendOptions = function(options) {
	return this.extend({ options: options });
};

L.Toolbar.mergeOptions({
	toolbarActionClass: L.ToolbarAction
});
