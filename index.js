const { Client, Events, GatewayIntentBits } = require('discord.js');
const { token, prefix } = require('./config.json');
const Utils = require('./utils/utils.js');

const client = new Client({ intents: Object.values(GatewayIntentBits) });

client.commands = Utils.commandHandler();

client.once(Events.ClientReady, () => {
    client.user.setStatus('dnd');

    console.log('PokeBot is ready to go!');
});

client.on(Events.MessageCreate, message => {
    if (message.author.bot || !message.content.startsWith(prefix)) return;

    const messageArray = message.content
        .slice(prefix.length)
        .split(' ');

    const command = messageArray.shift();
    const arguments = messageArray;

    const commandFunction = client.commands.get(command);

    if (!commandFunction) return;

    const invalidArg = commandFunction.arguments.find((argument, index) => !(argument.filter(arguments[index]) && arguments[index]));
    if (invalidArg) {
        Utils.reply(message, Utils.simpleEmbed('Invalid arguments.'));
        return;
    }

    commandFunction.execute(message, arguments);
});

client.login(token);