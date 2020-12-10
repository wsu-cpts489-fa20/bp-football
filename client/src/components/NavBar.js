import React from "react";
import AppMode from "../AppMode";

class NavBar extends React.Component {
  getMenuBtnIcon = () => {
    if (
      this.props.mode === AppMode.ROUNDS_LOGROUND ||
      this.props.mode === AppMode.ROUNDS_EDITROUND
    )
      return "fa fa-arrow-left";
    if (this.props.menuOpen) return "fa fa-times";
    return "fa fa-bars";
  };

  handleMenuBtnClick = () => {
    if (
      this.props.mode === AppMode.ROUNDS_LOGROUND ||
      this.props.mode === AppMode.ROUNDS_EDITROUND
    ) {
      this.props.changeMode(AppMode.ROUNDS);
    } else if (this.props.mode != AppMode.LOGIN) {
      this.props.toggleMenuOpen();
    }
  };

  render() {
    return (
      <div className="navbar">
        <span className="navbar-items">
          <button
            id="hamburgerBtn"
            className="sidemenu-btn"
            onClick={this.handleMenuBtnClick}
          >
            <span
              id="menuBtnIcon"
              className={"sidemenu-btn-icon " + this.getMenuBtnIcon()}
            ></span>
          </button>
          <img
            src="https://lh3.googleusercontent.com/67bm3dUVRAo1KOmlGd3VW1Q3_8JUctsx-_qkIfwZ9ZdV1rmXVeNmnYg9oLI_Jl8R30pxCP6MGb3dJzBPl4u1Qs-z2AmPMR0sNbn2anY8k6Fby6LyaeS2iWjeFDxsFW0xz8q6azcf-JM=s256-p-k"
            alt="Fantasy Football Logo"
            height="28px"
            width="28px"
          />
          <span className="navbar-title">&nbsp;{this.props.title}</span>
        </span>
      </div>
    );
  }
}

export default NavBar;
