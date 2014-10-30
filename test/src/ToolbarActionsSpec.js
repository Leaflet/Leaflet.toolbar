describe("L.ToolbarAction", function() {
	var fn,
		action,
		toolbar;


	beforeEach(function() {
		fn = sinon.spy();

		action = new L.ToolbarAction(fn, {});
		toolbar = new L.Toolbar({ 'test-action': action });
	});

	describe("#trigger", function() {
		it("Should call the appropriate toolbar action.", function() {
			var target = L.DomUtil.create('div');
			target.setAttribute('data-leaflet-toolbar-action', 'test-action');
			
			action._onClick({});

			expect(fn.called).to.equal(true);
		});
	});
});

/* Factory function */
describe("L.toolbarAction", function() {
	it("Should return an instance of L.ToolbarAction", function() {
		var action = L.toolbarAction();

		expect(action).to.be.an.instanceof(L.ToolbarAction);
	});
});