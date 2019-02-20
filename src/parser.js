const throwDice = dice => Math.ceil(Math.random() * dice);

const execRoll = (args) => {
  if (typeof args !== 'string') {
    return undefined;
  }

  const tmp = args.split('d');
  const times = tmp[0];
  const diceAndExtra = tmp[1];
  if (diceAndExtra === undefined || !Number.isInteger(Number(times))) {
    return undefined;
  }

  const tmp = diceAndExtra.split('+');
  const dice = tmp[0];
  const extra = tmp[1];
  if (!Number.isInteger(Number(dice))) {
    return undefined;
  }

  if (extra !== undefined && !Number.isInteger(Number(extra))) {
    return undefined;
  }

  let result = 0;
  for (let i = 0; i < times; i += 1) {
    result += throwDice(dice);
  }

  return result + extra;
}

const exec = (command) => {
  const splitted = command.split(' ');
  switch (splitted[0]) {
    case 'r':
      return execRoll(splitted[1]);
    default:
      return undefined;
  }
}
export default (script) => {
  const commands = script.split('{').map(e => e.split('}'));
  commands.map(e => exec(e));
};
