(function(window, document, undefined) {

"use strict";

L.ToolbarAction = L.Class.extend({
	
	options: {
		className: '',
		html: ''
	},

	initialize: function(action, options) {
		L.setOptions(this, options);

		this._action = action;
	},

	trigger: function(args) {
		this._action.apply(undefined, args);
	}

});
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
L.ToolbarGroup = L.Toolbar.extend({});
L.Toolbar = L.Toolbar || {};

L.Toolbar.Control = L.Toolbar.extend({
	initialize: function(actions, options) {
		L.Toolbar.prototype.initialize.call(this, actions, options);

		this._container = new L.Control.Toolbar(options);
	},

	onAdd: function(map) {
		var toolbar = this.getHTML();

		this._container
			.addTo(map)
			.setContent(toolbar);
	},

	onRemove: function(map) {
		map.removeLayer(this._container);
	}
});

L.Control.Toolbar = L.Control.extend({
	onAdd: function() {
		return L.DomUtil.create('div', 'leaflet-control-toolbar');
	},

	setContent: function(html) {
		var container = this.getContainer();

		if (typeof html === 'string') {
			container.innerHTML = html;
		} else {
			container.appendChild(html);
		}

		return this;
	}
});
// A convenience class for built-in popup toolbars.

L.Toolbar = L.Toolbar || {};

L.Toolbar.Popup = L.Toolbar.extend({

	initialize: function(latlng, actions, options) {
		L.Toolbar.prototype.initialize.call(this, actions, options);

		var	toolbarOptions = L.extend(this.options, {
				icon: new L.DivIcon({
					html: this.getHTMLString(),
					className: this.options.className
				})
			});

		this._container = new L.Marker(latlng, toolbarOptions);
	},

	onAdd: function(map) {
		this._map = map;

		this._container.addTo(map);
	},

	onRemove: function(map) {
		map.closePopup(this._container);

		delete this._map;
	},

	setLatLng: function(latlng) {
		this._container.setLatLng(latlng);

		return this;
	}
	
});

}(window, document));