//////////////////////////////////////////////////////////////////////////
//IMPORTS AND VARIABLE INITIALIZATIONS
//The following code imports necessary dependencies and initializes
//variables used in the server middleware.
//////////////////////////////////////////////////////////////////////////
import passport from "passport";
import passportGithub from "passport-github";
import passportLocal from "passport-local";
import passportGoogle from "passport-google-oauth2";
import session from "express-session";
import regeneratorRuntime from "regenerator-runtime";
import path from "path";
import express from "express";
require("dotenv").config();

const LOCAL_PORT = 8081;
const DEPLOY_URL = "http://localhost:8081";
const PORT = process.env.HTTP_PORT || LOCAL_PORT;
const GithubStrategy = passportGithub.Strategy;
const LocalStrategy = passportLocal.Strategy;
const GoogleStrategy = passportGoogle.Strategy;
const app = express();

//////////////////////////////////////////////////////////////////////////
//MONGOOSE SET-UP
//The following code sets up the app to connect to a MongoDB database
//using the mongoose library.
//////////////////////////////////////////////////////////////////////////
import mongoose from "mongoose";

const connectStr = process.env.MONGO_STR;
mongoose
  .connect(connectStr, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(
    () => {
      console.log(`Connected to ${connectStr}.`);
    },
    (err) => {
      console.error(`Error connecting to ${connectStr}: ${err}`);
    }
  );

const Schema = mongoose.Schema;
/* const roundSchema = new Schema({
  date: {type: Date, required: true},
  course: {type: String, required: true},
  type: {type: String, required: true, enum: ['practice','tournament']},
  holes: {type: Number, required: true, min: 1, max: 18},
  strokes: {type: Number, required: true, min: 1, max: 300},
  minutes: {type: Number, required: true, min: 1, max: 240},
  seconds: {type: Number, required: true, min: 0, max: 60},
  notes: {type: String, required: true}
},
{
  toObject: {
  virtuals: true
  },
  toJSON: {
  virtuals: true 
  }
}); */

const leagueSchema = new Schema({
  leagueName: { type: String, required: true },
  userIds: [String],
  leagueId: { type: String, required: true },
});

const playerSchema = new Schema({
  position: String,
  name: String,
  starter: Boolean,
});

const nflPlayerSchema = new Schema({
  playerId: Number,
  name: String,
  position: String
});

const gameSchema = new Schema(
  {
    week: { type: String, required: true },
    score: { type: Number, required: true, min: 0, max: 300 },
    opponentScore: { type: Number, required: true, min: 0, max: 300 },
    win: { type: Boolean },
    managerId: {},
    leagueId: {},
    players: [playerSchema],
  },
  {
    toObject: {
      virtuals: true,
    },
    toJSON: {
      virtuals: true,
    },
  }
);

const achievementSchema = new Schema({
  title: String,
  description: String,
  icon: String,
});

//Define schema that maps to a document in the Users collection in the appdb
//database.
const userSchema = new Schema({
  id: String, //unique identifier for user
  password: String,
  displayName: String, //Name to be displayed within app
  authStrategy: String, //strategy used to authenticate, e.g., github, local
  profilePicURL: String, //link to profile image
  securityQuestion: String,
  phoneNumber: String,
  teamName: String,
  leagueId: String, //league identifier

  commissioner: Boolean,
  win: { type: Number, min: 0, max: 15 },
  loss: { type: Number, min: 0, max: 15 },
  securityAnswer: {
    type: String,
    required: function () {
      return this.securityQuestion ? true : false;
    },
  },
  players: [playerSchema],
  games: [gameSchema],
  team: [playerSchema],
  league: [leagueSchema],
});
const User = mongoose.model("User", userSchema);

const Player = mongoose.model("Player", nflPlayerSchema);

//////////////////////////////////////////////////////////////////////////
//PASSPORT SET-UP
//The following code sets up the app with OAuth authentication using
//the 'github' strategy in passport.js.
//////////////////////////////////////////////////////////////////////////

passport.use(
  new GithubStrategy(
    {
      clientID: process.env.GH_CLIENT_ID,
      clientSecret: process.env.GH_CLIENT_SECRET,
      callbackURL: DEPLOY_URL + "/auth/github/callback",
    },
    //The following function is called after user authenticates with github
    async (accessToken, refreshToken, profile, done) => {
      console.log("User authenticated through GitHub! In passport callback.");
      //Our convention is to build userId from displayName and provider
      const userId = `${profile.username}@${profile.provider}`;
      //See if document with this unique userId exists in database
      let currentUser = await User.findOne({ id: userId });
      if (!currentUser) {
        //Add this user to the database
        currentUser = await new User({
          id: userId,
          displayName: profile.displayName,
          authStrategy: profile.provider,
          profilePicURL: profile.photos[0].value,
          players: [],
          games: [],
        }).save();
      }
      return done(null, currentUser);
    }
  )
);

passport.use(
  new LocalStrategy(
    { passReqToCallback: true },
    //Called when user is attempting to log in with local username and password.
    //userId contains the email address entered into the form and password
    //contains the password entered into the form.
    async (req, userId, password, done) => {
      let thisUser;
      try {
        thisUser = await User.findOne({ id: userId });
        if (thisUser) {
          if (thisUser.password === password) {
            return done(null, thisUser);
          } else {
            req.authError =
              "The password is incorrect. Please try again" +
              " or reset your password.";
            return done(null, false);
          }
        } else {
          //userId not found in DB
          req.authError =
            "There is no account with email " + userId + ". Please try again.";
          return done(null, false);
        }
      } catch (err) {
        return done(err);
      }
    }
  )
);

//////////////////////////////////////////////////////////////////////////
//PASSPORT SET-UP
//The following code sets up the app with OAuth authentication using
//the 'google' strategy in passport.js.
//////////////////////////////////////////////////////////////////////////
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GG_CLIENT_ID,
      clientSecret: process.env.GG_CLIENT_SECRET,
      callbackURL: DEPLOY_URL + "/auth/google/callback",
    },
    //The following function is called after user authenticates with github
    async (accessToken, refreshToken, profile, done) => {
      console.log("User authenticated through Google! In passport callback.");
      //Our convention is to build userId from displayName and provider
      const userId = `${profile.emails[0].value}`; 
      //See if document with this unique userId exists in database
      console.log("userId retreived from GOOGLE: " + userId);

      let currentUser = await User.findOne({ id: userId });

      console.log("Current User Found on the database: " + currentUser);

      if (!currentUser) {
        //Add this user to the database
        currentUser = await new User({
          //id: profile.emails[0].value,
          id: userId,
          displayName: profile.displayName,
          authStrategy: profile.provider,
          profilePicURL: profile.photos[0].value,
          players: [],
          games: [],
        }).save();
      }
      return done(null, currentUser);
    }
  )
);

