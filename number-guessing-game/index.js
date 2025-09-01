/**
 * You are required to build a simple number guessing game where the computer randomly selects a number
 * and the user has to guess it. The user will be given a limited number of chances to guess the number.
 * If the user guesses the number correctly, the game will end, and the user will win. Otherwise, the game
 * will continue until the user runs out of chances.
 */

const readline = require("readline-sync");
const fs = require("fs");
const path = require("path");

// leemos el archivo json donde guardamos el nombre del jugador y el tiempo que tardó en adivinar el número por nivel de dificultad
// si no existe lo creamos
const filePath = path.join(__dirname, "playerData.json");

const readRecord = () => {
    if (fs.existsSync(filePath)) {
        const data = fs.readFileSync(filePath, "utf-8");
        return JSON.parse(data);
    } else {
        return {
            easy: [],
            medium: [],
            hard: [],
        };
    }
};

const writeRecord = (data) => {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf-8");
}

// guardamos el nombre del jugador y el tiempo que tardó en adivinar el número por nivel de dificultad si es menor al que ya existe y borrando el que ya existe, dejando solo el mejor tiempo
const saveRecord = (difficulty, name, time) => {
    const records = readRecord();
    const newRecord = { name, time };
    if (records[difficulty]?.length === 0 || time < records[difficulty][0]?.time) {
        records[difficulty].unshift(newRecord);
        records[difficulty] = records[difficulty].slice(0, 1); // keep only the best record
    } else {
        records[difficulty].push(newRecord);
        records[difficulty].sort((a, b) => a.time - b.time); // sort by time
        records[difficulty] = records[difficulty].slice(0, 1); // keep only the best record
    }
    // write the updated records to the file
    writeRecord(records);
};


// colores para la consola
const colors = {
    reset: "\x1b[0m",
    red: "\x1b[31m",
    green: "\x1b[32m",
    yellow: "\x1b[33m",
    blue: "\x1b[34m",
    magenta: "\x1b[35m",
    cyan: "\x1b[36m",
    white: "\x1b[37m",
};

let wantToPlay = true;
while (wantToPlay) {
    // agregar un banner al juego
    console.log(colors.cyan + "=========================================" + colors.reset);
    console.log(colors.cyan + "Welcome to the Number Guessing Game!" + colors.reset);
    console.log(colors.cyan + "I'm thinking of a number between 1 and 100." + colors.reset);
    console.log(colors.cyan + "=========================================" + colors.reset);

    console.log(colors.blue + "Please select the difficulty level:" + colors.reset);
    console.log("1. Easy (10 chances)");
    console.log("2. Medium (5 chances)");
    console.log("3. Hard (3 chances)");

    let validInput = false;
    let chances = 0;
    let difficulty = 0;
    while (!validInput) {
        difficulty = readline.question("Enter your choice (1, 2, or 3): ");
        switch (difficulty) {
            case "1":
            chances = 10;
            validInput = true;
            break;
            case "2":
            chances = 5;
            validInput = true;
            break;
            case "3":
            chances = 3;
            validInput = true;
            break;
            default:
            console.warn("Invalid choice. Please select a valid difficulty level.");
        }
    }

    let playerName = readline.question("Enter your name: ");
    if (!playerName) {
        playerName = "Player";
    }

    // clear the console
    console.clear();

    const randomNumber = Math.floor(Math.random() * 100) + 1;
    console.log(`You have ${chances} chances to guess the number.`);

    let guessedCorrectly = false;
    let chancesUsed = 0;

    let startTime, endTime, timeTaken;

    // start the timer
    startTime = Date.now();

    while (chances > 0 && !guessedCorrectly) {
        console.log(`You have ${chances} chances left.`);
        const userGuess = readline.question("Enter your guess: ");
        const guess = parseInt(userGuess, 10);

        if (isNaN(guess) || guess < 1 || guess > 100) {
            console.log("Please enter a valid number between 1 and 100.");
            continue;
        }

        if (guess === randomNumber) {
            console.log(colors.green + `Congratulations! You guessed the correct number in ${chancesUsed + 1} attempts!` + colors.reset);
            guessedCorrectly = true;
            endTime = Date.now();
            timeTaken = Math.floor((endTime - startTime) / 1000); // time in seconds
            console.log(colors.green + `You took ${timeTaken} seconds to guess the number.` + colors.reset);

            saveRecord(difficulty=== "1" ? "easy" : difficulty === "2" ? "medium" : "hard", playerName, timeTaken);
            const records = readRecord();
            console.log(colors.cyan + "Current Records:" + colors.reset);
            console.log(colors.cyan + "Easy: " + records.easy.map(record => `${record.name} (${record.time}s)`).join(", ") + colors.reset);
            console.log(colors.cyan + "Medium: " + records.medium.map(record => `${record.name} (${record.time}s)`).join(", ") + colors.reset);
            console.log(colors.cyan + "Hard: " + records.hard.map(record => `${record.name} (${record.time}s)`).join(", ") + colors.reset);

        } else if (guess < randomNumber) {
            console.log(colors.red + `Incorrect! The number is greater than ${guess}. ` + colors.reset);
        } else {
            console.log(colors.red + `Incorrect! The number is less than ${guess}. ` + colors.reset);
        }

        chances--;
        chancesUsed++;
    }

    if (!guessedCorrectly) {
        console.log(colors.red + `Sorry! You've used all your chances. The correct number was ${randomNumber}.` + colors.reset);
    }

    const playAgain = readline.keyInYNStrict(colors.cyan + "Do you want to play again? (y/n): " + colors.reset);
    if (!playAgain) {
        wantToPlay = false;
        console.log(colors.cyan + "Thank you for playing! Goodbye!" + colors.reset);
    } else {
        console.clear();
    }
}