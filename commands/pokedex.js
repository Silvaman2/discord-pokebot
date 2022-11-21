const Pokemon = require("../utils/pokemon") ;
const { AttachmentBuilder, EmbedBuilder } = require('discord.js');
const { iconAttachment, reply } = require("../utils/utils");
const { pokemonSprite } = require("../utils/pokemon");

module.exports = {
    debug:false,
    description: 'Shows information about a pokemon chosen by the trainer. Can be used with ID or name of the pokemon',


    async execute(message, args){
        const thisPokemon = args[0];
        const data = await Pokemon.getPokemon(thisPokemon);
        const icon = iconAttachment();
        const spriteAttachment = new AttachmentBuilder(pokemonSprite(data), { name: 'spriteAttachment.png'});
        
        console.log(spriteAttachment);
        const embed = new EmbedBuilder({
            color:16732992,
            title:data.name,
            description:'yo mama',
            fields:[
                {
                    name:`ID1:`,
                    value:data.id.toString()
                },
                {
                    name:`ID2:`,
                    value:data.id.toString()
                },
            ],
            thumbnail:{
                url:'attachment://icon.png'
            },
            image:{
                url:'attachment://spriteAttachment.png'
            },
        })
    
        reply(message, {
            embeds: [embed],
            files: [icon,spriteAttachment]
        })
    }
}