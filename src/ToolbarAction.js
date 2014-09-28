L.ToolbarAction = L.Class.extend({
	
	options: {
		className: '',
		html: ''
	},

	initialize: function(action, options) {
		L.setOptions(this, options);

		this._action = action;
	},

	trigger: function(args) {
		this._action.apply(undefined, args);
	}

});