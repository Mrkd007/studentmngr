import StudentSchemaModel from '../schema/studentSchema.js';

export const getAllUser = (req, res) => {
  let limit = req.query && req.query.limit ? parseInt(req.query.limit) : 20;
  let skip = req.query && req.query.skip ? parseInt(req.query.skip) : 0;
  let sortValue = req.query && req.query.sortValue ? req.query.sortValue : 'studentId';
  let searchtext = req.query && req.query.searchtext && req.query.searchtext !== 'undefined' ? req.query.searchtext : '';
  console.log(searchtext);
  StudentSchemaModel.find({}).sort(sortValue).skip(skip).limit(limit).exec(function(err, students){
    StudentSchemaModel.count({}, function( err, count){
      StudentSchemaModel.findOne().sort('-studentId').exec(function(err, last) {
        if(err) {
            res.send('Failed to get Student list');
        } else {
            res.json({students, count, lastIndex:  last.studentId});
        }
      });
    })
  });
}

export const addUser = (req, res) => {
  const newStudentSchemaModel = new StudentSchemaModel();
  newStudentSchemaModel.studentId = req.body.studentId;
  newStudentSchemaModel.email = req.body.email;
  newStudentSchemaModel.name = req.body.name;
  newStudentSchemaModel.subject = req.body.subject;
  newStudentSchemaModel.save((err, student) => {
    if(err) {
      res.send('Error in saving student data');
    } else {
      res.send(student);
    }
  });
}

export const deleteUser = (req, res) => {
  StudentSchemaModel.findByIdAndRemove({ _id: req.query.id },(err, student) => {
    if(err) {
      res.send('Error in deleting student data');
    } else {
      res.send(student);
    }
  });
}