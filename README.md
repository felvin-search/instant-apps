# Neera Snippet Apps

## How to create a Neera snippet app?

* Fork the repository
* Add a js/ts file with the app.
* Commit and send a pull request. I'll accept the PR and you are done :)

## Example Snippet Apps

* [Dictionary App](https://github.com/hargup/neera-snippet-apps/blob/master/src/SnippetApps/DictionaryApp.js)

## Anatomy of Snippet App

A snippet app is a Javascript object with following keys:

* `name`: String -> Name of the snippet app
* `id`: String
* `description`: String
* `logo`: Link to a PNG/SVG File
* `dataFetcher`: A function with input `{query: "<user query>"}` and ouput is any data you want to render.
* `renderer`: Its a React component with the data from `dataFetcher` passed a into `props.data`
