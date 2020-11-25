import React from "react";
import CSVReader from "react-csv-reader";
class DraftPage extends React.Component {
  constructor(props) {
    super(props);
    this.parsedata = [];
    this.fileInfo = [];
    this.leagueName = "";
    this.state = {
            playersData: []
    };
  }

  parseOptions = (data, info) => {
    console.log(data);
    console.log(info);
    this.parsedata = data;

    this.setState({playersData: data});

    this.fileInfo = info;
  };

  addPlayers = async (newData) => {
    const url = '/games/addplayers/' + this.props.userObj.id;
    const res = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(newData)}); 
    const msg = await res.text();
    if (res.status != 200) {
        this.setState({errorMsg: msg});
        //this.props.changeMode(AppMode.ROUNDS);
    } else {
        this.setState({errorMsg: ""});
        //this.props.refreshOnUpdate(AppMode.ROUNDS);
    }
  }


  render() {
    return (
      //ToDo
      // Parse .csv and populate a table of all available players.
      // Create a form for: league name, some basic league settings, upload file button
      // Upon submit, make that user a commissioner in the db
      // Update user in database with players
      <div className="padded-page">
        {/* <button className="modal-close" onClick={this.props.close}>
          &times;
        </button> */}
        {/* <center> */}
          {/* <form className="padded-page" onSubmit={this.handleSubmit}> */}
            <center>
              <label>
                League Name:
                <input
                  name="leagueName"
                  id="leagueName"
                  className="form-control form-center"
                  type="text"
                  onChange={this.handleChange}
                  placeholder="League Name"
                  value={this.leagueName}
                  size="50"
                  maxLength="50"
                />
              </label>
              <p></p>
              <label>
                Format:
                <select
                  name="format"
                  id="leagueFormat"
                  className="form-control form-center"
                  onChange={this.handleChange}
                >
                  <option value="full">Full PPR</option>
                  <option value="half">Half PPR</option>
                </select>
              </label>
              <p></p>
              <CSVReader
                onFileLoaded={(data, fileInfo) => this.parseOptions(data, fileInfo)}
              />   
              <br></br>           
              <button
                type="submit" 
                id="SubmitTeamBtn"
                onClick={this.addPlayers(this.state.playersData)}
                // style={{ width: "70%", fontSize: "36px" }}
                className="btn-color-theme btn btn-primary btn-block login-btn">
                <span id="draft-btn-icon"/>
                &nbsp;Submit Team

                </button>
            </center>
          {/* </form> */}
        {/* </center> */}
      </div>
    );
  }
}

export default DraftPage;
