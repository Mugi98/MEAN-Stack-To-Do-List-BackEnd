const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/formdata", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: true
}).then(()=> 
console.log("Connection is Successfully Done")
).catch((err)=> 
console.log(err)
);

const formSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
})

const FormData = mongoose.model('FormData',formSchema);

module.exports = FormData;