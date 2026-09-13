import React from "react";
import { useGeoLocation } from "../hooks/useGeoLocation";
import { FacebookIcon } from "./Icons";
import "./Hero.css";

const FB_URL = "https://www.facebook.com/share/1EQDA9pSYB/?mibextid=wwXIfr";

export default function Hero() {
  const geo = useGeoLocation();

  return (
    <section className="hero">
      <div className="hero-container">
        <div className="hero-grid">
          {/* Left: Editorial Narrative & Actions */}
          <div className="hero-left">
            <div className="hero-tag">
              <span className="hero-tag__dot" />
              Private Residence Portfolio · Personal Broker Care
            </div>

            <h1 className="hero-title">
              Refined rental living, <span>guided with personal care.</span>
            </h1>

            <p className="hero-description">
              Welcome to Karen Mitchell Grande Estate. We curate and manage exceptional private rental residences {geo.isUS && geo.region ? `in ${geo.region}` : "across sought-after neighborhoods"}. From your initial inquiry to receiving your keys, Principal Broker Karen Mitchell personally ensures a calm, transparent, and dignified leasing experience.
            </p>

            <div className="hero-actions">
              <a
                href={FB_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="hero-btn hero-btn--primary"
              >
                <FacebookIcon size={17} color="currentColor" /> Inquire via Facebook →
              </a>
              <a
                href="#residences"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById("residences")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="hero-btn hero-btn--secondary"
              >
                Explore Available Homes ↓
              </a>
            </div>

            <div className="hero-pill-row">
              <div className="hero-pill">
                <span className="hero-pill__check">✓</span>
                <span>Personal Broker Care</span>
              </div>
              <div className="hero-pill">
                <span className="hero-pill__check">✓</span>
                <span>Move-In Ready Standards</span>
              </div>
              <div className="hero-pill">
                <span className="hero-pill__check">✓</span>
                <span>15+ Years Experience</span>
              </div>
            </div>
          </div>

          {/* Right: Elegant Portrait & Broker Endorsement */}
          <div className="hero-right">
            <div className="hero-image-frame">
              <img
                src="/karen-mitchell.jpg"
                alt="Karen Mitchell — Principal Broker & Founder"
                className="hero-portrait"
              />
              <div className="hero-portrait-card">
                <div className="hero-portrait-card__header">
                  <span className="hero-portrait-card__name">Karen Mitchell</span>
                  <span className="hero-portrait-card__role">Principal Broker &amp; Founder</span>
                </div>
                <p className="hero-portrait-card__text">
                  “We treat leasing as a relationship, not a transaction. Every home is prepared with genuine pride and care.”
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
