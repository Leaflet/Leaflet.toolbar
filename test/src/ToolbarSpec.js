describe("L.Toolbar", function() {
	var map,
		container,
		toolbarTemplate,
		toolbar;

	beforeEach(function() {
		map = new L.Map(L.DomUtil.create('div')).setView([41.7896,-87.5996], 15);
		container = container = L.DomUtil.create('div');

		toolbarTemplate = [function(map) { return new L.ToolbarHandler(map); }];
		toolbar = new L.Toolbar(toolbarTemplate);

		toolbar.addTo(map);
	});

	describe("#appendToContainer", function() {
		it("Should create an icon for each toolbar action.", function() {
			var icons;

			toolbar.appendToContainer(container);

			icons = container.querySelectorAll('.leaflet-toolbar-icon');

			expect(icons.length).to.equal(toolbarTemplate.length);
		});
	});

	describe("#show", function() {
		it("Should set the display of the toolbar container to 'block'", function() {
			toolbar.appendToContainer(container);

			toolbar.show();
			expect(toolbar._ul.style.display).to.equal('block');
		});
	});

	describe("#hide", function() {
		it("Should set the display of the toolbar container to 'block'", function() {
			toolbar.appendToContainer(container);

			toolbar.hide();
			expect(toolbar._ul.style.display).to.equal('none');
		});
	});

	describe("#_calculateToolbarDepth", function() {
		it("Should return 0 for a single toolbar", function() {
			expect(toolbar._calculateDepth()).to.equal(0);
		});

		it("Should return 1 for a nested toolbar", function() {
			var subToolbar = new L.Toolbar(),
				handler = new L.ToolbarHandler(map);

			L.setOptions(handler, { subToolbar: subToolbar });

			toolbar = new L.Toolbar([function() { return handler; }]).addTo(map);
			toolbar.appendToContainer(container);

			expect(subToolbar._calculateDepth()).to.equal(1);
		});
	});
});