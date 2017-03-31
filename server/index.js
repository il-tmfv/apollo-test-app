// server.js
const express = require('express');
const schema = require('./schema');
const graphql = require('graphql').graphql;
const buildSchema = require('graphql').buildSchema;
const introspectionQuery = require('graphql/utilities').introspectionQuery;
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express().use('*', cors());
const PORT = 3333;

const Schema = buildSchema(schema);


let count = 0;

const rootValue = {
  count: count,
  list: [{id: 0, uuid: 0, value: 0}],
  updateCount: ({ by }) => count += by,
};

app.use(bodyParser.json({ type: 'application/json' }));

app.use('/graphql', (req, res) => {
  graphql(
    Schema,
    req.body.query || req.body.mutation,
    rootValue,
    {},
    req.body.variables
  )
  .then((result) => {
    res.send(JSON.stringify(result, null, 2));
  });
});

let server = app.listen(PORT, function () {
  let host = server.address().address;
  let port = server.address().port;

  console.log('GraphQL listening at http://%s:%s', host, port);
});
