import express from 'express';
import { UserControllers } from './user.controller';
import { createStudentValidations } from '../student/student.validation';
import validateRequest from '../../middlwares/validateRequest';

const router = express.Router();

router.post(
  '/create-student',
  validateRequest(createStudentValidations.createStudentValidationSchema),
  UserControllers.createStudent
);

export const UserRoutes = router;
