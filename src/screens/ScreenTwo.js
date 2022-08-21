import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  updateGender,
  updatePortion,
  updateAge,
  updateGenderConfirmation,
} from "../redux/user";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import "./Screen.css";
import "../components/Input.css";

import FootButton from "../components/FootButton";
import PieChart from "../components/PieChart";
import capitalize from "../helpers/capitalizingWord";
import createNameComment from "../helpers/nameComments";

export default function ScreenTwo() {
  const headerContent = <FontAwesomeIcon icon={faArrowLeft} />;
  let warning = "";

  const dispatch = useDispatch();

  const { firstName, age, genderConfirmation } = useSelector(
    (state) => state.user
  );
  const [ageDisplayed, setAge] = useState(age);
  const [confirmatedItem, setConfirmatedItem] = useState(genderConfirmation);

  const [loading, setLoading] = useState(true);
  const [portion, setPortion] = useState("");
  const [gender, setGender] = useState("");
  const [error, setError] = useState("");

  const [nameComment, setNameComment] = useState('');

  switch (error) {
    case "Invalid 'name' parameter":
      warning = (
        <span>
          Bleep bloop! Name too amazing...
          <br /> Does not compute.
        </span>
      );
      break;
    case "Missing 'name' parameter":
      warning = (
        <span>
          Your name is so awesome!
          <br /> Could you type it in again?
        </span>
      );
      break;
    case "Request limit reached":
      warning = (
        <span>
          Too many requests made today.
          <br /> Please, try again tomorrow!
        </span>
      );
      break;
    default:
      warning = "";
  }

  useEffect(() => {
    async function getGenderizeData(name = undefined) {
      const rawResponse = await fetch(`https://api.genderize.io/?name=${name}`);
      const response = await rawResponse.json();
      if (response.error) {
        setError(response.error);
        setConfirmatedItem("undetermined");
      }
      if (response) {
        setLoading(false);
      }

      setPortion(response.probability);
      setGender(response.gender);
    }

    setNameComment(createNameComment())

    getGenderizeData(capitalize(firstName));
  }, [firstName]);

  const convertToPercent = (data) => {
    return `${String((Number(data) * 10000) / 100).slice(0, 5)}%`;
  };

  const genderDisplayed = () => {
    switch (gender) {
      case "male":
        return "a male";
      case "female":
        return "a female";
      default:
        return "a male or a female";
    }
  };
  
  if (confirmatedItem === "") {
    setConfirmatedItem("correct");
  }

  const genderComment = (
    <p>
      {capitalize(firstName)},<br /> according to your first name there is a{" "}
      <b>{convertToPercent(portion)}</b>
      <br /> chance that you are
      <br /> <b>{genderDisplayed()}</b>.
    </p>
  );

  let noGenderComment = (
    <p>
      {capitalize(firstName)},<br /> based only on your first name,
      <br /> <b>your gender</b> <br /> <b>can't be determined</b>.
    </p>
  );

  if (!firstName) {
    noGenderComment = (
      <p>
        Without your firstName,
        <br /> <b>your gender</b> <br /> <b>can't be determined</b>.
      </p>
    );
  }

  const sideQuestion = (
    <div className="side-question">
      <fieldset>
        <legend>Is it your gender?</legend>
        <div
          className="radio-item"
          onClick={() => {
            setConfirmatedItem("correct");
            dispatch(updateGenderConfirmation("correct"));
          }}
        >
          <input
            type="radio"
            id="correct"
            name="gender"
            value="correct"
            defaultChecked={confirmatedItem === "correct"}
          />
          <label for="correct">Correct!</label>
        </div>
        <div
          className="radio-item"
          onClick={() => {
            setConfirmatedItem("nope");
            dispatch(updateGenderConfirmation("nope"));
          }}
        >
          <input
            type="radio"
            id="nope"
            name="gender"
            value="nope"
            defaultChecked={confirmatedItem === "nope"}
          />
          <label for="nope">Nope!</label>
        </div>
        <div
          className="radio-item"
          onClick={() => {
            setConfirmatedItem("non-binary");
            dispatch(updateGenderConfirmation("non-binary"));
          }}
        >
          <input
            type="radio"
            id="non-binary"
            name="gender"
            value="non-binary"
            defaultChecked={confirmatedItem === "non-binary"}
          />
          <label for="non-binary">Nope, I'm non&#8209;binary!</label>
        </div>
      </fieldset>
    </div>
  );

  const handleClick = () => {
    dispatch(updateGenderConfirmation(confirmatedItem));
    dispatch(updatePortion(portion));
    dispatch(updateGender(gender));
  };

  return (
    <div>
      {loading ? (
        <div>Loading data...</div>
      ) : (
        <div className="card">
          <div className="card-header">
            <Link
              to="/"
              className="back-arrow"
            >
              {headerContent}
            </Link>
            <span className="warning">{warning}</span>
          </div>
          <div className="card-body">
            <div className="two-columns">
              <div className="commentaries">
                {portion > 0 ? genderComment : noGenderComment}
                {portion > 0 ? (
                  <div
                    style={{
                      width: "100%",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                    }}
                  >
                    {PieChart({ portion, gender: gender })}
                    <div className="name-comment">{nameComment}</div>
                  </div>
                ) : (
                  ""
                )}
              </div>
              {portion > 0 ? sideQuestion : ""}
            </div>
            <div className="body-bottom">
              <div style={{ marginBottom: "15px" }}>
                Last question: <br /> How old are you?
              </div>
              <div className="input-group">
                <input
                  value={ageDisplayed}
                  placeholder="Age"
                  className="input"
                  label="Age"
                  type="number"
                  min="1"
                  required
                  onChange={(e) => {
                    setAge(e.target.value);
                    dispatch(updateAge(e.target.value));
                  }}
                />
                <label className="input-label"> Age </label>
              </div>
            </div>
          </div>
          <div className="card-footer">
            <Link to="/conclusion" onClick={() => handleClick()}>
              <FootButton
                value="next"
                title="Next"
                icon={<FontAwesomeIcon icon={faArrowRight} />}
              />
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
