import React from "react";
import { FacebookIcon } from "./Icons";
import "./HowItWorks.css";

const FB_URL = "https://www.facebook.com/share/1EQDA9pSYB/?mibextid=wwXIfr";

export default function HowItWorks() {
  const experiences = [
    {
      step: "01",
      tag: "Direct Consultation",
      title: "Personalized Property Matching",
      desc: "Connect directly with Karen Mitchell and our dedicated leasing team on Facebook. We listen to your specific move-in timetable, neighborhood desires, and family or pet requirements to recommend the best residences in our portfolio.",
    },
    {
      step: "02",
      tag: "Accompanied Tour",
      title: "Private In-Person & Live Video Showings",
      desc: "Schedule an unhurried, one-on-one walkthrough tailored to your busy schedule. Whether visiting in person or touring remotely via high-definition video, we provide complete transparency regarding amenities, utilities, and community details.",
    },
    {
      step: "03",
      tag: "Move-In Readiness",
      title: "Streamlined Approval & Key Handover",
      desc: "When you find your ideal home, we provide our private digital application portal for expedited 24-hour review. Each residence undergoes a physical pre-move-in inspection, ensuring pristine conditions the day you receive your keys.",
    },
  ];

  return (
    <section id="process" className="how-it-works-section">
      <div className="section-inner">
        <div className="how-it-works-header">
          <div className="section-tag">Bespoke Placement Standards</div>
          <h2 className="section-title">
            The Resident <span>Experience</span>
          </h2>
          <p className="section-sub">
            A calm, dignified leasing journey centered on personal broker representation, physically verified standards, and complete peace of mind.
          </p>
        </div>

        <div className="how-it-works-grid">
          {experiences.map((item, idx) => (
            <div key={idx} className="how-it-works-card">
              <div className="how-it-works-card__top">
                <span className="how-it-works-card__step">{item.step}</span>
                <span className="how-it-works-card__tag">{item.tag}</span>
              </div>
              <h3 className="how-it-works-card__title">{item.title}</h3>
              <p className="how-it-works-card__desc">{item.desc}</p>
            </div>
          ))}
        </div>

        <div className="how-it-works-cta">
          <div className="how-it-works-cta__text">
            <h4>Have a question about an upcoming relocation or move-in date?</h4>
            <p>Speak directly with Principal Broker Karen Mitchell on Facebook — prompt, honest answers with zero automated delays.</p>
          </div>
          <a
            href={FB_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="how-it-works-cta__btn"
          >
            <FacebookIcon size={16} color="currentColor" /> Message Broker on Facebook →
          </a>
        </div>
      </div>
    </section>
  );
}
