const mongoose = require('mongoose');
  
const StudentSchema = new mongoose.Schema({
    studentId:String,
    email:String,
    name:String,
    subject:[String]
});
  
module.exports = mongoose.model('student', StudentSchema, 'Students');