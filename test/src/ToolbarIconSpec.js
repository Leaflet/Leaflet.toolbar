describe("L.ToolbarIcon", function() {
	var map,
		toolbar;

	beforeEach(function() {
		map = new L.Map(L.DomUtil.create('div')).setView([41.7896,-87.5996], 15);
		toolbar = new L.Toolbar([
			function() { return new L.ToolbarHandler(); }
		]).addTo(map);
	});
});

/* Factory function */
describe("L.toolbarIcon", function() {
	it("Should return an instance of L.ToolbarAction", function() {
		var icon = L.toolbarIcon();

		expect(icon).to.be.an.instanceof(L.ToolbarIcon);
	});
});