const { AttachmentBuilder, EmbedBuilder } = require('discord.js');
const { getTrainer, getTrainerPokemon, clearPokemon } = require("../utils/trainer");
const { reply } = require("../utils/utils");

module.exports = {
    debug:true,
    description: `test command`,
    execute(message, args) {
        const embed = new EmbedBuilder({
            color:16732992,
            title:'Fucking cunt',
        })
        reply(message, {
            embeds:[embed],
        })
    }
}