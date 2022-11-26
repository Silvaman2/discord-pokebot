const { EmbedBuilder } = require("discord.js");
const Pokemon = require("../utils/pokemon");
const PokeData = require("../utils/pokeData");
const Trainer = require("../utils/trainer");
const Utils = require('../utils/utils');
const {prefix} = require("../config.json");

module.exports = {
    debug:false,
    description:'Prompts you to choose a starter Pokemon',
    async execute(message, args) {
        const userId = message.author.id;
        const trainer = await Trainer.getTrainer(userId);
        if(trainer['currentPokemon'].length) {
            Utils.reply(message, Utils.simpleEmbed('You\'ve already chosen a starter Pokémon!'));
            return;
        }

        const icon = Utils.iconAttachment();
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

        Utils.reply(message, {
            embeds:[embed],
            files:[icon]
        })

        const filter = m => m.content.startsWith(prefix+"choose");

        const responses = await message.channel.awaitMessages( {filter:m => m.author.id === userId, max: 1, time:120_000, errors: ['time']}).catch(() => null);

        if(!responses) return;

        const response = Array.from(responses.values())[0];
        
        if(!filter(response)) return;

        const pokemonName = response.content
        .split(' ')[1]
        .toLowerCase();

        if(!PokeData.starterPokemon.includes(pokemonName)) {
            Utils.reply(message, Utils.simpleEmbed('Invalid starter Pokémon!'));
            return;
        }

        const data = await PokeData.getPokemon(pokemonName);
        const newPokemon = new Pokemon(data);

        Trainer.pushPokemon(userId, newPokemon);

        const congratsMessage = Utils.simpleEmbed(`Congratulations on entering the world of Pokémon!`);
        congratsMessage.embeds[0].description = `You've chosen ${Utils.capitalizeFirstLetter(pokemonName)} as your first Pokémon.`;

        Utils.reply(message, congratsMessage);
    }
}