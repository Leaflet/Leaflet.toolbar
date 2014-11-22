describe("L.ToolbarIcon", function() {
	var map,
		toolbarTemplate,
		icon,
		handler,
		toolbar;

	beforeEach(function() {
		map = new L.Map(L.DomUtil.create('div')).setView([41.7896,-87.5996], 15);

		icon = new L.ToolbarIcon({ html: 'Test Icon' });
		handler = new L.ToolbarHandler(map, { toolbarIcon: icon });

		toolbarTemplate = [function() { return handler; }];
		toolbar = new L.Toolbar(toolbarTemplate).addTo(map);
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
		it("Should not add a <ul> element when the toolbar has no actions.", function() {
			var container = L.DomUtil.create('div'),
				subToolbar = handler.options.subToolbar,
				ul;
			
			icon._addSubToolbar(toolbar, handler, container, [map]);
			ul = container.querySelectorAll('ul');

			expect(ul.length).to.equal(0);
			expect(subToolbar._ul).to.be.an('undefined');
		});

		it("Should add a <ul> element when the toolbar has one action.", function() {
			var container = L.DomUtil.create('div', '', document.body),
				subToolbar = new L.Toolbar([function(map) { return new L.ToolbarHandler(map); }]),
				ul;

			handler = new L.ToolbarHandler(map);
			L.setOptions(handler, { toolbarIcon: icon, subToolbar: subToolbar });
			toolbar = new L.Toolbar([function() { return handler; }]).addTo(map);

			icon._addSubToolbar(toolbar, handler, container, [map]);
			ul = container.querySelectorAll('ul');

			expect(ul.length).to.equal(1);
			expect(L.DomUtil.hasClass(subToolbar._ul, 'leaflet-toolbar-1')).to.equal(true);
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