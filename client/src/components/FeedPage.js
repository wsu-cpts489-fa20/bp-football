import React from "react";
// My Teams page, instead of Feed
class FeedPage extends React.Component {
  constructor(props) {
    super();
    this.state = {
      players: [],
    };
  }

  populateForm = () => {
    //ToDo: populate selection forms
    // sort by position
    //have starters be the initial value
  };

  //componentDidMount
  componentDidMount = async () => {
    let response = await fetch("/users/" + this.props.userObj.id);
    response = await response.json();
    const obj = JSON.parse(response);
    console.log(obj.players);
    this.setState({
      players: obj.players,
    });
    this.populateForm();
  };

  render() {
    return (
      <div className="padded-page">
        <center>
          <form>
            <label>
              QB
              <select>
                <option>{/* all available qbs*/}</option>
              </select>
            </label>

            <label>
              WR
              <select>
                <option>{/* all available wrs*/}</option>
              </select>
            </label>

            <label>
              RB
              <select>
                <option>{/* all available wrs*/}</option>
              </select>
            </label>

            <label>
              K
              <select>
                <option>{/* all available wrs*/}</option>
              </select>
            </label>

            <label>
              D
              <select>
                <option>{/* all available qbs*/}</option>
              </select>
            </label>
          </form>
        </center>
      </div>
    );
  }
}

export default FeedPage;
