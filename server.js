const elasticsearch = require('elasticsearch');
const client = new elasticsearch.Client({
  hosts: ['http://localhost:9200']
});
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
client.ping(
  {
    requestTimeout: 30000
  },
  (error) => {
    if (error) {
      console.error('elasticsearch cluster is down!');
    } else {
      console.log('Everything is ok');
    }
  }
);

app.use(bodyParser.json());
app.set('port', process.env.PORT || 3000);
// enable CORS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});

app.get('/search', (req, res) => {
  let body = {
    size: 200,
    from: 0,
    query: {
      match_phrase_prefix: {
        name: req.query['q']
      }
    }
  };
  client
    .search({ index: 'es-node', body: body, type: 'citiesList' })
    .then((results) => {
      res.send(results.hits.hits);
    })
    .catch((err) => {
      console.log(err);
      res.send([]);
    });
});
// listen on the specified port
app.listen(app.get('port'), () => {
  console.log('Express server listening on port ' + app.get('port'));
});
