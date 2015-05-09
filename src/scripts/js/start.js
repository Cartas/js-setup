const require = require("requirejs");
const React = require("react");

const path = decodeURI(window.location.pathname);
const props = {
    path: path
};

const element = React.createElement(<div>Moo</div>, props);
React.render(element, document.getElementById("app"));
