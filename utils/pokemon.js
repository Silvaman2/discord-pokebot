const { fetchJSON } = require("./utils");

class Pokemon {
    constructor(data) {
    this[`id`] = data[`id`];
    this[`name`] = data[`name`];
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
}


module.exports = Pokemon;