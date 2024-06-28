import { NextFunction, Request, RequestHandler, Response } from 'express';
import { StudentServices } from './student.service';
import { error } from 'console';
import { date } from 'joi';

const getSingleStudent = catchAsync(async (req, res, next) => {
  const { studentId } = req.params;
  const result = await StudentServices.getSingleStudentFromDB(studentId);

  sendResponse(req, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Studentt is retrived successfully',
    date: result,
  });
});

export const StudentControllers = {
  /* getAllStudents, */
  getSingleStudent,
};

/* 
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
*/
