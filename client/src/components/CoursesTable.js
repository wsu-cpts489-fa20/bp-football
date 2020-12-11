import React from "react";
import AppMode from "./../AppMode.js";

class CoursesTable extends React.Component {
  constructor(props) {
    super();
    this.state = {
      teamNames: [], //team name
      wins: [],     //wins
      losses: [],   //losses
      ManagerNames: [],//managers
      leagueId: "",   //leagueID --same for all 
      leagueName: "", //leadueName --same for all
    };
  }

  componentDidMount = async () => {
    let response = await fetch("/leagues/" + this.props.userObj.leagueName);
    response = await response.json();
    const obj = JSON.parse(response);
    console.log(obj.leagueId)
    this.setState({
      leagueId: obj.leagueId,
      leagueName: obj.leagueName
    });
    //copy from teampage
    //use league route to get a league obj
    //inside the league obj is :
    // obj.leagueName
    // this.setstate(players: obj.players[])
    //  this.state.players[] has team info
    // reuse getffp to create a team viewer for each user in the league
  }; 
 /*  getFFP = () => {
    this.props.getCurrentData();

    for (let i = 0; i < this.props.playerData.players.length; i++) {
      for (let r = 0; r < this.state.players.length; ++r) {
        if (
          this.props.playerData.players[i].player.fullName ==
          this.state.players[r].name
        ) {
          for (
            let k = 0;
            k < this.props.playerData.players[i].player.stats.length;
            k++
          ) {
            // console.log("statSource: " + data.players[i].player.stats[k].statSourceId + "StatSplit: " + data.players[i].player.stats[k].statSplitTypeId)
            if (
              this.props.playerData.players[i].player.stats[k].seasonId ==
                2020 &&
              this.props.playerData.players[i].player.stats[k]
                .scoringPeriodId == 0 &&
              this.props.playerData.players[i].player.stats[k].statSourceId ==
                0 &&
              this.props.playerData.players[i].player.stats[k]
                .statSplitTypeId == 0
            ) {
              //console.log(this.state.players[r].name + " Week " + this.props.playerData.players[i].player.stats[k].scoringPeriodId)
              //console.log(this.props.playerData.players[i].player.stats[k].appliedTotal);
              let temp = [];
              temp.push(this.state.players[r].name);
              temp.push(this.state.players[r].position);
              temp.push(this.state.players[r].starter);
              temp.push(
                this.props.playerData.players[i].player.stats[k].appliedTotal
              );
              this.state.playerStats.push(temp);
              //console.log(this.state.playerStats[0][0]);
              console.log(this.state.playerStats[0][1]);
            }
          }
        }
      }
    }
  }; */

  //populates table with league information
  renderTable = () => {
    let table = [];
    for (let r = 0; r < this.state.teamNames.length; ++r) {
      table.push(
        <tr key={r}>
          <td>{this.state.teamNames[r]}</td>
          <td>{this.state.wins[r]}</td>
          <td>{this.state.losses[r]}</td>
          <td>{this.state.ManagerNames[r]}</td>
          <button>
              <span className="fa fa-eye"></span>
          </button>
        </tr>
      );
    }
    return table;
  };

  //populates the table with headers and data from rendertable
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
              <th>Manager Name</th>
              <th>View Team</th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(this.state.teamNames).length === 0 ? (
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
