const { getPokemon } = require('../utils/pokemon');
const { reply, resizeImage } = require("../utils/utils");

module.exports = {
    debug:true,
    description: `test command`,
    async execute(message, args) {
        const pokemon = await getPokemon('onix');
        const sprite = pokemon['sprites']['versions']['generation-iii']['emerald']['front_default'];
        
        const resizedSprite = await resizeImage(sprite, 256, 256);


        reply(message, {
            embeds:[
                {
                    title:'stuff',
                    image:{
                        url:'attachment://sprite.png'
                    }
                }
            ],
            files:[
                {
                    attachment:resizedSprite,
                    name:'sprite.png'
                }
            ]
        })
    }
}