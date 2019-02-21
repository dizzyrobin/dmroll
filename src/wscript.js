const throwDice = dice => Math.ceil(Math.random() * dice);
const isInteger = n => Number.isInteger(Number(n));

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

export const wExecScript = (command) => {
  const splitted = command.split(' ');
  switch (splitted[0]) {
    case 'r':
      return execRoll(splitted[1]);
    default:
      return undefined;
  }
};

export const wParseScript = (script, exec) => {
  const tokens = [];
  script.split('{').forEach((left, i) => {
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

    const result = wExecScript(e);
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

export const wParseTable = (data, exec) => {
  let rows = data.split('\n').map(e => e.split(';'));
  rows = rows.map((row) => {
    const range = row[0];
    const script = row[1];
    if (row === undefined || range === undefined || script === undefined) {
      throw new Error('Error parsing table');
    }

    const splitRange = range.split('-');
    const startRange = Number(splitRange[0]);
    let endRange = Number(splitRange[1]);
    if (splitRange.length === 1) {
      endRange = startRange;
    } else if (splitRange.length > 2) {
      throw new Error('Error parsing table');
    }

    if (!isInteger(startRange) || !isInteger(endRange)) {
      throw new Error('Error parsing table');
    }

    return {
      start: startRange,
      end: endRange,
      script,
    };
  });

  if (exec === true) {
    const dice = rows[rows.length - 1].end;
    const result = throwDice(dice);
    const resultScript = `Rolling 1d${dice}. Result: ${result}.`;
    const selected = rows.find(row => row.start <= result && row.end >= result);
    if (selected === undefined) {
      return [{
        type: 'text',
        text: `${resultScript} No entry for that result.`,
      }];
    }
    return wParseScript(`${resultScript} ${selected.script}`);
  }
};
