import React from "react";
import NavBar from "./NavBar.js";
import SideMenu from "./SideMenu.js";
import ModeBar from "./ModeBar.js";
import CreateEditAccountDialog from "./CreateEditAccountDialog.js";
import LoginPage from "./LoginPage.js";
import AppMode from "./../AppMode.js";
import TeamPage from "./TeamPage.js";
import Rounds from "./Rounds.js";
import CoursesPage from "./CoursesPage.js";
import Profile from "./ProfilePage";
import AboutBox from "./AboutBox.js";
import Draft from "./Draft.js";
import ProfilePage from "./ProfilePage";

const modeTitle = {};
modeTitle[AppMode.LOGIN] = "Welcome to Fantasy Football";
modeTitle[AppMode.TEAM] = "My Team";
modeTitle[AppMode.ROUNDS] = "My Game History";
modeTitle[AppMode.ROUNDS_LOGROUND] = "Log New Game";
//todo: remove ability to edit rounds
modeTitle[AppMode.ROUNDS_EDITROUND] = "Edit Round";
modeTitle[AppMode.COURSES] = "League";
modeTitle[AppMode.DRAFT] = "Draft";
modeTitle[AppMode.PROFILE] = "Profile";

const modeToPage = {};
modeToPage[AppMode.LOGIN] = LoginPage;
modeToPage[AppMode.TEAM] = TeamPage;
modeToPage[AppMode.ROUNDS] = Rounds;
modeToPage[AppMode.ROUNDS_LOGROUND] = Rounds;
modeToPage[AppMode.ROUNDS_EDITROUND] = Rounds;
modeToPage[AppMode.COURSES] = CoursesPage;
modeToPage[AppMode.DRAFT] = Draft;
modeToPage[AppMode.PROFILE] = ProfilePage;

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      league: "",
      mode: AppMode.LOGIN,
      menuOpen: false,
      authenticated: false,
      userObj: { displayName: "", profilePicURL: "" },
      editAccount: false,
      showEditAccountDialog: false,
      statusMsg: "",
      showAboutDialog: false,
      showDraftDialog: false,
      playerData: [],
    };
  }

  //componentDidMount
  componentDidMount() {
    if (!this.state.authenticated) {
      //Use /auth/test route to (re)-test authentication and obtain user data
      fetch("/auth/test")
        .then((response) => response.json())
        .then((obj) => {
          if (obj.isAuthenticated) {
            this.setState({
              userObj: obj.user,
              authenticated: true,
              mode: AppMode.ROUNDS, //We're authenticated so can get into the app.
            });
          }
        });
    }
  }

  //refreshOnUpdate(newMode) -- Called by child components when user data changes in
  //the database. The function calls the users/:userid (GET) route to update
  //the userObj state var based on the latest database changes, and sets the
  //mode state var is set to newMode. After this method is called, the
  //App will re-render itself, forcing the new data to
  //propagate to the child components when they are re-rendered.
  refreshOnUpdate = async (newMode) => {
    let response = await fetch("/users/" + this.state.userObj.id);
    response = await response.json();
    const obj = JSON.parse(response);
    this.setState({
      userObj: obj,
      mode: newMode,
    });
  };

  handleChangeMode = (newMode) => {
    this.setState({ mode: newMode });
  };

  openMenu = () => {
    this.setState({ menuOpen: true });
  };

  closeMenu = () => {
    this.setState({ menuOpen: false });
  };

  openDraft = () => {
    this.setState({ showDraftDialog: true });
  };

  closeDraft = () => {
    this.setState({ showDraftDialog: false });
  };

  toggleMenuOpen = () => {
    this.setState((prevState) => ({ menuOpen: !prevState.menuOpen }));
  };

  setUserId = (Id) => {
    this.setState({ userId: Id, authenticated: true });
  };

  showEditAccount = () => {
    this.setState({ showEditAccountDialog: true });
  };

  cancelEditAccount = () => {
    this.setState({ showEditAccountDialog: false });
  };

  //editAccountDone -- called after successful edit or
  //deletion of user account. msg contains the status
  //message and deleted indicates whether an account was
  //edited (deleted == false) or deleted (deleted == true)
  editAccountDone = (msg, deleted) => {
    if (deleted) {
      this.setState({
        showEditAccountDialog: false,
        statusMsg: msg,
        mode: AppMode.LOGIN,
      });
    } else {
      this.setState({ showEditAccountDialog: false, statusMsg: msg });
    }
  };

  closeStatusMsg = () => {
    this.setState({ statusMsg: "" });
  };

  getCurrentData = async () => {
    var filters = {
      players: {
        limit: 1500,
        sortDraftRanks: {
          sortPriority: 100,
          sortAsc: true,
          value: "STANDARD",
        },
      },
    };

    var options = {
      headers: {
        "x-fantasy-filter": JSON.stringify(filters),
      },
    };

    const response = await fetch(
      "https://fantasy.espn.com/apis/v3/games/FFL/seasons/2020/segments/0/leaguedefaults/1?view=kona_player_info",
      options
    );
    const data = await response.json();
    this.setState({ playerData: data });
  };
  render() {
    const ModePage = modeToPage[this.state.mode];
    return (
      <div className="padded-page">
        {/* {this.state.showAboutDialog ? (
          <AboutBox close={() => this.setState({ showAboutDialog: false })} />
        ) : null} */}
        {this.state.showDraftDialog ? (
          <Draft close={this.closeDraft} userObj={this.state.userObj} />
        ) : null}
        {this.state.statusMsg != "" ? (
          <div className="status-msg">
            <span>{this.state.statusMsg}</span>
            <button className="modal-close" onClick={this.closeStatusMsg}>
              <span className="fa fa-times"></span>
            </button>
          </div>
        ) : null}
        {this.state.showEditAccountDialog ? (
          <CreateEditAccountDialog
            create={false}
            userId={this.state.userObj.id}
            done={this.editAccountDone}
            cancel={this.cancelEditAccount}
          />
        ) : null}
        <NavBar
          title={modeTitle[this.state.mode]}
          mode={this.state.mode}
          changeMode={this.handleChangeMode}
          menuOpen={this.state.menuOpen}
          toggleMenuOpen={this.toggleMenuOpen}
        />
        <SideMenu
          menuOpen={this.state.menuOpen}
          mode={this.state.mode}
          toggleMenuOpen={this.toggleMenuOpen}
          displayName={this.state.userObj.displayName}
          profilePicURL={this.state.userObj.profilePicURL}
          localAccount={this.state.userObj.authStrategy === "local"}
          editAccount={this.showEditAccount}
          logOut={() => this.handleChangeMode(AppMode.LOGIN)}
          showAbout={() => {
            this.setState({ showAboutDialog: true });
          }}
          openDraft={this.openDraft}
          changeMode={this.handleChangeMode}
        />
        <ModeBar
          mode={this.state.mode}
          changeMode={this.handleChangeMode}
          menuOpen={this.state.menuOpen}
        />
        <ModePage
          menuOpen={this.state.menuOpen}
          mode={this.state.mode}
          changeMode={this.handleChangeMode}
          userObj={this.state.userObj}
          refreshOnUpdate={this.refreshOnUpdate}
          playerData={this.state.playerData}
          getCurrentData={this.getCurrentData}
        />
      </div>
    );
  }
}

export default App;
