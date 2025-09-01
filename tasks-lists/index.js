// importación del file system y path para manejar archivos y rutas
const fs = require('fs');
const path = require('path');

// obtenemos la ruta del archivo json a partir de la ruta del archivo actual y una carpeta llamada data
const jsonFilePath = path.join(__dirname, 'data.json');


/**
 * Reads a JSON file from the specified path and parses its content into a JavaScript object.
 * If the file does not exist, it returns an empty array.
 * If an error occurs during reading or parsing, it logs the error and returns null.
 *
 * @returns {Object|Array|null} The parsed JSON object or array if successful, an empty array if the file does not exist, or null if an error occurs.
 */
const readJsonFile = () => {
    try {
        // leemos el archivo json y lo parseamos a un objeto javascript si existe, si no existe retornamos un arreglo vacío
        if(fs.existsSync(jsonFilePath)) {
        const jsonData = fs.readFileSync(jsonFilePath, 'utf8');
        return JSON.parse(jsonData);
        }
        return [];

    } catch (error) {
        console.error('Error reading JSON file:', error);
        return null;
    }
};


/**
 * Retrieves and filters data from a JSON file based on the provided status.
 *
 * @param {string} [status] - The status to filter the data by. If no status is provided, all data is returned.
 * @returns {Array<Object>} The filtered data based on the provided status, or all data if no status is specified.
 * @throws {Error} If no data is found in the JSON file.
 */
const listData = (status) => {
    const data = readJsonFile();

    if (data.length > 0) {
        const filteredData = status ? data.filter(item => item.status === status) : data;
        return filteredData;
    }
    console.error('Error: No data found in JSON file.');
    return;
};


/**
 * Retrieves the next available ID based on the highest ID in the existing data.
 * If no data exists, it returns 1 as the starting ID.
 *
 * @returns {number} The next available ID.
 */
const getLastId = () => {
    const data = readJsonFile();
    if (data.length > 0) {
        // obtenemos el id del último elemento del arreglo y le sumamos 1 para el nuevo id
        return Math.max(...data.map(item => item.id)) + 1;
    }
    return 1; // si no hay datos, el primer id será 1
};

/**
 * Adds a new task to the JSON data file.
 *
 * @param {string} Task - The description of the task to be added.
 * @returns {Object} The newly added task object, including its ID, description, status, and timestamps.
 *
 * @throws {Error} If there is an issue writing to the JSON file.
 */
const addData = (Task) => {
    const data = readJsonFile();
    const newTask = {
        id: getLastId(),
        description: Task,
        status: 'todo',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    }
    
    data.push(newTask); // agregamos el nuevo elemento al arreglo de datos
    try {
        fs.writeFileSync(jsonFilePath, JSON.stringify(data, null, 2)); // escribimos el nuevo arreglo en el archivo json
        console.log('Data added successfully:', newTask);
    } catch (error) {
        console.error('Error writing to JSON file:', error);
    }

    return newTask; // retornamos el nuevo elemento agregado
};

/**
 * Updates a task in the JSON file based on the provided ID. 
 * Allows updating the task's description, status, and automatically sets the updated timestamp.
 *
 * @param {string} id - The unique identifier of the task to update.
 * @param {string} [description] - The new description for the task (optional).
 * @param {string} [status] - The new status for the task (optional).
 * @throws {Error} If there is an issue writing to the JSON file.
 */
const updateTask = (id, description, status) => {
    const data = readJsonFile();
    const taskIndex = data.findIndex(item => item.id === id); // buscamos el índice de la tarea a actualizar

    if (taskIndex !== -1) {
        if(description){
            data[taskIndex].description = description; // actualizamos la descripción de la tarea
        }
        if (status) {
            data[taskIndex].status = status; // actualizamos el estado de la tarea si se pasa un nuevo estado
        }
        data[taskIndex].updatedAt = new Date().toISOString(); // actualizamos la fecha de actualización
        try {
            fs.writeFileSync(jsonFilePath, JSON.stringify(data, null, 2)); // escribimos el nuevo arreglo en el archivo json
            console.log('Task updated successfully:', data[taskIndex]);
        } catch (error) {
            console.error('Error writing to JSON file:', error);
        }
    } else {
        console.error('Error: Task not found.');
    }
};

