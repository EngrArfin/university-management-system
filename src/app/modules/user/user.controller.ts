/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, RequestHandler, Response } from 'express';
import { UserServices } from './user.service';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';

const createStudent: RequestHandler = async (req, res, next) => {
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
