import React from "react";
import "./Creation.css";
const Creation = () => {
  return (
    <div class="create__wrapper container">
      <div class="create__word-def">
        <div class="create__word create--crcard">
          <input class="crcard__input" placeholder="Words" />
          <div class="crcard__title">Word</div>
        </div>
        <div class="create__definition create--crcard">
          <input class="crcard__input" placeholder="Definitions" />
          <div class="crcard__title">Definition</div>
        </div>
      </div>
      <div class="create__tag create--crcard">
        <input class="crcard__input" placeholder="Tags" />
        <div class="crcard__title">Tags</div>
      </div>
      <div class="create__submit-container">
        <button class="create__submit">Submit</button>
      </div>
    </div>
  );
};

export default Creation;
