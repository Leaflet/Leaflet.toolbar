describe("L.Toolbar", function() {
	var map,
		container,
		toolbarTemplate,
		toolbar;

	beforeEach(function() {
		map = new L.Map(L.DomUtil.create('div')).setView([41.7896,-87.5996], 15);
		container = L.DomUtil.create('div');

		toolbarTemplate = [L.ToolbarAction];
		toolbar = new L.Toolbar(toolbarTemplate);

		toolbar.addTo(map);
	});

	describe("#addTo", function() {
		it("Should pass along its arguments to each toolbar action factory.", function(done) {
			var TestHandler = L.ToolbarAction.extend({
				initialize: function(arg1) {
					expect(arg1).to.equal(map);
					done();
				}
			});

			toolbar = new L.Toolbar([TestHandler]);

			toolbar.addTo(map);
			toolbar.appendToContainer(container);
		});
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
				TestHandler = L.ToolbarAction.extend({ options: { subToolbar: subToolbar } });

			toolbar = new L.Toolbar([TestHandler]).addTo(map);
			toolbar.appendToContainer(container);

			expect(subToolbar._calculateDepth()).to.equal(1);
		});
	});
});