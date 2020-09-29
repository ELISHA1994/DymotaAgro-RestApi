const mongoose = require('mongoose')

// const dbRoute = 'mongodb+srv://todoappDB:todoappdb@cluster0-sjh2l.mongodb.net/DYMOTA_AGRO?retryWrites=true&w=majority'

mongoose.connect(
  process.env.MONGO_URI || 'mongodb://localhost:8080/DYMOTA_AGRO',
  { useNewUrlParser: true, useCreateIndex: true }
)


module.exports = mongoose

