const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const router = require('./routes/student.js');
const cors = require('cors');
  
const port=5500;
const app=express();

const mongoConnectQuerry = 'mongodb+srv://krishna:krishna%401234@cluster0.nsyeo.mongodb.net/myDB?retryWrites=true&w=majority';

mongoose.connect(mongoConnectQuerry, 
  {useNewUrlParser : true, useUnifiedTopology: true },
  function(error) {
    if (error) {
        console.log('Error -> ' + error);
    }
  }
);

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
  
app.use('/v1', router);

app.get('/check', function(req, res){
  res.send('testing server running status');
});
   
app.listen(port, function() {
    console.log("Server is listening at port:" + port);
});