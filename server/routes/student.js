const express = require('express');
const StudentSchemaModel = require('../schema/studentSchema.js');
const router = express.Router();
const {
    addUser,
    getAllUser,
    deleteUser
} = require('../controllers/studentController.js');

router.get('/all', getAllUser);
router.post('/add', addUser);
router.delete('/delete', deleteUser);

module.exports = router;