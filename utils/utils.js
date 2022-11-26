const { Collection, AttachmentBuilder } = require(`discord.js`);
const fs = require(`fs`);
const Canvas = require('canvas');

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

    static async fetchJSON(url, options) {
        const request = await fetch(url, options);
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

    static iconAttachment() {
        return new AttachmentBuilder(`icon.png`, { name: `icon.png` });
    }

    static async resizeImage(imageUrl, width, height) {
        const canvas = Canvas.createCanvas(width, height);
        const ctx = canvas.getContext('2d');
        ctx.imageSmoothingEnabled = false;

        const image = await Canvas.loadImage(imageUrl);
        ctx.drawImage(image, 0, 0, canvas.width, canvas.height);

        return canvas.toBuffer();
    }


    
}

        
module.exports = Utils;

