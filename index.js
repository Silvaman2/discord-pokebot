const { Client, Events, GatewayIntentBits, DiscordAPIError, Collection } = require(`discord.js`);
const { token } = require(`./config.json`);
const Utils = require("./utils.js");

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.commands = Utils.commandHandler();


client.once(Events.ClientReady, () => {
    client.user.setStatus(`dnd`);

    console.log(`PokeBot is ready to go!`);
});


client.on(Events.MessageCreate, (message) => {

})



client.login(token);