const mongoose = require('mongoose')

const password = process.argv[2]

const url = `mongodb+srv://mareks-fso:${password}@cluster0-kwqsb.mongodb.net/phonebook-db?retryWrites=true&w=majority`

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })

const phoneSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const PhoneEntry = mongoose.model('PhoneEntry', phoneSchema)

if (!process.argv[3]) {
  PhoneEntry.find({}).then((result) => {
    result.forEach((entry) => console.log(entry))
    mongoose.connection.close()
  })
} else {
  const phoneEntry = new PhoneEntry({
    name: process.argv[3],
    number: process.argv[4],
  })

  phoneEntry.save().then(() => {
    console.log('phoneentry saved!')
    mongoose.connection.close()
  })
}
