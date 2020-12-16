import React from "react";
import { async } from "regenerator-runtime";
import AppMode from "./../AppMode.js";

class DraftPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      NFLPlayerList: [],
      leaguePlayers: [],
      leagueData:{},
      QBList: [],
      RBList: [],
      WRList: [],
      TEList: [],
      KList: [],
      DefList: [],
      positions: ["QB", "RB", "WR", "TE", "Kicker"],


      qb: "",
      rb: "",
      wr: "",
      te: "",
      k: "",
      def: "",
    };
  }

  setList = () => {
    this.setState({ NFLPlayerList: this.props.playerData});
  }

  componentDidMount = async () => {
    for(let i = 0; i < 5; i++){
      let response = await fetch("/getallplayers/" + this.state.positions[i]);
      response = await response.json();
      const obj = JSON.parse(response);
      console.log(obj);
      console.log(obj.players);
      if(i == 0){
        this.setState({
          QBList: obj,
        });  
      }
      else if(i == 1){
        this.setState({
          RBList: obj,
        });  
      }
      else if(i == 2){
        this.setState({
          WRList: obj,
        });  
      }
      else if(i == 3){
        this.setState({
          TEList: obj,
        });  
      }
      else if(i == 4){
        this.setState({
          KList: obj,
        });  
      }
    }
    this.getLeagueData();
  }

  //get the data from the league using the leagueId
  getLeagueData = async() => {
    // let data = await fetch("/getleague/" + this.props.userObj.leagueId);
    // data = await data.json();
    // console.log("data: ");
    // console.log(data);
    // const obj = JSON.parse(data);
    let response = await fetch("/getleague/555"); // OR + this.props.userObj.leagueId);
      response = await response.json();
      const obj = JSON.parse(response);
      console.log(obj);
    console.log("Inside getLeagueData - printing league object");
    this.setState({leagueData: obj});
  }

  //get all players that are in the league
  getListOfAllPlayersFromLeague = async() => {
    var unavailablePlayers = []; //players already owned by other users
    var leagueUserIds = this.state.leagueData[0].userIds; //all the user from the league
    
    var i;
    for (i = 0; i < leagueUserIds.length(); i++) {
      let data = await fetch("/users/" + leagueUserIds[i]);
      data = await data.json();
      const obj = JSON.parse(data);

      var j;
      for (j = 0; j < obj.players.length(); j++) {
        var player = obj.players[i];
        unavailablePlayers.push(player)
      }
    }

    this.setState({leaguePlayers: unavailablePlayers}); 

  }

  validatePlayers = () => {
    this.getListOfAllPlayersFromLeague();

    var duplicatePlayers = [];
    var i, j;
    for (i = 0; i < this.state.leaguePlayers.length(); i++) {
      if (this.state.qb === this.state.leaguePlayers[i]) {
        duplicatePlayers.push(this.state.qb);
      } else if (this.state.rb === this.state.leaguePlayers[i]) {
        duplicatePlayers.push(this.state.rb);
      } else if (this.state.wr === this.state.leaguePlayers[i]) {
        duplicatePlayers.push(this.state.wr);
      } else if (this.state.te === this.state.leaguePlayers[i]) {
        duplicatePlayers.push(this.state.te);
      } else if (this.state.k === this.state.leaguePlayers[i]) {
        duplicatePlayers.push(this.state.k);
      } else {
        continue;
      }
    }

    if (duplicatePlayers.length() >= 1) { //duplicate players
      alert("Cannot assign following players: " + duplicatePlayers.join());
      return false;
    }
    return true;
  }

  //Add players to the backend if players aren't selected by other members in the league
  addPlayers = async (newData) => {
    this.getLeagueData();
    var validate = this.validatePlayers();

    if (validate === true) {
      const url = 'http://localhost:8081/addplayers/' + this.props.userObj.id;
      const res = await fetch(url, {
          headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
              },
          method: 'POST',
          body: JSON.stringify(newData)}); 
      const msg = await res.text();
      if (res.status != 200) {
          console.log(msg);
      } else {
        console.log(msg);
      }
    } else {
      alert("Players you have selected are taken by other users in the league. Please select new players!");
    }
  }; 


  handleSubmit = () => {
    //send team info to backend

    var player1 = {};
    player1.name = this.state.qb;
    player1.position = "QB";
    player1.starter = true;
    this.addPlayers(player1);

    var player2 = {};
    player2.name = this.state.rb;
    player2.position = "RB";
    player2.starter = true;
    this.addPlayers(player2);

    var player3 = {};
    player3.name = this.state.wr;
    player3.position = "WR";
    player3.starter = true;
    this.addPlayers(player3);

    var player4 = {};
    player4.name = this.state.te;
    player4.position = "TE";
    player4.starter = true;
    this.addPlayers(player4);

    var player5 = {};
    player5.name = this.state.k;
    player5.position = "Kicker";
    player5.starter = true;
    this.addPlayers(player5);

    this.props.changeMode(AppMode.TEAM);
  };

  render() {
      var MakeItem = function(X) {
          return <option>{X.name}</option>;
      };   
    
    return (
    <div className="padded-page">
      <center>
        <h1>Draft My Offline Team</h1>
      </center>
      {/* {this.props.playerData != 0 ? */}
      <div>
        <center>
          <br/>
          QB: 
          <select style={{width: `${150}px`}} value={this.state.qb}
                  onChange={(value) => { this.setState({ qb: value.target.value }); }}>
            {(this.state.QBList).map(MakeItem)}
          </select>
          <br/>
          <br/>
          RB: 
          <select style={{width: `${150}px`}} value={this.state.rb}
                  onChange={(value) => { this.setState({ rb: value.target.value }); }}>          
            {(this.state.RBList).map(MakeItem)}
          </select>
          <br/>
          <br/>
          WR: 
          <select style={{width: `${150}px`}} value={this.state.wr}
                  onChange={(value) => { this.setState({ wr: value.target.value }); }}>
            {(this.state.WRList).map(MakeItem)}
          </select>
          <br/>
          <br/>
          TE: 
          <select style={{width: `${150}px`}} value={this.state.te}
                  onChange={(value) => { this.setState({ te: value.target.value }); }}>
            {(this.state.TEList).map(MakeItem)}
          </select>
          <br/>
          <br/>
          K: 
          <select style={{width: `${150}px`}} value={this.state.k}
                  onChange={(value) => { this.setState({ k: value.target.value }); }}>
            {(this.state.KList).map(MakeItem)}
          </select>
          <br/>
          <br/>
          {/* Def: 
          <select style={{width: `${150}px`}} value={this.state.def}
                  onChange={(value) => { this.setState({ def: value.target.value }); }}>
            {(this.state.DefList).map(MakeItem)}
          </select> */}
          <br/>
          {/* <br/> */}
          <button
              type="submit"
              className="btn-color-theme btn btn-primary btn-block"
              onClick={this.handleSubmit}
            >
              <span id="draft-btn-icon" className="submit-draft" />
              &nbsp;Submit Team
          </button>
        </center>
      </div>
      {/* : null } */}
    </div>
    )
  }
}

export default DraftPage;
