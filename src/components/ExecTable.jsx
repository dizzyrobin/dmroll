import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';

import { wExecRoll, wParseTable, wParseScript } from '../wscript';
import ExecTableEntry from './ExecTableEntry';

const styles = {
  header: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
};

const ExecTable = ({ classes, table, roll, tables }) => {
  const targetTable = tables.find(e => e.name === table);
  const [diceResult, setDiceResult] = useState(wExecRoll(roll));
  const [entries, setEntries] = useState(Array(diceResult).fill(0).map(() => {
    return wParseTable(targetTable.data, true);
  }));

  return (
    <Card>
      <CardContent>
        <div className={classes.header}>
          <Typography variant="h5" component="h2">
            {table}
          </Typography>
        </div>

        {entries.map((e, i) => <ExecTableEntry key={`${i}-table-entry`} result={e} />)}

      </CardContent>
    </Card>
  );
};

ExecTable.propTypes = {
  table: PropTypes.string.isRequired,
  roll: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
  tables: state.local.tables,
});

export default connect(mapStateToProps, null)(withStyles(styles)(ExecTable));
