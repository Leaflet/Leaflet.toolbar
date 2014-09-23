Leaflet.Toolbar
===============

Extensible, flexible toolbar class for Leaflet maps.

Why Leaflet.Toolbar?
---------------

Leaflet.draw exports an `L.Toolbar` class, but one look at it is enough to tell that it wasn't designed to serve as a general-purpose constructor for Leaflet toolbars.  For example:
* Icons for all toolbar actions are given CSS classes prefixed with `leaflet-draw`.  Plugin developers aren't able to customize the CSS classes associated with each action.

What is a toolbar?
---------------

A toolbar is a UI element which exposes to users a set of actions.  Actions are triggered by clicks and may change the state of the map, add new layers to the map, or change the state of existing layers.


