const fs = require(`fs`);

class Trainer {
    constructor(currentPokemon) {
        this.currentPokemon = currentPokemon ? currentPokemon : [];
    }

    static getTrainers() {
        return require(`../pokemon-data/trainers.json`);
    }


    static getTrainer(userID) {
        const trainers = Trainer.getTrainers();
        const currenttrainer = trainers[userID];
        return currenttrainer;
    }

    static async setTrainer(userID, data) {
        const trainers = Trainer.getTrainers();
        trainers[userID] = data ? data : new Trainer();
        fs.writeFile(`./pokemon-data/trainers.json`, JSON.stringify(trainers), (err) => console.log(err));
    }
}


module.exports = Trainer;