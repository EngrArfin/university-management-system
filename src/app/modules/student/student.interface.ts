import { Types } from 'mongoose';

export type TUserName = {
  firstName: string;
  middleName: string;
  lastName: string;
};

export type TGurdian = {
  fatherName: string;
  fatherOcupation: string;
  fatherContractNo: string;
  mothherName: string;
  mothherOcupation: string;
  mothherContractNo: string;
};

export type TLocalGurdian = {
  name: string;
  occupation: string;
  contractNo: string;
  address: string;
};

export type TStudent = {
  id: string;
  user: Types.ObjectId;
  password: string;
  name: TUserName;
  gender: 'male' | 'female';
  email: string;
  contractNo: string;
  emergencyContractNo: string;
  dateOfBirth?: string;
  bloodGroup?: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';
  presentAddress: string;
  permanentAddress: string;
  guardian: TGurdian;
  localGurdiant: TLocalGurdian;
  profileImg: string;
  isDeleted: boolean;
};
