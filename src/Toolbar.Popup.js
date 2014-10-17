// A convenience class for built-in popup toolbars.

L.Toolbar = L.Toolbar || {};

L.Toolbar.Popup = L.Toolbar.extend({

	statics: {
		baseClass: L.Toolbar.baseClass + ' leaflet-popup-toolbar'
	},

	initialize: function(latlng, actions, options) {
		L.Toolbar.prototype.initialize.call(this, actions, options);

		var	toolbarOptions = L.extend(this.options, {
				icon: new L.DivIcon({
					html: this.getHTML(),
					className: this.options.className
				})
			});

		this._container = new L.Marker(latlng, toolbarOptions);
	},

	onAdd: function(map) {
		this._map = map;
		this._container.addTo(map);

		this._setStyles();

		this.attachHandlers(this._container._icon);
	},

	onRemove: function() {
		// TODO

		delete this._map;
	},

	setLatLng: function(latlng) {
		this._container.setLatLng(latlng);

		return this;
	},

	_getToolbarActionWidth: function() {
		// var mockToolbar = L.DomUtil.create('ul', 'leaflet-toolbar'),
		// 	mockToolbarAction = L.DomUtil.create('a', 'leaflet-toolbar-action', mockToolbar);

		// TODO: Figure out why this isn't returning a value.
		// return L.DomUtil.getStyle(mockToolbarAction, 'width');
		return 26;
	},

	_setStyles: function() {
		var toolbar = this._container._icon.querySelectorAll('.leaflet-toolbar')[0],
			actionWidth = this._getToolbarActionWidth(),
			anchor;

		toolbar.style.width = Object.keys(this._actions).length*actionWidth + 'px';

		anchor = new L.Point(Object.keys(this._actions).length*actionWidth/2, actionWidth);
		this._container._icon.style.marginLeft = (-anchor.x) + 'px';
		this._container._icon.style.marginTop = (-anchor.y) + 'px';
	}
	
});