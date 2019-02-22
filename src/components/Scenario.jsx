import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContentText from '@material-ui/core/DialogContentText';
import Tooltip from '@material-ui/core/Tooltip';
import IconRemove from '@material-ui/icons/Delete';
import IconEdit from '@material-ui/icons/Edit';
import { red, blue } from '@material-ui/core/colors';

import { wExecScript, wParseScript } from '../wscript';
import Parser from './Parser';

const styles = {
  remove: {
    color: red[500],
  },
  edit: {
    color: blue[500],
  },
  inlineButton: {
    minWidth: 32,
    padding: '1px 8px',
  },
  modal: {
    minWidth: '80vw',
  },
};

const Scenario = ({ classes, name, script, onClick, onDelete, onEdit, tables }) => {
  const [deleting, setDeleting] = useState(false);
  const [editing, setEditing] = useState(false);
  const [executing, setExecuting] = useState(false);
  const [executionResult, setExecutionResult] = useState([]);
  const [editName, setEditName] = useState(name);
  const [editScript, setEditScript] = useState(script);

  return (
    <div>
      <Button
        className={classes.scenario}
        variant="contained"
        size="large"
        color="primary"
        onClick={() => {
          setExecutionResult(wParseScript(script));
          setExecuting(true);
        }}
      >
        {name}
      </Button>
      <IconButton
        className={classes.edit}
        onClick={() => setEditing(true)}
      >
        <IconEdit />
      </IconButton>
      <IconButton
        className={classes.remove}
        onClick={() => setDeleting(true)}
      >
        <IconRemove />
      </IconButton>

      {/* DELETING MODAL */}

      <Dialog
        fullWidth
        maxWidth="sm"
        open={deleting}
        onClose={() => setDeleting(false)}
      >
        <DialogTitle>DELETE CONFIRMATION</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {`Are you sure you want to delete the scenario "${name}"?`}
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
              onDelete();
            }}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      {/* EDITING MODAL */}

      <Dialog
        fullWidth
        maxWidth="sm"
        open={editing}
        onClose={() => {
          setEditing(false);
          setEditName(name);
          setEditScript(script);
        }}
      >
        <DialogTitle>
          <TextField
            fullWidth
            value={editName}
            onChange={event => setEditName(event.target.value)}
            margin="normal"
            label="Name"
            variant="outlined"
          />
        </DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            value={editScript}
            onChange={event => setEditScript(event.target.value)}
            label="Script"
            multiline
            rows="10"
            margin="normal"
            variant="filled"
          />
        </DialogContent>
        <DialogActions>
          <Button
            autoFocus
            onClick={() => {
              setEditing(false);
              setEditName(name);
              setEditScript(script);
            }}
            color="primary"
          >
            Cancel
          </Button>
          <Button
            color="primary"
            onClick={() => {
              setEditing(false);
              onEdit(name, editName, editScript);
            }}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>

      {/* EXECUTE MODAL */}

      <Dialog
        fullWidth
        maxWidth="sm"
        open={executing}
        onClose={() => {
          setExecuting(false);
          setExecutionResult([]);
        }}
      >
        <DialogTitle>
          {`Results of ${name}`}
        </DialogTitle>
        <DialogContent>
          <Parser result={executionResult} setResult={setExecutionResult} />
        </DialogContent>
        <DialogActions>
          <Button
            autoFocus
            onClick={() => {
              setExecuting(false);
              setExecutionResult([]);
            }}
            color="primary"
          >
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

Scenario.propTypes = {
  onEdit: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  script: PropTypes.string.isRequired,
};

export default withStyles(styles)(Scenario);
