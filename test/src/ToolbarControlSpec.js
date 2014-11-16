describe("L.Toolbar.Control", function() {
	var map,
		toolbar;

	beforeEach(function() {
		map = new L.Map(L.DomUtil.create('div')).setView([41.7896,-87.5996], 15);
		toolbar = new L.Toolbar.Control([
			function() { return new L.ToolbarHandler(); }
		]);
	});

	describe("#onAdd", function() {
		it("Attaches toolbar action event listeners to the DOM.", function() {
			toolbar.addTo(map);
		});
	});
});