const Express = require('express');
const BodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectID;
let apiConst = require('./apiConst.json');

const CONNECTION_URL = `mongodb+srv://${apiConst.DB_USER}:${apiConst.DB_PASS}@serrowcluster-tdqv2.mongodb.net/test?retryWrites=true&w=majority`;
const DATABASE_NAME = 'Formstack';

var app = Express();

app.use(BodyParser.json());
app.use(BodyParser.urlencoded({ extended: true }));

var database, collection;

app.listen(3000, () => {
  MongoClient.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true }, (error, client) => {
    if (error) {
      throw error;
    }
    database = client.db(DATABASE_NAME);
    collection = database.collection('forms');
    console.log('Connected to `' + DATABASE_NAME + '`!');
  });
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
