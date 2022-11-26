const PokeData = require("../utils/pokeData") ;
const { AttachmentBuilder, EmbedBuilder } = require('discord.js');
const Utils = require("../utils/utils");
const {prefix} = require("../config.json");
const Pokemon = require("../utils/pokemon");
const Trainer = require("../utils/trainer");

module.exports = {
    debug:false,
    description: 'Sends a message at random intervals asking for the name of a pokemon. Congratulates if an answer is correct',

    async execute(message, args) {
        const randomNumber = args[0]; //Need to replace args with a random number gen.
        const data = await PokeData.getPokemon(randomNumber);
        const icon = Utils.iconAttachment();
        const spriteAttachment = new AttachmentBuilder(await Utils.resizeImage(PokeData.pokemonSprite(data), 256, 256), { name: 'spriteAttachment.png'});
        const answer = data.name;

        const embed = new EmbedBuilder({
            color:16732992,
            title: "Who's that Pokemon?",
            description: "type out your answer using '!answer'",
            thumbnail:{
                url:'attachment://icon.png'
            },
            image:{
                url:'attachment://spriteAttachment.png'
            },
            
        })
        Utils.reply(message, {
            embeds: [embed],
            files: [icon,spriteAttachment]
            },
        )
        
        const filter = m => m.content.startsWith(prefix+"answer");

        const responses = await message.channel.awaitMessages( { filter , max: 1, time:120_000, errors: ['time']}).catch(() => null);

        if(!responses) return;
        const response = Array.from(responses.values())[0];
        
        if(response.content.endsWith(answer)) {
            Utils.reply(message,Utils.simpleEmbed('Correct!'));
            
            const userId = response.author.id;
            const newPokemon = new Pokemon(data);
            Trainer.pushPokemon(userId, newPokemon);
        }

        }
}