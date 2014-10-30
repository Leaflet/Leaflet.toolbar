describe("L.ToolbarAction", function() {
	var fn,
		action,
		toolbar;

	beforeEach(function() {
		fn = sinon.spy();

		action = new L.ToolbarAction(fn, {});
		toolbar = new L.Toolbar({ 'test-action': action });
	});

	describe("#_onClick", function() {
		it("Should call the toolbar action.", function() {
			action._onClick({});
			expect(fn.called).to.equal(true);
		});
	});

	describe("#_addButton", function() {
		it("Should create an <a> inside a <li> element and attach an event listener.", function() {
			
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