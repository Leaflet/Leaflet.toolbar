describe("L.ToolbarHandler", function() {
	var map,
		toolbar,
		handler;

	beforeEach(function() {
		map = new L.Map(L.DomUtil.create('div')).setView([41.7896,-87.5996], 15);
		handler = new L.ToolbarHandler(map);
		toolbar = new L.Toolbar([function() { return handler; }]);
	});

	describe("#_addSubToolbar", function() {
		it("Should not add a <ul> element when the toolbar has no actions.", function() {
			var container = L.DomUtil.create('div'),
				subToolbar = handler.options.subToolbar,
				ul;
			
			handler._addSubToolbar(toolbar, container, [map]);
			ul = container.querySelectorAll('ul');

			expect(ul.length).to.equal(0);
			expect(subToolbar._ul).to.be.an('undefined');
		});

		it("Should add a <ul> element when the toolbar has one action.", function() {
			var container = L.DomUtil.create('div', '', document.body),
				subToolbar = new L.Toolbar([function(map) { return new L.ToolbarHandler(map); }]),
				ul;

			L.setOptions(handler, { subToolbar: subToolbar });
			toolbar = new L.Toolbar([function() { return handler; }]).addTo(map);

			handler._addSubToolbar(toolbar, container, [map]);
			ul = container.querySelectorAll('ul');

			expect(ul.length).to.equal(1);
			expect(L.DomUtil.hasClass(subToolbar._ul, 'leaflet-toolbar-1')).to.equal(true);
		});
	});
});