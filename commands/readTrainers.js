const { getTrainers } = require('../utils/trainer');

module.exports = {
    arguments: [],
    debug: true,
    description: 'logs trainers.json contents, debug purposes',
    execute(message, args) {
        console.log(getTrainers());
    }
}