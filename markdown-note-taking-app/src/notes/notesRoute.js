import { Router } from "express";
import { body, param, query } from "express-validator";
import notesController from "./notesController.js"; 
import { validate } from "../middleware/validate.js";
import { wrap } from "../middleware/asyncHandler.js";

const router = Router();

// Endpoint for check grammar
router.post("/:filename/grammar", param("filename").matches(/^[\w\-.]+\.md$/), validate, wrap(notesController.checkGrammar));

// Endpoint for save note
router.post("/", body("title").isString().notEmpty(), body("content").isString().notEmpty(), validate, wrap(notesController.saveNote));

// Endpoint for list notes
router.get("/", 
    query("page").optional().isInt({ min: 1 }),
    query("limit").optional().isInt({ min: 1, max: 100 }),
    validate,
    wrap(notesController.listNotes));

// Endpoint for render note
router.get("/:filename/html", param("filename").matches(/^[\w\-.]+\.md$/), validate, wrap(notesController.renderNote));

export default router;
