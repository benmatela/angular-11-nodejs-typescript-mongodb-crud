import mongoose, { Schema } from "mongoose";
import IEmployee from "../interface/employee.interface";

const EmployeeSchema: Schema = new Schema(
  {
    _id: {
      type: String,
      required: true,
      unique: false,
      minlength: 6,
      maxlength: 6,
      index: true,
    },
    firstName: {
      type: String,
      required: true,
      unique: false,
      minlength: 1,
      maxlength: 255,
    },
    lastName: {
      type: String,
      required: true,
      unique: false,
      minlength: 1,
      maxlength: 255,
    },
    contactNumber: {
      type: Number,
      required: true,
      unique: true,
      minlength: 10,
      maxlength: 10,
    },
    emailAddress: {
      type: String,
      required: true,
      unique: true,
      minlength: 1,
      maxlength: 100,
    },
    dateOfBirth: {
      type: String,
      required: true,
      unique: false,
      minlength: 1,
      maxlength: 50,
    },
    address: {
      type: String,
      required: true,
      unique: false,
      minlength: 1,
      maxlength: 255,
    },
    skills: {
      type: String,
      required: false,
      unique: false,
      minlength: 1,
      maxlength: 255,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IEmployee>("Employee", EmployeeSchema);