//Serialize the current user to the session
passport.serializeUser((user, done) => {
  console.log("In serializeUser.");
  //console.log("Contents of user param: " + JSON.stringify(user));
  done(null, user.id);
});

//Deserialize the current user from the session
//to persistent storage.
passport.deserializeUser(async (userId, done) => {
  console.log("In deserializeUser.");
  console.log("Contents of userId param: " + userId);
  let thisUser;
  try {
    console.log("thisUser with userId: " + userId);
    thisUser = await User.findOne({ id: userId });
    console.log(
      "User with id " +
        userId +
        " found in DB. User object will be available in server routes as req.user."
    );
    done(null, thisUser);
  } catch (err) {
    done(err);
  }
});

//////////////////////////////////////////////////////////////////////////
//INITIALIZE EXPRESS APP
// The following code uses express.static to serve the React app defined
//in the client/ directory at PORT. It also writes an express session
//to a cookie, and initializes a passport object to support OAuth.
/////////////////////////////////////////////////////////////////////////
app
  .use(
    session({
      secret: "speedgolf",
      resave: false,
      saveUninitialized: false,
      cookie: { maxAge: 1000 * 60 },
    })
  )
  .use(express.static(path.join(__dirname, "client/build")))
  .use(passport.initialize())
  .use(passport.session())
  .use(express.json({ limit: "20mb" }))
  .listen(PORT, () => console.log(`Listening on ${PORT}`));

