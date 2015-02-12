describe("L.Toolbar", function() {
	var map,
		toolbar;

	beforeEach(function() {
		var Handler = L.Handler.extend({ options: {} }),
			TestToolbar = L.Toolbar.extend({

				initialize: function() {
					L.Toolbar.prototype.initialize.apply(this, arguments);
					this._container = L.DomUtil.create('div');
				},

				actions: function() {
					return [
						new Handler({ toolbarIcon: new L.ToolbarIcon() })
					];
				},

				getContainer: function() { return this._container; }

			});

		map = new L.Map(L.DomUtil.create('div')).setView([41.7896,-87.5996], 15);
		toolbar = new TestToolbar();
	});

	describe("#onAdd", function() {
		it("Should create an <a/> element for each toolbar action.", function() {
			var l = toolbar.actions().length,
				actionButtons;

			toolbar.onAdd(map);
			actionButtons = toolbar.getContainer().querySelectorAll('.leaflet-toolbar-icon');

			expect(actionButtons.length).to.equal(l);
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
});

/* Factory function */
describe("L.toolbar", function() {
	it("Should return an instance of L.Toolbar", function() {
		var toolbar = L.toolbar();

		expect(toolbar).to.be.an.instanceof(L.Toolbar);
	});
});