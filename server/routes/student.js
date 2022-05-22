import express from "express";
import StudentSchemaModel from '../schema/studentSchema.js';
const router = express.Router();
import {
    addUser,
    getAllUser,
    deleteUser
} from '../controllers/studentController.js';

router.get('/all', getAllUser);
router.post('/add', addUser);
router.delete('/delete', deleteUser);

export default router;