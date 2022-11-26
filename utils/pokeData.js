const Utils = require('./utils');

class PokeData {
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
    
    static pokemonCount = 386;
    
    static async getPokemon(element) {
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 1000);

        const id = element.toString().toLowerCase();
        const pokemon = await Utils.fetchJSON(`https://pokeapi.co/api/v2/pokemon/${id}`, {
            signal: controller.signal
        });
        clearTimeout(timeout);
        
        return pokemon;
    }
    
    static pokemonSprite(data) {
        return data['sprites']['versions']['generation-iii']['emerald']['front_default'];
    }

    static async getSpecies(data) {
        const url = data.species.url;
        const species = await Utils.fetchJSON(url);
        return species;
    }

    static getHeight(data) {
        const height = data.height * 0.1;
        return height;
    }

    static getWeight(data) {
        const weight = data.weight * 0.1;
        return weight;
    }
}


module.exports = PokeData;