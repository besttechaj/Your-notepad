const mongoose = require('mongoose');
const mongoUri = 'mongodb://127.0.0.1:27017/inotebook';

const connectToMongo = async () => {
  mongoose
    .connect(mongoUri)
    .then(() => {
      console.log('Connection to database is Successfully Established');
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = connectToMongo;
