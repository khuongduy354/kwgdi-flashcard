import React, { useEffect } from "react";
import { useRef } from "react";
import "./Creation.css";
import { useSelector } from "react-redux";
import { baseAPIUrl } from "../credentials";
const Creation = () => {
  const userEmail = useSelector((state) => state.userUid.user.email);
  const userUid = useSelector((state) => state.userUid.user.uid);
  const words = useRef(null);
  const definitions = useRef(null);
  const tags = useRef(null);
  const handleCreateButton = (e) => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        userUid: userUid,
        userEmail: userEmail,
        words: words.current.value,
        definitions: definitions.current.value,
        tags: tags.current.value,
      }),
    };
    fetch(`${baseAPIUrl}/makeCard`, requestOptions).catch((e) =>
      console.log(e)
    );
    e.preventDefault();
  };
  return (
    <div class="create__wrapper container">
      <div class="create__word-def">
        <div class="create__word create--crcard">
          <input ref={words} class="crcard__input" placeholder="Words" />
          <div class="crcard__title">Word</div>
        </div>
        <div class="create__definition create--crcard">
          <input
            ref={definitions}
            class="crcard__input"
            placeholder="Definitions"
          />
          <div class="crcard__title">Definition</div>
        </div>
      </div>
      <div class="create__tag create--crcard">
        <input ref={tags} class="crcard__input" placeholder="Tags" />
        <div class="crcard__title">Tags</div>
      </div>
      <div class="create__submit-container">
        <button onClick={handleCreateButton} class="create__submit">
          Submit
        </button>
      </div>
    </div>
  );
};

export default Creation;
