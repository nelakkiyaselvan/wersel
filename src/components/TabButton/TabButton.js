import React, { useState } from 'react';

import './TabButton.css'

export const TabButton = (props) => {
    const { tabList } = props;
    const [selectedTab, setTabIndex] = useState(0)
    const renderTabButton = (tabKey, idx) => 
      <div className={`tabBtn${idx === selectedTab ? ' active' : ''}`} key={tabKey} onClick={() => setTabIndex(idx)}>{tabKey}</div>
    return (
        <div className="tabHeader">
          <div className="tabWrapper">
            {tabList.map((tabKey, idx) => renderTabButton(tabKey, idx))}
          </div>
        </div>
    );
}