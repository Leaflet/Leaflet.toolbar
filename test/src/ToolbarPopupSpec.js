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
		it("Sets the width of the toolbar to a nonzero value if there are toolbar actions.", function() {
			var toolbarContainer,
				firstToolbarButton,
				toolbarWidth,
				buttonWidth;

			expect(Object.keys(toolbar._actions).length).to.be.above(1);

			toolbar.addTo(map);

			toolbarContainer = toolbar._container._icon.querySelectorAll('.leaflet-toolbar')[0];
			firstToolbarButton = toolbar._container._icon.querySelectorAll('.leaflet-toolbar-action')[0];

			toolbarWidth = L.DomUtil.getStyle(toolbarContainer, 'width');
			buttonWidth = L.DomUtil.getStyle(firstToolbarButton, 'width');

			/* TODO: This test should fail, but it isn't b/c #getStyle doesn't work right. */
			expect(toolbarWidth).to.be.above(buttonWidth);
		});
	});
});