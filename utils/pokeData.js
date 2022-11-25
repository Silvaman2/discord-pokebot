const Utils = require("./utils");

class PokeData {
    static async getPokemon(element) {
        const id = element.toString().toLowerCase();
        const pokemon = await Utils.fetchJSON(`https://pokeapi.co/api/v2/pokemon/${id}`);

        return pokemon;
    }
    
    static pokemonSprite(data) {
        return data[`sprites`][`versions`][`generation-iii`][`emerald`][`front_default`];
    }


    static async getSpecies(data) {
        const url = data.species.url;
        const species = await Utils.fetchJSON(url);
        return species;
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


module.exports = PokeData;