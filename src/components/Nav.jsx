import React, { useState, useEffect } from "react";
import { FacebookIcon } from "./Icons";
import "./Nav.css";

const FB_URL = "https://www.facebook.com/share/1EQDA9pSYB/?mibextid=wwXIfr";

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id) => {
    setMenuOpen(false);
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
    <header className={`site-nav ${scrolled ? "site-nav--scrolled" : ""} ${menuOpen ? "site-nav--open" : ""}`}>
      <div className="nav-container">
        {/* Desktop Left: Navigation Menu */}
        <nav className="nav-links-left">
          <button onClick={() => scrollTo("residences")} className="nav-link">
            Available Homes
          </button>
          <button onClick={() => scrollTo("about")} className="nav-link">
            The Broker
          </button>
          <button onClick={() => scrollTo("process")} className="nav-link">
            Leasing Guide
          </button>
        </nav>

        {/* Center: Brand Typographic Identity */}
        <a
          href="/"
          onClick={(e) => {
            e.preventDefault();
            window.history.pushState({}, "", "/");
            window.dispatchEvent(new Event("popstate"));
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          className="nav-brand-center"
        >
          <div className="nav-brand-center__text">
            <span className="nav-brand-center__name">Karen Mitchell</span>
            <span className="nav-brand-center__sub">Grande Estate</span>
          </div>
        </a>

        {/* Right: Primary Contact Button */}
        <div className="nav-actions-right">
          <a
            href={FB_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="nav-cta-btn"
          >
            <FacebookIcon size={15} color="currentColor" /> Inquire via Facebook →
          </a>

          {/* Mobile Menu Toggle Button */}
          <button
            className={`nav-toggle-btn ${menuOpen ? "nav-toggle-btn--active" : ""}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
          >
            {menuOpen ? (
              <span className="nav-close-icon">✕</span>
            ) : (
              <span className="nav-hamburger-icon">
                <span />
                <span />
              </span>
            )}
          </button>
        </div>
      </div>

      {/* 100% Solid, Non-overlapping Mobile Dropdown Menu */}
      {menuOpen && (
        <div className="nav-mobile-dropdown">
          <div className="nav-mobile-inner">
            <button onClick={() => scrollTo("residences")} className="nav-mobile-item">
              <span>Available Homes</span>
              <span className="nav-mobile-arrow">→</span>
            </button>
            <button onClick={() => scrollTo("about")} className="nav-mobile-item">
              <span>The Broker &amp; Philosophy</span>
              <span className="nav-mobile-arrow">→</span>
            </button>
            <button onClick={() => scrollTo("process")} className="nav-mobile-item">
              <span>The Resident Experience</span>
              <span className="nav-mobile-arrow">→</span>
            </button>
            <button onClick={() => scrollTo("contact")} className="nav-mobile-item">
              <span>Direct Contact &amp; Inquiries</span>
              <span className="nav-mobile-arrow">→</span>
            </button>

            <div className="nav-mobile-cta-wrap">
              <a
                href={FB_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="nav-mobile-cta-btn"
              >
                <FacebookIcon size={18} color="currentColor" /> Message on Facebook →
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
