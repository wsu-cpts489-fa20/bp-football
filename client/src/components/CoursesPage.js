import React from "react";
//ToDo: change course to display league members instead
// THis now becomes "Leage" instead of Courses
class CoursesPage extends React.Component {
  render() {
    return (
      // Table[player |  record | account name]
      // ** ToDo: if a manager has 0 players, bring up a prompt to join a league
      <div className="padded-page">
        <center>
          <h1>Courses</h1>
          <h2>This page is under construction.</h2>
          <img
            src="https://dl.dropboxusercontent.com/s/qpjhy9x9gwdxpob/SpeedScoreLogo64Trans.png"
            height="200"
            width="200"
          />
          <p style={{ fontStyle: "italic" }}>Version CptS 489 React Demo</p>
        </center>
      </div>
    );
  }
}

export default CoursesPage;
