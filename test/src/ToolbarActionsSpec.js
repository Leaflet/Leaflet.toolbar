describe("L.ToolbarAction", function() {
	var fn,
		action,
		toolbar;


	beforeEach(function() {
		fn = sinon.spy();

		action = new L.ToolbarAction(fn, {});
		toolbar = new L.Toolbar([action]);
	});

	describe("#trigger", function() {
		it("Should call the appropriate toolbar action.", function() {
			toolbar._onClick({ target: { _action: action }});

			expect(fn.called).to.equal(true);
		});
	});
});