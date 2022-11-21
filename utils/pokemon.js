const { fetchJSON } = require("./utils");

class Pokemon {
    constructor(data) {
    this[`id`] = data[`id`];
    this[`name`] = data[`name`];
    this[`sprite_front`] = Pokemon.pokemonSprite(data);
    }

    static async getPokemon(element) {
        const id = element.toString().toLowerCase();
        const pokemon = await fetchJSON(`https://pokeapi.co/api/v2/pokemon/${id}`);

        return pokemon;
    }

    static starterPokemon = [
        'bulbasaur',
        'charmander',
        'squirtle',
        'chikorita',
        'cyndaquil',
        'totodile',
        'treecko',
        'torchic',
        'mudkip'
    ]

    static pokemonSprite(data) {
      return data[`sprites`][`versions`][`generation-iii`][`emerald`][`front_default`];
    }
}


module.exports = Pokemon;