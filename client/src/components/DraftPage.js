import React from "react";
import CSVReader from "react-csv-reader";
class DraftPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      NFLPlayerList: [],
      QBList: [],
      RBList: [],
      WRList: [],

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
    console.log(this.props.playerData.players);
    if(this.props.playerData != 0 && this.state.QBList.length == 0){
      for(let i = 0; i < this.props.playerData.players.length; i++){
        console.log(this.props.playerData.players[i]);
   
        console.log(this.props.playerData.players[i].player.fullName);
        if(this.props.playerData.players[i].player.defaultPositionId == 1){
          this.state.QBList.push(this.props.playerData.players[i].player.fullName);
        }
        else if(this.props.playerData.players[i].player.defaultPositionId == 2){
          this.state.RBList.push(this.props.playerData.players[i].player.fullName);
        }
        else if(this.props.playerData.players[i].player.defaultPositionId == 3){
          this.state.WRList.push(this.props.playerData.players[i].player.fullName);
        }

        // this.state.NFLPlayerList.push(this.props.playerData.players[i].player.fullName);
      }
    }
  }

  render() {
    this.props.getCurrentData();
    this.createLists();
    var MakeItem = function(X) {
        return <option>{X}</option>;
    };    return (
    <div className="padded-page">
      <h1>Draft Team</h1>
      {this.props.playerData != 0 ?
      <div>
        QB: 
        <select style={{width: `${150}px`}}>
          {(this.state.QBList).map(MakeItem)}
        </select>
        RB: 
        <select style={{width: `${150}px`}}>
          {(this.state.RBList).map(MakeItem)}
        </select>
        WR: 
        <select style={{width: `${150}px`}}>
          {(this.state.WRList).map(MakeItem)}
        </select>
      </div>
      : null }
    </div>
    );
  }
}

export default DraftPage;
