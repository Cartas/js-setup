"use strict";
const React = require("react");
const Row = require("./module");

var TableView = React.createClass({
  render() {
    return (
      <table>
        <thead>
        </thead>
        <tbody>
          <Row />
          Moo
        </tbody>
      </table>
    );
  }
});

export default TableView;
