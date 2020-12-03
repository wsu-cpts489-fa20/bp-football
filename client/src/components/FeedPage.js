import React from "react";
// My Teams page, instead of Feed
class FeedPage extends React.Component {
  constructor(props) {
    super();
    this.state = {
      players: [],
      names: [],
      positions: []
    };
    // this.names = [];
    // this.positions = [];

  }

  populateForm = () => {
    //ToDo: populate selection forms
    // sort by position
    //have starters be the initial value
    for (let r = 0; r < this.state.players.length; ++r) {
      if (this.state.players[r].name != null){
        this.state.names[r] = this.state.players[r].name;
        this.state.positions[r] = this.state.players[r].position;
        // this.names[r] = this.state.players[r].name
      }
    }
    this.render();
  };

  //componentDidMount
  componentDidMount = async () => {
    let response = await fetch("/users/" + this.props.userObj.id);
    response = await response.json();
    const obj = JSON.parse(response);
    console.log(obj.players);
    this.setState({
      players: obj.players,
    });
    // this.populateForm();
  };


  renderTable = () => {
    let table = [];
    for (let r = 0; r < this.state.players.length; ++r) {
      if (this.state.players[r].starter == true){
        table.push(
          <tr key={r}>
            <td>{this.state.players[r].name}</td>
            <td>{this.state.players[r].position}</td>
          </tr>
        );
      }
    }
            
    table.push(<h1>Bench</h1>) 

    for (let s = 0; s < this.state.players.length; ++s) {
      if (this.state.players[s].starter == false){
        table.push(
          <tr key={s}>
            <td>{this.state.players[s].name}</td>
            <td>{this.state.players[s].position}</td>
          </tr>
        );
      }
    }

    return table;
  };

  //render--render the entire rounds table with header, displaying a "No
  //Rounds Logged" message in case the table is empty.
  //ToDo: change table headers to match issue
  render() {
    return (
      <div className="padded-page">
        <h1>Starting Lineup</h1>
        <table className="table table-hover">
          <thead className="thead-light">
            <tr>
              <th>Player</th>
              <th>Position</th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(this.state.players).length === 0 ? (
              <tr>
                <td colSpan="5" style={{ fontStyle: "italic" }}>
                  Team not drafted yet
                </td>
              </tr>
            ) : (
            this.renderTable()
            )} 
          </tbody>
        </table>
        {/* {this.state.showConfirmDelete ? (
          <ConfirmDeleteRound
            close={() => this.setState({ showConfirmDelete: false })}
            deleteRound={this.deleteRound}
          />
        ) : null} */}
      </div>
    );
  }

}
export default FeedPage;
