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
					html: '',
					className: this.options.className
				})
			});

		this._leaflet_obj = new L.Marker(latlng, toolbarOptions);
	},

	onAdd: function(map) {
		this._map = map;
		this._leaflet_obj.addTo(map);

		L.DomEvent.on(this.getContainer(), 'click', function(event) {
			L.DomEvent.stopPropagation(event);
			map.removeLayer(this);
		}, this);

		L.Toolbar.prototype.onAdd.call(this, map, this.getContainer());

		this._setStyles();
	},

	onRemove: function(map) {
		map.removeLayer(this._leaflet_obj);

		delete this._map;
	},

	setLatLng: function(latlng) {
		this._leaflet_obj.setLatLng(latlng);

		return this;
	},

	getContainer: function() {
		return this._map ? this._leaflet_obj._icon : undefined;
	},

	_setStyles: function() {
		var container = this.getContainer(),
			toolbar = container.querySelectorAll('.leaflet-toolbar')[0],
			icons = container.querySelectorAll('.leaflet-toolbar-icon'),
			buttonHeights = [],
			toolbarWidth = 0,
			toolbarHeight,
			tipSize,
			anchor;

		/* Calculate the dimensions of the toolbar. */
		for (var i = 0, l = icons.length; i < l; i++) {
			buttonHeights.push(parseInt(L.DomUtil.getStyle(icons[i], 'height'), 10));
			toolbarWidth += Math.ceil(parseFloat(L.DomUtil.getStyle(icons[i], 'width')));
		}
		toolbar.style.width = toolbarWidth + 'px';

		/* Create and place the toolbar tip. */
		this._tipContainer = L.DomUtil.create('div', 'leaflet-toolbar-tip-container', container);
		this._tipContainer.style.width = toolbarWidth + 'px';

		this._tip = L.DomUtil.create('div', 'leaflet-toolbar-tip', this._tipContainer);

		/* Set the anchor point. */
		toolbarHeight = Math.max.apply(undefined, buttonHeights);
		tipSize = parseInt(L.DomUtil.getStyle(this._tip, 'width'), 10);

		anchor = new L.Point(toolbarWidth/2, toolbarHeight + 0.7071*tipSize);

		container.style.marginLeft = (-anchor.x) + 'px';
		container.style.marginTop = (-anchor.y) + 'px';
	}
});