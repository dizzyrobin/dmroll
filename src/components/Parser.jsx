import React from 'react';
import PropTypes from 'prop-types';
import ExecTable from './ExecTable';

import Tooltip from '@material-ui/core/Tooltip';
import Button from '@material-ui/core/Button';

import { wExecScript } from '../wscript';

const Parser = ({ result, setResult }) => (
  <div>
    {result.map((e, i) => {
      if (e.type === 'text') {
        return <span key={`${i}-text`}>{e.text}</span>;
      }

      if (e.type === 'command') {
        switch (e.kind) {
          case 'r':
            return (
              <Tooltip key={`${i}-command-r`} title={e.command}>
                <Button
                  onClick={() => {
                    const newResult = JSON.parse(JSON.stringify(result));
                    newResult[i].result = wExecScript(e.command);
                    setResult(newResult);
                  }}
                >
                  {e.result}
                </Button>
              </Tooltip>
            );
          case 'br':
            return <br key={`${i}-command-br`} />;
          case 'n':
            return (
              <ExecTable
                key={`${i}-command-n`}
                roll={e.result.roll}
                table={e.result.table}
                setResult={(changed) => {
                  const newResult = JSON.parse(JSON.stringify(result));
                  newResult[i].result = changed;
                  setResult(newResult);
                }}
              />
            );
          case 't':
            return (
              <ExecTable
                key={`${i}-command-t`}
                roll="1d1"
                table={e.result.table}
                setResult={(changed) => {
                  const newResult = JSON.parse(JSON.stringify(result));
                  newResult[i].result = changed;
                  setResult(newResult);
                }}
              />
            );
          default:
            return <span key={`${i}-command-unknown`}>[Unknown command]</span>;
        }
      }

      return undefined;
    })}
  </div>
);

Parser.propTypes = {
  result: PropTypes.arrayOf(PropTypes.object).isRequired,
  setResult: PropTypes.func.isRequired,
};

export default Parser;
