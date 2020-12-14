import React from "react";
import AppMode from "../AppMode.js";

class ModeBar extends React.Component {
  render() {
    return (
      <div
        className={
          "modebar" +
          (this.props.mode === AppMode.LOGIN
            ? " invisible"
            : this.props.menuOpen
            ? " ignore-click visible"
            : " visible")
        }
      >
        <a
          id="feedModeBtn"
          className={this.props.mode === AppMode.FEED ? " item-selected" : null}
          onClick={() => this.props.changeMode(AppMode.TEAM)}
        >
          <span className="modebaricon fa fa-th-list"></span>
          <span className="modebar-text">My Team</span>
        </a>
        <a
          id="matchupModeBtn"
          className={
            this.props.mode === AppMode.MATCHUP ? " item-selected" : null
          }
          onClick={() => this.props.changeMode(AppMode.MATCHUP)}
        >
          <span className="modebar-icon  fa fa-history"></span>
          <span className="modebar-text">Games</span>
        </a>
        <a
          id="coursesModeBtn"
          className={
            this.props.mode === AppMode.COURSES ? " item-selected" : null
          }
          onClick={() => this.props.changeMode(AppMode.COURSES)}
        >
          <span className="modebar-icon  fa fa-flag"></span>
          <span className="modebar-text">My League</span>
        </a>
      </div>
    );
  }
}

export default ModeBar;