//////////////////////////////////////////////////////////////////////////
//DEFINE EXPRESS APP ROUTES
//////////////////////////////////////////////////////////////////////////

/////////////////////////
//AUTHENTICATION ROUTES
/////////////////////////

//AUTHENTICATE route: Uses passport to authenticate with GitHub.
//Should be accessed when user clicks on 'Login with GitHub' button on
//Log In page.
app.get("/auth/github", passport.authenticate("github"));

//CALLBACK route:  GitHub will call this route after the
//OAuth authentication process is complete.
//req.isAuthenticated() tells us whether authentication was successful. 

app.get(
  "/auth/github/callback",
  passport.authenticate("github", { failureRedirect: "/" }),
  (req, res) => {
    console.log("auth/github/callback reached.");
    res.redirect("/"); //sends user back to login screen;
    //req.isAuthenticated() indicates status
  }
);

app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

app.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/",
  }),
  (req, res) => {
    console.log("auth/google/callback reached.");
    res.redirect("/"); //sends user back to login screen;
    //req.isAuthenticated() indicates status
  }
);

//LOGOUT route: Use passport's req.logout() method to log the user out and
//redirect the user to the main app page. req.isAuthenticated() is toggled to false.
app.get("/auth/logout", (req, res) => {
  console.log("/auth/logout reached. Logging out");
  req.logout();
  res.redirect("/");
});

//TEST route: Tests whether user was successfully authenticated.
//Should be called from the React.js client to set up app state.
app.get("/auth/test", (req, res) => {
  console.log("auth/test reached.");
  const isAuth = req.isAuthenticated();
  if (isAuth) {
    console.log("User is authenticated");
    console.log("User record tied to session: " + JSON.stringify(req.user));
  } else {
    //User is not authenticated
    console.log("User is not authenticated");
  }
  //Return JSON object to client with results.
  res.json({ isAuthenticated: isAuth, user: req.user });
});

//LOGIN route: Attempts to log in user using local strategy
app.post(
  "/auth/login",
  passport.authenticate("local", { failWithError: true }),
  (req, res) => {
    console.log("/login route reached: successful authentication.");
    //Redirect to app's main page; the /auth/test route should return true
    res.status(200).send("Login successful");
  },
  (err, req, res, next) => {
    console.log("/login route reached: unsuccessful authentication");
    if (req.authError) {
      console.log("req.authError: " + req.authError);
      res.status(401).send(req.authError);
    } else {
      res
        .status(401)
        .send(
          "Unexpected error occurred when attempting to authenticate. Please try again."
        );
    }
    //Note: Do NOT redirect! Client will take over.
  }
);

/////////////////////////////////
//USER ACCOUNT MANAGEMENT ROUTES
////////////////////////////////

//READ user route: Retrieves the user with the specified userId from users collection (GET)
app.get("/users/:userId", async (req, res, next) => {
  console.log(
    "in /users route (GET) with userId = " + JSON.stringify(req.params.userId)
  );
  try {
    let thisUser = await User.findOne({ id: req.params.userId });
    if (!thisUser) {
      return res
        .status(404)
        .send(
          "No user account with id " +
            req.params.userId +
            " was found in database."
        );
    } else {
      return res.status(200).json(JSON.stringify(thisUser));
    }
  } catch (err) {
    console.log();
    return res
      .status(400)
      .send(
        "Unexpected error occurred when looking up user with id " +
          req.params.userId +
          " in database: " +
          err
      );
  }
});

