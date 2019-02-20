import {
  SECTION_CHANGE_TITLE,
  SECTION_DELETE,
  SECTION_CREATE,
  SCENARIO_CREATE,
  SCENARIO_DELETE,
  SCENARIO_MODIFY,
  SET_DATA,
} from './types';

const firebase = require('firebase');

const firestore = firebase.app().firestore();

export const requestDatabaseData = () => async (dispatch) => {
  firestore.collection('users').doc('guest').get()
    .then((snapshot) => {
      const { data } = snapshot.data();
      dispatch({
        type: SET_DATA,
        data,
      });
    })
    .catch((err) => {
      console.error(err);
    });
};

export const syncDatabaseData = () => async (dispatch, getState) => {
  const data = getState();
  firestore.collection('users').doc('guest').set({ data })
    .then(() => {

    })
    .catch((err) => {
      console.error(err);
    });
};

export const sectionChangeTitle = (oldTitle, newTitle) => async (dispatch) => {
  dispatch({
    type: SECTION_CHANGE_TITLE,
    oldTitle,
    newTitle,
  });
};

export const sectionDelete = title => async (dispatch) => {
  dispatch({
    type: SECTION_DELETE,
    title,
  });
};

export const sectionCreate = title => async (dispatch) => {
  dispatch({
    type: SECTION_CREATE,
    title,
  });
};

export const scenarioCreate = (sectionTitle, scenarioName, script) => async (dispatch) => {
  dispatch({
    type: SCENARIO_CREATE,
    sectionTitle,
    scenarioName,
    script,
  });
};

export const scenarioDelete = (sectionTitle, scenarioName) => async (dispatch) => {
  dispatch({
    type: SCENARIO_DELETE,
    sectionTitle,
    scenarioName,
  });
};

export const scenarioChange = (
  sectionTitle,
  oldScenarioName,
  newScenarioName,
  script,
) => async (dispatch) => {
  dispatch({
    type: SCENARIO_MODIFY,
    sectionTitle,
    oldScenarioName,
    newScenarioName,
    script,
  });
};
