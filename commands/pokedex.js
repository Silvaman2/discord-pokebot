const PokeData = require("../utils/pokeData") ;
const { AttachmentBuilder, EmbedBuilder } = require('discord.js');
const Utils = require("../utils/utils");

module.exports = {
    arguments: [
        {
            filter: () => true
        }
    ],
    debug:false,
    description: 'Shows information about a pokemon chosen by the trainer. Can be used with ID or name of the pokemon',


    async execute(message, args){
        const thisPokemon = args[0];


        const data = await PokeData.getPokemon(thisPokemon);


        if(!data || data.id > PokeData.pokemonCount) {
            Utils.reply(message, Utils.simpleEmbed('Invalid Pokémon.'));
            return;
        }


        const species = await PokeData.getSpecies(data);
        const icon = Utils.iconAttachment();
        const spriteAttachment = new AttachmentBuilder(await Utils.resizeImage(PokeData.pokemonSprite(data), 256, 256), { name: 'spriteAttachment.png'});
        const types = data.types.map(t => Utils.capitalizeFirstLetter(t.type.name));
        const description = species['flavor_text_entries']
        .find(currentVersion => currentVersion[`version`][`name`] === `emerald`)
        ['flavor_text'];
        
        const embed = new EmbedBuilder({
            color:16732992,
            title:Utils.capitalizeFirstLetter(data.name),
            description: description,
            fields:[
                {
                    name:`Height:`,
                    value:PokeData.getHeight(data).toFixed(1)+`m`,
                    inline: true
                },
                {
                    name:`Weight:`,
                    value:PokeData.getWeight(data).toFixed(1)+`kg`,
                    inline: true
                },
                {
                    name:`Types:`,
                    value:types.map(type => `-`+type).join(`\n`),
                
                },
            ],
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
        })
    }
}