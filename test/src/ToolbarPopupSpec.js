describe("L.Toolbar.Popup", function() {
	var map,
		toolbar;

	beforeEach(function() {
		var latlng = new L.LatLng(0, 0);

		map = new L.Map(L.DomUtil.create('div')).setView([41.7896,-87.5996], 15);
		toolbar = new L.Toolbar.Popup(latlng, {
			'einsatz': new L.ToolbarAction(function() {}),
			'kunst': new L.ToolbarAction(function() {})
		});
	});

	describe("#onAdd", function() {
		it.skip("Sets the width of the toolbar to a nonzero value if there are toolbar actions.", function() {
			var actionsLength = Object.keys(toolbar._actions).length,
				toolbarContainer,
				toolbarButtons,
				toolbarWidth,
				buttonWidth;

			/* Want to test the width of the toolbar with more than one action. */
			expect(actionsLength).to.be.above(1);

			toolbar.addTo(map);

			toolbarContainer = toolbar._container._icon.querySelectorAll('.leaflet-toolbar')[0];
			toolbarButtons = toolbar._container._icon.querySelectorAll('.leaflet-toolbar-action');

			expect(toolbarButtons.length).to.equal(actionsLength);

			toolbarWidth = parseInt(L.DomUtil.getStyle(toolbarContainer, 'width'), 10);
			buttonWidth = parseInt(L.DomUtil.getStyle(toolbarButtons[0], 'width'), 10);

			/* TODO: Works in the example, but not during tests. */
			expect(toolbarWidth).to.be.above(buttonWidth);
		});
	});
});