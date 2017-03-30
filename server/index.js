// server.js
const express = require('express');
const schema = require('./schema');
const graphql = require('graphql').graphql;
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express().use('*', cors());
const PORT = 3333;

app.use(bodyParser.json({ type: 'application/json' }));

app.use('/graphql', (req, res) => {
  console.log(req.body);
  graphql(schema, req.body.query || req.body.mutation)
  .then((result) => {
    res.send(JSON.stringify(result, null, 2));
  });
});

let server = app.listen(PORT, function () {
  let host = server.address().address;
  let port = server.address().port;

  console.log('GraphQL listening at http://%s:%s', host, port);
});
