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

	onAdd: function(action, container) {
		var actionButton, link,
			childActions = action.options.childActions,
			childIcon,
			childActionContainer;

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

		/* Add child actions.  TODO - verify: does this.constructor work? */
		childActionContainer = L.DomUtil.create('ul', this.constructor.baseClassSecondary, actionButton);

		for (var i = 0, l = childActions.length; i < l; i++) {
			childIcon = childActions[i].options.toolbarIcon;
			childIcon.onAdd(childActions[i], childActionContainer);
		}
	}
});

L.toolbarIcon = function(options) {
	return new L.ToolbarIcon(options);
};