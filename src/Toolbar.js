L.Toolbar = L.Class.extend({
	
	options: {
		className: ''
	},

	initialize: function(actions, options) {
		L.setOptions(this, options);

		this._actions = actions;

		this._initToolbar();
	},

	addTo: function(map) {
		map.addLayer(this);
	},

	onAdd: function() {

	},

	onRemove: function() {

	},

	_initToolbar: function() {
		var className = 'leaflet-toolbar ' + this.options.className,
			container = L.DomUtil.create('ul', className);

		for (var i = 0, l = this._actions.length; i < l; i++) {
			var icon = L.DomUtil.create('li', this._actions[i].options.className, container);

			icon.innerHTML = this._actions[i].options.html;
			icon._action = this._actions[i];

			L.DomEvent.on(icon, 'click', this._onClick, this);
		}

		this._toolbar = container;
	},

	getContainer: function() {
		return this._toolbar;
	},

	_onClick: function(event) {
		var icon = event.target,
			action = icon._action;

		action.trigger();
	}

});

L.toolbar = function(actions) {
	return new L.Toolbar(actions);
};