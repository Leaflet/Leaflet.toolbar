L.ToolbarAction = L.Class.extend({
	
	options: {
		className: 'leaflet-toolbar-action',
		html: '',
		tooltip: '',
		secondaryActions: []
	},

	initialize: function(action, options) {
		if (options && options.className) {
			options.className = this.options.className + ' ' + options.className;
		}
		L.setOptions(this, options);

		this._action = action;
	},

	setArguments: function(args) {
		this._arguments = args;
	},

	_addButton: function(container) {
		var actionButton, link;

		actionButton = L.DomUtil.create('li', '', container);

		link = L.DomUtil.create('a', '', actionButton);
		link.innerHTML = this.options.html;
		link.setAttribute('href', '#');
		link.setAttribute('title', this.options.tooltip);

		L.DomUtil.addClass(link, 'leaflet-toolbar-action');
		L.DomUtil.addClass(link, this.options.className);

		L.DomEvent.on(link, 'click', this._onClick, this);

		return actionButton;
	},

	_onClick: function() {
		this._context = {};
		this._action.apply(this._context, this._arguments);
	},

	_attachSecondaryHandlers: function() {

	},

	_addSecondaryActions: function(container) {
		var l = this.options.secondaryActions.length,
			secondaryActions = L.DomUtil.create('ul', container);

		L.DomUtil.addClass(secondaryActions, 'leaflet-toolbar-secondary');

		for (var i = 0; i < l; i++) {
			L.DomUtil.create('li', '', secondaryActions);
		}
	}

});

L.toolbarAction = function(action, options) {
	return new L.ToolbarAction(action, options);
};