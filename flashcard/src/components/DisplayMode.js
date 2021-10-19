import React, { useState } from "react";
import "./DisplayMode.css";
const DisplayMode = ({ multiselect }) => {
  const [selected, setSelected] = useState([]);
  //render display card
  const renderDisplayCard = (word, index, definition, tag) => {
    return (
      <li
        onClick={() => {
          if (multiselect) {
            //check if card already in selected, insert it if not
            if (selected.filter((obj) => obj.word == word) == false) {
              setSelected([
                ...selected,
                { word: word, definition: definition, tag: tag },
              ]);
            }
          }
        }}
        style={{ animationDelay: `calc(0.1s*${index})` }}
        className={` ${
          multiselect && "floatCard"
        } display__item display--dpcard appearIn-Out`}
      >
        <div className="dpcard__upper"></div>
        <div className="dpcard__word">
          <span>{word}</span>
        </div>
        <div className="dpcard__lower"></div>
      </li>
    );
  };
  return (
    <ul className="display__list container">
      {renderDisplayCard("hi", 1)}
      {renderDisplayCard("hi", 2)}
      {renderDisplayCard("why", 3)}
      {renderDisplayCard("hi", 4)}
      {renderDisplayCard("hi", 5)}
    </ul>
  );
};

export default DisplayMode;
