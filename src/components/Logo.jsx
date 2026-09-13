import React from "react";

export default function Logo({ size = 36, className = "" }) {
  return (
    <div className={`flex items-center gap-2.5 ${className}`} style={{ display: "inline-flex", alignItems: "center", gap: "10px" }}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="Karen Mitchell Realty logo"
        role="img"
      >
        <rect
          x="1"
          y="1"
          width="38"
          height="38"
          rx="9"
          fill="#0F172A"
        />
        <path
          d="M12 28V12H15.5L22 21.5V12H25V28H21.5L15 18.5V28H12Z"
          fill="#FFFFFF"
        />
        <circle cx="28.5" cy="14.5" r="2.5" fill="#D97706" />
      </svg>
    </div>
  );
}
