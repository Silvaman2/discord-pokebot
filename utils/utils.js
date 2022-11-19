const { Collection } = require(`discord.js`);
const fs = require(`fs`);

class Utils {

    static commandHandler() {
        const commands = new Collection();
        const commandFiles = fs.readdirSync(`./commands/`).filter(file => file.endsWith(`.js`));
    
        for(const commandFile of commandFiles) {
            const command = require(`../commands/${commandFile}`);
            const [commandName] = commandFile.split(`.`);
    
            commands.set(commandName, command);
        }
    
        return commands;
    }

    static reply(message, inputString) {
        message.channel.send(inputString);
    }

    static async fetchJSON(url) {
        const request = await fetch(url);
        const result = await request.json();

        return result;
    }

    static simpleEmbed(title) {
        return {
            embeds:[{
                color:16732992,
                title:title
            }]
        }
    }

    static capitalizeFirstLetter(string) {
        return string[0].toUpperCase() + string.substring(1);
      }

}


module.exports = Utils;

