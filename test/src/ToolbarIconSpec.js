describe("L.ToolbarIcon", function() {
	var map,
		icon,
		container,
		handler,
		toolbar;

	beforeEach(function() {
		var toolbarTemplate;

		map = new L.Map(L.DomUtil.create('div')).setView([41.7896,-87.5996], 15);
		container = container = L.DomUtil.create('div');

		icon = new L.ToolbarIcon({ html: 'Test Icon', className: 'my-toolbar-icon' });
		handler = new L.ToolbarHandler(map, { toolbarIcon: icon });

		toolbarTemplate = [function() { return handler; }];
		toolbar = new L.Toolbar(toolbarTemplate).addTo(map);

		icon.onAdd(toolbar, handler, container, [map]);
	});

	describe("#onAdd", function() {
		it("Sets the content of the icon to the html option passed to the ToolbarIcon.", function() {
			var iconText = container.querySelectorAll('.leaflet-toolbar-icon')[0].innerHTML;

			expect(iconText).to.equal('Test Icon');
		});

		it("Appends options.className to the base className", function() {
			var iconButton = container.querySelectorAll('a')[0];

			expect(L.DomUtil.hasClass(iconButton, 'leaflet-toolbar-icon')).to.equal(true);
			expect(L.DomUtil.hasClass(iconButton, 'my-toolbar-icon')).to.equal(true);
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