require('dotenv/config');
const express = require('express');
const ClientError = require('./client-error');
const errorMiddleware = require('./error-middleware');
const jsonMiddleware = express.json();
const staticMiddleware = require('./static-middleware');
const uploadsMiddleware = require('./uploads-middleware');
const pg = require('pg');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const googleClientId = process.env.googleClientID;
const googleClientSecret = process.env.googleClientSecret;
const session = require('express-session');
const tokenSecret = process.env.TOKEN_SECRET;
const authentificationMiddleware = require('./authentification-middleware');

const db = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

const app = express();

app.use(session({ secret: tokenSecret }));

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

passport.use(
  new GoogleStrategy(
    {
      clientID: googleClientId,
      clientSecret: googleClientSecret,
      callbackURL: '/auth/google/callback'
    }, (accessToken, refreshToken, profile, done) => {
      const sql = `
      insert into "user" ("name", "googleId")
      values ($1, $2)
      on conflict ("googleId")
      do update
        set "googleId" = $2
      returning *
      `;
      const params = [profile.displayName, profile.id];
      const dbQuery = db.query(sql, params);
      dbQuery.then(result => {
        done(null, result.rows[0].userId);
      });
    })
);

app.get(
  '/auth/google',
  passport.authenticate('google', {
    scope: ['profile', 'email']
  })
);

app.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  function (req, res) {
    res.redirect('/');
  });

app.use(jsonMiddleware);

app.use(staticMiddleware);

app.use(authentificationMiddleware);

app.post('/api/events', uploadsMiddleware, (req, res, next) => {
  const { eventName, dateTime, description, location } = req.body;
  if (!eventName || !dateTime || !description || !location || !req.file) {
    throw new ClientError(400, 'event name, date, description, location, and image are required fields');
  }
  const imageUrl = '/images/' + req.file.filename;
  const sql = `
  insert into "events" ("userId", "eventName", "dateTime", "description", "location", "imageUrl")
  values ($6, $1, $2, $3, $4, $5)
  returning *;
  `;
  const params = [eventName, dateTime, description, location, imageUrl, req.user];
  const dbQuery = db.query(sql, params);
  dbQuery.then(result => {
    res.status(201).send(result.rows[0]);
  }).catch(err => next(err));
});

app.get('/api/events', (req, res, next) => {
  const sql = `
    select *
    from "events"
  `;
  db.query(sql)
    .then(result => {
      res.json(result.rows);
    })
    .catch(err => next(err));
});

app.get('/api/events/:id', (req, res, next) => {
  const idValue = req.params.id;
  const sql = `
    select *
    from "events"
    where "eventId" = ${idValue}
  `;
  db.query(sql)
    .then(result => {
      res.json(result.rows);
    })
    .catch(err => next(err));
});

app.get('/api/events/:id/uninvited', (req, res, next) => {
  const idValue = req.params.id;
  const sql = `
  SELECT users."name",
  users."userId"
  FROM public.user as users
  WHERE users."userId" NOT IN (SELECT invites."userId" FROM invites WHERE invites."eventId" = $1)
  `;
  const params = [idValue];
  db.query(sql, params)
    .then(result => {
      res.json(result.rows);
    })
    .catch(err => next(err));
});

app.post('/api/events/:id/invite', (req, res, next) => {
  const { userId } = req.body;
  const idValue = req.params.id;
  const sql = `
    insert into "invites" ("eventId", "userId")
    values ($1, $2)
  `;
  const params = [idValue, userId];
  db.query(sql, params)
    .then(result => {
      res.json(result.rows);
    })
    .catch(err => next(err));
});

app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`express server listening on port ${process.env.PORT}`);
});
