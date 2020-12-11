import React from "react";
import AppMode from "./../AppMode.js";

class DraftPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      NFLPlayerList: [],
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

  //Add players to the backend
  addPlayers = async (newData) => {
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
} 


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
  }

  render() {
      var MakeItem = function(X) {
          return <option>{X.name}</option>;
      };   
    
    return (
    <div className="padded-page">
      <h1>Draft Team</h1>
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
              &nbsp;Submit Team Draft
          </button>
        </center>
      </div>
      {/* : null } */}
    </div>
    );
  }
}

export default DraftPage;
