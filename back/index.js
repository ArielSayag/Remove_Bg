const express = require('express');
const app = express();
const port = 5000;

// var fs = require("fs");

var cors = require('cors');
app.use(cors());

var fileupload = require("express-fileupload");
app.use(fileupload());


app.use(express.static('no_bg_image')); 
app.use(express.static('upload_image')); 


const send_to_api=require('./send_to_api');

app.post('/upload_file' , (req , res) => {
  
  console.log(req.body.color_to_api);
  console.log(req.files);
  
  const newpath = __dirname + "/upload_image/";
  const file = req.files.myFile;
  const now = new Date().getTime();
  
  const filename =  now + file.name ;
  
  // app.use(fileupload({useTempFiles:true}))
    file.mv(`${newpath}${filename}`, (err) => {
    try{
      (async () => {
        await send_to_api(`${newpath}${filename}`,filename, req.body.color_to_api );
        res.status(200).send({ imageName: filename, code: 200 });
      })();
    } catch(err){
        res.status(500).send({ message: "File upload failed", code: 200 });
    }

    
    });
})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})