import mongoose from 'mongoose';
  
const StudentSchema = new mongoose.Schema({
    studentId:String,
    email:String,
    name:String,
    subject:[String]
});
  
export default mongoose.model('student', StudentSchema, 'Students');