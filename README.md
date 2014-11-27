Leaflet.Toolbar
===============

[![Build Status](https://travis-ci.org/manleyjster/Leaflet.Toolbar.svg?branch=master)](https://travis-ci.org/manleyjster/Leaflet.Toolbar)

[![Coverage Status](https://img.shields.io/coveralls/manleyjster/Leaflet.Toolbar.svg)](https://coveralls.io/r/manleyjster/Leaflet.Toolbar)

Extensible, flexible toolbar class for Leaflet maps.

Why Leaflet.Toolbar?
---------------

Leaflet.draw exports an `L.Toolbar` class, but it wasn't designed to serve as a general-purpose constructor for Leaflet toolbars.  For example:
* Icons for all toolbar actions are given CSS classes prefixed with `leaflet-draw`.  Plugin developers who want to create other kinds of toolbars (i.e. *not* for Leaflet.draw) aren't able to customize the CSS classes associated with each action.
* It is only designed to create `L.Control`-style toolbars fixed in one of the corners of the map. This makes it hard to use the Leaflet.draw version of `L.Toolbar` to create other kinds of toolbars, such as popup toolbars attached to vector layers.
* Toolbar behavior is not clearly separated from toolbar action behavior.  For example, toolbar buttons to cancel polyline and polygon drawing are described in `DrawToolbar.js` and created in `Toolbar.js`, rather than in `Draw.Polyline.js`, etc.

Furthermore, extending the default `Leaflet.draw` toolbar is cumbersome.  It's easy to create custom toolbars using only a subset of the `Leaflet.draw` actions, but in order to add custom actions to the `Leaflet.draw` toolbar, developers must define a new class extending `L.Control.Draw` and override `L.Control.Draw#getModeHandlers`.

This plugin is designed to address all of the above limitations and to make it easy for Leaflet developers to create custom toolbars.  In addition, this plugin is designed to be compatible with existing `Leaflet.draw` toolbar actions.

What is a toolbar?
---------------

A toolbar is a UI element which exposes to users a set of actions.  Actions are triggered by clicks and may change the state of the map, add new layers to the map, or change the state of existing layers.


