# jokebook API Documentation

## Endpoint 1 - Get Jokebook Categories
**Request Format:** /jokebook/categories
**Request Type:** GET
**Returned Data Format:** Text
**Description:** This endpoint returns a list of all joke categories available in the jokebook.
**Example Request:** GET /jokebook/categories
**Example Response:** ['funnyJoke', 'lameJoke']


## Endpoint 2 - Get Jokes from a Category
**Request Format:** /jokebook/joke/:category
**Request Type:** GET
**Returned Data Format:** JSON
**Description:** This endpoint returns a list of jokes from the specified category.
**Example Request:** GET /jokebook/joke/funnyJoke
**Example Response:**
[
    {
        "joke": "Why did the student eat his homework?",
        "response": "Because the teacher told him it was a piece of cake!"
    },
    {
        "joke": "What kind of tree fits in your hand?",
        "response": "A palm tree"
    }
]
**Error Handling:** If there's an error while processing the request, the server will respond with a 500 status code and a text message "error!!".

## Endpoint 3 - Post Joke to certain category
**Request Format:** /jokebook/joke/new
**Request Type:** POST
**Returned Data Format:** JSON
**Description:** This endpoint adds a new joke onto the correct category.
**Example Request:** POST /jokebook/joke/new
{
    "category": "funnyJoke",
    "joke": "Why don't scientists trust atoms?",
    "response": "Because they make up everything!"
}
**Example Response:**
[
    {
        "joke": "Why did the student eat his homework?",
        "response": "Because the teacher told him it was a piece of cake!"
    },
    {
        "joke": "What kind of tree fits in your hand?",
        "response": "A palm tree"
    },
    {
        "joke": "What is worse than raining cats and dogs?",
        "response": "Hailing taxis"
    },
    {
        "joke": "Why don't scientists trust atoms?",
        "response": "Because they make up everything!"
    }
]
**Error Handling:** If there's an error while processing the request, the server will respond with a 500 status code and a text message "error!!".