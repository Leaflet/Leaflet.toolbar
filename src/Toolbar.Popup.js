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

		// an existing listener on the marker icon throws errors when the toolbar is removed if not disabled.
		L.DomEvent.off(this._container._icon, 'click', this._container._onMouseClick, this._container);

		this.attachHandlers(this._container._icon);

		map.on('click', function() {
			map.removeLayer(this);
		});
	},

	onRemove: function(map) {
		map.removeLayer(this._container);

		delete this._map;
	},

	setLatLng: function(latlng) {
		this._container.setLatLng(latlng);

		return this;
	},

	_onClick: function(event) {
		L.Toolbar.prototype._onClick.call(this, event);

		this._map.removeLayer(this);
	},

	_setStyles: function() {
		var toolbar = this._container._icon.querySelectorAll('.leaflet-toolbar')[0],
			buttons = this._container._icon.querySelectorAll('.leaflet-toolbar-action'),
			buttonHeights = [],
			toolbarWidth = 0,
			toolbarHeight,
			tipSize,
			anchor;

		for (var i = 0, l = buttons.length; i < l; i++) {
			buttonHeights.push(parseInt(L.DomUtil.getStyle(buttons[i], 'height'), 10));
			toolbarWidth += parseInt(L.DomUtil.getStyle(buttons[i], 'width'), 10);
		}
		toolbar.style.width = toolbarWidth + 'px';

		/* Create and place the toolbar tip. */
		this._tipContainer = L.DomUtil.create('div', 'leaflet-toolbar-tip-container', this._container._icon);
		this._tipContainer.style.width = toolbarWidth + 'px';

		this._tip = L.DomUtil.create('div', 'leaflet-toolbar-tip', this._tipContainer);

		/* Set the anchor point. */
		toolbarHeight = Math.max.apply(undefined, buttonHeights);
		tipSize = parseInt(L.DomUtil.getStyle(this._tip, 'width'), 10);

		anchor = new L.Point(toolbarWidth/2, toolbarHeight + 0.7071*tipSize);

		this._container._icon.style.marginLeft = (-anchor.x) + 'px';
		this._container._icon.style.marginTop = (-anchor.y) + 'px';
	}
});