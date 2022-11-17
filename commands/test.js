const { reply } = require("../utils/utils");

module.exports = {
    description: `test command`,
    execute(message, args) {
        reply(message, 'gameing');
        console.log(`gameing`);
    }
}