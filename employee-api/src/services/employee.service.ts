import IEmployee from "../models/interface/employee.interface";
import { IResponseWrapper } from "../models/interface/response-wrapper.interface";
import employeeSchema from "../models/schema/employee.schema";
import logging from "../util/config/logging";

const NAMESPACE = "Employee Service";

async function findAll(): Promise<IResponseWrapper<IEmployee[]>> {
  logging.info(NAMESPACE, "FindAll function called.");
  let responseWrapper = {} as IResponseWrapper<IEmployee[]>;
  try {
    await employeeSchema.find().then((result) => {
      responseWrapper.data = result;
      responseWrapper.success = true;
      responseWrapper.error = "";
      responseWrapper.status = 200;
    });
    return responseWrapper;
  } catch (error) {
    logging.error(this.NAMESPACE, "Error while calling FindAll function.", String(error));
    responseWrapper.data = [];
    responseWrapper.success = false;
    responseWrapper.error = String(error);
    responseWrapper.status = 500;
    return responseWrapper;
  }
}

async function create(employee: IEmployee): Promise<IResponseWrapper<IEmployee>> {
  logging.info(NAMESPACE, "Create function called.");
  let responseWrapper = {} as IResponseWrapper<IEmployee>;
  try {
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
      logging.error(NAMESPACE, `Employee with _id:'${employee._id}' not found.`);
      responseWrapper.data = {} as IEmployee;
      responseWrapper.success = false;
      responseWrapper.status = 404;
      responseWrapper.error = `Employee with _id:'${employee._id}' not found.`;
      return responseWrapper;
    }

    await employeeSchema
      .findOneAndUpdate(
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
      )
      .then((result) => {
        responseWrapper.data = result;
        responseWrapper.success = true;
        responseWrapper.status = 204;
        responseWrapper.error = "";
      });
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

export default { findAll, create, update };
