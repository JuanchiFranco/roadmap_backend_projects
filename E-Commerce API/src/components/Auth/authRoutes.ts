import { Router } from "express";
import { register, login } from "./authController.js";
import { registerUserValidator, loginUserValidator } from "../../middlewares/validators/authValidators.js";
import { validateFields } from "../../middlewares/validateFields.js";

const router = Router();

router.post("/register", registerUserValidator, validateFields, register);

router.post("/login", loginUserValidator, validateFields, login);

export default router;