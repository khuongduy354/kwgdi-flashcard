import React, { useState } from "react";
import "./Config.css";
const RenderConfig = ({ word, definition, tag, index }) => {
  return (
    <div className="config__item-container ">
      <li
        style={{
          animationDelay: `calc(.1s*${index})`,
        }}
        className="config__item config--cfcard appearIn-Out"
      >
        <input className="cfcard__word" defaultValue={word} />
        <input className="cfcard__definition" defaultValue={definition} />
        <input className="cfcard__tag" defaultValue={tag} />
      </li>
      <div className="config__checkbox"></div>
    </div>
  );
};
const insert = () => {
  var items = [];
  for (let i = 0; i < 10; i++) {
    items.push(<RenderConfig word={i} index={i} key={i} />);
  }
  return <>{items}</>;
};

const ConfigMode = () => {
  return (
    <ul className="config__list container">
      {/* <RenderConfig word="hi" index={1} />
        <RenderConfig word="wod" index={2} /> */}
      {insert()}
    </ul>
  );
};

export default ConfigMode;
