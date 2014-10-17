L.Toolbar = L.Toolbar || {};

L.Toolbar.Control = L.Toolbar.extend({

	statics: {
		baseClass: L.Toolbar.baseClass + ' leaflet-control-toolbar'
	},

	initialize: function(actions, options) {
		L.Toolbar.prototype.initialize.call(this, actions, options);

		this._container = new L.Control.Toolbar(options);
	},

	onAdd: function(map) {
		var toolbar = this.getHTML();

		this._container
			.addTo(map)
			.setContent(toolbar);

		this.attachHandlers(this._container.getContainer().childNodes[0]);
	},

	onRemove: function(map) {
		map.removeLayer(this._container);
	}
});

L.Control.Toolbar = L.Control.extend({
	onAdd: function() {
		return L.DomUtil.create('div', '');
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