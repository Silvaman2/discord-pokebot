const Pokemon = require("../utils/pokemon") ;
const { AttachmentBuilder, EmbedBuilder } = require('discord.js');
const Utils = require("../utils/utils");

module.exports = {
    debug:false,
    description: 'Shows information about a pokemon chosen by the trainer. Can be used with ID or name of the pokemon',


    async execute(message, args){
        const thisPokemon = args[0];
        const data = await Pokemon.getPokemon(thisPokemon);
        const icon = Utils.iconAttachment();
        const spriteAttachment = new AttachmentBuilder(await Utils.resizeImage(Pokemon.pokemonSprite(data), 256, 256), { name: 'spriteAttachment.png'});
        const [type1, type2] = data.types.map(t => Utils.capitalizeFirstLetter(t.type.name));
        
        console.log(spriteAttachment);
        const embed = new EmbedBuilder({
            color:16732992,
            title:Utils.capitalizeFirstLetter(data.name),
            description:'yo mama',
            fields:[
                {
                    name:`Types:`,
                    value:`-${type1}\n-${type2}`,
                    inline: true
                },
                {
                    name:`ID2:`,
                    value:data.id.toString(),
                    inline: true
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