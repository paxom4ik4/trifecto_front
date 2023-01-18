import * as React from 'react';

import './tooltip.scss';

const DEFAULT_CLASSNAME = "tooltip";

export const Tooltip = ({ children, text }) => {
  return (
    <div className={DEFAULT_CLASSNAME}>
      <div className={`${DEFAULT_CLASSNAME}_hovered`}>{text}</div>
      {children}
    </div>
  )
}