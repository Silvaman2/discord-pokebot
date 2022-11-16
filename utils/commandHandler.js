const { Collection } = require("discord.js");
const fs = require("fs");

module.exports = function() {
    const commands = new Collection();
    const commandFiles = fs.readdirSync(`./commands/`).filter(file => file.endsWith(`.js`));

    for(const commandFile of commandFiles) {
        const command = require(`../commands/${commandFile}`);
        const [commandName] = commandFile.split(`.`);

        commands.set(commandName, command);
    }

    return commands;
}