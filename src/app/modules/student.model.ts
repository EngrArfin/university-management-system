import { Schema, model, connect } from 'mongoose';
import { Student } from './student/student.interface';

// 2. Create a Schema corresponding to the document interface.
const studentSchema = new Schema<Student>({
  id: { type: String },
  name: {
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
  },
  gender: ['male' ,'female'],
  email: { type: String, required: true },

  bloodGroup: 
  presentAddress: { type: String, required: true },
  permanentAddress: { type: String, required: true },
  contractNo: { type: String, required: true },
  emergencyContractNo: { type: String, required: true },
});
