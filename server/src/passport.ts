const GoogleStrategy = require("passport-google-oauth20").Strategy;
const passport = require("passport");
import initDB from './initDB';
import { Database } from "sqlite";

// import { createUser, getUser } from "./user/user-utils";




passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
    },
    async function (accessToken: any, refreshToken: any, profile: any, done: any) { 
      const account = profile._json;
      console.log(account);
      console.log("email is " + account.email);
      //check if user already exists
      try {
        const db: Database = await initDB();
        console.log('Fetching user with email:', account.email);
        //check if user already exists in db
        const user = await db.get(
            'SELECT email, username, avatar, streak FROM users WHERE email = ?', 
            [account.email]
        );
        // console.log("user not found" + user)
        if (user == undefined) {
            // If user doesn't exist, create it
            // await db.run('DELETE FROM users WHERE email="kthevandran@ucsd.edu"')
            console.log('deleted');
            const newUser = await db.run(
                'INSERT INTO users (email, username, password, avatar, streak) VALUES (?, ?, ?, ?, ?)',
                [account.email, account.name, '', 'default.png', 0]
            );
        } else {
          //in this case the user exists
          console.log("user exists with email" + user.email);
        }
    } catch (error) {
        console.error('Database error:', error);
    } finally {
        done(null, profile);
      }
    }
  )
);

passport.serializeUser((user: any, done: any) => {
  done(null, user);
});

passport.deserializeUser((user: any, done: any) => {
  done(null, user);
});