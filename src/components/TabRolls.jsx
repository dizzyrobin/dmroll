import React from 'react';

import ScenarioSection from './ScenarioSection';

const store = {
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

const TabRolls = () => {
  const renderSections = store.sections.map(section => (
    <div key={section.title}>
      <ScenarioSection title={section.title} scenarios={section.scenarios} />
      <br />
    </div>
  ));

  return (
    <div>
      {renderSections}
    </div>
  );
}

export default TabRolls;
