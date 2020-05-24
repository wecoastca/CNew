import * as React from "react";
import logo from "public/images/logo.png";
import "./Header.css";
import { SearchLine } from "../SearchLine/SearchLine";

export const Header = () => {
  return (
    <div className="header">
      <div className="brand">
        <a href="#">
          <img src={logo} alt="logo" className="brand__img" />
        </a>
        <a className="brand__name" href="#">
          <div>CONSTRUCTOR</div>
        </a>
      </div>
      <div className="menu">
        <ul className="menu__list">
          <li>
            <a href="/examples">Examples</a>
          </li>
          <li>
            <a href="/random">Random</a>
          </li>
          <li>
            <a href="/our_choice">Our choice</a>
          </li>
        </ul>
      </div>
      <SearchLine />
      <div className="sign-buttons">
        <div className="sign-buttons__sign-in">
          <button>Sign in</button>
        </div>
        <div className="sign-buttons__sign-up">
          <button className="sign-buttons__sign-up">Sign up</button>
        </div>
      </div>
    </div>
  );
};
