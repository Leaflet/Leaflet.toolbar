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

			args = [].slice.call(args);
			args.push(action);
			
			subToolbar.parentToolbar = toolbar;

			subToolbar.addTo.apply(subToolbar, args);
			subToolbar.appendToContainer(container);
		}
	}
});

L.toolbarIcon = function(options) {
	return new L.ToolbarIcon(options);
};