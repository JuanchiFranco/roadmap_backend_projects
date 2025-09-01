import { Router } from 'express';
import blogController from '../controllers/blogController.js';

const router = Router();

router.get('/blogs', blogController.getAllBlogs);
router.get('/blogs/:id', blogController.getBlogById);
router.post('/blogs', blogController.createBlog);
router.put('/blogs/:id', blogController.updateBlog);
router.delete('/blogs/:id', blogController.deleteBlog);

export default router;