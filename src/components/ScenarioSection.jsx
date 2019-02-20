import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContentText from '@material-ui/core/DialogContentText';
import Button from '@material-ui/core/Button';
import IconAdd from '@material-ui/icons/AddCircleOutline';
import IconRemove from '@material-ui/icons/Delete';
import IconCheck from '@material-ui/icons/CheckCircleOutline';
import IconEdit from '@material-ui/icons/Edit';
import { green, red } from '@material-ui/core/colors';

import Scenario from './Scenario';

const styles = {
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
  const [editing, setEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(title);

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
      <Dialog
        open={this.state.open}
        onClose={this.handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">DELETE CONFIRMATION</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete the section
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleClose} color="primary">
            Disagree
          </Button>
          <Button onClick={this.handleClose} color="primary" autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>

      <CardContent>
        <div className={classes.header}>
          <Avatar aria-label={title[0]} className={classes.avatar}>
            {title[0]}
          </Avatar>


          {editing ? (
            <TextField
              value={editTitle}
              onChange={event => setEditTitle(event.target.value)}
              margin="normal"
            />
          ) : (
              <Typography variant="h5" component="h2">
                {editTitle}
              </Typography>
            )
          }

          {editing ? (
            <IconButton
              onClick={() => {
                setEditing(false);
                // TODO: Make persistent
              }}
            >
              <IconCheck />
            </IconButton>
          ) : (
              <IconButton onClick={() => setEditing(true)}>
                <IconEdit />
              </IconButton>
            )
          }

          <IconButton className={classes.add}>
            <IconAdd />
          </IconButton>

          <IconButton className={classes.remove}>
            <IconRemove />
          </IconButton>
        </div>

        {renderScenarios}
      </CardContent>
    </Card >
  );
};

ScenarioSection.propTypes = {
  title: PropTypes.string.isRequired,
  scenarios: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default withStyles(styles)(ScenarioSection);
