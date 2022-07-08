import employeeSchema from "../models/schema/employee.schema";
import logging from "../util/config/logging";

const NAMESPACE = "Employee Service";

async function findAll(): Promise<any> {
  logging.info(NAMESPACE, "findAll function called.");
  try {
    await employeeSchema
      .find()
      .then((result) => {
        return {
          data: result,
          success: true,
          error: null,
        };
      });
  } catch (error) {
    logging.error(this.NAMESPACE, "findAll()", error);
    return {
      data: [],
      success: false,
      error: error,
    };
  }
}

export default { findAll };
