# Testshoter Discord Bot

## Overview

Discord bot that send content of questions and possible answers for tests on testportal.pl

## Important

The most important informations the bot:

- bot does not send the answers to the tests, only the content of the questions and answers
- bot is not invisible, the teacher sees it as an empty field in the results, but if it is not familiar with technology, it won't understand that, example <https://i.imgur.com/B9fE0gP.png>
- if there is an open question in the test, the answer to which is required, the bot will stop

## Commands

- `>test (testportal_test_link)` testportal program start
- `>version` check the bot is up to date
- `>help` grants help
- `>important` displays the most important informations
- `>wazne` displays the most important informations in Polish

## Installation and starting up

### Prerequisites

Make sure you have installed all of the following prerequisites:

- [Node.js](https://nodejs.org/en/download/).

### Downloading Testshoter

There are several ways you can get the Testshoter:

#### Cloning the GitHub repository

The recommended way to get Testshoter is to use git to directly clone repository:

```sh
git clone https://github.com/fhodun/testshoter
```

This will clone the latest version of the Testshoter repository to a **testshoter** folder.

#### Downloading repository from zip file

Another way to get the Testshoter is to [download a zip copy](https://github.com/fhodun/testshoter/archive/main.zip) from the main branch on GitHub

### Creating and adding Discord bot token

Create a new Discord [application](https://discord.com/developers/applications) and in menu select bot in this click button [add bot](https://i.imgur.com/WKQgdyH.png).  
Copy [Token](https://i.imgur.com/r322GcU.png) and open `.env.example` file and paste the token to `<your-token-here>` next rename this file to `.env`.

### Inviting Bot

To add bot to server go [to](https://discord.com/developers/applications) and select your application.  
In menu select [OAuth2](https://i.imgur.com/TtXF7U2.png) and select [bot](https://i.imgur.com/TtXF7U2.png) and in te table below select `Send Messages, Menage Messages, Embed links, Attach Files`,  
then go to generated website link

### Installing required packages

Install required packages using npm:

```sh
npm install
```

### Running the bot

Run your bot using npm:

```sh
npm start
```

## Community server

Join our polish Testshoters community [Discord server](https://discord.gg/TWRwsnMzD9).

## Greetings

Thanks to [gbaransky](https://github.com/gbaranski) for his great contribution to the project.  
Inspiration and idea taken from [arekminajj/testportal-discord-bot](https://github.com/arekminajj/testportal-discord-bot).

## License and disclaimer

Released under the MIT license.  
The author assumes no responsibility for any damages that may result from the use of this software.
