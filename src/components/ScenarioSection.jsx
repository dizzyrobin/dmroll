import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

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

import * as actions from '../actions/local';

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

const ScenarioSection = ({ title, classes, scenarios, sectionChangeTitle, sectionDelete, scenarioCreate, scenarioDelete, scenarioChange }) => {
  const [editing, setEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(title);

  const [deleting, setDeleting] = useState(false);

  const renderScenarios = scenarios.map(scenario => (
    <Scenario
      key={scenario.name}
      name={scenario.name}
      script={scenario.script}
      onClick={() => console.log('click')}
      onDelete={() => scenarioDelete(title, scenario.name)}
      onEdit={(oldName, newName, script) => scenarioChange(title, oldName, newName, script)}
    />
  ));

  return (
    <Card>
      <Dialog
        open={deleting}
        onClose={() => setDeleting(false)}
      >
        <DialogTitle id="alert-dialog-title">DELETE CONFIRMATION</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {`Are you sure you want to delete the section "${title}"?`}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            autoFocus
            onClick={() => setDeleting(false)}
            color="primary"
          >
            Cancel
          </Button>
          <Button
            color="primary"
            onClick={() => {
              setDeleting(false);
              sectionDelete(title);
            }}
          >
            Delete
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
                sectionChangeTitle(title, editTitle);
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

          <IconButton
            className={classes.add}
            onClick={() => {
              let name = 'New scenario';
              if (scenarios.findIndex(e => e.name === name) >= 0) {
                let i = 2;
                while (scenarios.findIndex(e => e.name === `${name} ${i}`) >= 0) {
                  i += 1;
                  if (i > 999999) { // one million
                    throw new Error('index out out bounds');
                  }
                }
                name = `${name} ${i}`;
              }
              scenarioCreate(title, name, '');
            }}
          >
            <IconAdd />
          </IconButton>

          <IconButton
            className={classes.remove}
            onClick={() => {
              setDeleting(true);
            }}
          >
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

export default connect(null, actions)(withStyles(styles)(ScenarioSection));
