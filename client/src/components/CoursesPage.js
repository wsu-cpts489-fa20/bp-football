import React from "react";
import CoursesTable from './CoursesTable';
import AppMode from './../AppMode.js';
// THis now becomes "Leage" instead of Courses
class CoursesPage extends React.Component {

  constructor() {
    super();
  }

  //need to add a function that fills the table with current league data



  render() {
    return (
      // ** ToDo: if a manager has 0 players, bring up a prompt to join a league
      <div className="padded-page">
        <center>
          <h1>League Page</h1>
          <h2>Put League Name here</h2>
        </center>
        <CoursesTable
          league={this.props.userObj.league}
          changeMode={this.props.changeMode}
          menuOpen={this.props.menuOpen} />
      </div>

    );
  }
}

export default CoursesPage;
