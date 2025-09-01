// Creamos unos colores para la consola para mostrar los mensajes de error y éxito

const colors = {
    red: '\x1b[31m',
    green: '\x1b[32m',
    yellow: '\x1b[33m',
    blue: '\x1b[34m',
    magenta: '\x1b[35m',
    cyan: '\x1b[36m',
    orange: '\x1b[38;5;208m',
    lightBlue: '\x1b[38;5;39m',
    lightGreen: '\x1b[38;5;82m',
    white: '\x1b[37m',
    reset: '\x1b[0m'
}


// creamos una función asincrona fetch para obtener los datos de la API de github
const fetchData = async (username) => {
  const response = await fetch(`https://api.github.com/users/${username}/events`);
  if (!response.ok) {
    if (response.status === 404) {
      throw new Error('User not found');
    }
    throw new Error('Failed to fetch data from GitHub API');
  }
  return response.json();
};

// creamos una función asincrona getUserEvents para obtener los eventos de un usuario
const getUserEvents = async (username) => {
  try {
    const events = await fetchData(username);
    if (events.length === 0) {
      console.log(`${colors.yellow}No events found for user ${username}${colors.reset}`);
      return;
    }
    return events;
  } catch (error) {
    console.error(`Error fetching user events: ${error.message}`);
  }
};


// obtenemos el nombre de usuario de la línea de comandos
const username = process.argv[2];
if (!username) {
  console.error('Please provide a GitHub username as a command line argument.');
  process.exit(1);
}

// llamamos a la función getUserEvents y mostramos los eventos en la consola
getUserEvents(username)
  .then((events) => {
    if (events) {
      console.log(`${colors.green}Events for user ${username}:${colors.reset}`);
      events.forEach((event) => {
        // mostramos los eventos dependiendo del tipo de evento
        switch (event.type) {
            case 'PushEvent':
                console.log(`- ${colors.blue}Pushed ${event.payload.size} commit(s) to ${event.repo.name}:${colors.reset}`);
                break;
            case 'IssuesEvent':
                if (event.payload.action === 'opened') {
                console.log(`${colors.cyan}- Opened a new issue in ${event.repo.name}:${colors.reset}`);
                }
                break;
            case 'WatchEvent':
                if (event.payload.action === 'started') {
                console.log(`${colors.magenta}- Starred ${event.repo.name}:${colors.reset}`);
                }
                break;
                
            case 'ForkEvent':
                console.log(`${colors.white}- Forked ${event.repo.name}:${colors.reset}`);
                break;
            case 'PullRequestEvent':
                if (event.payload.action === 'opened') {
                    console.log(`${colors.orange}- Opened a new pull request in ${event.repo.name}:${colors.reset}`);
                }
                break;
            case 'IssueCommentEvent':
                if (event.payload.action === 'created') {
                    console.log(`${colors.orange}- Commented on an issue in ${event.repo.name}:${colors.reset}`);
                }
                break;
            case 'CreateEvent':
                if (event.payload.ref_type === 'repository') {
                    console.log(`${colors.lightGreen}- Created a new repository: ${event.repo.name}:${colors.reset}`);
                } else if (event.payload.ref_type === 'branch') {
                    console.log(`${colors.lightGreen}- Created a new branch in ${event.repo.name}:${colors.reset}`);
                }
                break;
            default:
                console.log(`${colors.yellow}- Unknown event type: ${event.type}:${colors.reset}`);
        }

      });
    }
  })
  .catch((error) => {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  });