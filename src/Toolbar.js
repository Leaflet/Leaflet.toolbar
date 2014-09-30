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
		this._arguments = [].slice.call(arguments);

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
			var action = this._actions[i],
				actionClassName = 'leaflet-toolbar-action ' + action.options.className,
				icon = L.DomUtil.create('li', actionClassName, container),
				link = L.DomUtil.create('a', 'TODO', icon);

			link.innerHTML = action.options.html;
			link.setAttribute('href', '#');
			link._action = action;

			L.DomEvent.on(icon, 'click', this._onClick, this);
		}

		this._toolbar = container;
	},

	getHTML: function() {
		return this._toolbar;
	},

	getHTMLString: function() {
		var tmp = L.DomUtil.create('div');

		tmp.appendChild(this._toolbar);

		return tmp.innerHTML;
	},

	_onClick: function(event) {
		var icon = event.target,
			action = icon._action;

		action.trigger(this._arguments);
	}

});

L.toolbar = function(actions) {
	return new L.Toolbar(actions);
};