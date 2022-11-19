const { getTrainer, getTrainerPokemon, clearPokemon } = require("../utils/trainer");
const { reply } = require("../utils/utils");

module.exports = {
    debug:true,
    description: `test command`,
    execute(message, args) {
        // reply(message, JSON.stringify(getTrainerPokemon(message.author.id)));
        clearPokemon(message.author.id);
    }
}