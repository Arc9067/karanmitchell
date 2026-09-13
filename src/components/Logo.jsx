import React from "react";

export default function Logo({ size = 38, className = "" }) {
  return (
    <div className={`flex items-center ${className}`} style={{ display: "inline-flex", alignItems: "center" }}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 44 44"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="Karen Mitchell Realty logo"
        role="img"
      >
        <rect
          x="1.5"
          y="1.5"
          width="41"
          height="41"
          rx="10"
          fill="#0F172A"
          stroke="#1E293B"
          strokeWidth="1.5"
        />
        <text
          x="22"
          y="27.5"
          textAnchor="middle"
          fill="#FFFFFF"
          fontFamily="'Plus Jakarta Sans', -apple-system, sans-serif"
          fontSize="15"
          fontWeight="800"
          letterSpacing="0.04em"
        >
          KM
        </text>
        <circle cx="33.5" cy="11" r="2.5" fill="#D97706" />
      </svg>
    </div>
  );
}
