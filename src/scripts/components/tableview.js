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

module.exports = TableView;

