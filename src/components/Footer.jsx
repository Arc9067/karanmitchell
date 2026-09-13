import React from "react";
import { FacebookIcon } from "./Icons";
import "./Footer.css";

const FB_URL = "https://www.facebook.com/share/1EQDA9pSYB/?mibextid=wwXIfr";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const scrollTo = (id) => {
    if (window.location.pathname !== "/") {
      window.history.pushState({}, "", "/");
      window.dispatchEvent(new Event("popstate"));
      setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer id="contact" className="site-footer">
      <div className="section-inner">
        <div className="footer-grid">
          {/* Brand Column */}
          <div className="footer-brand-col">
            <div className="footer-brand-row">
              
              <div className="footer-brand-text">
                <span className="footer-brand-name">Karen Mitchell</span>
                <span className="footer-brand-sub">Licensed Real Estate Agent</span>
              </div>
            </div>
            <p className="footer-brand-desc">
              Personalized residential leasing with direct agent care. Connecting families and individuals with verified, high-quality rental residences.
            </p>
            <a
              href={FB_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="footer-fb-btn"
            >
              <FacebookIcon size={16} color="currentColor" />
              <span>Message on Facebook</span>
            </a>
          </div>

          {/* Navigation Column */}
          <div className="footer-nav-col">
            <h4 className="footer-col-heading">Navigation</h4>
            <div className="footer-nav-links">
              <button onClick={() => scrollTo("about")} className="footer-link">About Karen</button>
              <button onClick={() => scrollTo("process")} className="footer-link">Leasing Process</button>
              <a
                href="/application"
                onClick={(e) => {
                  e.preventDefault();
                  window.history.pushState({}, "", "/application");
                  window.dispatchEvent(new Event("popstate"));
                  window.scrollTo({ top: 0, behavior: "instant" });
                }}
                className="footer-link"
              >
                Apply Online
              </a>
            </div>
          </div>

          {/* Contact Column */}
          <div className="footer-contact-col">
            <h4 className="footer-col-heading">Direct Inquiries</h4>
            <p className="footer-contact-desc">
              For real-time availability, private showings, and rental questions — message Karen Mitchell directly on Facebook.
            </p>
            <a
              href={FB_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="footer-contact-btn"
            >
              <FacebookIcon size={15} color="currentColor" />
              <span>Message via Facebook →</span>
            </a>
          </div>
        </div>

        <div className="footer-bottom-bar">
          <p className="footer-copy">
            © {currentYear} Karen Mitchell Real Estate. All rights reserved. Equal Housing Opportunity.
          </p>
          <div className="footer-legal">Licensed Real Estate Professional · Dedicated Tenant Placement Services</div>
        </div>
      </div>
    </footer>
  );
}
