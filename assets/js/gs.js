let gameData = []; // Global variable to hold the game data

// Fetch the game data from the JSON file
fetch("/assets/json/gs.json")
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok: ' + response.statusText);
        }
        return response.json();
    })
    .then(data => {
        gameData = data; // Store the fetched data
        displayAllGames(gameData); // Display all games initially
        setupSearch(gameData); // Set up the search functionality
    })
    .catch(err => {
        console.error("Fetch error: ", err);
    });

// Function to display all games
function displayAllGames(data) {
    const mainContainer = document.getElementById("gs");
    mainContainer.innerHTML = ''; // Clear previous games
    data.forEach(game => {
        appendGameToList(game, mainContainer);
    });
    updateGameCount(data.length); // Update the count of games
}

// Function to append a game to the list
function appendGameToList(game, container) {
    const listItem = document.createElement("li");
    listItem.innerHTML = `
        <a href="/go.html?id=${game.id}" class="box">
            <img src="https://maxwick456.github.io/img/${game.id}.${game.img}" alt="${game.name}">
            <div class="badge">${game.badge}</div>
            ${game.new === "true" ? '<div class="new-badge">NEW!</div>' : ''}
            <span class="box-title">${game.name}</span>
        </a>
    `;
    container.appendChild(listItem);
}

// Function to update the count of games
function updateGameCount(total) {
    document.getElementById("libtot").innerHTML = `There are ${total} games to choose from!`;
}

// Function to set up the search functionality
function setupSearch(data) {
    const searchInput = document.getElementById('search');
    const resultsContainer = document.getElementById('s'); // Container for search results

    searchInput.addEventListener('keyup', function () {
        const searchField = this.value.trim().toLowerCase(); // Get the trimmed and lowercased value
        resultsContainer.innerHTML = ''; // Clear previous search results

        if (searchField === '') {
            displayAllGames(data); // Show all games if search field is empty
            updateGameCount(data.length); // Update count to total games
        } else {
            const filteredGames = data.filter(game => game.name.toLowerCase().includes(searchField));
            filteredGames.forEach(game => {
                appendGameToList(game, resultsContainer); // Append to the search results container
            });
            updateGameCount(filteredGames.length); // Update count to the number of filtered games
        }
    });
}