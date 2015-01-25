L.Toolbar = L.Class.extend({
	statics: {
		baseClass: 'leaflet-toolbar'
	},

	includes: L.Mixin.Events,

	options: {
		className: '',
		filter: function() { return true; },
		actions: []
	},

	initialize: function(options) {
		L.setOptions(this, options);
	},

	addTo: function(map) {
		this._arguments = [].slice.call(arguments);

		map.addLayer(this);

		return this;
	},

	onAdd: function() {},

	onRemove: function() {
		/* Cleanup event listeners. */
		for (var i = 0, l = this._disabledEvents.length; i < l; i++) {
			L.DomEvent.off(this._ul, this._disabledEvents[i], L.DomEvent.stopPropagation);
		}
	},

	appendToContainer: function(container) {
		var baseClass = this.constructor.baseClass + '-' + this._calculateDepth(),
			className = baseClass + ' ' + this.options.className,
			Action, action,
			i, j, l, m;

		this._container = container;
		this._ul = L.DomUtil.create('ul', className, container);

		/* Ensure that clicks, drags, etc. don't bubble up to the map. */
		this._disabledEvents = ['click', 'mousemove', 'dblclick'];

		for (j = 0, m = this._disabledEvents.length; j < m; j++) {
			L.DomEvent.on(this._ul, this._disabledEvents[j], L.DomEvent.stopPropagation);
		}

		/* Instantiate each toolbar action and add its corresponding toolbar icon. */
		for (i = 0, l = this.options.actions.length; i < l; i++) {
			Action = this._getActionConstructor(this.options.actions[i]);

			action = new Action();
			action._createIcon(this, this._ul, this._arguments);
		}
	},

	_getActionConstructor: function(Action) {
		var args = this._arguments,
			toolbar = this;

		return Action.extend({
			initialize: function() {
				Action.prototype.initialize.apply(this, args);
			},
			enable: function() {
				/* Ensure that only one action in a toolbar will be active at a time. */
				if (toolbar._active) { toolbar._active.disable(); }
				toolbar._active = this;

				Action.prototype.enable.call(this);
			}
		});
	},

	/* Used to hide subToolbars without removing them from the map. */
	_hide: function() {
		this._ul.style.display = 'none';
	},

	/* Used to show subToolbars without removing them from the map. */
	_show: function() {
		this._ul.style.display = 'block';
	},

	_calculateDepth: function() {
		var depth = 0,
			toolbar = this.parentToolbar;

		while (toolbar) {
			depth += 1;
			toolbar = toolbar.parentToolbar;
		}

		return depth;
	}
});

L.toolbar = {};
