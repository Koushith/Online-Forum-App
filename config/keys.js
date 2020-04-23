const mongoose = require('mongoose');

const URI =
  'mongodb+srv://koushith:koushith97!@cluster0-mvgle.mongodb.net/test?retryWrites=true&w=majority';
const connectDB = async () => {
  await mongoose.connect(URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true
  });
  console.log('connected to Atlas');
};

module.exports = connectDB;
