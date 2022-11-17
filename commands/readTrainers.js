const { getTrainers } = require("../utils/trainer");

module.exports = {
    description: 'logs trainers.json contents, debug purposes',
    execute(message, args) {
        console.log(getTrainers());
    }
}