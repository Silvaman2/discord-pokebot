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
        const currentTrainer = trainers[userID];
        return currentTrainer;
    }

    static async setTrainer(userID, data) {
        const trainers = Trainer.getTrainers();
        trainers[userID] = data ? data : new Trainer();
        fs.writeFile(`./pokemon-data/trainers.json`, JSON.stringify(trainers), (err) => {
            if(err) {
                console.log(err)
            } else {
                console.log('File successfully written!');
            }
        });
    }

    static pushPokemon(userID, pokemon) {
        const trainer = Trainer.getTrainer(userID);

        trainer['currentPokemon'].push(pokemon);
        Trainer.setTrainer(userID, trainer);
    }

    static canPush(userID) {
        const { currentPokemon } = this.getTrainer(userID);

        return currentPokemon.length < 6;
    }
}


module.exports = Trainer;