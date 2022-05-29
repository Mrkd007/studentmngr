import StudentSchemaModel from '../schema/studentSchema.js';

export const getAllUser = (req, res) => {
  let limit = req.query && req.query.limit ? parseInt(req.query.limit) : 20;
  let skip = req.query && req.query.skip ? parseInt(req.query.skip) : 0;
  let sortValue = req.query && req.query.sortValue ? req.query.sortValue : 'studentId';
  let searchtext = req.query && req.query.searchtext && req.query.searchtext !== 'undefined' ? req.query.searchtext : '';
  let searchVal = new RegExp(searchtext);
  let subjectsArray = req.query && req.query.subjects ? req.query.subjects : [];
  subjectsArray = !subjectsArray.length ? new RegExp('.*?') : subjectsArray;
  StudentSchemaModel.find({$or: [{ 'studentId': { $regex: searchVal, $options: 'i' }}, { 'name': { $regex: searchVal, $options: 'i' }}, { 'email': { $regex: searchVal, $options: 'i' }}], subject: { $in: subjectsArray}})
    .sort(sortValue)
    .skip(skip)
    .limit(limit)
    .exec(function(err, students){
      if(err) {
        res.send('Failed to get Student list');
      } else {
        StudentSchemaModel.count({$or: [{ 'studentId': { $regex: searchVal, $options: 'i' }}, { 'name': { $regex: searchVal, $options: 'i' }}, { 'email': { $regex: searchVal, $options: 'i' }}], subject: { $in: subjectsArray}}, function( err, count){            
          if(err) {
            res.send('Failed to get Student list');
          } else {
            res.json({students, count});
          }
        })
      }
  });
}

export const addUser = (req, res) => {
  const newStudentSchemaModel = new StudentSchemaModel();
  newStudentSchemaModel.email = req.body.email;
  newStudentSchemaModel.name = req.body.name;
  newStudentSchemaModel.subject = req.body.subject;
  StudentSchemaModel.findOne().sort('-studentId').exec(function(err, last) {
    if(err) {
      res.send('Error in saving student data');
    } else {
      let lastIndex = 1;
      if(last && last.studentId) {
        lastIndex = parseInt(last.studentId) + 1;
      }
      lastIndex = lastIndex.toString();
      newStudentSchemaModel.studentId = lastIndex
      newStudentSchemaModel.save((err, student) => {
        if(err) {
          res.send('Error in saving student data');
        } else {
          res.send(student);
        }
      });
    }
  });
  
}

export const deleteUser = (req, res) => {
  try {
    StudentSchemaModel.findByIdAndRemove({ _id: req.query.id },(err, student) => {
      if(err) {
        res.send('Error in deleting student data');
      } else {
        res.send(student);
      }
    });
  } catch (e) {
    res.send('Error in deleting student data');
  }
}