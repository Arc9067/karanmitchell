import React, { useState } from "react";
import "./FAQ.css";

const faqs = [
  {
    q: "How does the refundable application fee work?",
    a: "The $50 application verification fee is fully refundable immediately after your property viewing, regardless of whether you choose to sign the lease contract or not. Cash or check payments are not accepted.",
  },
  {
    q: "What income and credit standards are required?",
    a: "We generally look for a combined household gross monthly income of at least 3x the monthly rent. Credit history, rental background, and eviction records are evaluated on a holistic basis.",
  },
  {
    q: "How quickly are rental applications processed?",
    a: "Once your application details, income disclosures, and fee verification are completed, our leasing desk reviews submissions within 24 hours to confirm your private viewing slot.",
  },
  {
    q: "Can I apply before viewing the property in person?",
    a: "Yes! Pre-filling and submitting your online application locks in your priority standing for active residences and private pocket listings.",
  },
  {
    q: "Are pets allowed in managed properties?",
    a: "Pet policies vary by property location. You can indicate pet details on your application form, and our leasing team will match you with pet-friendly residences.",
  },
];

export default function FAQ() {
  const [openIdx, setOpenIdx] = useState(0);

  return (
    <section id="faq" className="faq-section">
      <div className="section-inner">
        <div className="faq-header text-center">
          <span className="section-tag">Frequently Asked Questions</span>
          <h2 className="section-title">
            Answers to Your <span>Leasing Questions</span>
          </h2>
          <p className="section-sub">
            Find details on application fees, income requirements, pet policies, and move-in procedures.
          </p>
        </div>

        <div className="faq-accordion">
          {faqs.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div key={idx} className={`faq-item ${isOpen ? "open" : ""}`}>
                <button
                  className="faq-question"
                  onClick={() => setOpenIdx(isOpen ? -1 : idx)}
                >
                  <span>{faq.q}</span>
                  <span className="faq-icon">{isOpen ? "−" : "+"}</span>
                </button>
                {isOpen && <div className="faq-answer">{faq.a}</div>}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