//CREATE user route: Adds a new user account to the users collection (POST)
app.post("/users/:userId", async (req, res, next) => {
  console.log(
    "in /users route (POST) with params = " +
      JSON.stringify(req.params) +
      " and body = " +
      JSON.stringify(req.body)
  );
  if (
    req.body === undefined ||
    !req.body.hasOwnProperty("password") ||
    !req.body.hasOwnProperty("displayName") ||
    !req.body.hasOwnProperty("profilePicURL") ||
    !req.body.hasOwnProperty("securityQuestion") ||
    !req.body.hasOwnProperty("securityAnswer") ||
    !req.body.hasOwnProperty("phoneNumber") ||
    !req.body.hasOwnProperty("teamName") ||
    !req.body.hasOwnProperty("leagueID")
  ) {
    //Body does not contain correct properties
    return res
      .status(400)
      .send(
        "/users POST request formulated incorrectly. " +
          "It must contain 'password','displayName','profilePicURL','securityQuestion', 'securityAnswer', 'phoneNumber', 'teamName', and 'leagueID' fields in message body."
      );
  }
  try {
    let thisUser = await User.findOne({ id: req.params.userId });
    if (thisUser) {
      //account already exists
      res
        .status(400)
        .send(
          "There is already an account with email '" + req.params.userId + "'."
        );
    } else {
      //account available -- add to database
      thisUser = await new User({
        id: req.params.userId,
        password: req.body.password,
        displayName: req.body.displayName,
        authStrategy: "local",
        profilePicURL: req.body.profilePicURL,
        securityQuestion: req.body.securityQuestion,
        securityAnswer: req.body.securityAnswer,
        phoneNumber: req.body.phoneNumber,
        teamName: req.body.teamName,
        leagueId: req.body.leagueId,
        games: [],
      }).save();
      return res
        .status(201)
        .send(
          "New account for '" + req.params.userId + "' successfully created."
        );
    }
  } catch (err) {
    return res
      .status(400)
      .send(
        "Unexpected error occurred when adding or looking up user in database. " +
          err
      );
  }
});

//UPDATE user route: Updates a new user account in the users collection (POST)
app.put("/users/:userId", async (req, res, next) => {
  console.log(
    "in /users update route (PUT) with userId = " +
      JSON.stringify(req.params) +
      " and body = " +
      JSON.stringify(req.body)
  );
  if (!req.params.hasOwnProperty("userId")) {
    return res
      .status(400)
      .send(
        "users/ PUT request formulated incorrectly." +
          "It must contain 'userId' as parameter."
      );
  }
  const validProps = [
    "password",
    "displayName",
    "profilePicURL",
    "securityQuestion",
    "securityAnswer",
    "phoneNumber",
    "teamName",
    "leagueID",
  ];
  for (const bodyProp in req.body) {
    if (!validProps.includes(bodyProp)) {
      return res
        .status(400)
        .send(
          "users/ PUT request formulated incorrectly." +
            "Only the following props are allowed in body: " +
            "'password', 'displayname', 'profilePicURL', 'securityQuestion', 'securityAnswer', 'phoneNumber', 'teamName', 'leagueID' "
        );
    }
  }
  try {
    let status = await User.updateOne(
      { id: req.params.userId },
      { $set: req.body }
    );
    if (status.nModified != 1) {
      //account could not be found
      res
        .status(404)
        .send(
          "No user account " +
            req.params.userId +
            " exists. Account could not be updated."
        );
    } else {
      res
        .status(200)
        .send("User account " + req.params.userId + " successfully updated.");
    }
  } catch (err) {
    res
      .status(400)
      .send(
        "Unexpected error occurred when updating user data in database: " + err
      );
  }
});

//DELETE user route: Deletes the document with the specified userId from users collection (DELETE)
app.delete("/users/:userId", async (req, res, next) => {
  console.log(
    "in /users route (DELETE) with userId = " +
      JSON.stringify(req.params.userId)
  );
  try {
    let status = await User.deleteOne({ id: req.params.userId });
    if (status.deletedCount != 1) {
      return res
        .status(404)
        .send(
          "No user account " +
            req.params.userId +
            " was found. Account could not be deleted."
        );
    } else {
      return res
        .status(200)
        .send(
          "User account " + req.params.userId + " was successfully deleted."
        );
    }
  } catch (err) {
    console.log();
    return res
      .status(400)
      .send(
        "Unexpected error occurred when attempting to delete user account with id " +
          req.params.userId +
          ": " +
          err
      );
  }
});

