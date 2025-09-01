import notesService from "./notesService.js";  

const notesController = {
    checkGrammar: async (req, res) => {
        const { filename } = req.params;  
        const { success, data: matches, message } = await notesService.checkGrammar(filename);
        
        if(!success) return res.status(404).json({ success, message });
        res.json({ success: true, data: matches });
    },
    saveNote: async (req, res) => {
        const { title, content } = req.body;

        const { success, data, message } = await notesService.saveNote(title, content);
            
        if(!success) return res.status(400).json({ success, message });
        res
            .status(201)
            .location(`/notes/${data.filename}/html`)
            .json({ success: true, data, message });
    },
    listNotes: async (req, res) => {
        const { page, limit } = req.query;
        const { success, data, message } = await notesService.listNotes(page, limit);
            
        if(!success) return res.status(400).json({ success, message });

        res.json({ success: true, data });
    },
    renderNote: async (req, res) => {
        const { filename } = req.params;
        const { success, data: html, message } = await notesService.renderNote(filename);
            
        if(!success) return res.status(404).json({ success, message });
        res.send(html);
    }
}

export default notesController;
