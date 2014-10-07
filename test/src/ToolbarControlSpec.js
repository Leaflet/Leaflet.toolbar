describe("L.Toolbar.Control", function() {
	var map,
		toolbar;

	beforeEach(function() {
		map = new L.Map(L.DomUtil.create('div'));
		toolbar = new L.Toolbar.Control({
			'einsatz': new L.ToolbarAction(function() {})
		});
	});

	describe("#onAdd", function() {
		it("Attaches toolbar action event listeners to the DOM.", function() {
			toolbar.addTo(map);
		});
	});
});