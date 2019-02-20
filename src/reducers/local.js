import {
  SECTION_CHANGE_TITLE,
  SECTION_DELETE,
  SECTION_CREATE,
  SCENARIO_CREATE,
  SCENARIO_DELETE,
  SCENARIO_MODIFY,
  SET_DATA,
} from '../actions/types';

const defaultState = {
  sections: [{
    title: 'Default',
    scenarios: [],
  }],
};

export default (state = defaultState, action) => {
  const newState = JSON.parse(JSON.stringify(state));
  let index;
  switch (action.type) {
    case SET_DATA:
      return action.data;

    case SECTION_CHANGE_TITLE:
      newState.sections = newState.sections.map((section) => {
        if (section.title === action.oldTitle) {
          const newSection = JSON.parse(JSON.stringify(section));
          newSection.title = action.newTitle;
          return newSection;
        }

        return section;
      });
      return newState;

    case SECTION_DELETE:
      index = newState.sections.findIndex(s => s.title === action.title);
      if (index !== undefined) {
        newState.sections.splice(index, 1);
      }
      return newState;

    case SECTION_CREATE:
      newState.sections.push({
        title: action.title,
        scenarios: [],
      });
      return newState;

    case SCENARIO_CREATE: {
      index = newState.sections.findIndex(s => s.title === action.sectionTitle);
      const { scenarios } = newState.sections[index];
      scenarios.push({
        name: action.scenarioName,
        script: action.script,
      })
      return newState;
    }

    case SCENARIO_DELETE: {
      index = newState.sections.findIndex(s => s.title === action.sectionTitle);
      const { scenarios } = newState.sections[index];
      index = scenarios.findIndex(s => s.name === action.scenarioName);
      scenarios.splice(index, 1);
      return newState;
    }

    case SCENARIO_MODIFY: {
      index = newState.sections.findIndex(s => s.title === action.sectionTitle);
      const { scenarios } = newState.sections[index];
      index = scenarios.findIndex(s => s.name === action.oldScenarioName);
      scenarios[index] = {
        name: action.newScenarioName,
        script: action.script,
      };
      return newState;
    }

    default:
      return state;
  }
};
