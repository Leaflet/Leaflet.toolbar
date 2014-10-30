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

		this._marker = new L.Marker(latlng, toolbarOptions);
	},

	onAdd: function(map) {
		this._map = map;
		this._marker.addTo(map);

		map.on('click', function() {
			map.removeLayer(this);
		});

		L.Toolbar.prototype.onAdd.call(this, map, this._marker._icon);

		this._setStyles();
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
		var container = this._getContainer(),
			toolbar = container.querySelectorAll('.leaflet-toolbar')[0],
			buttons = container.querySelectorAll('.leaflet-toolbar-action'),
			buttonHeights = [],
			toolbarWidth = 0,
			toolbarHeight,
			tipSize,
			anchor;

		/* Calculate the dimensions of the toolbar. */
		for (var i = 0, l = buttons.length; i < l; i++) {
			buttonHeights.push(parseInt(L.DomUtil.getStyle(buttons[i], 'height'), 10));
			toolbarWidth += parseInt(L.DomUtil.getStyle(buttons[i], 'width'), 10);
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
	},

	_getContainer: function() {
		return this._marker._icon;
	}
});