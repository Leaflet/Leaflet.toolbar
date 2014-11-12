L.ToolbarIcon = L.Class.extend({
	options: {
		html: '',
		className: ''
	},

	initialize: function(options) {
		L.setOptions(this, options);
	},

	onAdd: function(container, action) {
		var actionButton, link;

		actionButton = L.DomUtil.create('li', '', container);

		link = L.DomUtil.create('a', '', actionButton);
		link.innerHTML = this.options.html;
		link.setAttribute('href', '#');
		link.setAttribute('title', this.options.tooltip);

		L.DomUtil.addClass(link, 'leaflet-toolbar-icon');
		if (this.options.className) {
			L.DomUtil.addClass(link, this.options.className);
		}

		L.DomEvent.on(link, 'click', action.enable, action);
	}
});

L.toolbarIcon = function(options) {
	return new L.ToolbarIcon(options);
};