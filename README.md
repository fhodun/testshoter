<h1 align="center">
  Testshoter Discord Bot
  <br>
</h1>

<h4 align="center">Discord bot that send content of questions and possible answers for tests on testportal.pl</h4>

<p align="center">
  <a href="#overview">Overview</a>
  •
  <a href="#important">Important</a>
  •
  <a href="#commands">Commands</a>
  •
  <a href="#installation">Installation</a>
  •
  <a href="#community">Community</a>
  •
  <a href="#license">License</a>
  •
  <a href="#disclaimer">Disclaimer</a>
</p>

# Overview

Discord bot that send content of questions and possible answers for tests on testportal.pl  

## Important

The most important informations the bot:
- bot does not send the answers to the tests, only the content of the questions and answers
- bot is not invisible, the teacher sees it as an empty field in the results, but if it is not familiar with technology, it won't understand that, example https://i.imgur.com/B9fE0gP.png
- if there is an open question in the test, the answer to which is required, the bot will stop

## Commands

 - `>test (testportal_test_link)` testportal program start
 - `>version` check the bot is up to date
 - `>help` grants help
 - `>important` displays the most important informations
 - `>wazne` displays the most important informations in Polish

## Installation

 - Download and install [Node.js](https://nodejs.org/en/).
 - Download the bot from [Github](https://github.com/fhodun/testshoter) zip file and decompress this file.
 - Create a new discord [application](https://discord.com/developers/applications) and in menu select bot in this click button [add bot](https://imgur.com/WKQgdyH).
 - Copy [Token](https://imgur.com/r322GcU) and open `.env.example` file and paste the token to `<your-token-here>` next rename this file to `.env`.
 - Open console and go to location where downloads the file to folder testshoter-main and run `npm install && npm run start`.
 - To run yor bot next time open console in location where bot is downloading and run `npm start`.
 - To add bot to server go [to](https://discord.com/developers/applications) and select your application.
 - In menu select [OAuth2](https://imgur.com/TtXF7U2) and select [bot](https://imgur.com/TtXF7U2) and in te table below select `Send Messages, Menage Messages, Embed links,  Attach Files`.
 - Click `Copy` button and paste this address to web browser.

## Community

Join our polish Testshoters community [Discord server](https://discord.gg/TWRwsnMzD9).

## License

Released under the MIT license.  
Inspiration and idea taken from [arekminajj/testportal-discord-bot](https://github.com/arekminajj/testportal-discord-bot).

## Disclaimer

The author assumes no responsibility for any damages that may result from the use of this software.
