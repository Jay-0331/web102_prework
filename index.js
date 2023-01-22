/*****************************************************************************
 * Challenge 2: Review the provided code. The provided code includes:
 * -> Statements that import data from games.js
 * -> A function that deletes all child elements from a parent element in the DOM
*/

// import the JSON data about the crowd funded games from the games.js file
import GAMES_DATA from './games.js';

// create a list of objects to store the data about the games using JSON.parse
const GAMES_JSON = JSON.parse(GAMES_DATA)

// remove all child elements from a parent element in the DOM
function deleteChildElements(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

/*****************************************************************************
 * Challenge 3: Add data about each game as a card to the games-container
 * Skills used: DOM manipulation, for loops, template literals, functions
*/

// grab the element with the id games-container
const gamesContainer = document.getElementById("games-container");

// create a function that adds all data from the games array to the page
function addGamesToPage(games) {
    // loop over each item in the data
    for (let i in games) {
        // create a new div element, which will become the game card
        const game_card = document.createElement("div");
        // add the class game-card to the list
        game_card.classList.add("game-card");
        // set the inner HTML using a template literal to display some info 
        // about each game
        // TIP: if your images are not displaying, make sure there is space
        // between the end of the src attribute and the end of the tag ("/>")
        game_card.innerHTML = `<img class="game-img" src="${games[i].img}"/>
                                <div style="font-weight: bold; padding: 12px 0 12px 0">${games[i].name}</div>
                                <p>${games[i].description}</p>
                                <div style="padding: 12px 0 12px 0">Backers: ${games[i].backers}</div>
                                `;
        // append the game to the games-container
        gamesContainer.appendChild(game_card);
    }

}

// call the function we just defined using the correct variable
// later, we'll call this function using a different list of games
addGamesToPage(GAMES_JSON);
/*************************************************************************************
 * Challenge 4: Create the summary statistics at the top of the page displaying the
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: arrow functions, reduce, template literals
*/

// grab the contributions card element
const contributionsCard = document.getElementById("num-contributions");

// use reduce() to count the number of total contributions by summing the backers
const total_backers = GAMES_JSON.reduce((total, cur) => total + cur.backers, 0);

// set the inner HTML using a template literal and toLocaleString to get a number with commas
contributionsCard.innerHTML = `<div>${total_backers.toLocaleString('en-US')}</div>`

// grab the amount raised card, then use reduce() to find the total amount raised
const raisedCard = document.getElementById("total-raised");
const total_money_pledged = GAMES_JSON.reduce((total, cur) => total + cur.pledged, 0);
// set inner HTML using template literal
raisedCard.innerHTML = `<div>$${total_money_pledged.toLocaleString('en-US')}</div>`

// grab number of games card and set its inner HTML
const gamesCard = document.getElementById("num-games");
gamesCard.innerHTML = `<div>${GAMES_JSON.length.toLocaleString('en-US')}</div>`

/*************************************************************************************
 * Challenge 5: Add functions to filter the funded and unfunded games
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: functions, filter
*/

// show only games that do not yet have enough funding
function filterUnfundedOnly() {
    deleteChildElements(gamesContainer);

    // use filter() to get a list of games that have not yet met their goal
    // use the function we previously created to add the unfunded games to the DOM
    addGamesToPage(GAMES_JSON.filter(cur => cur.goal > cur.pledged));
}

// show only games that are fully funded
function filterFundedOnly() {
    deleteChildElements(gamesContainer);

    // use filter() to get a list of games that have met or exceeded their goal
    // use the function we previously created to add unfunded games to the DOM
    addGamesToPage(GAMES_JSON.filter(cur => cur.pledged > cur.goal));
}

// show all games
function showAllGames() {
    deleteChildElements(gamesContainer);

    // add all games from the JSON data to the DOM
    addGamesToPage(GAMES_JSON);
}

const gameNameSearch = (e) => {
    deleteChildElements(gamesContainer);

    addGamesToPage(GAMES_JSON.filter(cur => cur.name.toLowerCase().includes(e.target.value.toLowerCase())));
}

// select each button in the "Our Games" section
const unfundedBtn = document.getElementById("unfunded-btn");
const fundedBtn = document.getElementById("funded-btn");
const allBtn = document.getElementById("all-btn");

// add event listeners with the correct functions to each button
unfundedBtn.addEventListener("click", filterUnfundedOnly);

fundedBtn.addEventListener("click", filterFundedOnly);

allBtn.addEventListener("click", showAllGames);

document.getElementById("game-search").addEventListener("input", gameNameSearch);

/*************************************************************************************
 * Challenge 6: Add more information at the top of the page about the company.
 * Skills used: template literals, ternary operator
*/

// grab the description container
const descriptionContainer = document.getElementById("description-container");

// use filter or reduce to count the number of unfunded games
const total_unfunded_games = GAMES_JSON.filter(cur => cur.goal > cur.pledged).length;

// create a string that explains the number of unfunded games using the ternary operator
const display_str = `A total of $${total_money_pledged.toLocaleString('en-US')} has been raised for ${GAMES_JSON.length} games. Currently, ${total_unfunded_games} game ${total_unfunded_games == 1 ? 'remains' :  'remain'} unfunded. We need your help to fund these amazing games!`;

// create a new DOM element containing the template string and append it to the description container
const display_str_div = document.createElement("div");
display_str_div.innerText = display_str;
descriptionContainer.appendChild(display_str_div);

/************************************************************************************
 * Challenge 7: Select & display the top 2 games
 * Skills used: spread operator, destructuring, template literals, sort 
 */

const firstGameContainer = document.getElementById("first-game");
const secondGameContainer = document.getElementById("second-game");

const sortedGames =  GAMES_JSON.sort( (item1, item2) => {
    return item2.pledged - item1.pledged;
});

// use destructuring and the spread operator to grab the first and second games
const [top, runnerup, ...rest] = GAMES_JSON;

// create a new element to hold the name of the top pledge game, then append it to the correct element
const top_game_div = document.createElement("div");
top_game_div.innerText = `${top.name}`;
firstGameContainer.appendChild(top_game_div);
// do the same for the runner up item
const runnerup_game_div = document.createElement("div");
runnerup_game_div.innerText = `${runnerup.name}`;
secondGameContainer.appendChild(runnerup_game_div);