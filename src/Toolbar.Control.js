L.Toolbar = L.Toolbar || {};

L.Toolbar.Control = L.Toolbar.extend({
	initialize: function(actions, options) {
		L.Toolbar.prototype.initialize.call(this, actions, options);

		this._container = new L.Control.Toolbar(options);
	},

	onAdd: function(map) {
		var toolbar = this.getContainer();

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