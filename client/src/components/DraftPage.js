import React from "react";

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
    //
  };

  addPlayers = async (newData) => {
    /* const url = "/games/user/" + this.props.userObj.id;
    const res = await fetch(url, {
      method: "POST",
      body: JSON.stringify(newData),
    });
    const msg = await res.text();
    if (res.status != 200) {
      this.setState({ errorMsg: msg });
      //this.props.changeMode(AppMode.ROUNDS);
    } else {
      this.setState({ errorMsg: "" });
      //this.props.refreshOnUpdate(AppMode.ROUNDS);
    } */
  };

  createLists = () => {
    // console.log(this.props.playerData.players);
    if(this.props.playerData != 0 && this.state.QBList.length == 0){
      for(let i = 0; i < this.props.playerData.players.length; i++){
        // console.log(this.props.playerData.players[i]);
   
        // console.log(this.props.playerData.players[i].player.fullName);
        if(this.props.playerData.players[i].player.defaultPositionId == 1){
          this.state.QBList.push(this.props.playerData.players[i].player.fullName);
        }
        else if(this.props.playerData.players[i].player.defaultPositionId == 2){
          this.state.RBList.push(this.props.playerData.players[i].player.fullName);
        }
        else if(this.props.playerData.players[i].player.defaultPositionId == 3){
          this.state.WRList.push(this.props.playerData.players[i].player.fullName);
        }
        else if(this.props.playerData.players[i].player.defaultPositionId == 4){
          this.state.TEList.push(this.props.playerData.players[i].player.fullName);
        }
        else if(this.props.playerData.players[i].player.defaultPositionId == 5){
          this.state.KList.push(this.props.playerData.players[i].player.fullName);
        }
        else if(this.props.playerData.players[i].player.defaultPositionId == 16){
          this.state.DefList.push(this.props.playerData.players[i].player.fullName);
        }

        

        // this.state.NFLPlayerList.push(this.props.playerData.players[i].player.fullName);
      }
    }
  }

  handleSubmit = () => {
    //send team info to backend


  }

  render() {
    if (this.state.QBList.length == 0){
      this.props.getCurrentData();
      this.createLists();
    }
      var MakeItem = function(X) {
          return <option>{X}</option>;
      };   
    
    return (
    <div className="padded-page">
      <h1>Draft Team</h1>
      {this.props.playerData != 0 ?
      <div>
        <center>
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
          Def: 
          <select style={{width: `${150}px`}} value={this.state.def}
                  onChange={(value) => { this.setState({ def: value.target.value }); }}>
            {(this.state.DefList).map(MakeItem)}
          </select>
          <br/>
          <br/>
          <button
              type="submit"
              className="btn-color-theme btn btn-primary btn-block"
              onClick={this.handleSubmit()}
            >
              <span id="draft-btn-icon" className="submit-draft" />
              &nbsp;Submit Team Draft
          </button>
        </center>
      </div>
      : null }
    </div>
    );
  }
}

export default DraftPage;