/////////////////////////////////
//GAMES ROUTES
////////////////////////////////

//CREATE round route: Adds a new round as a subdocument to
//a document in the users collection (POST)
app.post("/games/:userId", async (req, res, next) => {
  console.log(
    "in /games (POST) route with params = " +
      JSON.stringify(req.params) +
      " and body = " +
      JSON.stringify(req.body)
  );
  if (
    !req.body.hasOwnProperty("week") ||
    !req.body.hasOwnProperty("score") ||
    !req.body.hasOwnProperty("opponentScore") ||
    !req.body.hasOwnProperty("win") ||
    !req.body.hasOwnProperty("managerId") ||
    !req.body.hasOwnProperty("leagueId") ||
    !req.body.hasOwnProperty("players")
  ) {
    //Body does not contain correct properties
    return res
      .status(400)
      .send(
        "POST request on /games formulated incorrectly." +
          "Body must contain all 5 required fields: week, score, opponentScore, win, loss."
      );
  }
  try {
    let status = await User.updateOne(
      { id: req.params.userId },
      { $push: { games: req.body } }
    );
    if (status.nModified != 1) {
      //Should never happen!
      res
        .status(400)
        .send(
          "Unexpected error occurred when adding game to" +
            " database. Game was not added."
        );
    } else {
      res.status(200).send("Game successfully added to database.");
    }
  } catch (err) {
    console.log(err);
    return res
      .status(400)
      .send(
        "Unexpected error occurred when adding game" + " to database: " + err
      );
  }
});

//CREATE Players route: Adds a new NFL players collection to the user's
//database - POST request with all the inputs
app.post("/addplayers/:userId", async (req, res, next) => {
  console.log(
    "in /games/players (POST) route with params = " +
      JSON.stringify(req.params) +
      " and body = " +
      JSON.stringify(req.body)
  );
  if (
    !req.body.hasOwnProperty("name") ||
    !req.body.hasOwnProperty("position") ||
    !req.body.hasOwnProperty("starter")
  ) {
    //Body does not contain correct properties
    return res
      .status(400)
      .send(
        "POST request on /games/players formulated incorrectly." +
          "Body must contain all 2 required fields: players name and position."
      );
  }
  try {
    let status = await User.updateOne(
      { id: req.params.userId },
      // { $push: { "games.0.players": req.body } }
      { $push: { "players": req.body } } //add the players into the database
    );
    if (status.nModified != 1) {
      //Should never happen!
      res
        .status(400)
        .send(
          "Unexpected error occurred when adding game to" +
            " database. Game was not added."
        );
    } else {
      res.status(200).send("Players successfully added to user database.");
    }
  } catch (err) {
    console.log(err);
    return res
      .status(400)
      .send(
        "Unexpected error occurred when adding players" + " to database: " + err
      );
  }
});

//READ players route: Returns all players associated
//with a given user in the users collection (GET)
app.get("/getplayers/:userId", async (req, res) => {
  console.log(
    "in /games/players route (GET) with userId = " +
      JSON.stringify(req.params.userId)
  );
  try {
    let thisUser = await User.findOne({ id: req.params.userId });
    if (!thisUser) {
      return res
        .status(400)
        .message(
          "No user account with specified userId was found in database."
        );
    } else {
      return res.status(200).json(JSON.stringify(thisUser.players));
    }
  } catch (err) {
    console.log();
    return res
      .status(400)
      .message(
        "Unexpected error occurred when looking up user in database: " + err
      );
  }
});

//READ round route: Returns all rounds associated
//with a given user in the users collection (GET)
app.get("/games/:userId", async (req, res) => {
  console.log(
    "in /games route (GET) with userId = " + JSON.stringify(req.params.userId)
  );
  try {
    let thisUser = await User.findOne({ id: req.params.userId });
    if (!thisUser) {
      return res
        .status(400)
        .message(
          "No user account with specified userId was found in database."
        );
    } else {
      return res.status(200).json(JSON.stringify(thisUser.games));
    }
  } catch (err) {
    console.log();
    return res
      .status(400)
      .message(
        "Unexpected error occurred when looking up user in database: " + err
      );
  }
});

