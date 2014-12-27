L.Toolbar = L.Class.extend({
	statics: {
		baseClass: 'leaflet-toolbar'
	},

	includes: L.Mixin.Events,

	options: {
		className: '',
		filter: function() { return true; },
		actions: {}
	},

	initialize: function(actions, options) {
		L.setOptions(this, options);

		/* So that this can be called without an arguments to create an empty toolbar: new L.Toolbar() */
		this._actions = actions || [];
	},

	addTo: function(map) {
		this._arguments = [].slice.call(arguments);

		map.addLayer(this);

		return this;
	},

	onAdd: function() {},

	appendToContainer: function(container) {
		var baseClass = this.constructor.baseClass + '-' + this._calculateDepth(),
			className = baseClass + ' ' + this.options.className,
			l = this._actions.length,
			Action, action,
			i;

		this._container = container;
		this._ul = L.DomUtil.create('ul', className, container);

		L.DomEvent.on(this._ul, 'click', L.DomEvent.stopPropagation);

		for (i = 0; i < l; i++) {
			Action = this._getActionConstructor(this._actions[i]);

			action = new Action();
			action._createIcon(this, this._ul, this._arguments);
		}
	},

	_getActionConstructor: function(Action) {
		var args = this._arguments,
			type = Action.prototype.type,
			options = this.options.actions[type] ? this.options.actions[type] : {},
			toolbar = this;

		return Action.extend({
			options: L.extend({}, Action.prototype.options, options),
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

	hide: function() {
		this._ul.style.display = 'none';
	},

	show: function() {
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