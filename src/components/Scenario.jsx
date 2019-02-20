import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContentText from '@material-ui/core/DialogContentText';
import IconRemove from '@material-ui/icons/Delete';
import IconEdit from '@material-ui/icons/Edit';
import { red, blue } from '@material-ui/core/colors';

import { wparse, wexec } from '../wscript';
import { Tooltip } from '@material-ui/core';

const styles = {
  remove: {
    color: red[500],
  },
  edit: {
    color: blue[500],
  },
  spanButton: {
    paddingLeft: 6,
    paddingRight: 6,
    paddingTop: 2,
    paddingBottom: 2,
    backgroundColor: '#cccccc',
  },
};

const Scenario = ({ classes, name, script, onClick, onDelete, onEdit }) => {
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
          setExecutionResult(wparse(script));
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
        open={editing}
        onClose={() => setEditing(false)}
      >
        <DialogTitle>
          <TextField
            value={editName}
            onChange={event => setEditName(event.target.value)}
            margin="normal"
            label="Name"
            variant="outlined"
          />
        </DialogTitle>
        <DialogContent>
          <TextField
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
          {executionResult.map((e, i) => {
            if (e.type === 'text') {
              return <span key={`${i}-text`}>{e.text}</span>;
            }

            if (e.type === 'command') {
              return (
                <Tooltip title={e.command}>
                  <Button
                    key={`${i}-command`}
                    onClick={() => {
                      const newExecutionResult = JSON.parse(JSON.stringify(executionResult));
                      newExecutionResult[i].result = wexec(e.command);
                      setExecutionResult(newExecutionResult);
                    }}
                  >
                    {e.result}
                  </Button>
                </Tooltip>
              );
            }

            return undefined;
          })}
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
