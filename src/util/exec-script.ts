import argv from '../cli';
import * as applescripts from '../applescripts';

const execScript = (script: applescripts.Scripts, args: any): void => {
    argv[script] && applescripts[script](args);
};

export default execScript;
