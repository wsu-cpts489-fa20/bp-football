import React from "react";
import CSVReader from "react-csv-reader";
class PlayerManagement extends React.Component {
  constructor(props) {
    super(props);
    this.parsedata = [];
    this.fileInfo = [];
    this.leagueName = "";
    this.state = {
      NFLPlayerList: this.props.playerData,
    };
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
    var  MakeItem = function(X) {
                return <option>{X}</option>;
            };
    return (
    <div className="padded-page">
      {/* <div class="dropdown">
        <button onclick="myFunction()" class="dropbtn">Dropdown</button>
        <div id="myDropdown" class="dropdown-content">
          <input type="text" placeholder="Search.." id="myInput" onkeyup="filterFunction()"/>
          <a href="#about">About</a>
          <a href="#base">Base</a>
          <a href="#blog">Blog</a>
          <a href="#contact">Contact</a>
          <a href="#custom">Custom</a>
          <a href="#support">Support</a>
          <a href="#tools">Tools</a>
        </div>
      </div>       */}
      <select>{this.state.NFLPlayerList.map(MakeItem)}</select>
    </div>
    );
  }
}

export default PlayerManagement;
