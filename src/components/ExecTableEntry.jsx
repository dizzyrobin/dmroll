import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';
import Button from '@material-ui/core/Button';
import Parser from './Parser';

const styles = {

};

const ExecTableEntry = ({ classes, result }) => {

  return (
    <Tooltip title={'whatever'}>
      <Button
        className={classes.inlineButton}
        onClick={() => {
          // const newExecutionResult = JSON.parse(JSON.stringify(executionResult));
          // newExecutionResult[i].result = wExecScript(e.command);
          // setExecutionResult(newExecutionResult);
        }}
      >
        <Parser result={result} />
      </Button>
    </Tooltip>
  );
};

ExecTableEntry.propTypes = {
  result: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default withStyles(styles)(ExecTableEntry);
