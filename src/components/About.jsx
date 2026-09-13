import React from "react";
import { FacebookIcon } from "./Icons";
import "./About.css";

const FB_URL = "https://www.facebook.com/share/1EQDA9pSYB/?mibextid=wwXIfr";

export default function About() {
  return (
    <section id="about" className="about-section">
      <div className="section-inner">
        <div className="about-grid">
          {/* Portrait Column */}
          <div className="about-visual">
            <div className="about-card">
              <img
                src="/karen-mitchell.jpg"
                alt="Karen Mitchell — Licensed Real Estate Agent"
                className="about-portrait"
              />
              <div className="about-card-badge">
                <span className="badge-title">Karen Mitchell</span>
                <span className="badge-subtitle">Licensed Real Estate Professional</span>
              </div>
            </div>
            <div className="about-stat-box">
              <span className="about-stat-number">12+</span>
              <span className="about-stat-label">Years of Dedicated Client Placement</span>
            </div>
          </div>

          {/* Narrative Column */}
          <div className="about-text-content">
            <div className="about-kicker">Dedicated Representation</div>
            <h2 className="about-headline">
              Residential leasing with <span className="text-accent">direct accountability.</span>
            </h2>

            <p className="about-intro">
              Unlike large impersonal rental agencies or automated call centers where tenants feel like a ticket number, Karen Mitchell operates on a simple commitment: residential leasing should be honest, transparent, and personal.
            </p>

            <p className="about-paragraph">
              With over a decade of real estate experience, Karen personally reviews every applicant, hand-inspects every property, and stays in direct communication with you throughout your lease. No unhelpful chatbots, no automated delays — just honest guidance and verified homes.
            </p>

            <div className="about-pillars-list">
              <div className="pillar-item">
                <div className="pillar-icon">01</div>
                <div className="pillar-text">
                  <h4>Physically Verified Homes</h4>
                  <p>Zero misleading stock photography. Every residence is personally inspected, deep cleaned, and verified move-in ready before you arrive.</p>
                </div>
              </div>

              <div className="pillar-item">
                <div className="pillar-icon">02</div>
                <div className="pillar-text">
                  <h4>Direct Agent Contact</h4>
                  <p>Message Karen directly on Facebook or phone. You speak with the licensed agent in charge of the residence, not an outsourced call desk.</p>
                </div>
              </div>

              <div className="pillar-item">
                <div className="pillar-icon">03</div>
                <div className="pillar-text">
                  <h4>Prompt Maintenance Response</h4>
                  <p>All property maintenance and repair requests are coordinated with licensed, vetted local professionals for your ongoing peace of mind.</p>
                </div>
              </div>
            </div>

            <div className="about-cta-row">
              <a
                href={FB_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="about-primary-btn"
              >
                <FacebookIcon size={16} color="currentColor" />
                <span>Message Karen on Facebook →</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
