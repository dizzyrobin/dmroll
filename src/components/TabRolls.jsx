import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import IconAdd from '@material-ui/icons/Add';

import ScenarioSection from './ScenarioSection';
import TableSection from './TableSection';

import * as actions from '../actions/local';

const styles = theme => ({
  add: {
    marginBottom: 16,
  },
  rightIcon: {
    marginLeft: theme.spacing.unit,
  },
});

const TabRolls = ({ classes, sections, tables, sectionCreate }) => {
  const renderSections = sections.map(section => (
    <div key={section.title}>
      <ScenarioSection title={section.title} scenarios={section.scenarios} />
      <br />
    </div>
  ));

  return (
    <div>
      <Button
        variant="contained"
        size="large"
        color="primary"
        className={classes.add}
        onClick={() => {
          let title = 'New section';
          if (sections.findIndex(e => e.title === title) >= 0) {
            let i = 2;
            while (sections.findIndex(e => e.title === `${title} ${i}`) >= 0) {
              i += 1;
              if (i > 999999) { // one million
                throw new Error('index out out bounds');
              }
            }
            title = `${title} ${i}`;
          }
          sectionCreate(title);
        }}
      >
        Add new section
        <IconAdd className={classes.rightIcon} />
      </Button>
      {renderSections}
      <TableSection tables={tables} />
    </div>
  );
};

TabRolls.propTypes = {
  sections: PropTypes.array.isRequired,

  // Actions
  sectionCreate: PropTypes.func.isRequired,
};

const mapState = state => ({
  sections: state.local.sections,
  tables: state.local.tables,
});

export default connect(mapState, actions)(withStyles(styles, { withTheme: true })(TabRolls));
