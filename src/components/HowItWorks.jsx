import React from "react";
import { FacebookIcon } from "./Icons";
import "./HowItWorks.css";

const FB_URL = "https://www.facebook.com/share/1EQDA9pSYB/?mibextid=wwXIfr";

const STEPS = [
  {
    number: "01",
    title: "Browse Available Residences",
    desc: "Explore Karen's curated selection of verified, move-in ready homes above. Each property is personally inspected and maintained to a high standard.",
    icon: "🏠",
  },
  {
    number: "02",
    title: "Inquire Directly on Facebook",
    desc: "Message Karen directly via Facebook with the home you're interested in and your ideal move-in date. Expect a prompt, honest response — no bots, no call queues.",
    icon: "💬",
  },
  {
    number: "03",
    title: "Schedule a Private Showing",
    desc: "Karen arranges a private, in-person showing at your convenience. View the home, ask questions, and get straightforward answers before committing.",
    icon: "🗓️",
  },
  {
    number: "04",
    title: "Apply & Move In",
    desc: "Complete your secure digital rental application online. Once approved, receive your digital lease and keys. It's that straightforward.",
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
          <p>Ready to get started? Message Karen Mitchell directly on Facebook.</p>
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
