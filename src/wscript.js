const throwDice = dice => Math.ceil(Math.random() * dice);

const execRoll = (args) => {
  if (typeof args !== 'string') {
    return undefined;
  }

  let tmp = args.split('d');
  const times = tmp[0];
  const diceAndExtra = tmp[1];
  if (diceAndExtra === undefined || !Number.isInteger(Number(times))) {
    return undefined;
  }

  tmp = diceAndExtra.split('+');
  const dice = tmp[0];
  const extra = tmp[1];
  if (!Number.isInteger(Number(dice))) {
    return undefined;
  }

  let result = 0;
  for (let i = 0; i < times; i += 1) {
    result += throwDice(dice);
  }

  if (extra !== undefined) {
    if (!Number.isInteger(Number(extra))) {
      return undefined;
    }

    return Number(result) + Number(extra);
  }

  return Number(result);
};

export const wexec = (command) => {
  const splitted = command.split(' ');
  switch (splitted[0]) {
    case 'r':
      return execRoll(splitted[1]);
    default:
      return undefined;
  }
};

export const wparse = (script) => {
  const tokens = [];
  script.split('{').map((left, i) => {
    if (i === 0) {
      tokens.push(left);
    } else {
      const right = left.split('}');
      tokens.push(right[0]);
      tokens.push(right[1]);
    }
  });


  return tokens.map((e, i) => {
    if (i % 2 === 0) {
      return {
        type: 'text',
        text: e,
      };
    }

    const result = wexec(e);
    if (result === undefined) {
      throw new Error(`Error: Can't parse the command ${e}`);
    }

    return {
      type: 'command',
      command: e,
      result,
    };
  });
};
