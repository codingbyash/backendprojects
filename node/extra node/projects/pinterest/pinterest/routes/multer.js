const multer = require("multer");
const {v4: uuidv4} = require("uuid");
const path = require("path"); //this will help to get the extension of file after user uploads it

const storage = multer.diskStorage({
     destination: function(req,file,cb){
          cb(null, "./public/images/uploads")
     },
     filename: function(req, file, cb){
          const uniquename = uuidv4();

          // cb(null, uniquename)  //this code will only upload the file but won't give the extensiin of the file
          //below line will intake the file alongwith the extension nme
          cb(null, uniquename+path.extname(file.originalname));
     }
})

const upload = multer({storage: storage})

module.exports = upload;
