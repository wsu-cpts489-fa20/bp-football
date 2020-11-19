import React from "react";
import CSVReader from "react-csv-reader";
class DraftPage extends React.Component {
  constructor(props) {
    super(props);
    this.parsedata = [];
    this.fileInfo = [];
    this.state = {
            players: []
    };
  }

  parseOptions = (data, info) => {
    console.log(data);
    console.log(info);
    this.parsedata = data;
    this.fileInfo = info;
    //parse it
  };

  addPlayers = async (newData) => {
    const url = '/players/' + this.props.userObj.id;
    const res = await fetch(url, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
            },
        method: 'POST',
        body: JSON.stringify(newData)}); 
    const msg = await res.text();
    if (res.status != 200) {
        this.setState({errorMsg: msg});
        // this.props.changeMode(AppMode.ROUNDS);
    } else {
        this.setState({errorMsg: ""});
        // this.props.refreshOnUpdate(AppMode.ROUNDS);
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
        <button className="modal-close" onClick={this.props.close}>
          &times;
        </button>
        <center>
          <form className="padded-page" onSubmit={this.handleSubmit}>
            <center>
              <label>
                League Name:
                <input
                  name="leagueName"
                  className="form-control form-center"
                  type="text"
                  onChange={this.handleChange}
                  placeholder="League Name"
                  size="50"
                  maxLength="50"
                />
              </label>
              <p></p>
              <label>
                Format:
                <select
                  name="format"
                  className="form-control form-center"
                  onChange={this.handleChange}
                >
                  <option value="full">Full PPR</option>
                  <option value="half">Half PPR</option>
                </select>
              </label>
              <p></p>
              {/* <CSVReader onFileLoaded={this.parseOptions} label="upload team" /> */}
              {/* <CSVReader onFileLoaded={(data, fileInfo) => console.dir(data, fileInfo)} /> */}
              <CSVReader
                // cssClass="csv-reader-input"
                // label="Select CSV with secret Death Star statistics"
                // onFileLoaded={(this.state.parsedata, this.state.fileInfo) => console.dir(this.state.parsedata, this.state.fileInfo)}                onError={this.handleDarkSideForce}
                // parserOptions={this.parseOptions}
                onFileLoaded={(data, fileInfo) => this.parseOptions(data, fileInfo)}
                // inputId="ObiWan"
                // inputStyle={{color: 'red'}}
              />              
              <button
                type="submit" onClick={this.addPlayers(this.data)}
                style={{ width: "70%", fontSize: "36px" }}
                className="btn btn-primary btn-color-theme"
              ></button>
            </center>
          </form>
        </center>
      </div>
    );
  }
}

export default DraftPage;
