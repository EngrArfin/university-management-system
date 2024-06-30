/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
import { UserServices } from './user.service';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';

const createStudent = async (req: Request, res: Response) => {
  try {
    //create a schema validtion using joi
    const { password, student: studentData } = req.body;

    const result = await UserServices.createStudentIntoDB(
      password,
      studentData
    );

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Student is created Succesfully',
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'Something went wrong',
      error: err,
    });
  }
};

export const UserControllers = {
  createStudent,
};

/* 
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
 */
