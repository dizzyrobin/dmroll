import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import IconRemove from '@material-ui/icons/Delete';
import { red } from '@material-ui/core/colors';

const styles = {
  scenarioRemove: {
    color: red[500],
  },
};

const Scenario = ({ classes, name, onClick, onRemove }) => {
  return (
    <div>
      <Button
        className={classes.scenario}
        variant="contained"
        size="large"
        color="primary"
        onClick={() => onClick()}
      >
        {name}
      </Button>
      <IconButton
        className={classes.scenarioRemove}
        onClick={() => onRemove()}
      >
        <IconRemove />
      </IconButton>
    </div>
  );
};

Scenario.propTypes = {
  onClick: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
};

export default withStyles(styles)(Scenario);
