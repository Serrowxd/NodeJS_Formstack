const Express = require('express');
const BodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectID;
let apiConst = require('./apiConst.json');

const CONNECTION_URL = `mongodb+srv://${apiConst.DB_USER}:${
  apiConst.DB_PASS
}@serrowcluster-tdqv2.mongodb.net/test?retryWrites=true&w=majority`;
const DATABASE_NAME = 'Formstack';

var app = Express();

app.use(BodyParser.json());
app.use(BodyParser.urlencoded({ extended: true }));

var database, collection;

app.listen(3000, () => {
  MongoClient.connect(
    CONNECTION_URL,
    { useNewUrlParser: true, useUnifiedTopology: true },
    (error, client) => {
      if (error) {
        throw error;
      }
      database = client.db(DATABASE_NAME);
      collection = database.collection('forms');
      console.log('Connected to `' + DATABASE_NAME + '`!');
    }
  );
});

app.post('/form', (request, response) => {
  collection.insertOne(request.body, (error, result) => {
    if (error) {
      return response.status(500).send(error);
    }
    response.send(result.result);
  });
});

app.get('/forms', (request, response) => {
  collection.find({}).toArray((error, result) => {
    if (error) {
      return response.status(500).send(error);
    }
    response.send(result);
  });
});

// Shortcode

// -- Calling API & Storing Data
// API Call to Formstack Database
// Pull all information into object

function GetAllData() {
  for (let i = 0; i > Object.itemCount; i++) {
    CleanData(Object.array[i]);
  }
}

function CleanData(data) {
  data.map(item => {
    // Clean excess data
    // Store all data in holder under new key-value pairs
    // return clean data?
  });
}

// Parse data, pull out reqs, store in object
// Call data check function
// Store data to database

//  -- API Endpoints
// Get will pull all new clean data in one hit
// GetOld will pull all old clean data in one hit
