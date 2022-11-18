const { reply } = require("../utils/utils");

module.exports = {
    debug:true,
    description: `test command`,
    execute(message, args) {
        reply(message, 'This is a test message.');
        console.log(`gameing`);
    }
}