import React from "react";
import CoursesTable from "./CoursesTable";
import AppMode from "./../AppMode.js";
// THis now becomes "Leage" instead of Courses
class CoursesPage extends React.Component {
  constructor() {
    super();
  }

  componentDidMount = async () => {
    //copy from teampage
    //use league route to get a league obj
    //inside the league obj is :
    // obj.leagueName
    // this.setstate(players: obj.players[])
    //  this.state.players[] has team info
    // reuse getffp to create a team viewer for each user in the league
  };
  //need to add a function that fills the table with current league data

  render() {
    return (
      <div className="padded-page">
        <center>
          <h1>League Page</h1>
          <h2>{this.props.userObj.league.LeagueName}</h2>
        </center>
        <CoursesTable
          league={this.props.userObj.league}
          changeMode={this.props.changeMode}
          menuOpen={this.props.menuOpen}
        />
      </div>
    );
  }
}

export default CoursesPage;
