import React from "react";
import "./ApplyCTA.css";

const FB_URL = "https://www.facebook.com/share/1EQDA9pSYB/?mibextid=wwXIfr";

const steps = [
  {
    num: "01",
    label: "Check Availability",
    desc: "Search your 5-digit US ZIP Code or consult directly with our leasing agents for private pocket listings.",
  },
  {
    num: "02",
    label: "Request Application",
    desc: "Connect directly with our agents on Facebook to receive your custom application link for your desired property.",
  },
  {
    num: "03",
    label: "Fee Verification & Review",
    desc: "Complete the refundable $50 application verification to enable immediate priority processing by our review team.",
  },
  {
    num: "04",
    label: "Viewing & Key Handover",
    desc: "Confirm your private viewing slot. If approved, lock in your lease contract and receive keys on move-in day.",
  },
];

export default function ApplyCTA() {
  return (
    <section id="process" className="cta-section">
      <div className="section-inner">
        <div className="cta-header text-center">
          <span className="section-tag">Streamlined Process</span>
          <h2 className="section-title">
            How Leasing Works with <span>Karen Mitchell Grande Estate</span>
          </h2>
          <p className="section-sub">
            Our transparent 4-step procedure ensures quick verification, zero hidden surprises, and a smooth transition to your new home.
          </p>
        </div>

        <div className="steps-grid">
          {steps.map((step) => (
            <div key={step.num} className="step-card">
              <span className="step-card__num">{step.num}</span>
              <h3 className="step-card__title">{step.label}</h3>
              <p className="step-card__desc">{step.desc}</p>
            </div>
          ))}
        </div>

        <div className="cta-banner">
          <div className="cta-banner__left">
            <div className="cta-banner__agent">
              <img
                src="/karen-mitchell.jpg"
                alt="Karen Mitchell — Principal Broker"
                className="cta-banner__agent-photo"
              />
              <div className="cta-banner__agent-info">
                <span className="cta-banner__agent-name">Karen Mitchell</span>
                <span className="cta-banner__agent-role">Principal Broker</span>
              </div>
            </div>
            <div className="cta-banner__text">
              <h3>Ready to Secure Your Next Residence?</h3>
              <p>Applications are reviewed directly within 24 hours of submission and fee verification.</p>
            </div>
          </div>
          <div className="cta-banner__actions">
            <a
              href={FB_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="cta-btn cta-btn--primary"
            >
              Request Application on Facebook →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
