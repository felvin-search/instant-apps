<div align="center">
<!-- Logo -->
<img height="100" src="/.github/assets/readme/logo_large.png" alt="Logo" />
<h1>Felvin Search</h1>

<!-- Badges -->

<a href="https://discord.gg/2W8PgyaxHA"><img src="https://img.shields.io/discord/877966745699246140?color=%237289DA&label=Discord&logo=discord&logoColor=%237289DA&style=flat-square" alt="Discord" /></a>
<a href="https://github.com/felvin-search/instant-apps/issues?q=is%3Aissue+is%3Aopen+label%3A%22good+first+issue%22"><img alt="GitHub issues by-label" src="https://img.shields.io/github/issues-raw/felvin-search/instant-apps/good%20first%20issue?color=green&label=Good%20first%20issues&logo=github&style=flat-square"></a>

Your search box is now an app store! 🎉 - [Felvin](https://felvin.com)

</div>

<!-- Concern: Does this convey that these apps are running on a website? Gif is https://youtu.be/1eGCEi1PDMg -->


|                                                                                                                                                                                                         |                                                                                                                                                                                                     |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [<img  alt="currency instant app" src="https://raw.githubusercontent.com/felvin-search/instant-apps/master/.github/assets/readme/currency-example.png">](https://felvin.com/search?q=500+usd+to+inr)    | [<img  alt="json formatter instant app" src="https://raw.githubusercontent.com/felvin-search/instant-apps/master/.github/assets/readme/json-example.png">](https://felvin.com/search?q=format+json) |
| [<img  alt="dictionary instant app" src="https://raw.githubusercontent.com/felvin-search/instant-apps/master/.github/assets/readme/dictionary-example.png">](https://felvin.com/search?q=gonzo+meaning) | [<img  alt="timer instant app" src="https://raw.githubusercontent.com/felvin-search/instant-apps/master/.github/assets/readme/timer-example.png">](https://felvin.com/search?q=10+minutes+timer)    |

## How to use?

[felvin.com](https://felvin.com) as your default search engine, or [install our chrome extension to use Felvin Instant apps with Google Search](https://chrome.google.com/webstore/detail/felvin-google-search-enha/dmhgpjahhfannndnaghleelgnpieiljl?hl=en)

**Demo**:

[![Demo](https://img.youtube.com/vi/1eGCEi1PDMg/0.jpg)](https://www.youtube.com/watch?v=1eGCEi1PDMg)


## What are instant apps?

Instant apps are the small interactive cards which you get for your search queries.

We can build instant apps for all kinds of use cases like dictionary, checking football scores, stock prices or notes from your notion or even search history from company slack or anything!

Try them out live - [felvin.com](https://felvin.com/search?q=gonzo%20meaning)

## Contributing

There are many ways in which you can contribute to the project:

- Try creating a new app, it's fun and it's a new kind of superpower. 😎
- Take a look at [existing suggestions](https://github.com/felvin-search/instant-apps/issues?q=is%3Aopen+is%3Aissue+label%3Aproposal) of new apps and implement one!
- [Suggest a new instant app](https://github.com/felvin-search/instant-apps/issues/new/choose), anything useful for you is a valid suggestion.
- Add features to existing apps. See all [open issues](https://github.com/felvin-search/instant-apps/issues?q=is%3Aopen+is%3Aissue).

<!--
```sh
git clone ....
cd something
```
 -->

## How to create a new app?

Anyone can create an instant app! Felvin Search is a platform - create apps for yourself, as well as others.

- Fork the repository.
- Install the dependencies `yarn install`
- Run `yarn create-app`.
- Update your new app, commit and send a pull request!

<!--- Insert a minute explainer --->

Checkout our [CONTRIBUTING](./CONTRIBUTING.md) guide for more details.

<!-- Fix for the issue with latest yarn version -->
## Issue With Latest Yarn Version
If you got error like  **Internal Error: Cannot redefine settings "changesetBaseRefs"**
Follow the below steps to get your app rolling :

 - Run `yarn --version`.
 - If it is the latest one ,try to downgrade it to **Version @3.0.2**.
 - Run `yarn set version 3.0.2`.
 - Run `yarn start`.
 - Bingo🤙🏻, Your local developement environment will start spinning.

## Anatomy of Instant App

A instant app is a Javascript object with following schema:

- `name`
- `description`
- `queryToData`: A function which takes a search query and converts into any data which could be displayed.
- `Component`: The React component of the app. The data from `queryToData` is passed as a prop.

Read more about the [architecture](https://docs.felvin.com/instant-apps/architecture).

## Available Apps

<!-- Expand this with screenshots and example queries, as well as author(s). Write a script to generate this section automatically. -->

See [apps/](apps).

## How do releases take place?

All the instant apps are published to npm registry [here](https://www.npmjs.com/package/@felvin-search/apps). Currently, we have an action setup which bumps up the package version, commits the tag and publishes the package.

These are minor releases i.e. `v0.3.0` -> `v0.4.0`

If there's a need for running the action manually, just go into the actions tab and click on the workflow to find the follow button:

![run workflow button](https://i.imgur.com/2I43CnE.png)

## Community

- [Discord chatroom](https://discord.gg/2W8PgyaxHA) - Join us on Discord to engage.
- Give us a star ⭐️ - if you appreciate what we are doing, we would love a star on GitHub ❤️
