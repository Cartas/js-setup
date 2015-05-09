"use strict";

var requirejs = require("requirejs");
var React = require("react");

var path = decodeURI(window.location.pathname);
var props = {
    path: path
};

var element = React.createElement(React.createElement(
    "div",
    null,
    "Moo"
), props);
React.render(element, document.getElementById("app"));
