import React from "react";
import { FacebookIcon } from "./Icons";
import "./HowItWorks.css";

const FB_URL = "https://www.facebook.com/share/1EQDA9pSYB/?mibextid=wwXIfr";

const STEPS = [
  {
    number: "01",
    title: "Connect on Facebook",
    desc: "Message Karen Mitchell directly with your preferred neighborhood, move-in timetable, and bedroom requirements for real-time available listings.",
    icon: "💬",
  },
  {
    number: "02",
    title: "Review Matching Residences",
    desc: "Receive curated, physically verified options matching your criteria. Every home is clean, move-in ready, and accurately represented.",
    icon: "🏠",
  },
  {
    number: "03",
    title: "Private In-Person Showing",
    desc: "Karen arranges a private showing at your convenience. Walk through the residence, inspect the details, and get honest answers.",
    icon: "🗓️",
  },
  {
    number: "04",
    title: "Fast Application & Keys",
    desc: "Complete your secure online application. Once approved, execute your lease agreement and receive your keys smoothly.",
    icon: "✅",
  },
];

export default function HowItWorks() {
  return (
    <section id="process" className="how-section">
      <div className="section-inner">
        <div className="how-header">
          <div className="how-tag">Simple Leasing Process</div>
          <h2 className="how-title">
            Renting made <span className="text-accent">clear and simple.</span>
          </h2>
          <p className="how-desc">
            From first inquiry to receiving your keys — Karen Mitchell walks you through every step with complete transparency and personal attention.
          </p>
        </div>

        <div className="how-steps">
          {STEPS.map((step, idx) => (
            <div key={step.number} className="how-step-card">
              <div className="how-step-icon">{step.icon}</div>
              <div className="how-step-num">{step.number}</div>
              <h3 className="how-step-title">{step.title}</h3>
              <p className="how-step-desc">{step.desc}</p>
              {idx < STEPS.length - 1 && <div className="how-step-connector" />}
            </div>
          ))}
        </div>

        <div className="how-bottom-cta">
          <p>Ready to find your next home? Message Karen Mitchell directly on Facebook.</p>
          <a
            href={FB_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="how-cta-btn"
          >
            <FacebookIcon size={16} color="currentColor" />
            <span>Message on Facebook →</span>
          </a>
        </div>
      </div>
    </section>
  );
}
