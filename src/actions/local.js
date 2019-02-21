import firebase from 'firebase/app';
import 'firebase/firestore';

import {
  SECTION_CHANGE_TITLE,
  SECTION_DELETE,
  SECTION_CREATE,
  SCENARIO_CREATE,
  SCENARIO_DELETE,
  SCENARIO_MODIFY,
  SET_DATA,
  TABLE_CREATE,
  TABLE_DELETE,
  TABLE_MODIFY,
} from './types';


const app = firebase.initializeApp({
  apiKey: 'AIzaSyCujxJtuP4W2XhKt5KA9b5uTUG8TA9BsWI',
  authDomain: 'dmroll-7661d.firebaseapp.com',
  databaseURL: 'https://dmroll-7661d.firebaseio.com',
  projectId: 'dmroll-7661d',
  storageBucket: 'dmroll-7661d.appspot.com',
  messagingSenderId: '491963136623',
});

const firestore = app.firestore();

const defaultData = {
  sections: [{
    title: 'Default',
    scenarios: [],
  }],
  tables: [],
};

export const requestDatabaseData = () => async (dispatch) => {
  firestore.collection('users').doc('guest').get()
    .then((snapshot) => {
      let { data } = snapshot.data();
      console.log(data);
      if (data === undefined || data === '') {
        data = defaultData;
      } else {
        data = JSON.parse(data);
      }
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
  const data = JSON.stringify(getState().local);
  firestore.collection('users').doc('guest').set({ data })
    .then(() => {

    })
    .catch((err) => {
      console.error(err);
    });
};

export const sectionChangeTitle = (oldTitle, newTitle) => async (dispatch, getState) => {
  dispatch({
    type: SECTION_CHANGE_TITLE,
    oldTitle,
    newTitle,
  });

  syncDatabaseData()(dispatch, getState);
};

export const sectionDelete = title => async (dispatch, getState) => {
  dispatch({
    type: SECTION_DELETE,
    title,
  });

  syncDatabaseData()(dispatch, getState);
};

export const sectionCreate = title => async (dispatch, getState) => {
  dispatch({
    type: SECTION_CREATE,
    title,
  });

  syncDatabaseData()(dispatch, getState);
};

export const scenarioCreate = (sectionTitle, scenarioName, script) => async (dispatch, getState) => {
  dispatch({
    type: SCENARIO_CREATE,
    sectionTitle,
    scenarioName,
    script,
  });

  syncDatabaseData()(dispatch, getState);
};

export const scenarioDelete = (sectionTitle, scenarioName) => async (dispatch, getState) => {
  dispatch({
    type: SCENARIO_DELETE,
    sectionTitle,
    scenarioName,
  });

  syncDatabaseData()(dispatch, getState);
};

export const scenarioChange = (
  sectionTitle,
  oldScenarioName,
  newScenarioName,
  script,
) => async (dispatch, getState) => {
  dispatch({
    type: SCENARIO_MODIFY,
    sectionTitle,
    oldScenarioName,
    newScenarioName,
    script,
  });

  syncDatabaseData()(dispatch, getState);
};

export const tableCreate = (tableName, data) => async (dispatch, getState) => {
  dispatch({
    type: TABLE_CREATE,
    tableName,
    data,
  });

  syncDatabaseData()(dispatch, getState);
};

export const tableDelete = tableName => async (dispatch, getState) => {
  dispatch({
    type: TABLE_DELETE,
    tableName,
  });

  syncDatabaseData()(dispatch, getState);
};

export const tableChange = (
  oldTableName,
  newTableName,
  data,
) => async (dispatch, getState) => {
  dispatch({
    type: TABLE_MODIFY,
    oldTableName,
    newTableName,
    data,
  });

  syncDatabaseData()(dispatch, getState);
};
