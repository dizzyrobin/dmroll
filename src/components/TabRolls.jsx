import React from 'react';

import ScenarioSection from './ScenarioSection';


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
