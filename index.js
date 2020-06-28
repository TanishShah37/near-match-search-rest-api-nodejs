const mongoose = require('mongoose');
const util = require('util');
const citiesModel = require('./models/cities');
const config = require('./config/config');
const app = require('./express');
const colors = require('colors')
const path = require('path');
const tsvToJson = require('tsvtojson');

mongoose.Promise = Promise;

mongoose.connect(config.mongo.uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
mongoose.connection.on('error', (err) => {
    const error = new Error(`unable to connect to db: ${config.mongo.uri} with error: ${err}`);
    util.log(colors.red(error));
});

(async () => {
    try {
      const jsonarray = await tsvToJson(path.join(__dirname, './data/cities_canada-usa.tsv'));
      await citiesModel.deleteMany({});
      await citiesModel.insertMany(jsonarray);
      util.log(colors.green('Battle: TSV Data inserted into Mongo Successfully'));
    } catch (error) {
      util.log(colors.red('Battle: Error while inserting cities_canada.tsv data to Mongo'));
    }
  })();

app.listen(config.port, () => {
    util.log(colors.green(`Backend Server started at Port: ${config.port}`));
});

module.exports = app;