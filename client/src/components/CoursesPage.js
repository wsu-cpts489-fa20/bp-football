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
      <div className="padded-page">
        <center>
          <h1>League Page</h1>
          <h2>{this.props.userObj.league.LeagueName}</h2>
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
