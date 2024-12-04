const GoogleStrategy = require("passport-google-oauth20").Strategy;
const passport = require("passport");




passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
    },
    function (accessToken, refreshToken, profile, done) { //need the User.findOrCreate from https://www.passportjs.org/packages/passport-google-oauth20/ to modify db
      const account = profile._json;
      console.log(account);
      done(null, profile);
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});