//DELETE round route: Deletes a specific round
//for a given user in the users collection (DELETE)
app.delete("/deleteplayer/:userId/:playername", async (req, res, next) => {
  console.log(
    "in /players (DELETE) route with params = " + JSON.stringify(req.params)
  );
  try {
    let status = await User.updateOne(
      { id: req.params.userId },
      {
        $pull: { players: { name: (req.params.playername) } },
      }
    );
    if (status.nModified != 1) {
      //Should never happen!
      res
        .status(400)
        .send(
          "Unexpected error occurred when deleting player from database. Player was not deleted."
        );
    } else {
      res.status(200).send("specified player successfully deleted from database.");
    }
  } catch (err) {
    console.log(err);
    return res
      .status(400)
      .send(
        "Unexpected error occurred when deleting player from database: " + err
      );
  }
});

//UPDATE round route: Updates a specific round
//for a given user in the users collection (PUT)
app.put("/games/:userId/:gameId", async (req, res, next) => {
  console.log(
    "in /games (PUT) route with params = " +
      JSON.stringify(req.params) +
      " and body = " +
      JSON.stringify(req.body)
  );
  const validProps = ["week", "score", "opponentScore", "win", "loss"];
  let bodyObj = { ...req.body };
  delete bodyObj._id; //Not needed for update
  delete bodyObj.SGS; //We'll compute this below in seconds.
  for (const bodyProp in bodyObj) {
    if (!validProps.includes(bodyProp)) {
      return res
        .status(400)
        .send(
          "games/ PUT request formulated incorrectly." +
            "It includes " +
            bodyProp +
            ". However, only the following props are allowed: " +
            "'week', 'score', 'opponentScore', 'win', 'loss', "
        );
    } else {
      bodyObj["games.$." + bodyProp] = bodyObj[bodyProp];
      delete bodyObj[bodyProp];
    }
  }
  try {
    let status = await User.updateOne(
      {
        id: req.params.userId,
        "games._id": mongoose.Types.ObjectId(req.params.roundId),
      },
      { $set: bodyObj }
    );
    if (status.nModified != 1) {
      res
        .status(400)
        .send(
          "Unexpected error occurred when updating games in database. Game was not updated."
        );
    } else {
      res.status(200).send("Game successfully updated in database.");
    }
  } catch (err) {
    console.log(err);
    return res
      .status(400)
      .send("Unexpected error occurred when updating game in database: " + err);
  }
});

//DELETE round route: Deletes a specific round
//for a given user in the users collection (DELETE)
/* app.delete("/rounds/:userId/:roundId", async (req, res, next) => {
  console.log(
    "in /rounds (DELETE) route with params = " + JSON.stringify(req.params)
  );
  try {
    let status = await User.updateOne(
      { id: req.params.userId },
      {
        $pull: { rounds: { _id: mongoose.Types.ObjectId(req.params.roundId) } },
      }
    );
    if (status.nModified != 1) {
      //Should never happen!
      res
        .status(400)
        .send(
          "Unexpected error occurred when deleting round from database. Round was not deleted."
        );
    } else {
      res.status(200).send("Round successfully deleted from database.");
    }
  } catch (err) {
    console.log(err);
    return res
      .status(400)
      .send(
        "Unexpected error occurred when deleting round from database: " + err
      );
  }
}); */

//a document in the users collection (POST)
app.post("/players/:userId", async (req, res, next) => {
  console.log(
    "in /players (POST) route with params = " +
      JSON.stringify(req.params) +
      " and body = " +
      JSON.stringify(req.body)
  );
  if (!req.body.hasOwnProperty("players")) {
    //Body does not contain correct properties
    return res
      .status(400)
      .send(
        "POST request on /games formulated incorrectly." +
          "Body must contain the required fields: players."
      );
  }
  try {
    let status = await User.updateOne(
      { id: req.params.userId },
      { $push: { players: req.body } }
    );
    if (status.nModified != 1) {
      //Should never happen!
      res
        .status(400)
        .send(
          "Unexpected error occurred when adding players to" +
            " database. Game was not added."
        );
    } else {
      res.status(200).send("Players successfully added to database.");
    }
  } catch (err) {
    console.log(err);
    return res
      .status(400)
      .send(
        "Unexpected error occurred when adding players" + " to database: " + err
      );
  }
});


