import { Request, Response } from 'express';
import { StudentServices } from './student.service';
import studentValidationSchema from './student.validation';
import { error } from 'console';

const createStudent = async (req: Request, res: Response) => {
  try {
    //create a schema validtion using joi
    const { student: studentData } = req.body;
    //data validation usin joi
    const { error, value } = studentValidationSchema.validate(studentData);
    const result = await StudentServices.createStudentIntoDB(value);

    if (error) {
      res.status(500).json({
        success: false,
        message: 'Something went wrong',
        error: error.details,
      });
    }

    res.status(200).json({
      success: true,
      message: 'Student is created Succesfully',
      data: result,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Something went wrong',
      error: err,
    });
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

    if (error) {
      res.status(500).json({
        success: false,
        message: 'Something went wrong',
        error: error, //.details
      });
    }

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
