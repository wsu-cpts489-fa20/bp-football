import React from "react";
import AppMode from "./../AppMode.js";

class CoursesTable extends React.Component {
  constructor() {
    super();
  }

  //populates table with league information
  renderTable = () => {
    let table = [];
    for (let r = 0; r < this.props.league.length; ++r) {
      table.push(
        <tr key={r}>
          <td>{this.props.league[r].users.teamName}</td>
          <td>{this.props.league[r].users.win}</td>
          <td>{this.props.league[r].users.loss}</td>
          <td>{this.props.league[r].users.displayName}</td>
        </tr>
      );
    }
    return table;
  };

  //populates the table with headers and data from rendertable
  //if not in league will prompt to join one
  render() {
    return (
      <div className="padded-page">
        <h1></h1>
        <table className="table table-hover">
          <thead className="thead-light">
            <tr>
              <th>Team Name</th>
              <th>Wins</th>
              <th>Losses</th>
              <th>Display Name</th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(this.props.league).length === 0 ? (
              <tr>
                <td colSpan="5" style={{ fontStyle: "italic" }}>
                  No data to show. Not in a league
                </td>
              </tr>
            ) : (
              this.renderTable()
            )}
          </tbody>
        </table>
      </div>
    );
  }
}

export default CoursesTable;
