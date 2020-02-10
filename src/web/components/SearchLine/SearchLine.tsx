import * as React from "react";
import "./SearchLine.css";
import search from 'public/images/search.png';

export class SearchLine extends React.Component {
  render() {
    return (
      <div className="search-line">
        <button className="search-line__button">
          <img src={search} alt="search" />
        </button>
        <input type="text" className="search-line__input" placeholder="Enter name of model..." />
      </div>
    );
  }
}
