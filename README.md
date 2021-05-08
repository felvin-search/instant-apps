# Neera Snippet Apps

## What are snippet apps?
<img width="933" alt="snippetApp" src="https://user-images.githubusercontent.com/2477788/114712160-66f05080-9d4d-11eb-8554-6b41ff561e99.png">

It is the small instant answer thing which you get on the top of search. Its not just dictionary, you can show any data with snippet app.

It can be football scores, stock prices or notes from your notion or even search history from company slack or anything!!

## Why should I create one?
Because it's fun!


## How to create a Neera snippet app?

* Fork the repository
* Add a js/ts file with the app.
* Commit and send a pull request. I'll accept the PR and you are done :)

## Example Snippet Apps

* [Dictionary App](https://github.com/hargup/neera-snippet-apps/blob/master/src/SnippetApps/DictionaryApp.js)
* [Currency Conversion App](https://github.com/hargup/neera-snippet-apps/blob/master/src/SnippetApps/CurrencyConversionApp.js)

## Anatomy of Snippet App

A snippet app is a Javascript object with following keys:

* `name`: String -> Name of the snippet app
* `id`: String
* `description`: String
* `logo`: Link to a PNG/SVG File
* `dataFetcher`: A function with input `{query: "<user query>"}` and ouput is any data you want to render.
* `renderer`: Its a React component with the data from `dataFetcher` passed a into `props.data`
