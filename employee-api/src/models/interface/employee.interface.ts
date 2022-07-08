import { Document } from "mongoose";

export default interface IEmployee extends Document {
  firstName: string;
  lastName: string;
  contactNumber: number;
  emailAddress: string;
  dateOfBirth: string;
  address: string;
  skills: string;
}
