L.Toolbar = L.Class.extend({
	statics: {
		baseClass: 'leaflet-toolbar'
	},

	includes: L.Mixin.Events,

	options: {
		className: '',
		filter: function() { return true; }
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
			Action, action,
			i, l;

		this._container = container;
		this._ul = L.DomUtil.create('ul', className, container);

		l = this._actions.length;

		for (i = 0; i < l; i++) {
			Action = this._createHandler(this._actions[i]);

			action = new Action();
			action._createIcon(this, this._ul, this._arguments);
		}
	},

	_createHandler: function(Handler) {
		var args = this._arguments,
			type = Handler.prototype.type,
			options = this.options.actions[type] ? this.options.actions[type] : {},

			H = Handler.extend({
				options: L.extend({}, Handler.prototype.options, options),
				initialize: function() {
					Handler.prototype.initialize.apply(this, args);
				}
			});

		return H;
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