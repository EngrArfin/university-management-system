export type UserName = {
  firstName: string;
  middleName: string;
  lastName: string;
};

export type Gurdian = {
  fatherName: string;
  fatherOcupation: string;
  fatherContractNo: string;
  mothherName: string;
  mothherOcupation: string;
  mothherContractNo: string;
};

export type LocalGurdian = {
  name: string;
  occupation: string;
  contractNo: string;
  address: string;
};

export type Student = {
  id: string;
  name: UserName;
  gender: 'male' | 'female';
  email: string;
  contractNo: string;
  emergencyContractNo: string;
  dateOfBirth?: string;
  bloodGroup?: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';
  presentAddress: string;
  permanentAddress: string;
  guardian: Gurdian;
  localGurdiant: LocalGurdian;
  profileImg: string;
  isActive: 'active' | 'blocked';
};
