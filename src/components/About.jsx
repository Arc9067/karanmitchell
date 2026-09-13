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
          <div className="about-image-column">
            <div className="about-image-card">
              <img
                src="/karen-mitchell.jpg"
                alt="Karen Mitchell — Principal Broker & Founder"
                className="about-image"
              />
              <div className="about-image-overlay">
                <span className="about-image-overlay__title">Karen Mitchell</span>
                <span className="about-image-overlay__sub">Principal Broker &amp; Founder</span>
              </div>
            </div>
          </div>

          {/* Editorial Bio Column */}
          <div className="about-content">
            <div className="section-tag">Direct Broker Care</div>
            <h2 className="section-title">
              Boutique leasing with <span>personal accountability.</span>
            </h2>

            <p className="about-lead">
              Unlike large automated management corporations where tenants are treated like ticket numbers, Karen Mitchell Grande Estate was founded on a simple premise: residential leasing should be personal, transparent, and respectful.
            </p>

            <p className="about-body">
              With over 15 years in luxury residential leasing and property management, Principal Broker Karen Mitchell personally oversees our portfolio. We hand-select residences, guarantee that every home is in move-in ready condition, and remain your direct point of contact throughout your entire residency.
            </p>

            <div className="about-pillars">
              <div className="about-pillar">
                <div className="about-pillar__number">01</div>
                <div>
                  <h4 className="about-pillar__title">Physically Verified Homes</h4>
                  <p className="about-pillar__desc">No bait-and-switch or misleading photos. Every residence is personally inspected and prepped before you move in.</p>
                </div>
              </div>

              <div className="about-pillar">
                <div className="about-pillar__number">02</div>
                <div>
                  <h4 className="about-pillar__title">Direct Broker Access</h4>
                  <p className="about-pillar__desc">Speak with real decision-makers who care about your living experience, not an unhelpful AI chatbot.</p>
                </div>
              </div>

              <div className="about-pillar">
                <div className="about-pillar__number">03</div>
                <div>
                  <h4 className="about-pillar__title">Prompt Resolution Guarantee</h4>
                  <p className="about-pillar__desc">All maintenance and repair requests are prioritized with licensed, vetted local professionals.</p>
                </div>
              </div>
            </div>

            <div className="about-action">
              <a
                href={FB_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="about-btn"
              >
                <FacebookIcon size={16} color="currentColor" /> Message Karen on Facebook →
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
