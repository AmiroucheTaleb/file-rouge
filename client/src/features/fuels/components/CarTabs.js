import React, { useState } from "react";
import { TabPanel, useTabs } from "react-headless-tabs";

function CarTabs({ cars }) {
  const [activeTab, setActiveTab] = useState(0);
  const { tabs, panels } = useTabs();

  const handleTabChange = (value) => {
    setActiveTab(value);
  };

  return (
    <div>
      <div className='tabs'>
        {tabs.map((tab, index) => (
          <button
            key={index}
            className={`tab ${activeTab === index ? "active" : ""}`}
            onClick={() => handleTabChange(index)}
          >
            {tab}
          </button>
        ))}
      </div>
      <div className='tab-panels'>
        <TabPanel value={0}>Contenu pour toutes les voitures</TabPanel>
        {cars.map((car, index) => (
          <TabPanel key={index + 1} value={index + 1}>
            Contenu pour la voiture {car.model}
          </TabPanel>
        ))}
        {panels}
      </div>
    </div>
  );
}

export default CarTabs;
