import { Response, Request, NextFunction } from "express";
import employeeService from "../services/employee.service";
import logging from "../util/config/logging";

const NAMESPACE = "Employee Controller";

const findAll = async (req: Request, res: Response, next: NextFunction) => {
  logging.info(NAMESPACE, "findAll controller called.");
  try {
    const result = await employeeService.findAll();
    return res.status(200).json(result);
  } catch (error) {
    logging.error(NAMESPACE, "Error while calling findAll controller.", error);
    return res.status(500).json({
      result: [],
      success: false,
      error: String(error),
      status: 500,
    });
  }
};

export default { findAll };
