describe("L.ToolbarAction", function() {
	var map,
		fn,
		action,
		toolbar;

	beforeEach(function() {
		fn = sinon.spy(L.Draw.Polyline.prototype, 'enable');

		map = new L.Map(L.DomUtil.create('div')).setView([41.7896,-87.5996], 15);
		action = new L.ToolbarAction(L.Draw.Polyline, {});
		toolbar = new L.Toolbar({ 'test-action': action });

		/* Call #onAdd (rather than #addTo) so that we can pass in a mock container <div>. */
		toolbar._arguments = [map];
		toolbar.onAdd(map, L.DomUtil.create('div'));
	});

	afterEach(function() {
		L.Draw.Polyline.prototype.enable.restore();
	});

	describe("#_onClick", function() {
		it("Should call the toolbar action.", function() {
			action._onClick({});
			// expect(fn.called).to.equal(true);
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