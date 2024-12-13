/**
 * gs.js
 * @description - This is used to generate the games that are relating to the system that the user chooses.
 * This is different compared to sys.js because sys.js is for the games that are specific to the system it supports
 * This generates every single game and is used on all.html.
 */

const data = fetch("/assets/json/gs.json")
    .then(response => response.json())
    .then(data => {
        search(data);
        displayAllGames(data); // Display all games initially
    })
    .catch(err => {
        console.log("error: " + err);
    });

function search(data) {
    data.sort((a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase()));

    $(document).ready(() => {
        $.ajaxSetup({ cache: false });

        let timeout; // Variable to hold the timeout ID

        $('#search').on('keyup', function () {
            clearTimeout(timeout); // Clear the previous timeout
            const searchField = $(this).val();
            timeout = setTimeout(() => {
                if (searchField === '') {
                    $('#s').html(''); // Clear previous results
                    displayAllGames(data); // Show all games if search is empty
                } else {
                    $('#s').html(''); // Clear previous results
                    const expression = new RegExp(searchField, "i");
                    $.each(data, (key, valu) => {
                        if (valu.name.search(expression) !== -1) {
                            appendGameToList(valu);
                        }
                    });
                }
            }, 300); // Delay in milliseconds
        });
    });
}

function displayAllGames(data) {
    const mainContainer = document.getElementById("gs");
    data.forEach(valu => {
        appendGameToList(valu);
    });
    count(data.length); // Update the count of games
}

function appendGameToList(valu) {
    const mainContainer = document.getElementById("gs");
    const div = document.createElement("li");
    div.innerHTML = `
        <a href="/go.html?id=${valu.id}" class="box">
            <img src="https://maxwick456.github.io/img/${valu.id}.${valu.img}" data-loaded="true">
            <div class="badge">${valu.badge}</div>
            ${valu.new === "true" ? '<div class="new-badge">NEW!</div>' : ''}
            <span class="box-title">${valu.name}</span>
        </a>
    `;
    mainContainer.appendChild(div);
}

function count(total) {
    document.getElementById("libtot").innerHTML = `There are ${total} games to choose from!`;
}

function sug(val) {
    document.getElementById("search").value = val;
}