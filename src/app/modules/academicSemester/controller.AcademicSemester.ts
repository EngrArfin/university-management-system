/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, RequestHandler, Response } from 'express';
import { UserServices } from './user.service';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';

const createAcademicStudent = catchAsync(async (req, res, next) => {
  /* const { password, student: studentData } = req.body;
  const result = await UserServices.createStudentIntoDB(password, studentData); */

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student is created Succesfully',
    data: result,
  });
});

export const AcademicSemesterControllers = {
  createAcademicStudent,
};
