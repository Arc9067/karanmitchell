import React, { useEffect, useState } from "react";
import Logo from "./Logo";
import "./Loader.css";

export default function Loader({ onDone }) {
  const [fading, setFading] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setFading(true), 1200);
    const t2 = setTimeout(() => onDone?.(), 1800);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [onDone]);

  return (
    <div className={`loader ${fading ? "loader--fade" : ""}`}>
      <div className="loader__content">
        <Logo size={64} />
        <h1 className="loader__title">
          Karen Mitchell <span>Grande Estate</span>
        </h1>
        <p className="loader__sub">Premier Property Management & Leasing</p>
        <div className="loader__bar">
          <div className="loader__progress" />
        </div>
      </div>
    </div>
  );
}
