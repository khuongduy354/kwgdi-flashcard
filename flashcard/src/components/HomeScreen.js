import React, { useState } from "react";
import Creation from "./Creation";
import BasicSelect from "../BasicDropdown";
import ConfigMode from "./ConfigMode";
import DisplayMode from "./DisplayMode";
import ModalAuth from "./ModalAuth";
import "./HomeScreen.css";
import { FormGroup } from "@mui/material";
import { FormControlLabel } from "@mui/material";
import { Switch } from "@mui/material";
import { useSelector } from "react-redux";

const HomeScreen = () => {
  const mode = useSelector((state) => state.mode.value);
  const [multiselect, setMultiSelect] = useState(false);
  const [signMode, setSignMode] = useState("");
  const renderHome = () => {
    return (
      <section class="home fade-in">
        <div className="home__wrapper container">
          <div className="home__content">
            <h1 className="home__title">Flashcards Organizer</h1>
            <p className="home__descriptions">
              Speed up your learning by <br />
              Keeping your vocabulary well organized and free of clutter
            </p>
          </div>
          <button className="home__btn">Get Started</button>
        </div>
      </section>
    );
  };
  return (
    <React.Fragment>
      <header>
        <nav className="nav container">
          <span
            style={{
              color: "white",
              margin: "auto 0 ",
              fontWeight: "bolder",
              border: "white thin solid",
              padding: ".5rem",
            }}
          >
            Kwgdi
          </span>
          <ul className="nav__list">
            <li className="nav__item">
              <a
                href=""
                className="nav__link"
                onClick={(e) => {
                  setSignMode("SignIn");
                  e.preventDefault();
                }}
              >
                Login
              </a>
            </li>
            <li className="nav__item">
              <a
                href=""
                className="nav__link"
                onClick={(e) => {
                  setSignMode("SignUp");
                  e.preventDefault();
                }}
              >
                Signup
              </a>
            </li>
          </ul>
        </nav>
      </header>
      <main>
        {signMode == "SignUp" ? (
          <ModalAuth isSignIn={false} setSignCallback={setSignMode} />
        ) : signMode == "SignIn" ? (
          <ModalAuth isSignIn={true} setSignCallback={setSignMode} />
        ) : (
          renderHome()
        )}

        <section className="config">
          <div className="config__wrapper container">
            <div className="config__bar">
              <div className="config__mode">
                <BasicSelect
                  title="Mode"
                  inputValues={["display", "config", "create"]}
                />
              </div>
              <div className="config__action">
                <BasicSelect
                  title="Actions"
                  inputValues={["delete", "add tags"]}
                />
              </div>
            </div>
            <div className="config__search__wrapper">
              <input type="text" className="config__search" />
            </div>
          </div>
          <div className="config__multiselect container">
            <FormControlLabel
              control={
                <Switch
                  onChange={() => {
                    setMultiSelect(!multiselect);
                  }}
                />
              }
              style={{
                fontSize: "10px",
                color: "white",
                fontWeight: "lighter",
              }}
              label="Multiselect"
            />
          </div>
        </section>
        <section className="workspace">
          {(() => {
            switch (mode) {
              case "config":
                return <ConfigMode />;
              case "create":
                return <Creation />;
              default:
                return <DisplayMode multiselect={multiselect} />;
            }
          })()}
        </section>

        {/* {(() => {
          switch (mode) {
            case "Config":
              return <ConfigMode />;
            case "Create":
              return <Creation />;
            default:
              return <DisplayMode />;
          }
        })()} */}
      </main>
    </React.Fragment>
  );
};

export default HomeScreen;
