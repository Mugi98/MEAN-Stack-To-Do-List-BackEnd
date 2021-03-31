var express = require('express');
var router = express.Router();
const mongoose = require("mongoose");
const FormData = require('../models/formdata');
const  multer = require('multer');
const ImageUpload = require("../models/imageUpload");
const path = 'D:/to-do-list/backend/public/images'
// const app = require('../app');

// router.get('/', function(req, res, next) {
//  res.render('index', { title: 'Express' }); });

const storage = multer.diskStorage({
  destination:(req,files,callback)=> {
    console.log("req",req)
    callback(null, path)
  },
  filename:(req,files,callback)=> {
    console.log("req",req)
    callback(null, `as${files.originalname}`)
  }
})
var upload = multer({storage: storage})

// router.post('/uploadfile', upload.single('file'), (req,res,next)=> {
  
//   const file = req.file;
//   var data ={
//     imageUrl:'http://localhost:4000/'+file.filename,
//   }
//   const imageData = new ImageUpload(data);
//   imageData.save();
//   console.log(file);
//   if(!file){
//     const error = new Error("Please upload a file")
//     error.httpStatusCode = 400
//     return next(error)
//   }
//   res.send(file)
// })

router.post('/uploadmultiplefile', upload.array('files'), (req,res,next)=> {
  console.log("req jjjjjjjjjj",req)
  const files = req.files;
  console.log("filessss",req.files);
  for(var i =0; i< req.files.length;i++){
    var data ={
      imageUrl:'http://localhost:4000/'+req.files[i].filename,
    }
    const imageData = new ImageUpload(data);
  imageData.save();
  }
  
  // console.log(files.filename);
  // if(!files){
  //   const error = new Error("Please upload a file")
  //   error.httpStatusCode = 400;
  //   return next(error);
  // }
  // res.send(files)
})

router.get('/imagegallery',function(req,res){
  ImageUpload.find({})
    .then(result => {
      console.log("asd",result);
      res.status(200).json({
        newImage: result
      })
    })
})


 router.post('/enroll',function(req,res){
    console.log(req.body);
    try{
      // res.send({"Message": "Data received!"})
      const data = req.body;
      console.log("fff",data);
      const newData = new FormData(data);
  
      newData.save((error) => {
        if(error){
          res.status(500).json({message: "Sorry interal server errors"});
        }else{
          res.json({
            message: "Your data is saved"
          });
        }
      })
    }catch(err){
      console.log(err);
    }
  })
  
  router.get('/formlist',function(req,res){
    // console.log("asd",res);
    FormData.find({})
    .then(result => {
      console.log("asd",result);
      res.status(200).json({
        newData: result
      })
    })
  })
  router.get('/getDatabyid/:id',function(req,res){
    console.log("asd",req);
    FormData.find({_id:req.params.id})
    .then(result => {
      console.log("asd",result);
      res.status(200).json({
        newData: result
      })
    })
  })

  router.post('/updateform', function(req,res){
        const data = req.body;
        console.log("Updated Data",data,req.body);
        FormData.findByIdAndUpdate({_id: req.body.id},{
            $set:{username: data.username, email: data.email, password: data.password}
        },{
            new: true
        },
        function(err,updatedData){
          console.log("yash",updatedData);
            if(err){
                res.send("Error Updating Data");
            }else{
             
                res.send(updatedData);
            }
        })
  })

  router.post("/deleteform", function(req,res){
      console.log("Deleting a Data",req.body);
      FormData.remove({_id: req.body.id},
       function(err, deletedData){
        if(err){
            res.send("Error");
        }else{
            res.send(deletedData);
        }
      })
  })


module.exports = router;
