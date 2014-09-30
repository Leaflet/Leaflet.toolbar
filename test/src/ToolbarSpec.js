describe("L.Toolbar", function() {
	var toolbar,
		actions = [
			new L.ToolbarAction(function() { console.log('my first toolbar action'); }, {})
		];

	beforeEach(function() {
		toolbar = new L.Toolbar(actions);
	});

	describe("#initialize", function() {
		it("Should store the array of actions.", function() {
			expect(toolbar._actions.length).to.equal(actions.length);
		});
	});

	describe("#getHTML", function() {
		it("Should set the HTML content of the container correctly.", function() {
			var container = toolbar.getHTML();

			expect(container.tagName).to.equal("UL");
			expect(container.children.length).to.equal(toolbar._actions.length);
			for (var i = 0, l = container.children.length; i < l; i++) {
				expect(container.children[i].tagName).to.equal("LI");
			}
		});
	});
});