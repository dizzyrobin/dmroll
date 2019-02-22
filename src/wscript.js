export const wThrowDice = dice => Math.ceil(Math.random() * dice);

export const wThrow = (dice, times, extra) => {
  let result = 0;
  for (let i = 0; i < times; i += 1) {
    result += wThrowDice(dice);
  }

  return result + extra;
};

const isInteger = n => Number.isInteger(Number(n));

const getRollParams = (str) => {
  let tmp = str.split('d');
  const times = Number(tmp[0]);
  const diceAndExtra = tmp[1];
  if (diceAndExtra === undefined || !Number.isInteger(Number(times))) {
    throw new Error('Error: Rolling str');
  }

  tmp = diceAndExtra.split('+');
  const dice = Number(tmp[0]);
  let extra;
  if (tmp[1] === undefined) {
    extra = 0;
  } else {
    extra = Number(tmp[1]);
  }
  if (!Number.isInteger(Number(dice))) {
    throw new Error('Error: Rolling str');
  }

  if (!Number.isInteger(Number(extra))) {
    throw new Error('Error: Rolling str');
  }

  return { dice, extra, times };
};

export const wExecRoll = (args) => {
  if (typeof args !== 'string') {
    return undefined;
  }

  const { dice, times, extra } = getRollParams(args);
  return wThrow(dice, times, extra);
};

const wKindScript = (command) => {
  const splitted = command.split(' ');
  switch (splitted[0]) {
    case 'r':
    case 'br':
    case 'n':
    case 't':
      return splitted[0];
    default:
      return undefined;
  }
};

export const wExecScript = (command) => {
  const splitted = command.split(' ');
  switch (splitted[0]) {
    case 'r':
      return wExecRoll(splitted[1]);
    case 'br':
      return '';
    case 't': {
      splitted.splice(0, 1);
      const table = splitted.join(' ');
      return table;
    }
    case 'n': {
      const roll = splitted[1];
      splitted.splice(0, 2)
      const table = splitted.join(' ');
      return {
        table,
        roll,
      };
    }
    default:
      return undefined;
  }
};

export const wParseScript = (script) => {
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

    const kind = wKindScript(e);
    if (kind === undefined) {
      throw new Error(`Error: Can't parse the command ${e}`);
    }

    const result = wExecScript(e);
    if (result === undefined) {
      throw new Error(`Error: Can't parse the command ${e}`);
    }

    return {
      type: 'command',
      kind,
      command: e,
      result,
    };
  });
};

export const wParseTable = (data, exec) => {
  let rows = data.split('\n').filter(r => r !== '').map(e => e.split(';'));
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
    const result = wThrowDice(dice);
    const resultScript = `Rolling 1d${dice}. Result: ${result}.`;
    const selected = rows.find(row => row.start <= result && row.end >= result);
    if (selected === undefined) {
      return [{
        type: 'text',
        text: 'No entry for that result.',
      }];
    }
    return wParseScript(selected.script);
  }
};
