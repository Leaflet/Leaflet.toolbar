describe("L.ToolbarIcon", function() {
	var map,
		toolbarTemplate,
		icon,
		handler,
		toolbar;

	beforeEach(function() {
		map = new L.Map(L.DomUtil.create('div')).setView([41.7896,-87.5996], 15);

		icon = new L.ToolbarIcon({ html: 'Test Icon' });
		handler = new L.ToolbarHandler({ toolbarIcon: icon });

		toolbarTemplate = [function() { return handler; }];
		toolbar = new L.Toolbar().addTo(map);
	});

	describe("#onAdd", function() {
		it("Sets the content of the icon to the html option passed to the ToolbarIcon.", function() {
			var container = L.DomUtil.create('div'),
				iconText;

			icon.onAdd(toolbar, handler, container, [map]);
			iconText = container.querySelectorAll('.leaflet-toolbar-icon')[0].innerHTML;

			expect(iconText).to.equal('Test Icon');
		});
	});

	describe("#_addSubToolbar", function() {
		it("", function() {
			var container = L.DomUtil.create('div');
			icon._addSubToolbar(toolbar, handler, container, [map]);
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