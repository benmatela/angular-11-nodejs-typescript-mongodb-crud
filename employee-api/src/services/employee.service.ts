import IEmployee from "../models/interface/employee.interface";
import { IResponseWrapper } from "../models/interface/response-wrapper.interface";
import employeeSchema from "../models/schema/employee.schema";
import logging from "../util/config/logging";

const NAMESPACE = "Employee Service";

async function findAll(): Promise<IResponseWrapper<IEmployee[]>> {
  logging.info(NAMESPACE, "findAll function called.");
  let responseWrapper = {} as IResponseWrapper<IEmployee[]>;
  try {
    await employeeSchema
      .find()
      .then((result) => {
        responseWrapper.data = result;
        responseWrapper.success = true;
        responseWrapper.status = 200;
        responseWrapper.error = '';
      });
    return responseWrapper;
  } catch (error) {
    logging.error(this.NAMESPACE, "Error while calling findAll function.", error);
    responseWrapper.data = [];
    responseWrapper.success = false;
    responseWrapper.error = String(error);
    responseWrapper.status = 500;
    return responseWrapper;
  }
}

export default { findAll };
