const mongoose = require('mongoose');

// // mongoose.connect("mongodb://localhost:27017/image", {
//   
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//     useCreateIndex: true,
//     useFindAndModify: true
// }).then(()=> 
// console.log("Connection is Successfully Done for Images.")
// ).catch((err)=> 
// console.log(err)
// );

var GallerySchema = new mongoose.Schema({
    imageUrl:{
        type:String
    },
});

const ImageUpload = mongoose.model('ImageUpload',GallerySchema);

module.exports = ImageUpload;