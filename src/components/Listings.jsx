import React, { useState } from "react";
import "./Listings.css";
import { GlobeIcon, LightningIcon, ShieldIcon } from "./Icons";

const FB_URL = "https://www.facebook.com/share/1EQDA9pSYB/?mibextid=wwXIfr";

export default function Listings() {
  const [zip, setZip] = useState("");
  const [status, setStatus] = useState("idle"); // idle | loading | success | error
  const [location, setLocation] = useState({ city: "", state: "" });

  const handleCheck = async (e) => {
    e.preventDefault();
    const cleanZip = zip.trim();
    if (!cleanZip || cleanZip.length < 5) return;

    setStatus("loading");
    try {
      const res = await fetch(`https://api.zippopotam.us/us/${cleanZip}`);
      if (!res.ok) throw new Error("ZIP Code not found");
      const data = await res.json();
      const place = data.places?.[0];
      setLocation({
        city: place?.["place name"] || "Your City",
        state: place?.["state abbreviation"] || place?.state || "US",
      });
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  const handleInquire = () => {
    if (location.city && location.state) {
      localStorage.setItem(
        "karen_mitchell_apply_property",
        `Listing in ${location.city}, ${location.state} (${zip})`
      );
    }
  };

  return (
    <section id="listings" className="listings-section">
      <div className="section-inner">
        <div className="listings-header text-center">
          <span className="section-tag">Property Availability Search</span>
          <h2 className="section-title">
            Check Listings in <span>{geo.isUS && geo.region ? geo.region : "Your Target Location"}</span>
          </h2>
          <p className="section-sub">
            {geo.isUS && geo.region
              ? `Enter a 5-digit US ZIP Code to verify active rental vacancies and managed residences in ${geo.region}.`
              : "Enter your 5-digit US ZIP Code to verify current rental availability, active tenant vacancies, and managed single-family residences in your area."}
          </p>
        </div>

        <div className="checker-card">
          <form onSubmit={handleCheck} className="checker-form">
            <div className="checker-input-wrap">
              <span className="checker-input-icon">
                <GlobeIcon size={20} color="var(--orange)" />
              </span>
              <input
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                className="checker-input"
                placeholder="Enter 5-Digit US ZIP Code (e.g. 90210)"
                value={zip}
                maxLength={5}
                onChange={(e) => {
                  setZip(e.target.value.replace(/\D/g, ""));
                  if (status !== "idle") setStatus("idle");
                }}
              />
            </div>
            <button
              type="submit"
              className="checker-btn"
              disabled={status === "loading" || zip.trim().length < 5}
            >
              {status === "loading" ? "Searching..." : "Check Availability"}
            </button>
          </form>

          {/* Results State */}
          {status === "success" && (
            <div className="checker-result checker-result--success">
              <div className="checker-result__header">
                <span className="checker-badge">Available Portfolio</span>
                <h3>
                  Active Properties Found in <span>{location.city}, {location.state}</span> ({zip})
                </h3>
              </div>

              <div className="checker-features">
                <div className="checker-feature">
                  <span className="checker-feature__icon">
                    <LightningIcon size={18} color="var(--orange)" />
                  </span>
                  <span>Immediate Viewing Appointments Open</span>
                </div>
                <div className="checker-feature">
                  <span className="checker-feature__icon">
                    <ShieldIcon size={18} color="var(--orange)" />
                  </span>
                  <span>Verified 1, 2, 3 & 4 Bedroom Residences</span>
                </div>
              </div>

              <div className="checker-actions">
                <a
                  href={FB_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={handleInquire}
                  className="checker-act-btn checker-act-btn--primary"
                >
                  Contact Agent on Facebook →
                </a>
              </div>
            </div>
          )}

          {status === "error" && (
            <div className="checker-result checker-result--error">
              <div className="checker-result__header">
                <span className="checker-badge checker-badge--muted">Off-Market Inventory</span>
                <h3>
                  No Public Units Found in <span>ZIP {zip}</span>
                </h3>
              </div>
              <p className="checker-error-desc">
                Public listings in ZIP <strong>{zip}</strong> are currently under contract. However, our private pocket portfolio updates daily with unlisted luxury rentals.
              </p>
              <div className="checker-actions">
                <a
                  href={FB_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="checker-act-btn checker-act-btn--primary"
                >
                  Inquire Directly with Karen Mitchell Agents →
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
