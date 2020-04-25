const mongoose = require('mongoose')

const url = process.env.MONGODB_URI 

//create a connection to a MongoDB DATABASE
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(result => console.log('connected to MongoDB'))
    .catch(error => console.log('error connecting to MongoDB:', error.message))

//specify the DOCUMENT (equiv. to a row in table) scheme, i.e., the shape and content
const phoneSchema = new mongoose.Schema({
    name: String,
    number: String,
})

//amend the toJSON method to remove the unncessary id and __v fields (generated by MongoDB)
phoneSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

//make accessible only the model in export
module.exports = mongoose.model('PhoneEntry', phoneSchema)