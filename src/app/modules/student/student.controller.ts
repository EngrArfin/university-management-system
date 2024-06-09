import { Request, Response } from 'express';
import { StudentServices } from './student.service';
import Joi from 'joi';

const createStudent = async (req: Request, res: Response) => {
  try {
    //creating a schimma validation using joi

    const userNameSchema = Joi.object({
      firstName: Joi.string()
        .trim()
        .max(20)
        .required()
        .regex(/^[A-Z][a-zA-Z]*$/),
      middleName: Joi.string().trim().optional(),
      lastName: Joi.string()
        .trim()
        .required()
        .regex(/^[a-zA-Z0-9]*$/),
    });

    // Guardian Joi Schema
    const guardianSchema = Joi.object({
      fatherName: Joi.string().required(),
      fatherOccupation: Joi.string().required(),
      fatherContactNo: Joi.string().required(),
      motherName: Joi.string().required(),
      motherOccupation: Joi.string().required(),
      motherContactNo: Joi.string().required(),
    });

    // Local Guardian Joi Schema
    const localGuardianSchema = Joi.object({
      name: Joi.string().required(),
      occupation: Joi.string().required(),
      contactNo: Joi.string().required(),
      address: Joi.string().required(),
    });

    // Student Joi Schema
    const studentSchema = Joi.object({
      id: Joi.string().required(),
      name: userNameSchema.required(),
      gender: Joi.string().valid('male', 'female').required(),
      email: Joi.string().email().required(),
      dateOfBirth: Joi.string().optional(),
      bloodGroup: Joi.string()
        .valid('A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-')
        .optional(),
      presentAddress: Joi.string().required(),
      permanentAddress: Joi.string().required(),
      contactNo: Joi.string().required(),
      emergencyContactNo: Joi.string().required(),
      guardian: guardianSchema.required(),
      localGuardian: localGuardianSchema.required(),
      profileImg: Joi.string().optional(),
      isActive: Joi.string().valid('active', 'blocked').default('active'),
    });

    const { student: studentData } = req.body;
    const { error, value } = studentSchema.validate(studentData);
    console.log(error, value);

    const result = await StudentServices.createStudentIntoDB(studentData);
    res.status(200).json({
      success: true,
      message: 'Student is created Succesfully',
      data: result,
    });
  } catch (err) {
    console.log(err);
  }
};

const getAllStudents = async (req: Request, res: Response) => {
  try {
    const result = await StudentServices.getAllStudentsFromDB();
    res.status(200).json({
      success: true,
      message: 'Student are retrive Succesfully',
      data: result,
    });
  } catch (err) {
    console.log(err);
  }
};

const getSingleStudent = async (req: Request, res: Response) => {
  try {
    const { studentId } = req.params;
    const result = await StudentServices.getSingleStudentFromDB(studentId);
    res.status(200).json({
      success: true,
      message: 'Student is retrive Succesfully',
      data: result,
    });
  } catch (err) {
    res.status(200).json({
      success: false,
      message: 'Something wrong',
      error: err,
    });
  }
};

export const StudentControllers = {
  createStudent,
  getAllStudents,
  getSingleStudent,
};
