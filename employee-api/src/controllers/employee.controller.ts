import { Response, Request, NextFunction } from "express";
import IEmployee from "../models/interface/employee.interface";
import employeeService from "../services/employee.service";
import logging from "../util/config/logging";

const NAMESPACE = "Employee Controller";

const findAll = async (req: Request, res: Response, next: NextFunction) => {
  logging.info(NAMESPACE, "FindAll called.");
  try {
    const result = await employeeService.findAll();
    return res.status(200).json(result);
  } catch (error) {
    logging.error(NAMESPACE, "Error while calling FindAll.", String(error));
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
  logging.info(NAMESPACE, "Create called.", String(employee));
  try {
    const result = await employeeService.create(employee);
    return res.status(201).json(result);
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
  logging.info(NAMESPACE, "Update called.", String(employee));
  try {
    const result = await employeeService.update(employee);
    return res.status(200).json(result);
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

export default { findAll, create, update };
