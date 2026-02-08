/* Create a command-line interface (CLI) tool that interacts with the GitHub API to retrieve 
and display trending repositories. The tool will allow users to specify a time range (day, week, 
month, or year) to filter the trending repositories.
The CLI tool will fetch data from the GitHub API and present it in a user-friendly format. 
The tool should be easy to use and provide clear output. */

import { colors } from "../utils/colors.js";

//////// OBTENER ARGUMENTOS DE LA TERMINAL ////////
const args = process.argv.slice(2);

const options = {
    duration: "week",
    limit: 10,
};

args.forEach((arg, index) => {
    if (arg === "--help") {
        console.log(colors.green + "Usage: node index.js --duration <duration> --limit <limit>" + colors.reset);
        console.log(colors.green + "Options:" + colors.reset);
        console.log(colors.green + "  --duration  The time range to filter the trending repositories (day, week, month, year)" + colors.reset);
        console.log(colors.green + "  --limit     The number of trending repositories to display (default: 10)" + colors.reset);
        process.exit(0);
    }
    if (arg === "--duration") {
        options.duration = args[index + 1] || "week";
    }
    if (arg === "--limit") {
        options.limit = args[index + 1] || 10;
    }
});

//// funcion para obtener la fecha segun la duracion //////
function getDate(duration) {
    const date = new Date();
    if (duration === "day") {
        date.setDate(date.getDate() - 1);
    }
    if (duration === "week") {
        date.setDate(date.getDate() - 7);
    }
    if (duration === "month") {
        date.setMonth(date.getMonth() - 1);
    }
    if (duration === "year") {
        date.setFullYear(date.getFullYear() - 1);
    }
    return date.toISOString().split("T")[0];
}

//// Funcion paara formatear la data //////
function formatData(data) {
    return data.map((item) => {
        return {
            name: item.name,
            owner: item.owner.login,
            stars: item.stargazers_count,
            forks: item.forks_count,
            url: item.html_url,
            language: item.language
        };
    });
}

////// funcion para obtener los trending repositories //////
async function getTrendingRepositories(duration, limit) {
    const date = getDate(duration);
    const url = `https://api.github.com/search/repositories?q=created:>${date}&sort=stars&order=desc&per_page=${limit}`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        return formatData(data.items);
    } catch (error) {
        console.log(colors.red + "Error al obtener los trending repositories" + colors.reset);
    }
}

///// Display data //////
function displayData(data) {
    data.forEach((item) => {
        /// repositorio en mayuscula como titulo
        console.log(colors.green + "Name: " + colors.reset + item.name.toUpperCase());
        console.log(colors.green + "Owner: " + colors.reset + item.owner);
        console.log(colors.green + "Stars: " + colors.reset + item.stars);
        console.log(colors.green + "Forks: " + colors.reset + item.forks);
        console.log(colors.green + "URL: " + colors.reset + item.url);
        console.log(colors.green + "Language: " + colors.reset + (item.language == null ? "Unknown" : item.language));
        console.log("");
    });
}

/// funcion principal //////
async function main() {
    const trendingRepositories = await getTrendingRepositories(options.duration, options.limit);
    displayData(trendingRepositories);
}


main();




