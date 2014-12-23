L.ToolbarHandler = L.Handler.extend({
	options: {
		toolbarIcon: new L.ToolbarIcon(),
		subToolbar: new L.Toolbar()
	},

	initialize: function(map, options) {
		L.setOptions(this, options);
		L.Handler.prototype.initialize.call(this, map);
	},

	enable: function() {
		var subToolbar = this.options.subToolbar;

		L.Handler.prototype.enable.call(this);

		if (subToolbar._actions.length > 0) {
			subToolbar.show();
		}
	},

	disable: function() {
		var subToolbar = this.options.subToolbar;

		L.Handler.prototype.disable.call(this);

		if (subToolbar._actions.length > 0) {
			subToolbar.hide();
		}
	},

	addHooks: function() {},
	
	removeHooks: function() {},

	_addSubToolbar: function(toolbar, container, args) {
		var subToolbar = this.options.subToolbar;

		/* For calculating the nesting depth. */
		subToolbar.parentToolbar = toolbar;

		if (subToolbar._actions.length > 0) {
			/* Make a copy of args so as not to pollute the args array used by other actions. */
			args = [].slice.call(args);
			args.push(this);
			
			subToolbar.addTo.apply(subToolbar, args);
			subToolbar.appendToContainer(container);
		}
	}
});