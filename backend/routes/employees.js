import express from "express";

const router = express.Router();
import {
  getEmployees,
  getEmployee,
  createEmployee,
  updateEmployee,
  deleteEmployee,
} from "../controllers/employeeController.js";

import validateEmployee from "../middleware/validation.js";

router.route("/").get(getEmployees).post(validateEmployee, createEmployee);

router
  .route("/:id")
  .get(getEmployee)
  .put(validateEmployee, updateEmployee)
  .delete(deleteEmployee);

export default router;
