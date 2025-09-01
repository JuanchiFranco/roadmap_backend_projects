import { Router } from "express";
import { body, param } from "express-validator";
import { validate } from "../middleware/validate.js";
import { wrap } from "../middleware/asyncHandler.js";
import { shorten, getUrlByShortCode, updateUrl, deleteUrl, getStatsUrl } from "./urlController.js";

const router = Router();

router.post('/shorten', body('url').isURL().withMessage('Invalid URL'), validate, wrap(shorten));
router.get('/shorten/:shortCode', param('shortCode').isString().withMessage('Invalid short code'), validate, wrap(getUrlByShortCode));
router.put('/shorten/:shortCode', param('shortCode').isString().withMessage('Invalid short code'), body('url').isURL().withMessage('Invalid URL'), validate, wrap(updateUrl));
router.delete('/shorten/:shortCode', param('shortCode').isString().withMessage('Invalid short code'), validate, wrap(deleteUrl));
router.get('/shorten/:shortCode/stats', param('shortCode').isString().withMessage('Invalid short code'), validate, wrap(getStatsUrl));

export default router;