/**
 * Deletes a task from the JSON file based on the provided task ID.
 *
 * @param {string|number} id - The ID of the task to be deleted.
 * @returns {void}
 *
 * @throws Will log an error if the task is not found or if there is an issue writing to the JSON file.
 *
 * @description
 * This function reads the JSON file to retrieve the list of tasks, finds the task with the matching ID,
 * removes it from the list, and writes the updated list back to the JSON file. If the task is not found,
 * an error message is logged. If there is an issue writing to the file, the error is also logged.
 */
const deleteTask = (id) => {
    const data = readJsonFile();
    const taskIndex = data.findIndex(item => item.id === id); // buscamos el índice de la tarea a eliminar

    if (taskIndex !== -1) {
        const deletedTask = data.splice(taskIndex, 1); // eliminamos la tarea del arreglo
        try {
            fs.writeFileSync(jsonFilePath, JSON.stringify(data, null, 2)); // escribimos el nuevo arreglo en el archivo json
            console.log('Task deleted successfully:', deletedTask[0]);
        } catch (error) {
            console.error('Error writing to JSON file:', error);
        }
    } else {
        console.error('Error: Task not found.');
    }
};


// Se obtienen los parametros de la línea de comandos
const args = process.argv.slice(2);

// Se verifica si se ha pasado un argumento y se llama a la función listData con el argumento pasado
if (args.length > 0) {
    
    switch (args[0]) {
        case 'list':
            const status = args[1] || null; // Se obtiene el segundo argumento si existe, sino se asigna null
            const data = listData(status);
            if (data) {
                console.log('Data:', data);
            }
            break;
        case 'add':
            if (args[1]) {
                // unimos los argumentos restantes en un solo string para la descripción de la tarea
                // esto es útil si la descripción de la tarea tiene espacios o es una frase larga
                const task = args.slice(1).join(' ');
                addData(task);
            } else {
                console.warn('Task description cannot be empty. Please provide a valid description.');
                console.warn('Usage: node index.js add <task_description>');
            }
            break;
        case 'update':
            if (args[1] && args[2]) {
                const id = parseInt(args[1], 10); // Se obtiene el primer argumento y se convierte a número
                const description = args.slice(2).join(' '); // Se unen los argumentos restantes en un solo string para la descripción de la tarea

                if(isNaN(id)){
                    console.warn('Invalid ID. Please provide a valid number.');
                    console.warn('Usage: node index.js update <id> <description>');
                    break;
                }

                updateTask(id, description, null);
            } else {
                console.warn('Usage: node index.js update <id> <status>');
            }
            break;
        case 'delete':
            if (args[1]) {
                const id = parseInt(args[1], 10); // Se obtiene el primer argumento y se convierte a número
                if(isNaN(id)){
                    console.warn('Invalid ID. Please provide a valid number.');
                    console.warn('Usage: node index.js delete <id>');
                    break;
                }

                deleteTask(id);
            } else {
                console.warn('Usage: node index.js delete <id>');
            }
            break;
        case 'mark-in-progress': 
            if (args[1]) {
                const id = parseInt(args[1], 10); // Se obtiene el primer argumento y se convierte a número
                if(isNaN(id)){
                    console.warn('Invalid ID. Please provide a valid number.');
                    console.warn('Usage: node index.js mark-in-progress <id>');
                    break;
                }

                updateTask(id, null, 'in-progress');
            } else {
                console.warn('Usage: node index.js mark-in-progress <id>');
            }
            break;
        case 'mark-done':
            if( args[1]) {
                const id = parseInt(args[1], 10); // Se obtiene el primer argumento y se convierte a número
                if(isNaN(id)){
                    console.warn('Invalid ID. Please provide a valid number.');
                    console.warn('Usage: node index.js mark-done <id>');
                    break;
                }

                updateTask(id, null, 'done');
            }
            else {
                console.warn('Usage: node index.js mark-done <id>');
            }
            break;
        default:
            console.warn('Invalid command. Use "add", "list", "update", "delete".');
            console.warn('Usage: node index.js <function> [<args>]');
    }
}else{
    console.warn('No arguments provided. Please provided the function to execute.');
    console.warn('Usage: node index.js <function> [<args>]');
}