// Import the Google Cloud client library
'use strict';

// [START gae_node_request_example]
const express = require('express');

const app = express();

app.get('/', (req, res) => {
  res
    .status(200)
    .send('tom@gmail added to datastore')
    .end();
});

// Start the server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
  console.log('Press Ctrl+C to quit.');
});

const {BigQuery} = require('@google-cloud/bigquery');

async function insertRowsAsStream() {
  // Inserts the JSON objects into my_dataset:my_table.

  /**
   * TODO(developer): Uncomment the following lines before running the sample.
   */
  // const datasetId = 'my_dataset';
  // const tableId = 'my_table';
  // const rows = [{name: 'Tom', age: 30}, {name: 'Jane', age: 32}];
  const datasetId = 'bigquery_a2_dataset';
  const tableId = 'users';
  const row = [{email: 'tom@gmail.com', password: 3000}];

  // Create a client
  const bigqueryClient = new BigQuery();

  // Insert data into a table
  await bigqueryClient
    .dataset(datasetId)
    .table(tableId)
    .insert(row);
  console.log(`Inserted ${row.length} rows`);
}
insertRowsAsStream();

module.exports = app;