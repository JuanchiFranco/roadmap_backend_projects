import db from '../../../config/db.js';

async function getAllBlogs(term= '') {
  const query = `
    SELECT 
      b.idblogs,
      b.title,
      b.content,
      b.category,
      b.createdAt,
      b.updatedAt,
      GROUP_CONCAT(t.name) AS tags
    FROM blogs b
    LEFT JOIN blog_tags bt ON bt.idblogs = b.idblogs
    LEFT JOIN tags t ON t.idtags = bt.idtags
    WHERE b.title LIKE ? OR b.content LIKE ? OR b.category LIKE ?
    GROUP BY b.idblogs
    ORDER BY b.createdAt DESC;
  `;

  const values = [`%${term}%`, `%${term}%`, `%${term}%`];
  const rows = await db.query(query, values);
  if (rows.length === 0) {
    return { success: false, message: 'No blogs found' };
  }

  const data = rows.map(row => ({
    ...row,
    tags: row.tags ? row.tags.split(',') : []
  }));

  return { success: true, data: data };
}

async function getBlogById(id) {
  const query = `    SELECT 
      b.idblogs,
      b.title,
      b.content,
      b.category,
      b.createdAt,
      b.updatedAt,
      GROUP_CONCAT(t.name) AS tags
    FROM blogs b
    LEFT JOIN blog_tags bt ON bt.idblogs = b.idblogs
    LEFT JOIN tags t ON t.idtags = bt.idtags
    WHERE b.idblogs = ?
    GROUP BY b.idblogs;
  `;
  const values = [id];
  const rows = await db.query(query, values);
  if (rows.length === 0) {
    return { success: false, message: 'blog not found' };
  }

  const blog = rows[0];
  blog.tags = blog.tags ? blog.tags.split(',') : [];
  return { success: true, data: blog };
}

async function createBlog(blog) {
    const { title, content, category, tags, createdAt, updatedAt } = blog;
    // inicializamos una transacción para asegurar la integridad de los datos
    const conn = await db.getConnection();
    try {
        await conn.beginTransaction();
        const blogResult = await conn.query('INSERT INTO blogs (title, content, category, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?)', 
          [title, content, category, createdAt, updatedAt]);
        const blogId = blogResult[0].insertId;

        for( const tagName of tags) {
            const [existingTagRows] = await conn.query(
            'SELECT idtags FROM tags WHERE name = ? LIMIT 1',
            [tagName]
          );

          let tagId;

          if (existingTagRows.length > 0) {
            tagId = existingTagRows[0].idtags;
          } else {
            // Insertar nuevo tag
            const [tagResult] = await conn.query(
              'INSERT INTO tags (name) VALUES (?)',
              [tagName]
            );
            tagId = tagResult.insertId;
          }

          await conn.query(
            'INSERT INTO blog_tags (idblogs, idtags) VALUES (?, ?)',
            [blogId, tagId]
          );
        }

        await conn.commit();
        return { success: true, data: { id: blogId, title, content, category, tags, createdAt, updatedAt } };
    }catch (error) {
        await conn.rollback();
        console.error('Error creating blog:', error);
        throw error;
    }finally {
        conn.release();
    }
}

async function updateBlog(id, blog) {
    const { title, content, category, updatedAt } = blog;

    const conn = await db.getConnection();
    try {
        await conn.beginTransaction();
        const [existingBlogRows] = await conn.query('SELECT * FROM blogs WHERE idblogs = ?', [id]);
        if (existingBlogRows.length === 0) {
            return { success: false, message: 'blog not found' };
        }
        const existingBlog = existingBlogRows[0];
        // Actualizar el blog
        await conn.query('UPDATE blogs SET title = ?, content = ?, category = ?, updatedAt = ? WHERE idblogs = ?',
          [title, content, category, updatedAt, id]);
        // Eliminar las relaciones existentes
        await conn.query('DELETE FROM blog_tags WHERE idblogs = ?', [id]);
        // Insertar las nuevas relaciones de tags
        for (const tagName of blog.tags) {
            const [existingTagRows] = await conn.query(
                'SELECT idtags FROM tags WHERE name = ? LIMIT 1',
                [tagName]
            );

            let tagId;

            if (existingTagRows.length > 0) {
                tagId = existingTagRows[0].idtags;
            } else {
                // Insertar nuevo tag
                const [tagResult] = await conn.query(
                    'INSERT INTO tags (name) VALUES (?)',
                    [tagName]
                );
                tagId = tagResult.insertId;
            }

            await conn.query(
                'INSERT INTO blog_tags (idblogs, idtags) VALUES (?, ?)',
                [id, tagId]
            );
        }
        await conn.commit();
        return { success: true, data: { id, title, content, category, tags: blog.tags, updatedAt } };
    } catch (error) {
        await conn.rollback();
        console.error('Error updating blog:', error);
        throw error;
    } finally {
        conn.release();
    }
}

async function deleteBlog(id) {
    const result = await db.query('DELETE FROM blogs WHERE idblogs = ?', [id]);
    if (result.affectedRows === 0) {
        return { success: false, message: 'blog not found' };
    }
    return { success: true, message: 'blog deleted successfully' };
}

export default {
    getAllBlogs,
    getBlogById,
    createBlog,
    updateBlog,
    deleteBlog
};