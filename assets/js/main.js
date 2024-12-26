// Fetch the data from the twothree.json file
fetch("/assets/json/twothree.json")
    .then(response => {
        // Parse the JSON response
        return response.json();
    })
    .then(hotGamesData => {
        // Call the displayHotGames function with the parsed data
        displayHotGames(hotGamesData);
    })
    .catch(err => {
        // Log any errors that occur during the fetch
        console.error("Error fetching data:", err);
    });

// Function to display the hottest games
function displayHotGames(hotGamesData) {
    // Get the HTML element where the games will be displayed
    const hotGamesContainer = document.getElementById("hot");

    // Loop through the first 10 games in the data
    for (let i = 0; i < 20; i++) {
        // Create a new list item for each game
        const listItem = document.createElement("li");

        // Set the inner HTML of the list item with game details
        listItem.innerHTML = `
            <a href="/go.html?id=${hotGamesData[i].id}" class="box">
                <img src="${hotGamesData[i].img}" data-loaded="true">
                <div class="badge">${hotGamesData[i].badge}</div>
                <span class="box-title">${hotGamesData[i].name}</span>
            </a>
        `;

        // Append the list item to the container
        hotGamesContainer.appendChild(listItem);
    }
}