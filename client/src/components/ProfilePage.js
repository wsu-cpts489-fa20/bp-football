import React from "react";

class ProfilePage extends React.Component {
  constructor() {
    super();
    this.state = {
      achievements: [],
    };
  }
  renderTable = () => {
    let table = [];
    for (let r = 0; r < this.state.achievements.length; ++r) {
      table.push(
        <tr key={r}>
          <td>{this.state.achievements[r].title}</td>
          <td>{this.state.achievements[r].description}</td>
        </tr>
      );
    }
    return table;
  };

  componentDidMount = async () => {
    let response = await fetch("/users/" + this.props.userObj.id);
    response = await response.json();
    const obj = JSON.parse(response);
    console.log(obj.achievements);
    this.setState({
      achievements: obj.achievements,
    });
  };

  render() {
    return (
      <div className="padded-page">
        <div className="padded-page">
          <div class="profile-container">
            <div class="header"></div>
            <div class="content">
              <div class="form-container">
                <center>
                  <h1>{this.props.userObj.displayName}</h1>
                </center>
                <div className="padded-page">
                  <h3>Achievements</h3>
                  <table>
                    <tbody class="thead-light">
                      {Object.keys(this.state.achievements).length === 0 ? (
                        <tr>
                          <td
                            colSpan="2"
                            style={{ fontStyle: "italic", width: "25%" }}
                          >
                            No data to show
                          </td>
                        </tr>
                      ) : (
                        this.renderTable()
                      )}
                    </tbody>
                  </table>
                </div>
                <div class="form-item"></div>
                <div class="form-item"></div>
                <div class="bottom-item"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ProfilePage;
