describe("L.Toolbar.Control", function() {
	var map,
		toolbar;

	beforeEach(function() {
		var Handler = L.Handler.extend({ options: {} }),
			TestToolbar = L.Toolbar.Control.extend({
				actions: function() { return [new Handler()]; }
			});

		map = new L.Map(L.DomUtil.create('div')).setView([41.7896,-87.5996], 15);
		toolbar = new TestToolbar();
	});

	describe("#onAdd", function() {
		it("Attaches toolbar action event listeners to the DOM.", function() {
			toolbar.addTo(map);
		});
	});
});