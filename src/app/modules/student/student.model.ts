import validator from 'validator';
import { Schema, model } from 'mongoose';
import {
  TGurdian,
  TLocalGurdian,
  TStudent,
  TUserName,
} from './student.interface';

const userNameSchema = new Schema<TUserName>({
  firstName: {
    type: String,
    trim: true,
    required: [true, 'First Name is required'],
    maxlength: [20, 'max length 20'],
    validate: {
      validator: function (value: string) {
        const firstNameStr = value.charAt(0).toUpperCase() + value.slice(1); // Corrected here
        return firstNameStr === value;
      },
      message: '{VALUE} is not in capitalize format',
    },
  },
  middleName: {
    type: String,
    trim: true,
  },
  lastName: {
    type: String,
    trim: true,
    required: [true, 'Last Name is required'],
    validate: {
      validator: (value: string) => validator.isAlphanumeric(value),
      message: '{VALUE} is not a valid last name',
    },
  },
});

const guardianSchema = new Schema<TGurdian>({
  fatherName: { type: String, required: [true, 'Father Name is required'] },
  fatherOcupation: {
    type: String,
    required: [true, 'Father Occupation is required'],
  },
  fatherContractNo: {
    type: String,
    required: [true, 'Father Contact Number is required'],
  },
  mothherName: { type: String, required: [true, 'Mother Name is required'] },
  mothherOcupation: {
    type: String,
    required: [true, 'Mother Occupation is required'],
  },
  mothherContractNo: {
    type: String,
    required: [true, 'Mother Contact Number is required'],
  },
});

const localGurdianSchema = new Schema<TLocalGurdian>({
  name: { type: String, required: [true, 'Local Guardian Name is required'] },
  occupation: {
    type: String,
    required: [true, 'Local Guardian Occupation is required'],
  },
  contractNo: {
    type: String,
    required: [true, 'Local Guardian Contact Number is required'],
  },
  address: {
    type: String,
    required: [true, 'Local Guardian Address is required'],
  },
});

// 2. Create a Schema corresponding to the document interface.
const studentSchema = new Schema<TStudent>(
  {
    id: {
      type: String,
      required: [true, 'Student ID is required'],
      unique: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      required: [true, 'User ID is required'],
      unique: true,
      ref: 'User',
    },
    /* password: {
      type: String,
      required: [true, 'ID is required'],
      maxlength: [20, 'pass cant not be more 20 character  '],
    }, */

    name: {
      type: userNameSchema,
      required: [true, 'Student Name is required'],
    },
    gender: {
      type: String,
      enum: {
        values: ['male', 'female', 'other'],
        message: '{VALUE} is not valid',
      },
      required: [true, 'Gender is required'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,

      validate: {
        validator: (value: string) => validator.isEmail(value),
        message: '{VALUE} is not a valid email type',
      },
    },
    dateOfBirth: {
      type: Date,
      required: [true, 'Date of Birth is required'],
    },
    presentAddress: {
      type: String,
      required: [true, 'Present Address is required'],
    },
    permanentAddress: {
      type: String,
      required: [true, 'Permanent Address is required'],
    },
    contractNo: {
      type: String,
      required: [true, 'Contact Number is required'],
    },
    emergencyContractNo: {
      type: String,
      required: [true, 'Emergency Contact Number is required'],
    },
    guardian: {
      type: guardianSchema,
      required: [true, 'Guardian details are required'],
    },
    localGurdiant: {
      type: localGurdianSchema,
      required: [true, 'Local Guardian details are required'],
    },
    profileImg: { type: String },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    /* isActive: {
  type: String,
  enum: ['active', 'blocked'],
  default: 'active',
}, */
  },

  {
    toJSON: {
      virtuals: true,
    },
  }
);

studentSchema.virtual('fullName').get(function () {
  return this.name.firstName + this.name.middleName + this.name.lastName;
});

/* //pre save module  /hook 
studentSchema.pre('save', async function (next) {
  const user = this;
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_rounds)
  );
  next();
});
// post save middleware  /hook
studentSchema.post('save', function (doc, next) {
  doc.password = '';
  next();
}); */

// Queary middleware
studentSchema.pre('find', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

studentSchema.pre('findOne', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

studentSchema.pre('aggregate', function (next) {
  this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
  next();
});

//create a castom static method

studentSchema.static.isUserExists = async function (id: string) {
  const existingUser = await Student.findOne({ id });
  return existingUser;
};

export const Student = model<TStudent, StudentModel>('Student', studentSchema);
