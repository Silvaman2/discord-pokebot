const { Client, Events, GatewayIntentBits, DiscordAPIError, Collection } = require(`discord.js`);
const { token, prefix } = require(`./config.json`);
const Utils = require("./utils/utils.js");

const client = new Client({ intents: Object.values(GatewayIntentBits) });

client.commands = Utils.commandHandler();

client.once(Events.ClientReady, () => {
    client.user.setStatus(`dnd`);

    console.log(`PokeBot is ready to go!`);
});


client.on("messageCreate", (message) => {
    if(message.member.user.bot || !message.content.startsWith(prefix)) return;

    const messageArray = message.content
    .slice(prefix.length)
    .split(' ');

    const command = messageArray.shift();
    const arguments = messageArray;

    try {
        client.commands.get(command).execute(message, arguments);
    } catch (e) {
        Utils.reply(message, `Command not found.`);
        console.log(e);
    }
})



client.login(token);