import { readMarkdownFile, writeMarkdownFile, listMarkdownFiles } from "../utils/file.js";
import axios from "axios"; 
import { config } from "../config/constants.js";
import { marked }  from "marked";

marked.setOptions({
    headerIds: false,
    mangle: false
})


const notesService = {

    checkGrammar: async (filename) => { 
        try{
            const content = await readMarkdownFile(filename);
            // check grammar
            const grammarResponse = await axios.post(config.languageTool.lt_url, null, {
                params: {
                    text: content,
                    language: config.languageTool.lt_lang
                }
            });   

            return { success: true, data: grammarResponse.data.matches};
        } catch (error) {
            console.error(error);
            if(error.code === 'ENOENT'){
                return { success: false, message: "Markdown file not found" };
            }
            throw error;
        }
    },

    saveNote: async (title, content) => {
        title= title.replace(/\s+/g, '-')
        //guardamos la nota
        const filename = await writeMarkdownFile(`${title}.md`, content);

        return { success: true, data: { filename }, message: "Note saved successfully" };
    },

    listNotes: async (page=1, limit=10) => {
        const pageNum = Math.max(Number(page) || 1, 1);
        const limitNum = Math.min(Math.max(Number(limit) || 10, 1), 100);
        
        const files = await listMarkdownFiles();
        const totalFiles = files.length;
        const totalPages = Math.ceil(totalFiles / limitNum);
        const slice = files.slice((pageNum - 1) * limitNum, pageNum * limitNum);
        return {
            success: true,
            data: {
                files: slice,
                meta: {
                    totalFiles,
                    totalPages,
                    currentPage: pageNum,
                    hasNext: pageNum < totalPages,
                    hasPrev: pageNum > 1
                }
            }
        }
    },
    renderNote: async (filename) => { 
        const markdownContent = await readMarkdownFile(filename);
        const html = marked(markdownContent);
        return { success: true, data: html };
    }
}

export default notesService;
