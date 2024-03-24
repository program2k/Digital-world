const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const passport = require('passport');
require('dotenv').config();
const { v4: uuidv4 } = require('uuid');
const User = require('../server/models/user');

//Log in by Google
passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: "/api/user/auth/google/callback"
},
  async function (accessToken, refreshToken, profile, cb) {
    console.log('profile', profile)
    const tokenLogin = uuidv4();
    profile.tokenLogin = tokenLogin;
    try {
      const [user, created] = await User.findOrCreate({ oauth2Id: profile.id }, {
        firstName: profile.name.familyName,
        lastName: profile.name.givenName,
        email: profile.emails[0].value, 
        oauth2Id: profile.id,
        typeLogin: profile.provider,
        avatarUrl: profile.photos[0].value,
        tokenLogin
      });
      if (!created) {
        await User.updateOne(
          { oauth2Id: profile.id },
          { tokenLogin }
        )
      }
      console.log(user);
    } catch (error) {
      console.error(error);

    }
    return cb(null, profile);
  }
)); 


//Log in by Facebook
passport.use(new FacebookStrategy({
  clientID: process.env.FACEBOOK_APP_ID,
  clientSecret: process.env.FACEBOOK_APP_SECRET,
  callbackURL: "/api/user/auth/facebook/callback",
  profileFields: ['email', 'photos', 'id', 'displayName']
},
  async function (accessToken, refreshToken, profile, cb) {
    console.log('profile', profile)
    const tokenLogin = uuidv4();
    profile.tokenLogin = tokenLogin;
    try {
      const [user, created] = await User.findOrCreate({ oauth2Id: profile.id }, {
        firstName: profile.name.familyName,
        lastName: profile.name.givenName,
        email: profile.emails[0].value, 
        oauth2Id: profile.id,
        typeLogin: profile.provider,
        avatarUrl: profile.photos[0].value,
        tokenLogin
      });
      if (!created) {
        await User.updateOne(
          { oauth2Id: profile.id },
          { tokenLogin }
        )
      }
      console.log(user);
    } catch (error) {
      console.error(error);

    }
    return cb(null, profile);
  }
)); 