import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import IconAdd from '@material-ui/icons/AddCircleOutline';
import IconRemove from '@material-ui/icons/Delete';
import IconEdit from '@material-ui/icons/Edit';
import { green, red } from '@material-ui/core/colors';

import Scenario from './Scenario';

const styles = {
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  avatar: {
    backgroundColor: '#ff5555',
    marginRight: 10,
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  add: {
    color: green[500],
  },
  remove: {
    marginLeft: 'auto',
    color: red[500],
  },
  red: {
    color: red[500],
  },
};

const ScenarioSection = ({ title, classes, scenarios }) => {
  const renderScenarios = scenarios.map(scenario => (
    <Scenario
      key={scenario.name}
      name={scenario.name}
      onClick={() => console.log('click')}
      onRemove={() => console.log('remove')}
    />
  ));

  return (
    <Card>
      <CardContent>
        <div className={classes.header}>
          <Avatar aria-label={title[0]} className={classes.avatar}>
            {title[0]}
          </Avatar>

          <Typography variant="h5" component="h2">
            {title}
          </Typography>

          <IconButton>
            <IconEdit />
          </IconButton>

          <IconButton className={classes.add}>
            <IconAdd />
          </IconButton>

          <IconButton className={classes.remove}>
            <IconRemove />
          </IconButton>
        </div>

        {renderScenarios}
      </CardContent>
    </Card>
  );
};

ScenarioSection.propTypes = {
  title: PropTypes.string.isRequired,
  scenarios: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default withStyles(styles)(ScenarioSection);
