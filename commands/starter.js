const { EmbedBuilder } = require("discord.js");
const Pokemon = require("../utils/pokemon");
const Trainer = require("../utils/trainer");
const { reply, simpleEmbed, capitalizeFirstLetter, iconAttachment } = require('../utils/utils');
const {prefix} = require("../config.json");

module.exports = {
    debug:false,
    description:'Prompts you to choose a starter Pokemon',
    async execute(message, args) {
        const userId = message.author.id;
        const trainer = await Trainer.getTrainer(userId);
        if(trainer['currentPokemon'].length) {
            reply(message, simpleEmbed('You\'ve already chosen a starter Pokémon!'));
            return;
        }

        const icon = iconAttachment();
        const embed = new EmbedBuilder({
            color:16732992,
            title:'Welcome to the world of Pokémon',
            description:'To choose a starter Pokémon, use the `!choose {pokemonName}` command.',
            fields:[
                {
                    name:'I. Kanto',
                    value:'Bulbasaur · Charmander · Squirtle'
                },
                {
                    name:'II. Johto',
                    value:'Chikorita · Cyndaquil · Totodile'
                },
                {
                    name:'III. Hoenn',
                    value:'Treecko · Torchic · Mudkip'
                },
            ],
            thumbnail:{
                url:'attachment://icon.png'
            }
        })

        reply(message, {
            embeds:[embed],
            files:[icon]
        })

        const filter = m => m.author.id === userId && m.content.startsWith(prefix+"choose");

        const responses = await message.channel.awaitMessages( { filter , max: 1, time:120_000, errors: ['time']}).catch(() => null);

        if(!responses) return;

        const response = Array.from(responses.values())[0];

        const pokemonName = response.content
        .split(' ')[1]
        .toLowerCase();

        if(!Pokemon.starterPokemon.includes(pokemonName)) {
            reply(message, simpleEmbed('Invalid starter Pokémon!'));
            return;
        }

        const data = await Pokemon.getPokemon(pokemonName);
        const newPokemon = new Pokemon(data);

        console.log('gameing');
        Trainer.pushPokemon(userId, newPokemon);
        console.log('gameing');

        const congratsMessage = simpleEmbed(`Congratulations on entering the world of Pokémon!`);
        congratsMessage.embeds[0].description = `You've chosen ${capitalizeFirstLetter(pokemonName)} as your first Pokémon.`;

        reply(message, congratsMessage);
    }
}