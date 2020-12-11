import React from "react";
import AppMode from "./../AppMode.js";

class Rounds extends React.Component {
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
      showRender: false,
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
    console.log(this.props.playerData);
    if(this.props.playerData != 0){
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
    

    this.confirmRender();
    }
  };
  confirmRender = () => {
    this.setState({ showRender: true });
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

    for (let r = 0; r < this.state.playerStats.length; ++r) {
      if (this.state.playerStats[r][2] == true) {
        table.push(
          <tr key={r}>
            <td>{this.state.playerStats[r][0]}</td>
            <td>{this.state.playerStats[r][1]}</td>
            <td>{this.state.playerStats[r][3]}</td>
          </tr>
        );
      }
    }

    table.push(<h1>Bench</h1>);

    for (let s = 0; s < this.state.playerStats.length; ++s) {
      if (this.state.playerStats[s][2] == false) {
        table.push(
          <tr key={s}>
            <td>{this.state.playerStats[s][0]}</td>
            <td>{this.state.playerStats[s][1]}</td>
            <td>{this.state.playerStats[s][3]}</td>
            {/* <td><button onClick={this.props.menuOpen ? null : () => 
          this.editRound(r)}> */}
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
              <th>Weekly FFP</th>
            </tr>
            <tr>
              <th>Player</th>
              <th>Position</th>
              <th>Weekly FFP</th>
            </tr>
          </thead>
          <tbody>
            {this.state.showRender == true ? this.renderTable() : null}
          
            {/* {this.state.playerStats.length === undefined ? (
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
export default Rounds;


// //Rounds -- A parent component for the app's "rounds" mode.
// //Manages the rounds data for the current user and conditionally renders the
// //appropriate rounds mode page based on App's mode, which is passed in as a prop.

// import React from 'react';
// import AppMode from './../AppMode.js';
// import RoundsTable from './RoundsTable.js';
// import RoundForm from './RoundForm.js';
// import FloatingButton from './FloatingButton.js';

// class Rounds extends React.Component {

//     //Initialize a Rounds object based on local storage
//     constructor() {
//         super();
//         this.deleteId = "";
//         this.editId = "";
//         this.state = {errorMsg: ""};           
//     }

//     //addRound -- Given an object newData containing a new round, use the 
//     //server POST route to add the new round to the database. If the add is
//     //successful, call on the refreshOnUpdate() method to force the parent
//     //App component to refresh its state from the database and re-render itself,
//     //allowing the change to be propagated to the Rounds table. Then switch
//     //the mode back to AppMode.ROUNDS since the user is done adding a round.
//     addRound = async (newData) => {
//         const url = '/rounds/' + this.props.userObj.id;
//         const res = await fetch(url, {
//             headers: {
//                 'Accept': 'application/json',
//                 'Content-Type': 'application/json'
//                 },
//             method: 'POST',
//             body: JSON.stringify(newData)}); 
//         const msg = await res.text();
//         if (res.status != 200) {
//             this.setState({errorMsg: msg});
//             this.props.changeMode(AppMode.ROUNDS);
//         } else {
//             this.setState({errorMsg: ""});
//             this.props.refreshOnUpdate(AppMode.ROUNDS);
//         }
//     }

//     //editRound -- Given an object newData containing updated data on an
//     //existing round, update the current user's round in the database. 
//     //toggle the mode back to AppMode.ROUNDS since the user is done editing the
//     //round. 
//     editRound = async (newData) => {
//         const url = '/rounds/' + this.props.userObj.id + '/' + 
//             this.props.userObj.rounds[this.editId]._id;
//         const res = await fetch(url, {
//             headers: {
//                 'Accept': 'application/json',
//                 'Content-Type': 'application/json'
//                 },
//             method: 'PUT',
//             body: JSON.stringify(newData)}); 
//         const msg = await res.text();
//         if (res.status != 200) {
//             this.setState({errorMsg: msg});
//             this.props.changeMode(AppMode.ROUNDS);
//         } else {
//             this.props.refreshOnUpdate(AppMode.ROUNDS);
//         }
//     }


//     //deleteRound -- Delete the current user's round uniquely identified by
//     //this.state.deleteId, delete from the database, and reset deleteId to empty.
//     deleteRound = async () => {
//         const url = '/rounds/' + this.props.userObj.id + '/' + 
//             this.props.userObj.rounds[this.deleteId]._id;
//         const res = await fetch(url, {method: 'DELETE'}); 
//         const msg = await res.text();
//         if (res.status != 200) {
//             this.setState({errorMsg: "An error occurred when attempting to delete round from database: " 
//             + msg});
//             this.props.changeMode(AppMode.ROUNDS);
//         } else {
//             this.props.refreshOnUpdate(AppMode.ROUNDS);
//         }  
//     }
 
//     //setDeleteId -- Capture in this.state.deleteId the unique id of the item
//     //the user is considering deleting.
//     setDeleteId = (val) => {
//         this.deleteId = val;
//         this.setState({errorMsg: ""});
//     }

//     //setEditId -- Capture in this.state.editId the unique id of the item
//     //the user is considering editing.
//     setEditId = (val) => {
//         this.editId = val;
//         this.setState({errorMsg: ""});
//     }

//     closeErrorMsg = () => {
//         this.setState({errorMsg: ""});
//     }
    
//     //render -- Conditionally render the Rounds mode page as either the rounds
//     //table, the rounds form set to obtain a new round, or the rounds form set
//     //to edit an existing round.
//     render() {
//         switch(this.props.mode) {
//             case AppMode.ROUNDS:
//                 return (
//                     <>
//                     {this.state.errorMsg != "" ? <div className="status-msg"><span>{this.state.errorMsg}</span>
//                        <button className="modal-close" onClick={this.closeErrorMsg}>
//                           <span className="fa fa-times"></span>
//                         </button></div>: null}
//                     <RoundsTable 
//                         games={this.props.userObj.games}
//                         setEditId={this.setEditId}
//                         setDeleteId={this.setDeleteId}
//                         deleteRound={this.deleteRound}
//                         changeMode={this.props.changeMode}
//                         menuOpen={this.props.menuOpen} /> 
//                     {/* <FloatingButton
//                         handleClick={() => 
//                         this.props.changeMode(AppMode.ROUNDS_LOGROUND)}
//                         menuOpen={this.props.menuOpen}
//                         icon={"fa fa-plus"} /> */}
//                     </>
//                 );
//             case AppMode.ROUNDS_LOGROUND:
//                 return (
//                     <RoundForm
//                         mode={this.props.mode}
//                         startData={""} 
//                         saveRound={this.addRound} />
//                 );
//             case AppMode.ROUNDS_EDITROUND:
//                 let thisRound = {...this.props.userObj.rounds[this.editId]};
//                 thisRound.date = thisRound.date.substr(0,10);
//                 if (thisRound.seconds < 10) {
//                     thisRound.seconds = "0" + thisRound.seconds;
//                 } 
//                 delete thisRound.SGS;
//                 return (
//                     <RoundForm
//                         mode={this.props.mode}
//                         startData={thisRound} 
//                         saveRound={this.editRound} />
//                 );
//         }
//     }

// }   

// export default Rounds;
