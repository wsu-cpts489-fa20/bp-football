/* AppMode: The enumerated type for AppMode. */

const AppMode = {
  LOGIN: "LoginMode",
  Team: "TeamMode",
  ROUNDS: "RoundsMode",
  ROUNDS_LOGROUND: "RoundsMode-LogRound",
  ROUNDS_EDITROUND: "RoundsMode-EditRound",
  COURSES: "CoursesMode",
  DRAFT: "DraftMode",
};

Object.freeze(AppMode); //This ensures that the object is immutable.

export default AppMode;
