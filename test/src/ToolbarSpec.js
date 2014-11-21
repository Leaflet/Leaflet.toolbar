describe("L.Toolbar", function() {
	var map,
		toolbar;

	beforeEach(function() {
		map = new L.Map(L.DomUtil.create('div')).setView([41.7896,-87.5996], 15);
		toolbar = new L.Toolbar([
			function() { return new L.ToolbarHandler(); }
		]);
	});

	/* TODO: Fix this test. */
	describe("#onAdd", function() {
		it("Should create an <a/> element for each toolbar action.", function() {
			// var l = toolbar._actions.length,
			// 	actionButtons;

			toolbar.addTo(map);
			toolbar.appendToContainer(L.DomUtil.create('div'));
			// actionButtons = toolbar.getContainer().querySelectorAll('.leaflet-toolbar-icon');

			// expect(actionButtons.length).to.equal(l);
		});

		it("Should add nested toolbars correctly", function() {
			toolbar = new L.Toolbar([
				function() { return new L.ToolbarHandler({ subToolbar: new L.Toolbar() }); },
				function() { return new L.ToolbarHandler({ subToolbar: new L.Toolbar() }); }
			]);
		});
	});

	describe("#_onClick", function() {
		it.skip("Should prevent click events from propagating up to the map", function() {
			var mapClicked = false;

			map.on('click', function() { mapClicked = true; });

			toolbar._onClick({});
			expect(mapClicked).to.equal(false);
		});
	});

	describe("#_calculateToolbarDepth", function() {
		it("Should return 0 for a single toolbar", function() {
			expect(toolbar._calculateDepth()).to.equal(0);
		});
	});
});

/* Factory function */
describe("L.toolbar", function() {
	it("Should return an instance of L.Toolbar", function() {
		var toolbar = L.toolbar();

		expect(toolbar).to.be.an.instanceof(L.Toolbar);
	});
});