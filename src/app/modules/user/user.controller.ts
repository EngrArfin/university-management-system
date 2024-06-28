import { StudentServices } from '../student/student.service';
import studentValidationSchema from '../student/student.validation';

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
