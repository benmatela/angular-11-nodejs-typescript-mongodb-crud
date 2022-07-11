import { Characters } from "../models/enums/characters.enum";
import IEmployee from "../models/interface/employee.interface";
import { IResponseWrapper } from "../models/interface/response-wrapper.interface";
import employeeSchema from "../models/schema/employee.schema";
import logging from "../util/config/logging";
import helpers from "../util/helpers";

const NAMESPACE = "Employee Service";

async function list(): Promise<IResponseWrapper<IEmployee[]>> {
  logging.info(NAMESPACE, "List function called.");
  let responseWrapper = {} as IResponseWrapper<IEmployee[]>;
  try {
    responseWrapper.data = await employeeSchema.find();
    responseWrapper.success = true;
    responseWrapper.error = "";
    responseWrapper.status = 200;
    return responseWrapper;
  } catch (error) {
    logging.error(this.NAMESPACE, "Error while calling List function.", String(error));
    responseWrapper.data = [];
    responseWrapper.success = false;
    responseWrapper.error = String(error);
    responseWrapper.status = 500;
    return responseWrapper;
  }
}

async function create(employee: IEmployee): Promise<IResponseWrapper<IEmployee>> {
  logging.info(NAMESPACE, "Create function called.", JSON.stringify(employee));
  let responseWrapper = {} as IResponseWrapper<IEmployee>;
  try {
    employee._id = `${helpers.randomGenerator(2, Characters.ALPHABETS)}${helpers.randomGenerator(4, Characters.NUMBERS)}`;
    const existingId = await employeeSchema.findById(employee._id);
    if (existingId) {
      employee._id = `${helpers.randomGenerator(2, Characters.ALPHABETS)}${helpers.randomGenerator(4, Characters.NUMBERS)}`
    }
    
    await employeeSchema.create(employee).then((result) => {
      responseWrapper.data = result;
      responseWrapper.success = true;
      responseWrapper.status = 201;
      responseWrapper.error = "";
    });
    return responseWrapper;
  } catch (error) {
    logging.error(this.NAMESPACE, "Error while calling Create function.", String(error));
    responseWrapper.data = {} as IEmployee;
    responseWrapper.success = false;
    responseWrapper.error = String(error);
    responseWrapper.status = 500;
    return responseWrapper;
  }
}

async function update(employee: IEmployee): Promise<IResponseWrapper<IEmployee>> {
  logging.info(NAMESPACE, "Update function called.", JSON.stringify(employee));
  let responseWrapper = {} as IResponseWrapper<IEmployee>;
  try {
    const employeeToUpdate = await employeeSchema.findById(employee._id);
    if (!employeeToUpdate) {
      responseWrapper.data = {} as IEmployee;
      responseWrapper.success = false;
      responseWrapper.status = 404;
      responseWrapper.error = `Employee with { _id: '${employee._id}' } not found.`;
      logging.error(NAMESPACE, responseWrapper.error);
      return responseWrapper;
    }

    const updatedEmployee = await employeeSchema.findOneAndUpdate(
      {
        _id: employeeToUpdate._id,
      },
      {
        $set: employee,
      },
      {
        new: true,
        useFindAndModify: false,
      }
    );
    responseWrapper.data = updatedEmployee;
    responseWrapper.success = true;
    responseWrapper.status = 200;
    responseWrapper.error = "";
    return responseWrapper;
  } catch (error) {
    logging.error(this.NAMESPACE, "Error while calling Update function.", String(error));
    responseWrapper.data = {} as IEmployee;
    responseWrapper.success = false;
    responseWrapper.error = String(error);
    responseWrapper.status = 500;
    return responseWrapper;
  }
}

async function remove(employeeId: string): Promise<IResponseWrapper<IEmployee>> {
  logging.info(NAMESPACE, "Remove function called.", employeeId);
  let responseWrapper = {} as IResponseWrapper<IEmployee>;
  try {
    const employeeToRemove = await employeeSchema.findById(employeeId);
    if (!employeeToRemove) {
      logging.error(NAMESPACE, `Employee with { _id: '${employeeId}' } not found.`);
      responseWrapper.data = {} as IEmployee;
      responseWrapper.success = false;
      responseWrapper.status = 404;
      responseWrapper.error = `Employee with { _id: '${employeeId}' } not found.`;
      return responseWrapper;
    } 

    const removedEmployee = await employeeSchema.findByIdAndRemove(
      { _id: employeeToRemove._id },
      {
        useFindAndModify: false,
      }
    );
    responseWrapper.data = removedEmployee;
    responseWrapper.success = true;
    responseWrapper.status = 200;
    responseWrapper.error = "";
    return responseWrapper;
  } catch (error) {
    logging.error(this.NAMESPACE, "Error while calling Remove function.", String(error));
    responseWrapper.data = {} as IEmployee;
    responseWrapper.success = false;
    responseWrapper.error = String(error);
    responseWrapper.status = 500;
    return responseWrapper;
  }
}

export default { list, create, update, remove };
