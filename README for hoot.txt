alright so before you start just a few things to keep in mind


1. in the main directory of this repository (the directory this file is in) you gotta make a config.json file and store a "token" property,
to store the discord token, and a "prefix" property, if you want you can either use the token for my bot or your own testing bot, same with prefix.
the reason you gotta make that is cause the github repo is public, meaning I gotta gitignore config.json unless I want someone to see the token lol

2. gitignore has all the libraries listed, so whenever I install libraries onto the project and commit the changes,
libraries are not committed, that means when you pull the project and open the folder with vsc (you can also do it in cmd),
you do "npm install", that will automatically install all the libraries I added and that means you're ready to start work


3. never forget, when you're working on the project, to always do it on a separate branch from main


4. since I haven't finished pokemon class and I'm not sure if you can start your task without it, I'll leave the pokemon class up to you.
it's mostly just looking at pokeAPI's pokemon object structure and deciding which properties we should push onto the pokemon class

5. the branch for that task is the only branch besides main, so instead of making a new branch, should hop onto that one and finish the job