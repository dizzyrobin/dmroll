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
    title: 'Magic items',
    scenarios: [{
      name: 'Example 1',
      script: 'You got AAA',
    }, {
      name: 'Example 2',
      script: 'You got BBB',
    }],
  }, {
    title: 'Treasures',
    scenarios: [{
      name: 'Example 3',
      script: 'You got CCC',
    }, {
      name: 'Example 4',
      script: 'You got DDD',
    }],
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
      index = newState.section.findIndex(s => s.title === action.title);
      if (index !== undefined) {
        newState.section.splice(index, 1);
      }
      return newState;

    case SECTION_CREATE:
      newState.sections.push({
        title: action.title,
        scenarios: [],
      });
      return newState;

    case SCENARIO_CREATE: {
      index = newState.section.findIndex(s => s.title === action.sectionTitle);
      const { scenarios } = newState.section[index];
      index = scenarios.findIndex(s => s.name === action.scenarioName);
      scenarios[index].name = index;
      return newState;
    }

    case SCENARIO_DELETE: {
      index = newState.section.findIndex(s => s.title === action.sectionTitle);
      const { scenarios } = newState.section[index];
      index = scenarios.findIndex(s => s.name === action.scenarioName);
      scenarios.splice(index, 1);
      return newState;
    }

    case SCENARIO_MODIFY: {
      index = newState.section.findIndex(s => s.title === action.sectionTitle);
      const { scenarios } = newState.section[index];
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
