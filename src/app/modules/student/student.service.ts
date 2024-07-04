import { TStudent } from './student.interface';
import { Student } from './student.model';

const createStudentInDB = async (studentData: TStudent) => {
  const newStudent = new Student(studentData);
  const result = await newStudent.save();
  return result;
};

const getAllStudentsFromDB = async () => {
  const result = await Student.find();
  return result;
};

const getSingleStudentFromDB = async (id: string) => {
  const result = await Student.aggregate([{ $match: { id } }]);
  return result;
};

const deleteStudentFromDB = async (id: string) => {
  const result = await Student.updateOne({ id }, { isDeleted: true });
  return result;
};

export const StudentServices = {
  deleteStudentFromDB,
  getAllStudentsFromDB,
  getSingleStudentFromDB,
  createStudentInDB,
};
