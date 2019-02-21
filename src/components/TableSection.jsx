import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import IconAdd from '@material-ui/icons/AddCircleOutline';
import { green, red, blue } from '@material-ui/core/colors';

import Table from './Table';

import * as actions from '../actions/local';

const styles = {
  avatar: {
    backgroundColor: blue[500],
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
};

const TableSection = ({ classes, tables, tableCreate, tableChange, tableDelete }) => {
  const renderTables = tables.map(table => (
    <Table
      key={table.name}
      name={table.name}
      data={table.data}
      onClick={() => { }}
      onDelete={() => tableDelete(table.name)}
      onEdit={(oldName, newName, data) => tableChange(oldName, newName, data)}
    />
  ));

  return (
    <Card>
      <CardContent>
        <div className={classes.header}>
          <Avatar aria-label="T" className={classes.avatar}>
            T
          </Avatar>

          <Typography variant="h5" component="h2">
            Tables
          </Typography>

          <IconButton
            className={classes.add}
            onClick={() => {
              let name = 'New table';
              if (tables.findIndex(e => e.name === name) >= 0) {
                let i = 2;
                while (tables.findIndex(e => e.name === `${name} ${i}`) >= 0) {
                  i += 1;
                  if (i > 999999) { // one million
                    throw new Error('index out out bounds');
                  }
                }
                name = `${name} ${i}`;
              }
              tableCreate(name, '');
            }}
          >
            <IconAdd />
          </IconButton>

        </div>

        {renderTables}
      </CardContent>
    </Card>
  );
};

TableSection.propTypes = {
  tables: PropTypes.arrayOf(PropTypes.object).isRequired,
  tableCreate: PropTypes.func.isRequired,
  tableChange: PropTypes.func.isRequired,
  tableDelete: PropTypes.func.isRequired,
};

export default connect(null, actions)(withStyles(styles)(TableSection));
