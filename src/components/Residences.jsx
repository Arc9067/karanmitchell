import React from "react";
import { FacebookIcon } from "./Icons";
import { useGeoLocation } from "../hooks/useGeoLocation";
import "./Residences.css";

const FB_URL = "https://www.facebook.com/share/1EQDA9pSYB/?mibextid=wwXIfr";

const PROPERTIES = [
  {
    id: 1,
    title: "The Belmont Manor Residence",
    type: "Single Family Residence",
    beds: "4 Beds",
    baths: "3 Baths",
    sqft: "2,850 sq ft",
    rent: "$2,400",
    deposit: "$2,400",
    status: "Available Now",
    image: "/images/listings/1/image.webp",
    features: ["Private Fenced Backyard", "Modern Kitchen", "Attached 2-Car Garage", "Pet Friendly"],
  },
  {
    id: 2,
    title: "The Kensington Garden Villa",
    type: "Executive Residence",
    beds: "3 Beds",
    baths: "2.5 Baths",
    sqft: "2,200 sq ft",
    rent: "$2,150",
    deposit: "$2,150",
    status: "Available Immediately",
    image: "/images/listings/2/image.webp",
    features: ["Hardwood Floors", "Chef's Pantry", "Primary Suite with Spa Bath", "Private Patio"],
  },
  {
    id: 3,
    title: "The Madison Park Home",
    type: "Contemporary Residence",
    beds: "3 Beds",
    baths: "2 Baths",
    sqft: "1,950 sq ft",
    rent: "$1,950",
    deposit: "$1,950",
    status: "Move-In Ready",
    image: "/images/listings/3/image.webp",
    features: ["Open-Concept Living", "Quartz Countertops", "Walk-In Closets", "High Efficiency HVAC"],
  },
  {
    id: 4,
    title: "The Arden Court Estate",
    type: "Suburban Residence",
    beds: "4 Beds",
    baths: "3 Baths",
    sqft: "3,100 sq ft",
    rent: "$2,600",
    deposit: "$2,600",
    status: "Available Immediately",
    image: "/images/listings/4/image.webp",
    features: ["Expansive Sunroom", "Dual Fireplaces", "Finished Basement", "Fenced Grounds"],
  },
];

export default function Residences() {
  const geo = useGeoLocation();
  const locationLabel = geo.isUS && geo.city && geo.region ? `${geo.city}, ${geo.region}` : geo.region || "Prime Locations";

  return (
    <section id="residences" className="residences-section">
      <div className="section-inner">
        {/* Header */}
        <div className="residences-header">
          <div className="section-tag">Curated Portfolio</div>
          <h2 className="section-title">
            Featured <span>Residences</span>
          </h2>
          <p className="section-sub">
            A curated selection of verified homes currently managed by Karen Mitchell Grande Estate in {locationLabel}. Each residence is meticulously maintained, move-in prepped, and personally supervised.
          </p>
        </div>

        {/* Grid */}
        <div className="residences-grid">
          {PROPERTIES.map((prop) => (
            <div key={prop.id} className="residence-card">
              <div className="residence-card__image-wrap">
                <img
                  src={prop.image}
                  alt={prop.title}
                  className="residence-card__image"
                  loading="lazy"
                />
                <span className="residence-card__status">{prop.status}</span>
              </div>

              <div className="residence-card__body">
                <div className="residence-card__type">{prop.type} · {locationLabel}</div>
                <h3 className="residence-card__title">{prop.title}</h3>

                <div className="residence-card__specs">
                  <span>{prop.beds}</span>
                  <span className="spec-dot">•</span>
                  <span>{prop.baths}</span>
                  <span className="spec-dot">•</span>
                  <span>{prop.sqft}</span>
                </div>

                <div className="residence-card__features">
                  {prop.features.map((f, i) => (
                    <span key={i} className="residence-feature-tag">{f}</span>
                  ))}
                </div>

                <div className="residence-card__footer">
                  <div className="residence-card__pricing">
                    <div className="residence-card__rent">
                      <strong>{prop.rent}</strong> <span>/ month</span>
                    </div>
                    <div className="residence-card__deposit">
                      Deposit: {prop.deposit}
                    </div>
                  </div>

                  <a
                    href={FB_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="residence-card__btn"
                  >
                    <FacebookIcon size={16} color="currentColor" /> Inquire
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Minimal Banner */}
        <div className="residences-inquiry-box">
          <div className="residences-inquiry-box__content">
            <h4>Looking for specific bedrooms or a different move-in date?</h4>
            <p>Our private inventory updates daily. Send a direct inquiry to discuss matching homes before they are publicly listed.</p>
          </div>
          <a
            href={FB_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="residences-inquiry-box__btn"
          >
            <FacebookIcon size={16} color="currentColor" /> Message Broker Directly →
          </a>
        </div>
      </div>
    </section>
  );
}
