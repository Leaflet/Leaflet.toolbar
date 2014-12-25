describe("L.ToolbarHandler", function() {
	var map,
		container,
		ul,
		toolbar,
		Handler;

	beforeEach(function() {
		map = new L.Map(L.DomUtil.create('div')).setView([41.7896,-87.5996], 15);
		container = L.DomUtil.create('div', 'leaflet-toolbar-0', document.body);
		ul = L.DomUtil.create('ul');

		Handler = L.ToolbarHandler.extend({
			options: {
				toolbarIcon: {
					html: 'Test Icon',
					className: 'my-toolbar-icon'
				}
			}
		});
		toolbar = new L.Toolbar([Handler]);
	});

	describe("#_createIcon", function() {
		it("Sets the content of the icon to the html option passed to the ToolbarIcon.", function() {
			var iconText,
				handler = new Handler(map);

			handler._createIcon(toolbar, ul, []);
			iconText = ul.querySelectorAll('.leaflet-toolbar-icon')[0].innerHTML;

			expect(iconText).to.equal('Test Icon');
		});

		it("Appends options.className to the base className", function() {
			var iconButton,
				handler = new Handler(map);

			handler._createIcon(toolbar, ul, []);
			iconButton = ul.querySelectorAll('a')[0];

			expect(L.DomUtil.hasClass(iconButton, 'leaflet-toolbar-icon')).to.equal(true);
			expect(L.DomUtil.hasClass(iconButton, 'my-toolbar-icon')).to.equal(true);
		});
	});

	describe("#_addSubToolbar", function() {
		it("Should not add a <ul> element when the toolbar has no actions.", function() {
			var handler = new Handler(map),
				subToolbar = handler.options.subToolbar,
				ul;
			
			handler._addSubToolbar(toolbar, container, [map]);
			ul = container.querySelectorAll('ul');

			expect(ul.length).to.equal(0);
			expect(subToolbar._ul).to.be.an('undefined');
		});

		it("Should add a <ul> element when the toolbar has one action.", function() {
			var subToolbar = new L.Toolbar([L.ToolbarHandler]),
				TestHandler = Handler.extend({ options: { subToolbar: subToolbar } }),
				ul;

			toolbar = new L.Toolbar([TestHandler]).addTo(map);

			TestHandler.prototype._addSubToolbar(toolbar, container, [map]);
			ul = container.querySelectorAll('ul');

			expect(ul.length).to.equal(1);
			expect(L.DomUtil.hasClass(subToolbar._ul, 'leaflet-toolbar-1')).to.equal(true);
		});
	});

	describe("#addHooks", function() {
		beforeEach(function() {
			var subToolbar = new L.Toolbar([L.ToolbarHandler]),
				handler = new L.ToolbarHandler();

			L.setOptions(handler, { subToolbar: subToolbar });
			toolbar = new L.Toolbar([L.ToolbarHandler]).addTo(map);

			handler._addSubToolbar(toolbar, container, [map]);
		});

		/* How to test this without access to the handler itself? */
		it.skip("Should show the subToolbar when the handler is enabled.", function() {
			var ul = container.querySelectorAll('ul')[0],
				handler = new L.ToolbarHandler();

			expect(getComputedStyle(ul).display).to.equal('none');

			handler.toolbar = toolbar;
			handler.enable();
			expect(ul.style.display).to.equal('block');
		});
	});

	describe("#removeHooks", function() {
		beforeEach(function() {
			var subToolbar = new L.Toolbar([L.ToolbarHandler]),
				handler = new L.ToolbarHandler();

			L.setOptions(handler, { subToolbar: subToolbar });
			toolbar = new L.Toolbar([L.ToolbarHandler]).addTo(map);

			handler._addSubToolbar(toolbar, container, [map]);
		});

		/* How to test this without access to the handler itself? */
		it.skip("Should hide the subToolbar when the hndler is disabled.", function() {
			var ul = container.querySelectorAll('ul')[0],
				handler = new L.ToolbarHandler();

			expect(getComputedStyle(ul).display).to.equal('none');

			handler.toolbar = toolbar;
			handler.enable();
			handler.disable();

			expect(ul.style.display).to.equal('none');
		});
	});
});

describe("L.toolbarHandler", function() {
	
});