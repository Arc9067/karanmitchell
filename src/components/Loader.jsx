import React from "react";
import "./Loader.css";

export default function Loader() {
  return (
    <div className="loader-overlay">
      <div className="loader-brand">
        <div className="loader-name">
          <span>Karen Mitchell</span>
          <span className="loader-sub">Real Estate</span>
        </div>
      </div>
      <div className="loader-bar">
        <div className="loader-bar-fill" />
      </div>
    </div>
  );
}
