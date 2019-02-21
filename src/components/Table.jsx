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
import Tooltip from '@material-ui/core/Tooltip';
import IconRemove from '@material-ui/icons/Delete';
import IconEdit from '@material-ui/icons/Edit';
import { red, blue } from '@material-ui/core/colors';

import { wParseTable, wExecScript, wParseScript } from '../wscript';

const styles = {
  remove: {
    color: red[500],
  },
  edit: {
    color: blue[500],
  },
  editDataText: {
    fontFamily: 'monospace',
  },
};

const Table = ({ classes, name, data, onClick, onDelete, onEdit }) => {
  const [deleting, setDeleting] = useState(false);
  const [editing, setEditing] = useState(false);
  const [executing, setExecuting] = useState(false);
  const [executionResult, setExecutionResult] = useState([]);
  const [editName, setEditName] = useState(name);
  const [editData, setEditData] = useState(data);

  return (
    <div>
      <Button
        className={classes.scenario}
        variant="contained"
        size="large"
        color="primary"
        onClick={() => {
          setExecutionResult(wParseTable(data, true));
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
            {`Are you sure you want to delete the table "${name}"?`}
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
        onClose={() => {
          setEditing(false);
          setEditName(name);
          setEditData(data);
        }}
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
            InputProps={{
              classes: {
                input: classes.editDataText,
              },
            }}
            value={editData}
            onChange={event => setEditData(event.target.value)}
            label="Table data csv (roll;script)"
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
              setEditData(data);
            }}
            color="primary"
          >
            Cancel
          </Button>
          <Button
            color="primary"
            onClick={() => {
              setEditing(false);
              onEdit(name, editName, editData);
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
                    className={classes.inlineButton}
                    key={`${i}-command`}
                    onClick={() => {
                      const newExecutionResult = JSON.parse(JSON.stringify(executionResult));
                      newExecutionResult[i].result = wExecScript(e.command);
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

Table.propTypes = {
  onEdit: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  data: PropTypes.string.isRequired,
};

export default withStyles(styles)(Table);
