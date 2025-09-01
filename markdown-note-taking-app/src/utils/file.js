import fs from "fs/promises";
import path from "path";

const BASE_DIR = path.resolve("public/markdown");

function getSafePath(filename) {
    const resolvedPath = path.join(BASE_DIR, filename);
    if (!resolvedPath.startsWith(BASE_DIR + path.sep)) {
        throw new Error("Invalid file path");
    }
    return resolvedPath;
}

async function readMarkdownFile(filename) {
    const filePath = getSafePath(filename);
    return fs.readFile(filePath, "utf-8");
}

async function listMarkdownFiles() {
    const files = await fs.readdir(BASE_DIR);
    return files.filter(file => file.endsWith(".md"));
}

async function writeMarkdownFile(filename, data) {
    const safeName = filename.endsWith(".md") ? filename : filename + ".md";
    const filePath = getSafePath(safeName);
    await fs.writeFile(filePath, data, "utf-8");
    return safeName;
}

export { readMarkdownFile, writeMarkdownFile, listMarkdownFiles };
