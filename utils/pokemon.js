const { fetchJSON } = require("./utils");

class Pokemon {
    constructor(id) {
        Pokemon.getPokemon(id).then(data => {
        this[`name`] = data[`name`];
        this[`base_experience`] = data[`base_experience`];
        })
    }

    static async getPokemon(element) {
        const id = element.toString().toLowerCase();
        const pokemon = await fetchJSON(`https://pokeapi.co/api/v2/pokemon/${id}`);

        return pokemon;
    }


}