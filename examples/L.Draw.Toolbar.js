L.Draw.TOOLBAR = {
	
	'draw-polyline': 	new L.ToolbarAction(L.Draw.Polyline, { 
							className: 'leaflet-draw-polyline',
							tooltip: L.drawLocal.draw.toolbar.buttons.polyline,
							secondaryActions: [ 'Cancel' ]
						}),


	'draw-polygon': 	new L.ToolbarAction(L.Draw.Polygon, { 
							className: 'leaflet-draw-polygon',
							tooltip: L.drawLocal.draw.toolbar.buttons.polygon
						})

};