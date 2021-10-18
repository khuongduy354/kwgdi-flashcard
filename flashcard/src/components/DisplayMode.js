import React, { useState } from "react";
import "./DisplayMode.css";
const DisplayMode = ({ multiselect }) => {
  const [selected, setSelected] = useState([]);
  //render display card
  console.log(selected);
  const renderDisplayCard = (word, definition, tag) => {
    return (
      <li
        //add card to selected
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
      {renderDisplayCard("hi")}
      {renderDisplayCard("hi")}
      {renderDisplayCard("why")}
      {renderDisplayCard("hi")}
      {renderDisplayCard("hi")}
    </ul>
  );
};

export default DisplayMode;
