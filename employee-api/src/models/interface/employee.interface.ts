import { Document } from "mongoose";

export default interface IEmployee extends Document {
  _id: string;
  createdAt?: string;
	updatedAt?: string;
  firstName: string;
  lastName: string;
  contactNumber: number;
  emailAddress: string;
  dateOfBirth: string;
  address: string;
  skills: string;
  __v?: number;
}
