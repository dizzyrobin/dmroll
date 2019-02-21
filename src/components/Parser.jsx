import React from 'react';
import PropTypes from 'prop-types';
import ExecTable from './ExecTable';

import Tooltip from '@material-ui/core/Tooltip';
import Button from '@material-ui/core/Button';

import { wExecScript } from '../wscript';

const Parser = ({ result }) => (
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
                    // const newExecutionResult = JSON.parse(JSON.stringify(executionResult));
                    // newExecutionResult[i].result = wExecScript(e.command);
                    // setExecutionResult(newExecutionResult);
                  }}
                >
                  {e.result}
                </Button>
              </Tooltip>
            );
          case 'br':
            return <br key={`${i}-command-br`} />;
          case 'n':
            return <ExecTable key={`${i}-command-n`} roll={e.result.roll} table={e.result.table} />;
          case 't':
            return <ExecTable key={`${i}-command-t`} roll="1d1" table={e.result.table} />;
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
};

export default Parser;
