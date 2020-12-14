/* AppMode: The enumerated type for AppMode. */

const AppMode = {
  LOGIN: "LoginMode",
  TEAM: "TeamMode",
  MATCHUP: "MatchupMode",
  COURSES: "CoursesMode",
  DRAFT: "DraftMode",
  PROFILE: "ProfileMode",
};

Object.freeze(AppMode); //This ensures that the object is immutable.

export default AppMode;
