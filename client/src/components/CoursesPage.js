import React from "react";
//ToDo: change course to display league members instead
// THis now becomes "Leage" instead of Courses
class CoursesPage extends React.Component {
  renderTable = () => {
    let table = [];
    for (let r = 0; r < this.props.league.length; ++r) {
      table
        .push
        // <tr key={r}>
        //   <td>{this.props.rounds[r].date.substring(0, 10)}</td>
        //   <td>{this.props.rounds[r].course}</td>
        //   <td>
        //     {Number(this.props.rounds[r].strokes) +
        //       Number(this.props.rounds[r].minutes) +
        //       ":" +
        //       (this.props.rounds[r].seconds < 10
        //         ? "0" + this.props.rounds[r].seconds
        //         : this.props.rounds[r].seconds) +
        //       " (" +
        //       this.props.rounds[r].strokes +
        //       " in " +
        //       this.props.rounds[r].minutes +
        //       ":" +
        //       (this.props.rounds[r].seconds < 10
        //         ? "0" + this.props.rounds[r].seconds
        //         : this.props.rounds[r].seconds) +
        //       ")"}
        //   </td>
        // </tr>
        ();
    }
    return table;
  };

  render() {
    return (
      // Table[player |  record | account name]
      // ** ToDo: if a manager has 0 players, bring up a prompt to join a league
      <div className="padded-page">
        <h1></h1>
        <table className="table table-hover">
          <thead className="thead-light">
            <tr>
              <th>Team Name</th>
              <th>Record</th>
              <th>User Name</th>
            </tr>
          </thead>
          {/* <tbody>
            {Object.keys(this.props.league).length === 0 ? (
              <tr>
                <td colSpan="3" style={{ fontStyle: "italic" }}>
                  No data to show
                </td>
              </tr>
            ) : (
              this.renderTable()
            )}
          </tbody> */}
        </table>
      </div>
    );
  }
}

export default CoursesPage;
