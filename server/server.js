import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import router from './routes/student.js';
import cors from 'cors';
  
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