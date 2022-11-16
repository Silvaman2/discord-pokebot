const { Client, Events, GatewayIntentBits } = require(`discord.js`);
const { token } = require(`./config.json`);

const client = new Client({ intents: [GatewayIntentBits.Guilds] });



client.once(Events.ClientReady, () => {
    client.user.setStatus(`dnd`);

    console.log(`PokeBot is ready to go!`);
});





client.login(token);