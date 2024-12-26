let allGames = []; // Global variable to hold all game data from both JSON files

// Function to fetch game data from a specified JSON file
function fetchGameData(jsonFile) {
    return fetch(jsonFile)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok: ' + response.statusText);
            }
            return response.json();
        });
}

// Fetch data from both JSON files
Promise.all([
    fetchGameData("/assets/json/gs.json").then(data => {
        allGames = allGames.concat(data); // Add gs.json data to allGames
    }),
    fetchGameData("/assets/json/dog.json").then(data => {
        allGames = allGames.concat(data); // Add dog.json data to allGames
    })
]).then(() => {
    displayAllGames(); // Display all games after both fetches are complete
    updateGameCount(); // Update the total game count
    setupSearch(); // Set up the search functionality
}).catch(err => {
    console.error("Fetch error: ", err);
});

// Function to display all games
function displayAllGames() {
    const container = document.getElementById("gs");
    container.innerHTML = ''; // Clear previous games

    allGames.forEach(game => {
        appendGameToList(game, container);
    });
}

// Function to append a game to the list
function appendGameToList(game, container) {
    const listItem = document.createElement("li");
    const imgSrc = game.imgSrc ? `http://maxwick456.github.io/dimg/${game.imgSrc}` : `https://maxwick456.github.io/img/${game.id}.${game.img}`;
    
    // Construct the href for the game
    const gameHref = `go.html?id=${game.id}`; // Redirect to go.html with game ID

    listItem.innerHTML = `
        <a href="${gameHref}" class="box">
            <img src="${imgSrc}" alt="${game.name}">
            <span class="box-title">${game.name}</span>
        </a>
    `;
    
    container.appendChild(listItem);
}

// Function to update the total count of games
function updateGameCount() {
    const totalGames = allGames.length; // Calculate total games
    document.getElementById("libtot").innerHTML = `There are ${totalGames} games to choose from!`;
}

// Function to set up the search functionality
function setupSearch() {
    const searchInput = document.getElementById('search');
    const resultsContainer = document.getElementById('s'); // Container for search results

    searchInput.addEventListener('keyup', function () {
        const searchField = this.value.trim().toLowerCase(); // Get the trimmed and lowercased value
        resultsContainer.innerHTML = ''; // Clear previous search results

        if (searchField === '') {
            displayAllGames(); // Show all games if search field is empty
        } else {
            const filteredGames = allGames.filter(game => game.name.toLowerCase().includes(searchField));
            resultsContainer.innerHTML = ''; // Clear previous search results
            filteredGames.forEach(game => {
                appendGameToList(game, resultsContainer); // Append to the search results container
            });
        }
    });
}