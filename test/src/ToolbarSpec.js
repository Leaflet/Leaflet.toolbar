describe("L.Toolbar", function() {
	var toolbar,
		action = sinon.spy(),
		actions = [
			new L.ToolbarAction(action, {})
		];

	beforeEach(function() {
		toolbar = new L.Toolbar(actions);
	});

	describe("#initialize", function() {
		it("Should store the array of actions.", function() {
			expect(toolbar._actions.length).to.equal(actions.length);
		});
	});

	describe("#attachHandlers", function() {
		it("Should bind each action to a corresponding button with a click handler.", function() {

		});
	});

	describe("#getHTML", function() {
		it("Should set the HTML content of the container correctly.", function() {
			var tmp = L.DomUtil.create('div'),
				container = toolbar.getHTML(),
				dom;

			tmp.innerHTML = container;
			dom = tmp.childNodes[0];

			expect(container).to.be.a('string');

			expect(dom.tagName).to.equal("UL");
			expect(dom.children.length).to.equal(toolbar._actions.length);
			for (var i = 0, l = dom.children.length; i < l; i++) {
				expect(dom.children[i].tagName).to.equal("LI");
			}
		});
	});
});