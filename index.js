const { Client, Events, GatewayIntentBits, DiscordAPIError, Collection } = require(`discord.js`);
const { token } = require(`./config.json`);
const commandHandler = require("./utils/commandHandler");

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.commands = commandHandler();


client.once(Events.ClientReady, () => {
    client.user.setStatus(`dnd`);

    console.log(`PokeBot is ready to go!`);
});


client.on(Events.MessageCreate, (message) => {

})



client.login(token);