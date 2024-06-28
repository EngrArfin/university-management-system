import config from '../../config';
import { TStudent } from '../student/student.interface';
import { TUser } from './user.interface';
import { User } from './user.model';

const createStudentIntoDB = async (password: string, studentData: TStudent) => {
  const userData: Partial<TUser> = {};
  userData.password = password || (config.default_password as string);

  //set student role
  userData.role = 'student';

  //set manual generate it
  userData.id = '2030100001';

  //create  a user
  const result = await User.create(user);

  //create a student
  if (Object.keys(result).length) {
    studentData.id = result.id;
    studentData.user = result._id;
  }
  return result;
};

export const UserServices = {
  createStudentIntoDB,
};
