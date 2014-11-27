L.ToolbarIcon = L.Class.extend({

	statics: {
		baseClass: 'leaflet-toolbar-icon'
	},

	options: {
		html: '',
		className: '',
		hideOnClick: false,
		tooltip: ''
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

		L.DomUtil.addClass(link, this.constructor.baseClass);
		if (this.options.className) {
			L.DomUtil.addClass(link, this.options.className);
		}

		L.DomEvent.on(link, 'click', action.enable, action);

		/* Add secondary toolbar */
		action._addSubToolbar(toolbar, actionButton, args);
	}
});

L.toolbarIcon = function(options) {
	return new L.ToolbarIcon(options);
};