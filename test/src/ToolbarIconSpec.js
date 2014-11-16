describe("L.ToolbarIcon", function() {
	var map,
		toolbar;

	beforeEach(function() {
		var	TestToolbar = L.Toolbar.extend({

				initialize: function() {
					L.Toolbar.prototype.initialize.apply(this, arguments);
					this._container = L.DomUtil.create('div');
				},

				getContainer: function() { return this._container; }

			});

		map = new L.Map(L.DomUtil.create('div')).setView([41.7896,-87.5996], 15);
		toolbar = new TestToolbar([
			function() { return new L.ToolbarHandler(); }
		]).addTo(map);
	});

	describe("#_onClick", function() {
		it("Should call the toolbar action.", function() {
			
		});
	});

	describe("#_addButton", function() {
		it("Should create an <a> inside a <li> element and attach an event listener.", function() {
			
		});
	});
});

/* Factory function */
describe("L.toolbarIcon", function() {
	it("Should return an instance of L.ToolbarAction", function() {
		var icon = L.toolbarIcon();

		expect(icon).to.be.an.instanceof(L.ToolbarIcon);
	});
});