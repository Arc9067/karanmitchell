import React, { useState, useEffect } from "react";
import Logo from "./Logo";
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
    <header className={`site-nav ${scrolled ? "site-nav--scrolled" : ""}`}>
      <div className="nav-container">
        {/* Brand */}
        <a
          href="/"
          onClick={(e) => {
            e.preventDefault();
            if (window.location.pathname !== "/") {
              window.history.pushState({}, "", "/");
              window.dispatchEvent(new Event("popstate"));
            }
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          className="nav-brand"
        >
          <Logo size={38} />
          <div className="nav-brand__text">
            <span className="nav-brand__name">Karen Mitchell</span>
            <span className="nav-brand__sub">Licensed Real Estate Agent</span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="nav-links-desktop">
          <button onClick={() => scrollTo("residences")} className="nav-link">
            Available Homes
          </button>
          <button onClick={() => scrollTo("about")} className="nav-link">
            About Karen
          </button>
          <button onClick={() => scrollTo("process")} className="nav-link">
            Leasing Process
          </button>
          <a
            href="/application"
            onClick={(e) => {
              e.preventDefault();
              window.history.pushState({}, "", "/application");
              window.dispatchEvent(new Event("popstate"));
              window.scrollTo({ top: 0, behavior: "instant" });
            }}
            className="nav-link nav-link--highlight"
          >
            Apply Online
          </a>
        </nav>

        {/* Right CTA */}
        <div className="nav-actions">
          <a
            href={FB_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="nav-fb-btn"
          >
            <FacebookIcon size={16} color="currentColor" />
            <span>Message on Facebook</span>
          </a>

          {/* Mobile Menu Toggle */}
          <button
            className="nav-toggle"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle navigation menu"
          >
            {menuOpen ? "✕" : "☰"}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {menuOpen && (
        <div className="nav-mobile-menu">
          <button onClick={() => scrollTo("residences")} className="nav-mobile-link">
            Available Homes
          </button>
          <button onClick={() => scrollTo("about")} className="nav-mobile-link">
            About Karen
          </button>
          <button onClick={() => scrollTo("process")} className="nav-mobile-link">
            Leasing Process
          </button>
          <a
            href="/application"
            onClick={(e) => {
              e.preventDefault();
              setMenuOpen(false);
              window.history.pushState({}, "", "/application");
              window.dispatchEvent(new Event("popstate"));
              window.scrollTo({ top: 0, behavior: "instant" });
            }}
            className="nav-mobile-link nav-mobile-link--highlight"
          >
            Apply Online →
          </a>
          <div className="nav-mobile-cta">
            <a
              href={FB_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="nav-mobile-btn"
            >
              <FacebookIcon size={18} color="currentColor" />
              <span>Message on Facebook</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
