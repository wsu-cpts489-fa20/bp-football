import React from "react";
import ConfirmDeleteRound from "./ConfirmDeleteRound.js";
import AppMode from "./../AppMode.js";

class RoundsTable extends React.Component {
  constructor() {
    super();
    this.state = { showConfirmDelete: false };
  }

  //editRound -- Triggered when the user clicks the edit button for a given
  //round. The id param is the unique property that identifies the round.
  //Set the state variable representing the id of the round to be edited and
  //then switch to the ROUNDS_EDITROUND mode to allow the user to edit the
  //chosen round.
  editRound = (id) => {
    this.props.setEditId(id);
    this.props.changeMode(AppMode.ROUNDS_EDITROUND);
  };

  //deleteRound -- Triggered when the user clicks on the "Yes, Delete"
  //button in the Confirm Delete dialog box. It executes the deletion and
  //closes the dialog box.
  //ToDo: dont need delete anymore
  deleteRound = () => {
    this.props.deleteRound();
    this.setState({ showConfirmDelete: false });
  };

  //confirmDelete -- Triggered when the user clicks the delete button
  //for a given round. The id paam is the unique property that
  //identifies the round. Set the state variable representing the id
  //of the round to be deleted and then present a dialog box asking
  //the user to confirm the deletion.
  //ToDo: dont need delete anymore
  confirmDelete = (id) => {
    this.props.setDeleteId(id);
    this.setState({ showConfirmDelete: true });
  };

  //renderTable -- render an HTML table displaying the rounds logged
  //by the current user and providing buttons to view/edit and delete each round.
  //ToDo: populate table with game information instead of round info
  renderTable = () => {
    let table = [];
    for (let r = 0; r < this.props.rounds.length; ++r) {
      table.push(
        <tr key={r}>
          <td>{this.props.rounds[r].date.substring(0, 10)}</td>
          <td>{this.props.rounds[r].course}</td>
          <td>
            {Number(this.props.rounds[r].strokes) +
              Number(this.props.rounds[r].minutes) +
              ":" +
              (this.props.rounds[r].seconds < 10
                ? "0" + this.props.rounds[r].seconds
                : this.props.rounds[r].seconds) +
              " (" +
              this.props.rounds[r].strokes +
              " in " +
              this.props.rounds[r].minutes +
              ":" +
              (this.props.rounds[r].seconds < 10
                ? "0" + this.props.rounds[r].seconds
                : this.props.rounds[r].seconds) +
              ")"}
          </td>
        </tr>
      );
    }
    return table;
  };

  //render--render the entire rounds table with header, displaying a "No
  //Rounds Logged" message in case the table is empty.
  //ToDo: change table headers to match issue
  render() {
    return (
      <div className="padded-page">
        <h1></h1>
        <table className="table table-hover">
          <thead className="thead-light">
            <tr>
              <th>Team Name</th>
              <th>Match Up</th>
              <th>History</th>
              <th>League</th>
              <th>Record</th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(this.props.rounds).length === 0 ? (
              <tr>
                <td colSpan="5" style={{ fontStyle: "italic" }}>
                  No Data to show
                </td>
              </tr>
            ) : (
              this.renderTable()
            )}
          </tbody>
        </table>
        {this.state.showConfirmDelete ? (
          <ConfirmDeleteRound
            close={() => this.setState({ showConfirmDelete: false })}
            deleteRound={this.deleteRound}
          />
        ) : null}
      </div>
    );
  }
}

export default RoundsTable;
