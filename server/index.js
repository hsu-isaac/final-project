require('dotenv/config');
const express = require('express');
const ClientError = require('./client-error');
const errorMiddleware = require('./error-middleware');
const jsonMiddleware = express.json();
const staticMiddleware = require('./static-middleware');
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

app.post('/api/events', (req, res, next) => {
  const { eventName, dateTime, description, location, imageUrl } = req.body;
  if (!eventName || !dateTime || !description || !location) {
    throw new ClientError(400, 'event name, date, description, and location are required fields');
  }
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

app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`express server listening on port ${process.env.PORT}`);
});
