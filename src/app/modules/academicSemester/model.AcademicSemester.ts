import { Schema, model } from 'mongoose';
import {
  AcademicSemesterCode,
  AcademicSemesterName,
  Months,
} from './constant.AcademicSemester';
import { TAcademicSemester } from './interface.AcademicSemester';

const academicSemesterSchema = new Schema<TAcademicSemester>(
  {
    name: {
      type: String,
      require: true,
      enum: AcademicSemesterName,
    },
    year: {
      type: Date,
      require: true,
    },
    code: {
      type: String,
      require: true,
      enum: AcademicSemesterCode,
    },
    startMonth: {
      type: String,
      require: true,
      enum: Months,
    },
    endMonth: {
      type: String,
      require: true,
      enum: Months,
    },
  },
  {
    timestamps: true,
  }
);

export const AcademicSemester = model<TAcademicSemester>(
  'AcademicSemester',
  academicSemesterSchema
);
