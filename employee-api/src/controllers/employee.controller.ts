import { Response, Request, NextFunction } from "express";
import IEmployee from "../models/interface/employee.interface";
import employeeService from "../services/employee.service";
import logging from "../util/config/logging";

const NAMESPACE = "Employee Controller";

const list = async (req: Request, res: Response, next: NextFunction) => {
  logging.info(NAMESPACE, "List called.");
  try {
    const result = await employeeService.list();
    return res.status(result.status).json(result);
  } catch (error) {
    logging.error(NAMESPACE, "Error while calling List.", String(error));
    return res.status(500).json({
      result: [],
      success: false,
      error: String(error),
      status: 500,
    });
  }
};

const create = async (req: Request, res: Response, next: NextFunction) => {
  const employee = req.body;
  logging.info(NAMESPACE, "Create called.", JSON.stringify(employee));
  try {
    const result = await employeeService.create(employee);
    return res.status(result.status).json(result);
  } catch (error) {
    logging.error(NAMESPACE, "Error while calling Create.", String(error));
    return res.status(500).json({
      result: [],
      success: false,
      error: String(error),
      status: 500,
    });
  }
};

const update = async (req: Request, res: Response, next: NextFunction) => {
  const employee = req.body;
  logging.info(NAMESPACE, "Update called.", JSON.stringify(employee));
  try {
    const result = await employeeService.update(employee);
    return res.status(result.status).json(result);
  } catch (error) {
    logging.error(NAMESPACE, "Error while calling Update.", String(error));
    return res.status(500).json({
      result: {} as IEmployee,
      success: false,
      error: String(error),
      status: 500,
    });
  }
};

const remove = async (req: Request, res: Response, next: NextFunction) => {
  const employeeId = String(req.query.employeeId);
  logging.info(NAMESPACE, "Remove called.", employeeId);
  try {
    const result = await employeeService.remove(employeeId);
    return res.status(result.status).json(result);
  } catch (error) {
    logging.error(NAMESPACE, "Error while calling Remove.", String(error));
    return res.status(500).json({
      result: {} as IEmployee,
      success: false,
      error: String(error),
      status: 500,
    });
  }
};

export default { list, create, update, remove };
