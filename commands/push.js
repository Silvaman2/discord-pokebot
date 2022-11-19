const Pokemon = require(`../utils/pokemon`);
const Trainer = require("../utils/trainer");
const { reply } = require("../utils/utils");

module.exports = {
    debug:true,
    description:`pushes pokemon to trainer's inventory`,
    async execute(message, args) {
        const userId = message.author.id;
        const pokemonId = args.shift();

        if(!Trainer.canPush(userId)) {
            reply(message, 'Your inventory is full, store or discard a Pokemon from your inventory!');
            return;
        }

        const pokemonData = await Pokemon.getPokemon(pokemonId);
        const pokemon = new Pokemon(pokemonData);

        Trainer.pushPokemon(userId, pokemon);
        reply(message, 'The desired Pokemon has been pushed.');
    }
}