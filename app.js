//app.js
"use strict";

const express = require("express");
const app = express();

const fs = require("fs").promises;
const multer = require("multer");

app.use(express.urlencoded({ extended: true }))
app.use(express.json());
app.use(multer().none());

let categories = ['funnyJoke', 'lameJoke'];
let funnyJoke = [
    {
        'joke': 'Why did the student eat his homework?',
        'response': 'Because the teacher told him it was a piece of cake!'
    },
    {
        'joke': 'What kind of tree fits in your hand?',
        'response': 'A palm tree'
    },
    {
        'joke': 'What is worse than raining cats and dogs?',
        'response': 'Hailing taxis'
    }
];
let lameJoke = [
    {
        'joke': 'Which bear is the most condescending?',
        'response': 'Pan-DUH'
    },
    {
        'joke': 'What would the Terminator be called in his retirement?',
        'response': 'The Exterminator'
    }
];

/**
 * @api {get} /jokebook/categories Request jokebook categories
 *
 * @apiSuccess {String} jokebook  Jokebook categories.
 * @apiError {String} error  Error message.
 */
app.get('/jokebook/categories', async (req, res) => {
    try {
        let jokebookCats = await categories.toString();
        res.type('text').send(jokebookCats)

    } catch (error) {
        res.status(500).type('text').send('error!!');
    }
});

/**
 * @api {get} /jokebook/categories Request jokebook categories
 *
 * @apiSuccess {json} jokebook  Jokebook categories.
 * @apiError {String} error  Error message.
 */
app.get("/jokebook/joke/:category", (request, response) => {
    const jokeCategory = String(request.params.category.trim());
    let jokes;

    switch (jokeCategory) {
        case 'funnyJoke':
            jokes = funnyJoke;
            break;
        case 'lameJoke':
            jokes = lameJoke;
            break;
        default:
            return response.status(400).json({ error: `No category listed for ${jokeCategory}` });
    }

    response.json(jokes);
});

/**
 * @api {post} jokebook/joke/new Post a new joke
 *
 * @apiSuccess {json} jokebook  a new joke.
 * @apiError {String} error  Error message.
 */
app.post("/jokebook/joke/new", (req, res) => {
    const category = req.body.category;
    const joke = req.body.joke;
    const response = req.body.response;

    if (!category || !joke || !response || (category !== 'funnyJoke' && category !== 'lameJoke')) {
        return res.status(400).json({ error: 'Invalid or insufficient user input' });
    }

    const newJoke = { joke, response };

    if (category === 'funnyJoke') {
        funnyJoke.push(newJoke);
        return res.json(funnyJoke);
    } else {
        lameJoke.push(newJoke);
        return res.json(lameJoke);
    }
});

const PORT = process.env.PORT || 8000;
app.listen(PORT);
