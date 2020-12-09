import React from "react";
import CSVReader from "react-csv-reader";
import PlayerManagement from "./PlayerManagement";
class DraftPage extends React.Component {
  constructor(props) {
    super(props);
    this.parsedata = [];
    this.fileInfo = [];
    this.leagueName = "";
    this.state = {
      playersData: [],
      showGoToLeauge: false
    };
  }

  goToLeauge = () => {
    this.setState({ showGoToLeauge: true });
  }

  componentDidMount = async () => {
    // let response = await fetch("/league/" + this.props.userObj.id);
    // response = await response.json();
    // const obj = JSON.parse(response);
    // console.log(obj.players);
    // this.setState({
    //   players: obj.players,
    // });
  };

  addPlayers = async (newData) => {
    /* const url = "/games/addplayers/" + this.props.userObj.id;
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

  //update this to display all leagues the user manages
  renderTable = () => {
    let table = [];

    for (let r = 0; r < this.state.playerStats.length; ++r) {
      if (this.state.playerStats[r][2] == true) {
        table.push(
          <tr key={r}>
            <td>{this.state.playerStats[r][0]}</td>
            <td>{this.state.playerStats[r][1]}</td>
            <td>{this.state.playerStats[r][3]}</td>
            <td>
              <button>
                <span className="fa fa-eye"></span>
              </button>
            </td>
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
            <td>
              <button>
                <span className="fa fa-eye"></span>
              </button>
            </td>
          </tr>
        );
      }
    }

    return table;
  };

  render() {
    return (
      <div className="padded-page">
        <h1>My Leagues</h1>
        <table className="table table-hover">
          <thead className="thead-light">
            <tr>
              <th>Manager/User</th>
              <th>League</th>
              <th> 
                <button onClick={() => this.goToLeauge()}>
                  Go To
                </button>
              </th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {/* {this.state.showRender == true ? this.renderTable() : null} */}
          {/* <button onClick={this.goToLeauge()}>
            Go To
          </button> */}
          </tbody>
        </table>
        {this.state.showGoToLeauge == true ?
        <PlayerManagement 
          playerData={this.props.playerData}
        />
        : null}
      </div>
    );
  }
  
}

export default DraftPage;
