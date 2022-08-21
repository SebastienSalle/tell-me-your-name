import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import "./Screen.css";

import ageComments from "../helpers/ageComments";
import capitalize from "../helpers/capitalizingWord";

export default function LastScreen() {

  const {age, gender, genderConfirmation, firstName, lastName } = useSelector((state) => state.user);

  const headerContent = <FontAwesomeIcon icon={faArrowLeft} />;

  let funfacts = ageComments(age, gender, genderConfirmation);
  let genderResult = <>{gender}</>;

  switch (genderConfirmation) {
    case "undetermined":
      genderResult = <span className="unknown-data"> undetermined </span>;
      break;
    case "correct":
      genderResult = <>{gender}</>;
      break;
    case "nope":
      if (gender === "male") {
        genderResult = (
          <>
            <span className="wrong-gender"> {gender} </span> female
          </>
        );
      } else if (gender === "female") {
        genderResult = (
          <>
            <span className="wrong-gender"> {gender} </span> male
          </>
        );
      }
      break;
    case "non-binary":
      genderResult = (
        <>
          <span className="wrong-gender"> {gender} </span> non-binary
        </>
      );
      break;
    default:
      genderResult = <span className="unknown-data"> undetermined </span>;
  }

  let ageResult = <span className="unknown-data">forgotten</span>;
  if (age) {
    ageResult = (
      <span>
        {age} year{age > 1 ? "s" : ""} old
      </span>
    );
  }

  return (
    <div>
      <div className="card">
        <div className="card-header">
          <Link
            to="/screen2"
            className="back-arrow"
            onClick={() => console.log("Go back")}
          >
            {headerContent}
          </Link>
        </div>
        <div className="card-body">
          <div className="profile-data">
            <b>First name:</b>{" "}
            {capitalize(firstName) || (
              <span className="unknown-data">undisclosed</span>
            )}
            <br />
            <b>Last name:</b>{" "}
            {capitalize(lastName) || (
              <span className="unknown-data">undisclosed</span>
            )}
            <br />
            <b>Gender:</b> {genderResult} <br />
            <b>Age:</b> {ageResult}
          </div>
        </div>
        <div className="card-footer">
          <div className="commentaries" style={{ maxWidth: "80%" }}>
            {funfacts}
          </div>
        </div>
      </div>
    </div>
  );
}
