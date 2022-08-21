import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updateFirstName, updateLastName } from "../redux/user";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import "./Screen.css";
import "../components/Input.css";

import FootButton from "../components/FootButton";
import capitalize from "../helpers/capitalizingWord";

export default function ScreenOne() {
  let headerContent = "Hello! What is your name?";

  const { firstName } = useSelector((state) => state.user);
  const { lastName } = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const [firstNameDisplayed, setFirstName] = useState(firstName);
  const [lastNameDisplayed, setLastName] = useState(lastName);

  return (
    <div>
      <div className="card">
        <div className="card-header">{headerContent}</div>
        <div className="card-body">
          <div className="input-group">
            <input
              value={firstNameDisplayed}
              placeholder="FirstName"
              className="input"
              label="FirstName"
              required
              onChange={(e) => {
                setFirstName(e.target.value);
                dispatch(updateFirstName(e.target.value));
              }}
            />
            <label className="input-label"> FirstName </label>
          </div>
          <div className="input-group">
            <input
              value={lastNameDisplayed}
              placeholder="LastName"
              className="input"
              required
              label="LastName"
              onChange={(e) => {
                setLastName(e.target.value);
                dispatch(updateLastName(e.target.value));
              }}
            />
            <label className="input-label"> LastName </label>
          </div>
        </div>
        <div className="card-footer">
          {capitalize(firstNameDisplayed) === "" ? (
            <FootButton
              className="disabled"
              value="Plop"
              title="Next"
              icon={<FontAwesomeIcon icon={faArrowRight} />}
            />
          ) : (
            <Link to="/screen2">
              <FootButton
                value="Plop"
                title="Next"
                icon={<FontAwesomeIcon icon={faArrowRight} />}
              />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
