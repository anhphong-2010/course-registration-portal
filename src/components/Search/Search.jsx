import React from "react";
import "./Search.scss";
export default function Search() {
  return (
    <form className="search-container">
      <input type="text" id="search-bar" placeholder="Search courses..." />
    </form>
  );
}
