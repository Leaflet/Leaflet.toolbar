describe("L.Toolbar.Popup", function() {
	var map,
		toolbar;

	beforeEach(function() {
		var latlng = new L.LatLng(0, 0);

		/* need to add the <div> to document.body in order for external CSS stylesheets to be applied. */
		map = new L.Map(L.DomUtil.create('div', 'map', document.body)).setView([41.7896,-87.5996], 15);
		toolbar = new L.Toolbar.Popup(latlng, [
			function(map) { return new L.ToolbarHandler(map); },
			function(map) { return new L.ToolbarHandler(map); }
		]);
	});

	describe("#onRemove", function() {
		it("Should remove the toolbar from the map.", function() {
			toolbar.addTo(map);
			map.removeLayer(toolbar);

			expect(map.hasLayer(toolbar)).to.equal(false);
		});
	});

	describe("#_setStyles", function() {
		it("Sets the width of the toolbar to a nonzero value if there are toolbar actions.", function() {
			var actionsLength = toolbar._actions.length,
				toolbarContainer,
				toolbarButtons,
				toolbarWidth,
				buttonWidth;

			/* Want to test the width of the toolbar with more than one action. */
			expect(actionsLength).to.be.above(1);

			toolbar.addTo(map);

			toolbarContainer = toolbar._ul;
			toolbarButtons = toolbar._container.querySelectorAll('.leaflet-toolbar-icon');

			expect(toolbarButtons.length).to.equal(actionsLength);

			toolbarWidth = parseInt(L.DomUtil.getStyle(toolbarContainer, 'width'), 10);
			buttonWidth = parseInt(L.DomUtil.getStyle(toolbarButtons[0], 'width'), 10);

			expect(toolbarWidth).to.be.above(buttonWidth);
		});
	});

	describe("setLatLng", function() {
		it("Should change the latlng of the popup", function() {
			var latlng = new L.LatLng(1, 2);

			toolbar.setLatLng(latlng);
		});
	});
});