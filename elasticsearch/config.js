const elasticsearch = require('elasticsearch');
const cities = require('../db');

const client = new elasticsearch.Client({
  hosts: ['http://localhost:9200']
});

client.ping(
  {
    requestTimeout: 30000
  },
  (error) => {
    if (error) {
      console.log('elasticsearch is down');
    } else {
      console.log('everything is ok');
    }
  }
);

// client.indices.create(
//   {
//     index: 'es-node'
//   },
//   (error, response, status) => {
//     if (error) {
//       console.log(error);
//     } else {
//       console.log('created a new index', response);
//     }
//   }
// );

const bulk = [];

cities.forEach((city) => {
  bulk.push({
    index: {
      _index: 'es-node',
      _type: 'citiesList'
    }
  });
  bulk.push(city);
});

client.bulk({ body: bulk }, (err, response) => {
  if (err) {
    console.log('Failed Bulk operation', err);
  } else {
    console.log('Successfully imported', response);
  }
});
// client.index(
//   {
//     index: 'es-node',
//     id: '1',
//     type: 'cities_list',
//     body: {
//       Key1: 'Content for key one',
//       Key2: 'Content for key two',
//       key3: 'Content for key three'
//     }
//   },
//   (err, response, status) => {
//     console.log(response);
//   }
// );
