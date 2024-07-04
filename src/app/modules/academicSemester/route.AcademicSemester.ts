import express from 'express';
import { AcademicSemesterControllers } from './controller.AcademicSemester';
import validateRequest from '../../middlwares/validateRequest';
import { AcademicSemesterValidation } from './validation.AcademicSemester';

const router = express.Router();

router.post(
  '/create-academic-semester', validateRequest(AcademicSemesterValidation.createAcademicSemesterValidationSchema)
  AcademicSemesterControllers.createAcademicStudent
);

/* router.post('/create-student', StudentControllers.createStudent);
router.get('/', StudentControllers.getAllStudents);
router.get('/:studentId', StudentControllers.getSingleStudent);
router.get('/:studentId', StudentControllers.deleteStudent);
router.get('/', StudentControllers.getAllStudents); */

export const AcademicStudentRoutes = router;
