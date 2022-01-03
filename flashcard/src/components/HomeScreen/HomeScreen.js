import React, { useEffect, useState } from "react";
import axios from "axios";
import "./HomeScreen.css";
// components
import Creation from "./Creation";
import BasicSelect from "./BasicDropdown";
import ConfigMode from "./ConfigMode";
import DisplayMode from "./DisplayMode/DisplayMode";
import ModalAuth from "./ModalAuth";
import { FormGroup } from "@mui/material";
import { FormControlLabel, TextField } from "@mui/material";
import { Switch } from "@mui/material";
//redux
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../redux/features/Authentication/authenticationSlice";
import { addArrayOfCards } from "../redux/features/FlashCard/flashcardSlice";
//firebase
import { onAuthStateChanged } from "@firebase/auth";
import firebaseApp from "../firebase";
import { getAuth } from "firebase/auth";
import { baseAPIUrl } from "../credentials";
const HomeScreen = () => {
  //redux state
  const [search, setSearch] = useState("");
  const mode = useSelector((state) => state.mode.mode);
  const userEmail = useSelector((state) => state.userUid.user.email);
  const userUid = useSelector((state) => state.userUid.user.uid);
  const dispatch = useDispatch();
  //auth event listener
  const auth = getAuth(firebaseApp);
  useEffect(() => {
    const unsubscribe = () => {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          dispatch(setUser({ email: user.email, uid: user.uid }));
        } else {
          dispatch(setUser(null));
        }
      });
    };
    unsubscribe();
    return unsubscribe;
  }, []);

  useEffect(() => {
    if (userEmail) {
      axios
        .get(`${baseAPIUrl}/getInitialCard/`, {
          params: { userEmail: userEmail },
        })
        .then((res) => {
          console.log(res.data);
        });
    }
  }, []);
  //states
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

  const renderConfigWorkSpace = () => {
    return (
      <React.Fragment>
        <section className="config">
          <div className="config__wrapper container">
            <div className="config__bar">
              <div className="config__mode">
                <BasicSelect title="Modes" />
              </div>
              <div className="config__action">
                <BasicSelect title="Actions" />
              </div>
              <button className="config__action--submit">
                Dispatch Action
              </button>
              <button className="config__action--cancel">Cancel</button>
            </div>
            <div className="config__search__wrapper">
              <TextField
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                }}
                className="config__search"
                id="filled-basic"
                label="Filled"
                variant="filled"
              />
              <button className="config__search--submit">Go</button>
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
                return <ConfigMode multiselect={multiselect} />;
              case "create":
                return <Creation />;
              default:
                return <DisplayMode multiselect={multiselect} />;
            }
          })()}
        </section>
      </React.Fragment>
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
        {userUid && renderConfigWorkSpace()}
      </main>
    </React.Fragment>
  );
};

export default HomeScreen;
