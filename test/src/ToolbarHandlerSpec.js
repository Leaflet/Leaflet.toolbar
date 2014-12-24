describe("L.ToolbarHandler", function() {
	var map,
		container,
		ul,
		toolbar,
		handler;

	beforeEach(function() {
		map = new L.Map(L.DomUtil.create('div')).setView([41.7896,-87.5996], 15);
		container = L.DomUtil.create('div', 'leaflet-toolbar-0', document.body);
		ul = L.DomUtil.create('ul');

		handler = new L.ToolbarHandler(map, { toolbarIcon: {
			html: 'Test Icon',
			className: 'my-toolbar-icon'
		}});
		toolbar = new L.Toolbar([function() { return handler; }]);
	});

	describe("#_createIcon", function() {
		it("Sets the content of the icon to the html option passed to the ToolbarIcon.", function() {
			var iconText;

			handler._createIcon(toolbar, ul, []);
			iconText = ul.querySelectorAll('.leaflet-toolbar-icon')[0].innerHTML;

			expect(iconText).to.equal('Test Icon');
		});

		it("Appends options.className to the base className", function() {
			var iconButton;

			handler._createIcon(toolbar, ul, []);
			iconButton = ul.querySelectorAll('a')[0];

			expect(L.DomUtil.hasClass(iconButton, 'leaflet-toolbar-icon')).to.equal(true);
			expect(L.DomUtil.hasClass(iconButton, 'my-toolbar-icon')).to.equal(true);
		});
	});

	describe("#_addSubToolbar", function() {
		it("Should not add a <ul> element when the toolbar has no actions.", function() {
			var subToolbar = handler.options.subToolbar,
				ul;
			
			handler._addSubToolbar(toolbar, container, [map]);
			ul = container.querySelectorAll('ul');

			expect(ul.length).to.equal(0);
			expect(subToolbar._ul).to.be.an('undefined');
		});

		it("Should add a <ul> element when the toolbar has one action.", function() {
			var subToolbar = new L.Toolbar([function(map) { return new L.ToolbarHandler(map); }]),
				ul;

			L.setOptions(handler, { subToolbar: subToolbar });
			toolbar = new L.Toolbar([function() { return handler; }]).addTo(map);

			handler._addSubToolbar(toolbar, container, [map]);
			ul = container.querySelectorAll('ul');

			expect(ul.length).to.equal(1);
			expect(L.DomUtil.hasClass(subToolbar._ul, 'leaflet-toolbar-1')).to.equal(true);
		});
	});

	describe("#addHooks", function() {
		beforeEach(function() {
			var subToolbar = new L.Toolbar([function(map) { return new L.ToolbarHandler(map); }]);

			L.setOptions(handler, { subToolbar: subToolbar });
			toolbar = new L.Toolbar([function() { return handler; }]).addTo(map);

			handler._addSubToolbar(toolbar, container, [map]);
		});

		it("Should show the subToolbar when the handler is enabled.", function() {
			var ul = container.querySelectorAll('ul')[0];

			expect(getComputedStyle(ul).display).to.equal('none');

			handler.enable();
			expect(ul.style.display).to.equal('block');
		});
	});

	describe("#removeHooks", function() {
		beforeEach(function() {
			var subToolbar = new L.Toolbar([function(map) { return new L.ToolbarHandler(map); }]);

			L.setOptions(handler, { subToolbar: subToolbar });
			toolbar = new L.Toolbar([function() { return handler; }]).addTo(map);

			handler._addSubToolbar(toolbar, container, [map]);
		});

		it("Should hide the subToolbar when the hndler is disabled.", function() {
			var ul = container.querySelectorAll('ul')[0];

			expect(getComputedStyle(ul).display).to.equal('none');

			handler.enable();
			handler.disable();

			expect(ul.style.display).to.equal('none');
		});
	});
});

describe("L.toolbarHandler", function() {
	
});