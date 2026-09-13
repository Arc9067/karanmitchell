import React from "react";
import { FacebookIcon } from "./Icons";
import "./Hero.css";

const FB_URL = "https://www.facebook.com/share/1EQDA9pSYB/?mibextid=wwXIfr";

export default function Hero() {
  return (
    <section className="hero-section">
      <div className="section-inner">
        <div className="hero-layout">
          {/* Left Column: Narrative & Actions */}
          <div className="hero-content">
            <div className="hero-badge">
              <span className="hero-badge__dot" />
              <span>Licensed Real Estate Agent · Direct Tenant Placement</span>
            </div>

            <h1 className="hero-heading">
              Personalized residential leasing, <span className="hero-heading__accent">guided with genuine care.</span>
            </h1>

            <p className="hero-text">
              Welcome to Karen Mitchell Real Estate. We connect individuals and families with exceptional, move-in ready private residences. From initial inquiry to key handover, licensed agent Karen Mitchell personally oversees every detail for a calm, transparent, and dignified leasing experience.
            </p>

            <div className="hero-btn-group">
              <a
                href={FB_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="hero-primary-btn"
              >
                <FacebookIcon size={18} color="currentColor" />
                <span>Message on Facebook →</span>
              </a>
              <a
                href="/application"
                onClick={(e) => {
                  e.preventDefault();
                  window.history.pushState({}, "", "/application");
                  window.dispatchEvent(new Event("popstate"));
                  window.scrollTo({ top: 0, behavior: "instant" });
                }}
                className="hero-secondary-btn"
              >
                <span>Apply Online →</span>
              </a>
            </div>

            <div className="hero-trust-row">
              <div className="hero-trust-item">
                <span className="hero-trust-icon">✓</span>
                <span>Direct Agent Contact</span>
              </div>
              <div className="hero-trust-item">
                <span className="hero-trust-icon">✓</span>
                <span>Verified Clean Properties</span>
              </div>
              <div className="hero-trust-item">
                <span className="hero-trust-icon">✓</span>
                <span>Transparent Leasing</span>
              </div>
            </div>
          </div>

          {/* Right Column: Karen Mitchell Portrait Card */}
          <div className="hero-visual">
            <div className="agent-card">
              <div className="agent-image-container">
                <img
                  src="/karen-mitchell.jpg"
                  alt="Karen Mitchell — Licensed Real Estate Agent"
                  className="agent-photo"
                />
                <div className="agent-tag">
                  <span className="agent-tag__dot" />
                  <span>Licensed Real Estate Professional</span>
                </div>
              </div>

              <div className="agent-card-info">
                <div className="agent-header">
                  <h3 className="agent-name">Karen Mitchell</h3>
                  <span className="agent-title">Licensed Real Estate Agent &amp; Property Specialist</span>
                </div>
                <p className="agent-quote">
                  “I treat every client with genuine care and honesty. We ensure every home is spotless, inspected, and ready for you.”
                </p>
                <div className="agent-footer">
                  <a
                    href={FB_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="agent-fb-link"
                  >
                    <FacebookIcon size={14} color="currentColor" />
                    <span>Inquire with Karen</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
