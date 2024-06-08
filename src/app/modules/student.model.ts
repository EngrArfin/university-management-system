import { Schema, model } from 'mongoose';
import {
  Gurdian,
  LocalGurdian,
  Student,
  UserName,
} from './student/student.interface';

const userNameSchema = new Schema<UserName>({
  firstName: {
    type: String,
    required: true,
  },
  middleName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
});
const guardianSchema = new Schema<Gurdian>({
  fatherName: { type: String, required: true },
  fatherOcupation: { type: String, required: true },
  fatherContractNo: { type: String, required: true },
  mothherName: { type: String, required: true },
  mothherOcupation: { type: String, required: true },
  mothherContractNo: { type: String, required: true },
});
const localGurdianSchema = new Schema<LocalGurdian>({
  name: { type: String, required: true },
  occupation: { type: String, required: true },
  contractNo: { type: String, required: true },
  address: { type: String, required: true },
});

// 2. Create a Schema corresponding to the document interface.
const studentSchema = new Schema<Student>({
  id: { type: String },
  name: userNameSchema,
  gender: ['male', 'female'],
  email: { type: String, required: true },
  dateOfBirth: { type: String, required: true },
  bloodGroup: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
  presentAddress: { type: String, required: true },
  permanentAddress: { type: String, required: true },
  contractNo: { type: String, required: true },
  emergencyContractNo: { type: String, required: true },
  guardian: guardianSchema,
  localGurdiant: localGurdianSchema,
  profileImg: { type: String },
  isActive: ['active', 'blocked'],
});

export const StudentModel = model<Student>('Student', studentSchema);
