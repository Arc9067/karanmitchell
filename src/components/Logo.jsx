import React from "react";

/**
 * Karen Mitchell Grande Estate logo mark.
 * Monogram badge with KM initials.
 */
export default function Logo({ size = 40, variant = "warm", className = "" }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 52 52"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Karen Mitchell Grande Estate logo"
      role="img"
    >
      <rect
        x="1.5"
        y="1.5"
        width="49"
        height="49"
        rx="8"
        fill="var(--bg-surface)"
        stroke="var(--accent)"
        strokeWidth="1.5"
      />
      <text
        x="26"
        y="33"
        textAnchor="middle"
        fill="var(--text-main)"
        fontFamily="'Playfair Display', Georgia, serif"
        fontSize="21"
        fontWeight="600"
        fontStyle="italic"
        letterSpacing="0.02em"
      >
        KM
      </text>
    </svg>
  );
}
