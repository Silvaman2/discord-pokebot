const Utils = require("./utils");

class PokeData {
    static async getPokemon(element) {
        
        if(!element) return;
        const id = element.toString().toLowerCase();
        let pokemon;

        try {
            pokemon = await Utils.fetchJSON(`https://pokeapi.co/api/v2/pokemon/${id}`);
            if(pokemon.id > PokeData.pokemonCount) throw 'Invalid Pokemon.';
        } catch (error) {
            return undefined;
        }
        
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

    static getHeight(data) {
        const height = data.height * 0.1;
        return height;
    }
    static getWeight(data) {
        const weight = data.weight * 0.1;
        return weight;
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
    static pokemonCount = 386;
}


module.exports = PokeData;