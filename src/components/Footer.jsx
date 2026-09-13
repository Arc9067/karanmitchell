import React from "react";
import Logo from "./Logo";
import { FacebookIcon } from "./Icons";
import "./Footer.css";

const FB_URL = "https://www.facebook.com/share/1EQDA9pSYB/?mibextid=wwXIfr";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer id="contact" className="site-footer">
      <div className="section-inner">
        <div className="footer-top">
          <div className="footer-brand">
            <div className="footer-logo-row">
              <Logo size={36} />
              <div>
                <span className="footer-brand__name">Karen Mitchell</span>
                <span className="footer-brand__sub">Grande Estate</span>
              </div>
            </div>
            <p className="footer-brand__desc">
              Curated luxury residential leasing and personal property management. Connecting qualified tenants with verified, high-caliber residences.
            </p>
          </div>

          <div className="footer-links-col">
            <h4 className="footer-col-title">Navigation</h4>
            <a href="#residences">Residences</a>
            <a href="#about">About Broker</a>
            <a href="#process">How It Works</a>
          </div>

          <div className="footer-contact-col">
            <h4 className="footer-col-title">Direct Inquiries</h4>
            <p className="footer-contact-text">
              For real-time availability, lease requests, and private showing arrangements:
            </p>
            <a
              href={FB_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="footer-fb-btn"
            >
              <FacebookIcon size={16} color="currentColor" /> Message on Facebook →
            </a>
          </div>
        </div>

        <div className="footer-bottom">
          <p className="footer-copy">
            © {currentYear} Karen Mitchell Grande Estate. All rights reserved. Equal Housing Opportunity.
          </p>
          <div className="footer-legal-note">
            Licensed Real Estate Brokerage · Dedicated Tenant Placement Services
          </div>
        </div>
      </div>
    </footer>
  );
}
