const argv = require('../cli');
const scripts = require('../applescripts');

const execScript = script => argv[script] && scripts[script]();

module.exports = execScript;
