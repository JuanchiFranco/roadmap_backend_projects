import blogService from '../services/blogService.js';

async function getAllBlogs(req, res) {
    let { term } = req.query;
    
    try {
        const blogs = await blogService.getAllBlogs(term);
        if(!blogs.success || blogs.data.length === 0) {
            return res.status(404).json({ message: 'No blogs found' });
        };
        res.status(200).json(blogs.data);
    } catch (error) {
        console.error('Error retrieving blogs:', error);
        res.status(500).json({ message: 'Error retrieving blogs'});
    }
};

async function getBlogById(req, res) {
    const { id } = req.params;
    if (!id) {
        return res.status(400).json({ message: 'blog ID is required' });
    }
    try {
        const blog = await blogService.getBlogById(id);
        if(!blog.success) {
            return res.status(404).json({ message: 'blog not found' });
        }
        res.status(200).json(blog.data);
    } catch (error) {
        console.error('Error retrieving blog:', error);
        res.status(500).json({ message: 'Error retrieving blog'});
    }
};

async function createBlog(req, res) {
    const newBlog = req.body;
    if (!newBlog || !newBlog.title || !newBlog.content) {
        return res.status(400).json({ message: 'Title and content are required' });
    }
    try {

        let createdAt = new Date();
        let updatedAt = new Date();
        newBlog.createdAt = createdAt.toISOString().replace('T', ' ').replace('Z', '');
        newBlog.updatedAt = updatedAt.toISOString().replace('T', ' ').replace('Z', '');


        const createdBlog = await blogService.createBlog(newBlog);
        if(!createdBlog.success) {
            return res.status(400).json({ message: 'Error creating blog' });
        }
        res.status(201).json(createdBlog.data);
    } catch (error) {
        console.error('Error creating blog:', error);
        res.status(500).json({ message: 'Error creating blog'});
    }
};

async function updateBlog(req, res) {
    const { id } = req.params;
    const updatedBlog = req.body;

    if (!id || !updatedBlog.title || !updatedBlog.content || !updatedBlog.category) {
        return res.status(400).json({ message: 'blog ID, title, and content are required' });
    }

    updateBlog.tags = updatedBlog?.tags || [];

    try {
        let updatedAt = new Date();
        updatedBlog.updatedAt = updatedAt.toISOString().replace('T', ' ').replace('Z', '');
        const blog = await blogService.updateBlog(id, updatedBlog);
        if (!blog.success) {
            return res.status(404).json({ message: 'blog not found' });
        };
        res.status(200).json(blog.data);
    } catch (error) {
        console.error('Error updating blog:', error);
        res.status(500).json({ message: 'Error updating blog'});
    }
};

async function deleteBlog(req, res) {
    const { id } = req.params;
    if (!id) {
        return res.status(400).json({ message: 'blog ID is required' });
    }
    try {
        const deleted = await blogService.deleteBlog(id);
        if (!deleted.success) {
            return res.status(404).json({ message: 'blog not found' });
        }
        res.status(200).json({ message: 'blog deleted successfully' });
    } catch (error) {
        console.error('Error deleting blog:', error);
        res.status(500).json({ message: 'Error deleting blog'});
    }
};

export default {
    getAllBlogs,
    getBlogById,
    createBlog,
    updateBlog,
    deleteBlog
};