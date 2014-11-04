L.ToolbarAction = L.Class.extend({
	
	options: {
		className: 'leaflet-toolbar-action',
		html: '',
		tooltip: '',
		secondaryActions: []
	},

	initialize: function(Handler, options) {
		if (options && options.className) {
			options.className = this.options.className + ' ' + options.className;
		}
		L.setOptions(this, options);

		this._Handler = Handler;
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

		this._addSecondaryActions(actionButton);

		L.DomEvent.on(link, 'click', this._onClick, this);

		return actionButton;
	},

	_onClick: function() {
		var H = this._Handler,
			args = this._arguments;

		/* Hack to create a variadic constructor. */
		function Handler() {
			return H.apply(this, args);
		}
		Handler.prototype = H.prototype;

		this._action = new Handler();
		this._action.enable();

		/* Show secondary actions */
		this._secondaryActions.style.display = 'block';
	},

	/* TODO: Add tests for this function. */
	_addSecondaryActions: function(container) {
		var l = this.options.secondaryActions.length,
			secondaryAction;

		this._secondaryActions = L.DomUtil.create('ul', '', container);

		L.DomUtil.addClass(this._secondaryActions, 'leaflet-toolbar-secondary');

		for (var i = 0; i < l; i++) {
			console.log(this.options.secondaryActions[i]);
			secondaryAction = L.DomUtil.create('li', '', this._secondaryActions);
			secondaryAction.innerHTML = this.options.secondaryActions[i];
		}
	}

});

L.toolbarAction = function(action, options) {
	return new L.ToolbarAction(action, options);
};