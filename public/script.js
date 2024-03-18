"use strict";
(function () {
    const MY_SERVER_BASEURL = "http://localhost:8000/jokebook";

    window.addEventListener("load", init);

    /**
     * Initialize the page
     */
    function init() {
        // Call functions to fetch random joke and categories
        fetchRandomJoke();
        fetchCategories();

        // Add event listeners for search and form submission
        const searchField = document.getElementById('search-field');
        searchField.addEventListener('keyup', (event) => {
            if (event.key === 'Enter') {
                fetchJokesByCategory(searchField.value);
            }
        });

        const addJokeForm = document.getElementById('add-joke-form');
        addJokeForm.addEventListener('submit', (event) => {
            event.preventDefault();
            submitForm();
        });
    }

    /**
     * The function fetchRandomJoke() makes a GET request to the server to get a random joke.
     */
    function fetchRandomJoke() {
        fetch(MY_SERVER_BASEURL + '/joke/funnyJoke')
            .then(checkStatus)
            .then(jokes => {
                const randomJoke = jokes[Math.floor(Math.random() * jokes.length)];
                displayJoke(randomJoke);
            })
            .catch(error => console.error('Error:', error));
    }

    /**
     * The function fetchCategories() makes a GET request to the server to get the joke categories.
     */
    function fetchCategories() {
        fetch(MY_SERVER_BASEURL + '/categories')
            .then(response => response.text())  // Change this line
            .then(categories => {
                // Split the string into an array of categories
                const categoryList = categories.split(',');

                // Call function to populate the menu
                populateMenu(categoryList);
            })
            .catch(error => console.error('Error:', error));
    }

    /**
     * The function fetchJokesByCategory(category) makes a GET request to the server to get jokes by category.
     * @param {*} category the category of joke to fetch
     */
    function fetchJokesByCategory(category) {
        // Fetch jokes by category
        fetch(MY_SERVER_BASEURL + `/joke/${category}`)
            .then(response => response.json())
            .then(jokes => {
                // Clear the joke list
                clearJokes();

                // Display the jokes
                jokes.forEach(joke => {
                    displayJoke(joke);
                });
            })
            .catch(error => console.error('Error:', error));
    }

    /**
     * The function populateMenu(categories) populates the joke menu with buttons for each category.
     * @param {*} categories the list of joke categories
     */
    function populateMenu(categories) {
        const menu = document.getElementById('joke-menu');

        // Create a button for each category
        categories.forEach(category => {
            const menuItem = document.createElement('li');
            const categoryBtn = document.createElement('button');

            menu.appendChild(menuItem);
            categoryBtn.type = 'button';
            categoryBtn.textContent = category;
            menuItem.appendChild(categoryBtn);

            categoryBtn.addEventListener('click', () => fetchJokesByCategory(category));
        });
    }

    /**
     * The function displayJoke(joke) displays a joke on the page.
     * @param {*} joke the joke to display
     */
    function displayJoke(joke) {
        const jokeList = document.getElementById('joke-list');
        const jokeItem = document.createElement('li');
        jokeItem.textContent = `${joke.joke} - ${joke.response}`;
        jokeList.appendChild(jokeItem);
    }

    /**
     * The function clearJokes() clears the joke list.
     */
    function clearJokes() {
        const jokeList = document.getElementById('joke-list');
        while (jokeList.firstChild) {
            jokeList.removeChild(jokeList.firstChild);
        }
    }

    /**
     * The function submitForm() submits a new joke to the server.
     */
    function submitForm() {
        let params = new FormData(document.getElementById("add-joke-form"));
        let jsonBody = JSON.stringify(Object.fromEntries(params));
        let category = document.getElementById("add-joke-category").value;

        // Send the new joke to the server
        fetch(MY_SERVER_BASEURL + "/joke/new", {
            method: "POST",
            headers: {
                Accept: "application/json, text/plain, */*",
                "Content-Type": "application/json",
            },
            body: jsonBody,
        })
            .then(checkStatus)
            .then(() => fetchJokesByCategory(category))
            .catch(alert);
    }

    /**
     * The function checkStatus(response) checks the status of the response.
     * @param {*} response the response to check
     * @returns the response if successful
     */
    function checkStatus(response) {
        if (!response.ok) {
            throw Error("Error in request: " + response.statusText);
        }
        return response.json();
    }

})();