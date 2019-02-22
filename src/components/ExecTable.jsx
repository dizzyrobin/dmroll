import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import IconAdd from '@material-ui/icons/AddOutlined';

import { wExecRoll, wParseTable, wParseScript } from '../wscript';
import ExecTableEntry from './ExecTableEntry';

const styles = {
  header: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
};

const ExecTable = ({ classes, table, roll, tables, setResult }) => {
  const targetTable = tables.find(e => e.name.toLowerCase() === table.toLowerCase());
  console.log(table.toLowerCase());
  const [diceResult, setDiceResult] = useState(wExecRoll(roll));
  const [entries, setEntries] = useState(Array(diceResult).fill(0).map(() => {
    return wParseTable(targetTable.data, true);
  }));

  return (
    <Card>
      <CardContent>
        <div className={classes.header}>
          <Typography variant="h6" component="h6">
            {table}
          </Typography>

          <IconButton
            className={classes.edit}
            onClick={() => {
              const newEntries = JSON.parse(JSON.stringify(entries));
              newEntries.push(wParseTable(targetTable.data, true));
              setEntries(newEntries);
            }}
          >
            <IconAdd />
          </IconButton>
        </div>

        {entries.map((e, i) => (
          <ExecTableEntry
            key={`${i}-table-entry`}
            result={e}
            setResult={(newValue) => {
              const newEntries = JSON.parse(JSON.stringify(entries));
              newEntries[i] = newValue;
              setEntries(newEntries);
            }}
            onReload={() => {
              const newEntries = JSON.parse(JSON.stringify(entries));
              newEntries[i] = wParseTable(targetTable.data, true);
              setEntries(newEntries);
            }}
          />
        ))}

      </CardContent>
    </Card>
  );
};

ExecTable.propTypes = {
  table: PropTypes.string.isRequired,
  roll: PropTypes.string.isRequired,
  setResult: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  tables: state.local.tables,
});

export default connect(mapStateToProps, null)(withStyles(styles)(ExecTable));