//CREATE player route: Adds a new nfl players to the players collection (POST)
app.post("/addplayerstocollection", async (req, res, next) => {
  console.log(
    "in /users route (POST) with params = " +
      JSON.stringify(req.params) +
      " and body = " +
      JSON.stringify(req.body)
  );
  if (
    !req.body.hasOwnProperty("playerId") ||
    !req.body.hasOwnProperty("name") ||
    !req.body.hasOwnProperty("position")
  ) {
    //Body does not contain correct properties
    return res
      .status(400)
      .send(
        "/users POST request formulated incorrectly. " +
          "It must contain playerId, name, and position fields in message body."
      );
  }
  try {
    let thisPlayer = await Player.findOne({ playerId: req.body.playerId });
    if (thisPlayer) {
      //account already exists
      res
        .status(400)
        .send(
          "There is already player with similar id: '" + req.body.playerId + "'."
        );
    } else {
      //account available -- add to database
      thisPlayer = await new Player({
        playerId: req.body.playerId,
        name: req.body.name,
        position: req.body.position,
      }).save();
      return res
        .status(201)
        .send(
          "New player for '" + req.body.playerId + "' successfully created."
        );
    }
  } catch (err) {
    return res
      .status(400)
      .send(
        "Unexpected error occurred when adding or looking up player in database. " +
          err
      );
  }
});

//READ players route: Returns all players from players collection (GET)
app.get("/getallplayers/", async (req, res) => {
  console.log(
    "in /getallplayers route (GET)");
  try {
    let thisPlayer = await Player.find({});
    if (!thisPlayer) {
      return res
        .status(400)
        .message(
          "No player was found in database."
        );
    } else {
      return res.status(200).json(JSON.stringify(thisPlayer));
    }
  } catch (err) {
    console.log();
    return res
      .status(400)
      .message(
        "Unexpected error occurred when looking up players in database: " + err
      );
  }
});

//READ players route: Returns all players associated
//with a given position from players collection (GET)
app.get("/getallplayers/:position", async (req, res) => {
  console.log(
    "in /getallplayers route (GET)");
  try {
    let thisPlayer = await Player.find({ position: req.params.position });
    if (!thisPlayer) {
      return res
        .status(400)
        .message(
          "No player with specified position was found in database."
        );
    } else {
      return res.status(200).json(JSON.stringify(thisPlayer));
    }
  } catch (err) {
    console.log();
    return res
      .status(400)
      .message(
        "Unexpected error occurred when looking up players in database: " + err
      );
  }
});

/* //READ players route: Return player object using their name
app.get("/getplayerwithname/:name", async (req, res) => {
  console.log(
    "in /getplayerwithname route (GET)");
  try {
    let thisPlayer = await Player.find({ position: req.params.name });
    if (!thisPlayer) {
      return res
        .status(400)
        .message(
          "No player with specified position was found in database."
        );
    } else {
      return res.status(200).json(JSON.stringify(thisPlayer));
    }
  } catch (err) {
    console.log();
    return res
      .status(400)
      .message(
        "Unexpected error occurred when looking up players in database: " + err
      );
  }
});

//READ players route: Returns all players associated
//with a given position from players collection (GET)
app.get("/getplayerswithid/:playerId", async (req, res) => {
  console.log(
    "in /getplayerswithid route (GET)");
  try {
    let thisPlayer = await Player.find({ position: req.params.playerId });
    if (!thisPlayer) {
      return res
        .status(400)
        .message(
          "No player with specified playerId was found in database."
        );
    } else {
      return res.status(200).json(JSON.stringify(thisPlayer));
    }
  } catch (err) {
    console.log();
    return res
      .status(400)
      .message(
        "Unexpected error occurred when looking up players in database: " + err
      );
  }
}); */