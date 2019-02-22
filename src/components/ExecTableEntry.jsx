import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import IconReload from '@material-ui/icons/ReplayOutlined';
import Parser from './Parser';

const styles = {
  main: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
};

const ExecTableEntry = ({ classes, result, onReload, setResult }) => {

  return (
    <div className={classes.main}>
      <Tooltip title=''>
        <Typography variant="subtitle1" component="span">
          <Parser
            result={result}
            setResult={(newValue) => {
              setResult(newValue);
            }}
          />
        </Typography>
      </Tooltip>
      <IconButton
        onClick={() => {
          onReload();
        }}
      >
        <IconReload />
      </IconButton>
    </div>
  );
};

ExecTableEntry.propTypes = {
  result: PropTypes.arrayOf(PropTypes.object).isRequired,
  onReload: PropTypes.func.isRequired,
  setResult: PropTypes.func.isRequired,
};

export default withStyles(styles)(ExecTableEntry);
