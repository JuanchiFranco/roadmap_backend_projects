import { Router } from "express";
import todoController from "../controllers/todoController.js";

const router = Router();

router.get("/", todoController.getAll);
router.post("/", todoController.create);
router.get("/:id", todoController.getById);
router.put("/:id", todoController.update);
router.delete("/:id", todoController.remove);

export default router;
