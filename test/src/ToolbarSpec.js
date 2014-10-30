describe("L.Toolbar", function() {
	var map,
		toolbar,
		action = sinon.spy(),
		actions = {
			'test-action': new L.ToolbarAction(action)
		};

	beforeEach(function() {
		map = new L.Map(L.DomUtil.create('div')).setView([41.7896,-87.5996], 15);
		toolbar = new L.Toolbar(actions);
	});

	describe("#initialize", function() {
		it("Should store the array of actions.", function() {
			expect(toolbar._actions).to.deep.equal(actions);
		});
	});

	describe("#attachHandlers", function() {
		it.skip("Should attach actions by name to the corresponding buttons.", function() {
			var actionNames = [],
				testContainer = L.DomUtil.create('div'),
				actionButtons;

			toolbar.addTo(map);
			testContainer.innerHTML = toolbar.getHTML();
			toolbar.attachHandlers(testContainer);
			actionButtons = testContainer.querySelectorAll('a.leaflet-toolbar-action');

			for (var i = 0, l = actionButtons.length; i < l; i++) {
				actionNames.push(actionButtons[i].getAttribute('data-leaflet-toolbar-action'));
			}

			expect(actionNames).to.deep.equal(Object.keys(actions));
		});
	});

	describe("#getHTML", function() {
		it.skip("Should set the HTML content of the container correctly.", function() {
			var tmp = L.DomUtil.create('div'),
				container = toolbar.getHTML(),
				dom;

			tmp.innerHTML = container;
			dom = tmp.childNodes[0];

			expect(container).to.be.a('string');
			expect(dom.tagName).to.equal("UL");
			expect(dom.children.length).to.equal(Object.keys(actions).length);

			for (var i = 0, l = dom.children.length; i < l; i++) {
				expect(dom.children[i].tagName).to.equal("LI");
			}
		});
	});
});