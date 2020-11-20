import React from "react";
import CSVReader from "react-csv-reader";
class DraftPage extends React.Component {
  parseOptions = (data, fileInfo) => {
    console.log("parsed");
    console.log(data);
    //parse it
  };

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
              <CSVReader onFileLoaded={this.parseOptions} label="upload team" />
              <button
                type="submit"
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
