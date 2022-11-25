const fs = require(`fs`);

class Trainer {
    constructor(currentPokemon) {
        this.currentPokemon = currentPokemon ? currentPokemon : [];
    }

    static async getTrainers() {
        try {
            return require('../pokemon-data/trainers.json');
        } catch (e) {
            fs.writeFileSync('./pokemon-data/trainers.json', '{}');
        }
        return require('../pokemon-data/trainers.json');
    }


    static async getTrainer(userId) {
        let trainers = await Trainer.getTrainers();

        if(!trainers[userId]) {
            await Trainer.setTrainer(userId);
            trainers = await Trainer.getTrainers();
        }

        const currentTrainer = trainers[userId];
        return currentTrainer;
    }

    static async setTrainer(userId, data) {
        const trainers = await Trainer.getTrainers();
        trainers[userId] = data ? data : new Trainer();
        fs.writeFileSync(`./pokemon-data/trainers.json`, JSON.stringify(trainers), (err) => {
            if(err) {
                console.log(err)
            } else {
                console.log('File successfully written!');
            }
        });
    }

    static async clearPokemon(userId) {
        await Trainer.setTrainer(userId, {
            currentPokemon: []
        });
    }

    static async pushPokemon(userId, pokemon) {
        const trainer = await Trainer.getTrainer(userId);

        trainer['currentPokemon'].push(pokemon);
        await Trainer.setTrainer(userId, trainer);
    }
}


module.exports = Trainer;