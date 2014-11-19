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

	onAdd: function(action, container, args) {
		var actionButton, link,
			subToolbar = action.options.subToolbar;

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
		args.push(action);
		subToolbar.addTo.apply(subToolbar, args);
		subToolbar.appendToContainer(container);
	}
});

L.toolbarIcon = function(options) {
	return new L.ToolbarIcon(options);
};