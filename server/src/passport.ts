const GoogleStrategy = require("passport-google-oauth20").Strategy;
const passport = require("passport");
import initDB from './initDB';
import { Database } from "sqlite";

// import { createUser, getUser } from "./user/user-utils";



// const db = await initDB();

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
      // try {
      //   const user = getUser(account.email);
      //   if (user.email == 'johnnyappleseed@nightly.com') {
      //     createUser(account.email, account.name, "", "");
      //   }
      // } catch (error) {
      //   console.log(error + "db operation failed when logging user in")
      // }

      try {
        const db: Database = await initDB();
        const { email } = account.email;
        console.log('Fetching user with email:', email);
        
        const user = await db.get(
            'SELECT email, username, avatar, streak FROM users WHERE email = ?', 
            [email]
        );
        
        if (!user) {
            // If user doesn't exist, create it
            await db.run(
                'INSERT INTO users (email, username, password, avatar, streak) VALUES (?, ?, ?, ?, ?)',
                [account.email, account.name, '', '', 0]
            );
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