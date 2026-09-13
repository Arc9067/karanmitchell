import React from "react";
import { FacebookIcon } from "./Icons";
import "./Residences.css";

const FB_URL = "https://www.facebook.com/share/1EQDA9pSYB/?mibextid=wwXIfr";

const PROPERTIES = [
  {
    id: 1,
    title: "The Belmont Manor Residence",
    type: "Single Family Home",
    location: "Prime Residential District",
    beds: "4 Beds",
    baths: "3 Baths",
    sqft: "2,850 sq ft",
    rent: "$2,400",
    deposit: "$2,400",
    status: "Available Now",
    image: "/images/listings/1/image.webp",
    features: ["Fenced Backyard", "Modern Kitchen", "2-Car Attached Garage", "Pet Friendly"],
  },
  {
    id: 2,
    title: "The Kensington Garden Villa",
    type: "Executive Residence",
    location: "Quiet Neighborhood Enclave",
    beds: "3 Beds",
    baths: "2.5 Baths",
    sqft: "2,200 sq ft",
    rent: "$2,150",
    deposit: "$2,150",
    status: "Move-In Ready",
    image: "/images/listings/2/image.webp",
    features: ["Hardwood Flooring", "Chef's Pantry", "Primary Suite Spa Bath", "Private Patio"],
  },
  {
    id: 3,
    title: "The Madison Park Home",
    type: "Contemporary Home",
    location: "Family-Friendly Community",
    beds: "3 Beds",
    baths: "2 Baths",
    sqft: "1,950 sq ft",
    rent: "$1,950",
    deposit: "$1,950",
    status: "Available Now",
    image: "/images/listings/3/image.webp",
    features: ["Open Living Concept", "Quartz Countertops", "Walk-In Closets", "High Efficiency AC"],
  },
  {
    id: 4,
    title: "The Arden Court Estate",
    type: "Suburban Residence",
    location: "Scenic Tree-Lined Grounds",
    beds: "4 Beds",
    baths: "3 Baths",
    sqft: "3,100 sq ft",
    rent: "$2,600",
    deposit: "$2,600",
    status: "Move-In Ready",
    image: "/images/listings/4/image.webp",
    features: ["Expansive Sunroom", "Dual Fireplaces", "Finished Basement", "Private Yard"],
  },
];

export default function Residences() {
  return (
    <section id="residences" className="residences-section">
      <div className="section-inner">
        {/* Section Header */}
        <div className="residences-header">
          <div className="residences-tag">Curated Portfolio</div>
          <h2 className="residences-title">
            Featured <span className="text-accent">Available Residences</span>
          </h2>
          <p className="residences-desc">
            Explore carefully verified, hand-selected homes managed under the personal care of Karen Mitchell. Each residence is pre-inspected, move-in prepped, and ready for immediate occupancy.
          </p>
        </div>

        {/* Properties Grid */}
        <div className="residences-grid">
          {PROPERTIES.map((prop) => (
            <div key={prop.id} className="residence-card">
              <div className="residence-card__image-box">
                <img
                  src={prop.image}
                  alt={prop.title}
                  className="residence-card__img"
                  loading="lazy"
                />
                <span className="residence-card__badge">{prop.status}</span>
                <span className="residence-card__price-badge">{prop.rent} <span>/mo</span></span>
              </div>

              <div className="residence-card__details">
                <div className="residence-card__meta">
                  <span className="residence-card__type">{prop.type}</span>
                  <span className="residence-card__dot">•</span>
                  <span className="residence-card__loc">{prop.location}</span>
                </div>

                <h3 className="residence-card__title">{prop.title}</h3>

                <div className="residence-card__specs">
                  <div className="residence-spec">
                    <span className="residence-spec__val">{prop.beds}</span>
                  </div>
                  <div className="residence-spec">
                    <span className="residence-spec__val">{prop.baths}</span>
                  </div>
                  <div className="residence-spec">
                    <span className="residence-spec__val">{prop.sqft}</span>
                  </div>
                </div>

                <div className="residence-card__features">
                  {prop.features.map((feat, idx) => (
                    <span key={idx} className="residence-feat-pill">{feat}</span>
                  ))}
                </div>

                <div className="residence-card__action-bar">
                  <div className="residence-card__deposit-info">
                    Deposit: <strong>{prop.deposit}</strong> (Refundable)
                  </div>

                  <a
                    href={FB_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="residence-card__cta"
                  >
                    <FacebookIcon size={15} color="currentColor" />
                    <span>Inquire on Facebook</span>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Direct Broker Inquiry Strip */}
        <div className="residences-banner">
          <div className="residences-banner__text">
            <h3>Looking for specific bedrooms or a custom move-in date?</h3>
            <p>Karen Mitchell maintains an active private inventory of upcoming single-family residences. Message Karen directly to discuss available options.</p>
          </div>
          <a
            href={FB_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="residences-banner__btn"
          >
            <FacebookIcon size={16} color="currentColor" />
            <span>Message Karen Mitchell Directly →</span>
          </a>
        </div>
      </div>
    </section>
  );
}
