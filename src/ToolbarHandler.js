L.ToolbarHandler = L.Handler.extend({
	options: {
		toolbarIcon: new L.ToolbarIcon(),
		subToolbar: new L.Toolbar()
	},

	addHooks: function() {
		var subToolbar = this.options.subToolbar;

		if (subToolbar._actions.length > 0) {
			subToolbar.show();
		}
	},

	removeHooks: function() {
		var subToolbar = this.options.subToolbar;

		if (subToolbar._actions.length > 0) {
			subToolbar.hide();
		}
	},

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