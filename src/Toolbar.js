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
		this._toolbar_type = this.constructor._toolbar_class_id;
	},

	addTo: function(map) {
		this._arguments = [].slice.call(arguments);

		map.addLayer(this);

		return this;
	},

	onAdd: function(map) {
		var currentToolbar = map._toolbars[this._toolbar_type];

		if (this._calculateDepth() === 0) {
			if (currentToolbar) { map.removeLayer(currentToolbar); }
			map._toolbars[this._toolbar_type] = this;
		}
	},

	onRemove: function(map) {
		if (this._calculateDepth() === 0) {
			delete map._toolbars[this._toolbar_type];
		}
	},

	appendToContainer: function(container) {
		var baseClass = this.constructor.baseClass + '-' + this._calculateDepth(),
			className = baseClass + ' ' + this.options.className,
			l = this.options.actions.length,
			Action, action,
			i;

		this._container = container;
		this._ul = L.DomUtil.create('ul', className, container);

		L.DomEvent.on(this._ul, 'click', L.DomEvent.stopPropagation);

		for (i = 0; i < l; i++) {
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

var toolbar_class_id = 0;

L.Toolbar.extend = function extend(props) {
	var statics = L.extend({}, props.statics, {
		"_toolbar_class_id": toolbar_class_id
	});

	toolbar_class_id += 1;
	L.extend(props, { statics: statics });

	return L.Class.extend.call(this, props);
};

L.Map.addInitHook(function() {
	this._toolbars = {};
});