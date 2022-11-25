const PokeData = require("./pokeData");


class Pokemon {
    constructor(data) {
    this[`id`] = data[`id`];
    this[`name`] = data[`name`];
    this[`sprite_front`] = PokeData.pokemonSprite(data);
    this[`types`] = data[`types`].map(t => t.type.name);
    }

    

}


module.exports = Pokemon;