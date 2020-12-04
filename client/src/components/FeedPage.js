import React from "react";
class FeedPage extends React.Component {
  constructor(props) {
    super();
    this.state = {
      data: [],
      players: [],
      names: [],
      nflList: [],
      positions: [],
      playerName: "",
      playerStats: [],
      showRender: false
    };
  }

  // getCurrentData = async() => {
  //   var filters = {
  //     "players": {
  //         "limit": 1500,
  //         "sortDraftRanks": {
  //             "sortPriority": 100,
  //             "sortAsc": true,
  //             "value": "STANDARD"
  //         }
  //     }
  //   };
  
  //   var options = {
  //       "headers": {
  //           "x-fantasy-filter": JSON.stringify(filters)
  //       }
  //   };
    
  //   const response = await fetch('https://fantasy.espn.com/apis/v3/games/FFL/seasons/2020/segments/0/leaguedefaults/1?view=kona_player_info', options);
  //   const d = await response.json();
  //   this.setState({ data: d });

    // console.log(data);
    // console.log(data.players[0]);
    // console.log(data.players[0].player.stats);
    // console.log(data.players[0].player.stats[0]);
    // console.log("new one" + data.players[0].player.stats[0].stats)
    // console.log(data.players[0].player.stats[0].appliedTotal)
    // console.log(this.state.playerName);
    // console.long(data[0].player.fullName);
    // for (let i = 0; i < data.players.length; i++){
    //   for (let r = 0; r < this.state.players.length; ++r) {
    //     if (data.players[i].player.fullName == this.state.players[r].name) {
    //       for (let k = 0; k < data.players[i].player.stats.length; k++){
    //         // console.log("statSource: " + data.players[i].player.stats[k].statSourceId + "StatSplit: " + data.players[i].player.stats[k].statSplitTypeId)
    //         if (data.players[i].player.stats[k].seasonId == 2020 && data.players[i].player.stats[k].scoringPeriodId == 0 
    //             && data.players[i].player.stats[k].statSourceId == 0 && data.players[i].player.stats[k].statSplitTypeId == 0){
    //           console.log(this.state.players[r].name + " Week " + data.players[i].player.stats[k].scoringPeriodId)
    //           console.log(data.players[i].player.stats[k].appliedTotal);
    //           let temp = [];
    //           temp.push(this.state.players[r].name);
    //           temp.push(this.state.players[r].position);
    //           temp.push(this.state.players[r].starter);
    //           temp.push(data.players[i].player.stats[k].appliedTotal);
    //           this.state.playerStats.push(temp);
    //           console.log(this.state.playerStats[0][0]);
    //           console.log(this.state.playerStats[0][1]);
    //         }
    //       }
    //     }  
    //   }
    // }

    // this.confirmRender();
    // return this.renderTable()
  // }

  getFFP = () => {
    this.props.getCurrentData();

    for (let i = 0; i < this.props.playerData.players.length; i++){
      for (let r = 0; r < this.state.players.length; ++r) {
        if (this.props.playerData.players[i].player.fullName == this.state.players[r].name) {
          for (let k = 0; k < this.props.playerData.players[i].player.stats.length; k++){
            // console.log("statSource: " + data.players[i].player.stats[k].statSourceId + "StatSplit: " + data.players[i].player.stats[k].statSplitTypeId)
            if (this.props.playerData.players[i].player.stats[k].seasonId == 2020 && this.props.playerData.players[i].player.stats[k].scoringPeriodId == 0 
                && this.props.playerData.players[i].player.stats[k].statSourceId == 0 && this.props.playerData.players[i].player.stats[k].statSplitTypeId == 0){
              console.log(this.state.players[r].name + " Week " + this.props.playerData.players[i].player.stats[k].scoringPeriodId)
              console.log(this.props.playerData.players[i].player.stats[k].appliedTotal);
              let temp = [];
              temp.push(this.state.players[r].name);
              temp.push(this.state.players[r].position);
              temp.push(this.state.players[r].starter);
              temp.push(this.props.playerData.players[i].player.stats[k].appliedTotal);
              this.state.playerStats.push(temp);
              console.log(this.state.playerStats[0][0]);
              console.log(this.state.playerStats[0][1]);
            }
          }
        }  
      }
    }

    this.confirmRender();

  }
  confirmRender = () => {
    this.setState({ showRender: true });
  };

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
    this.renderTable();
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
    // this.getCurrentData();
    // this.props.getCurrentData();
    this.getFFP();
  };


  renderTable = () => {
    let table = [];
    // for (let r = 0; r < this.state.players.length; ++r) {
    //   if (this.state.players[r].starter == true){
    //     table.push(
    //       <tr key={r}>
    //         <td>{this.state.players[r].name}</td>
    //         <td>{this.state.players[r].position}</td>
    //       </tr>
    //     );
    //   }
    // }
            
    // table.push(<h1>Bench</h1>) 

    // for (let s = 0; s < this.state.players.length; ++s) {
    //   if (this.state.players[s].starter == false){
    //     table.push(
    //       <tr key={s}>
    //         <td>{this.state.players[s].name}</td>
    //         <td>{this.state.players[s].position}</td>
    //       </tr>
    //     );
    //   }
    // }

    for (let r = 0; r < this.state.playerStats.length; ++r) {
      if (this.state.playerStats[r][2] == true){
        table.push(
          <tr key={r}>
            <td>{this.state.playerStats[r][0]}</td>
            <td>{this.state.playerStats[r][1]}</td>
            <td>{this.state.playerStats[r][3]}</td>
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
            <td>{this.state.playerStats[s][3]}</td>
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
              <th>2020 Season FFP</th>
            </tr>
          </thead>
          <tbody>
          {this.state.showRender == true ? (
                this.renderTable()) : null }

            {/* {Object.keys(this.state.players).length === 0 ? (
              <tr>
                <td colSpan="5" style={{ fontStyle: "italic" }}>
                  Team not drafted yet
                </td>
              </tr>
            ) : (
            this.renderTable()
            // () => this.getCurrentData()
            )}  */}
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
