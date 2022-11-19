const fs = require(`fs`);

class Trainer {
    constructor(currentPokemon) {
        this.currentPokemon = currentPokemon ? currentPokemon : [];
    }

    static getTrainers() {
        return require(`../pokemon-data/trainers.json`);
    }


    static getTrainer(userId) {
        const trainers = Trainer.getTrainers();
        const currentTrainer = trainers[userId];
        return currentTrainer;
    }

    static async setTrainer(userId, data) {
        const trainers = Trainer.getTrainers();
        trainers[userId] = data ? data : new Trainer();
        fs.writeFile(`./pokemon-data/trainers.json`, JSON.stringify(trainers), (err) => {
            if(err) {
                console.log(err)
            } else {
                console.log('File successfully written!');
            }
        });
    }

    static clearPokemon(userId) {
        Trainer.setTrainer(userId, {
            currentPokemon: []
        });
    }

    static pushPokemon(userId, pokemon) {
        const trainer = Trainer.getTrainer(userId);

        trainer['currentPokemon'].push(pokemon);
        Trainer.setTrainer(userId, trainer);
    }

    static getTrainerPokemon(userId) {
        const { currentPokemon } = Trainer.getTrainer(userId);

        return currentPokemon;
    }
}


module.exports = Trainer;