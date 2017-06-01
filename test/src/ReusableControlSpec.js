describe("Reusable Controls", function() {
    var map,
        toolbar,
        startpos = "topright",
        ToolbarControl = L.Toolbar.Control.extend({
            switchPosition: function () {
                var pos = {
                    topright: "bottomleft",
                    bottomleft: "topright"
                };

                var control = this._control;
                var newpos = pos[control.getPosition()];
                control.setPosition(newpos);
            }
        }),
        ToolbarAction = L.ToolbarAction.extend({
            options: {
                toolbarIcon: {
                    id: 'move-toolbar-icon',
                    html: '&#10561;',
                    tooltip: 'move toolbar to another corner'
                }
            },
            addHooks: function () {
                this.toolbar.switchPosition();
            }
        }),
        click = function (el){
            var ev = document.createEvent("MouseEvent");
            ev.initMouseEvent(
                     "click",
                     true /* bubble */, true /* cancelable */,
                     window, null,
                     0, 0, 0, 0, /* coordinates */
                     false, false, false, false, /* modifier keys */
                     0 /*left*/, null
            );
            el.dispatchEvent(ev);
        };

    beforeEach(function() {
        var container = L.DomUtil.create('div');
        container.setAttribute('id', 'map-container');
        map = new L.Map(container).setView([41.7896,-87.5996], 15);
        toolbar = new ToolbarControl({
            position: startpos,
            actions: [ToolbarAction]
        }).addTo(map);

        document.body.insertAdjacentElement('afterbegin', container);
    });

    afterEach(function() {
        document.body.removeChild(document.getElementById('map-container'));
    });

    describe("#onAdd", function() {
        it("Adds the toolbar to the map.", function() {
            expect(map.hasLayer(toolbar)).to.equal(true);
        });
        it("Is in start position.", function () {
            expect(toolbar._control.getPosition()).to.equal(startpos);
        });
    });

    describe("#onClick", function() {
        it("is clicked via HTMLElement.click.", function() {
            expect(toolbar._control.getPosition()).to.equal(startpos);
            var icon = L.DomUtil.get('move-toolbar-icon');
            // PhantomJS version <2 ?
            if(icon.click) {
                expect(icon.click).to.be.an.instanceof(Function);
                icon.click();
            }
            else {
                click(icon);
            }
            expect(toolbar._control.getPosition()).not.to.equal(startpos);
            expect(toolbar._control.getPosition()).to.equal("bottomleft");
        });
    });

    describe("#onRemove", function() {
        it("Removes the toolbar from the map", function() {
            map.removeLayer(toolbar);
            expect(map.hasLayer(toolbar)).to.equal(false);
        });
    });
});
