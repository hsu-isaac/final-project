require('dotenv/config');
const express = require('express');
const ClientError = require('./client-error');
const errorMiddleware = require('./error-middleware');
const jsonMiddleware = express.json();
const staticMiddleware = require('./static-middleware');
const uploadsMiddleware = require('./uploads-middleware');
const pg = require('pg');

const db = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

const app = express();

app.use(jsonMiddleware);

app.use(staticMiddleware);

app.post('/api/events', uploadsMiddleware, (req, res, next) => {
  const { eventName, dateTime, description, location } = req.body;
  if (!eventName || !dateTime || !description || !location || !req.file) {
    throw new ClientError(400, 'event name, date, description, location, and image are required fields');
  }
  const imageUrl = '/images/' + req.file.filename;
  const sql = `
  insert into "events" ("userId", "eventName", "dateTime", "description", "location", "imageUrl")
  values (1, $1, $2, $3, $4, $5)
  returning *;
  `;
  const params = [eventName, dateTime, description, location, imageUrl];
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
  select u
  from public.user as u, invites
  where "invites"."eventId" = ${idValue} and u."userId" != "invites"."userId"
  `;
  db.query(sql)
    .then(result => {
      res.json(result.rows);
    })
    .catch(err => next(err));
});

app.post('/api/events/invite', (req, res, next) => {
  // insert into
});

app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`express server listening on port ${process.env.PORT}`);
});
