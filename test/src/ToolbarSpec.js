describe("L.Toolbar", function() {
	var map,
		toolbar,
		action = sinon.spy(),
		actions = {
			'test-action': new L.ToolbarAction(action)
		};

	beforeEach(function() {
		map = new L.Map(L.DomUtil.create('div')).setView([41.7896,-87.5996], 15);
		toolbar = new L.Toolbar(actions);
	});

	describe("#initialize", function() {
		it("Should store the array of actions.", function() {
			expect(toolbar._actions).to.deep.equal(actions);
		});
	});

	describe("#onAdd", function() {
		it("Should create an <a/> element for each toolbar action.", function() {
			var container = L.DomUtil.create('div'),
				actionButtons;

			toolbar.onAdd(map, container);
			actionButtons = container.querySelectorAll('.leaflet-toolbar-action');

			expect(actionButtons.length).to.equal(Object.keys(actions).length);
		});
	});

	describe("#_onClick", function() {
		it("Should prevent click events from propagating up to the map", function() {
			var mapClicked = false;

			map.on('click', function() { mapClicked = true; });

			toolbar._onClick({});
			expect(mapClicked).to.equal(false);
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