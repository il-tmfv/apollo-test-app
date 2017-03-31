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
let list = [{id: Math.random().toString(36), uuid: 0, value: 0}];

const rootValue = {
  count: () => count,
  list: () => list,
  updateCount: ({ by }) => {count += by; return count},
  addItem: () => {
    const newItem = {id: Math.random().toString(36), uuid: 0, value: 0};
    list.push(newItem);
    return (newItem);
  },
  editSecondItem: () => {
    list[1].value += 1;
    return list;
  },
};

app.use(bodyParser.json({ type: 'application/json' }));

app.use('/graphql', (req, res) => {
  graphql(
    Schema,
    req.body.query || req.body.mutation,
    rootValue,
    {},
    req.body.variables,
    req.body.operationName
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
