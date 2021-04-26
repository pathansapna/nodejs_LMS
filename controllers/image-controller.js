var multer  = require('multer');
var imageMiddleware= require('../middleware/store-image');
var userModel= require('../models/userModel');
const router = require('../controllers/signup');

module.exports={
    imageUploadForm:function(req,res){
        res.render('/views/customer/profile.ejs');
     },
     storeImage:function(req,res){
        var upload = multer({
                    storage: imageMiddleware.image.storage(), 
                    allowedImage:imageMiddleware.image.allowedImage()
                    }).single('image');
        upload(req, res, function (err) {
           if (err instanceof multer.MulterError) {
              res.send(err);
           } else if (err) {
              res.send(err);
           }else{
              // store image in database
              imageName= req.file.originalname;
               var inputValues = {
                  image: imageName
               }
             // call model
             userModel.storeImage(inputValues, function(data){
               res.render('/views/signup.ejs',{alertMsg:data})
             })
              
           }
           
        })
        
     }
}