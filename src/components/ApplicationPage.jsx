import React, { useState, useRef, useEffect } from "react";
import "./ApplicationPage.css";
import Loader from "./Loader";
import Logo from "./Logo";
import {
  UserIcon,
  PinIcon,
  CalendarIcon,
  CardIcon,
  DocumentIcon,
  SignatureIcon,
  AlertIcon,
  DownloadIcon,
  GlobeIcon,
  HouseIcon,
  SunIcon,
  MoonIcon,
} from "./Icons";

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

// ── Translations ─────────────────────────────────────────────────
const T = {
  en: {
    headerSub: "Rental Application",
    langSwitch: "Español",
    langSwitchUrl: "/application/es",
    title: "Rental Application",
    subtitle:
      "Please fill in all required fields accurately. This helps us process your application quickly.",
    sections: {
      name: "Personal Information",
      nameSub: "Your basic contact details",
      questions: "Property Questions",
      questionsSub: "Help us understand your situation",
      address: "Current Address",
      addressSub: "Where you currently reside",
      fee: "Application Fee Payment",
      feeSub: "Select your preferred payment method — fee is refundable if not approved",
      signature: "Signature",
      signatureSub: "Sign using your mouse or finger",
    },
    fields: {
      first: "First Name",
      last: "Last Name",
      phone: "Phone Number",
      email: "Email Address",
      appDate: "Application Date",
      moveIn: "Desired Moving Date",
      occupation: "Occupation / Job Title",
      occupants: "Number of Occupants",
      income: "Monthly Income",
      street1: "Street Address",
      street2: "Street Address Line 2",
      city: "City",
      state: "State",
      postal: "Zip Code",
      vehicle: "Do you have a vehicle?",
      pets: "Do you have pets?",
      evicted: "Have you been evicted before?",
      yes: "Yes",
      no: "No",
    },
    ph: {
      first: "John",
      last: "Doe",
      phone: "(000) 000-0000",
      email: "example@email.com",
      occupation: "e.g. Sales Associate",
      occupants: "e.g. 3",
      income: "e.g. $4,500",
      street1: "123 Main Street",
      street2: "Apt, Suite, Unit (optional)",
      city: "City",
      state: "State",
      postal: "12345",
    },
    fee: {
      title: "Refundable Application Fee",
      desc: "This fee is fully refunded immediately after viewing — whether you're interested or not. Cash / Check not accepted.",
      li1: "To fix / book your appointment",
      li2: "To identify serious applicants",
      li3: "To enable immediate submission review",
    },
    terms: {
      note: "NOTE: Cash / Check not accepted! Payment will be refunded immediately after viewing, whether interested or not.",
      fee: "REFUNDABLE APPLICATION FEE — (i) To fix/book appointment (ii) To identify serious applicants (iii) To enable immediate review",
      certify:
        "I hereby certify that I am at least 18 years of age and that all information given on this application is true and correct. I authorize the Landlord and its agents to obtain an investigative consumer credit report including but not limited to credit history, OFAC search, landlord/tenant court record search, criminal record search, and registered sex offender search. I authorize the release of information from previous or current landlords, employers, bank references, and personal references.",
      fcra: "Fair Credit Reporting Act Rights: You have a right to request disclosure of the investigation. You must be told if information in your file has been used against you. You have a right to know what is in your file. You have the right to dispute incomplete or inaccurate information.",
      accept: "I accept the Terms and Conditions.",
    },
    sigHint: "Sign using your mouse or finger",
    submitIdle: "Submit Application →",
    submitBusy: "Submitting…",
    disclaimer:
      "By submitting you confirm all details provided are accurate.",
    errorMsg: "Failed to submit. Please try again or",
    errorLink: "message us directly",
    sigField: "E-Signature Field",
    sigClear: "Clear",
    requiredTerms: "*Required",
    paymentRequired: "*",
    validation: {
      firstName: "First name is required",
      lastName: "Last name is required",
      phone: "Phone number is required",
      appDate: "Application date is required",
      street1: "Street address is required",
      paymentMethod: "Please select a payment method",
      signature: "Please provide your signature",
    },
    errorBannerPrefix: "Please fix the following:",
    errorBannerMore: (n) => ` and ${n} more field(s).`,
    success: {
      title: "Application Submitted!",
      subtitle: "We've received your application and will be in touch soon.",
      summary: "Your Application Summary",
      personal: "Personal Information",
      questions: "Property Answers",
      address: "Current Address",
      payment: "Payment Method",
      sig: "Your Signature",
      download: "Download PDF",
      message: "Message Us",
      back: "← Back to Home",
    },
    review: {
      fullName: "Full Name",
      email: "Email",
      phone: "Phone Number",
      appDate: "Application Date",
      moveIn: "Desired Move-In",
      occupation: "Occupation / Job Title",
      occupants: "Number of Occupants",
      income: "Monthly Income",
      vehicle: "Vehicle",
      pets: "Pets",
      evicted: "Eviction History",
      street: "Street",
      city: "City",
      state: "State",
      postal: "Zip Code",
      method: "Method",
      fee: "Fee",
      feeValue: "$50 (Refundable)",
    },
    pdfTitle: "Karen Mitchell Grande Estate — Rental Application",
  },

  es: {
    headerSub: "Portal de Solicitud de Alquiler",
    langSwitch: "English",
    langSwitchUrl: "/application",
    title: "Solicitud de Arrendamiento",
    subtitle:
      "Por favor complete todos los campos obligatorios con precisión. Esto nos ayuda a procesar su solicitud rápidamente.",
    sections: {
      name: "Información Personal",
      nameSub: "Sus datos básicos de contacto",
      questions: "Preguntas sobre la propiedad",
      questionsSub: "Ayúdenos a comprender su situación",
      address: "Dirección Actual",
      addressSub: "Dónde reside actualmente",
      fee: "Pago de la Cuota de Solicitud",
      feeSub: "Seleccione su método de pago preferido — la cuota es reembolsable si no se aprueba",
      signature: "Firma",
      signatureSub: "Firme usando su mouse o dedo",
    },
    fields: {
      first: "Nombre",
      last: "Apellido",
      phone: "Número de Teléfono",
      email: "Correo Electrónico",
      appDate: "Fecha de Solicitud",
      moveIn: "Fecha de Mudanza Deseada",
      occupation: "Ocupación / Título del Puesto",
      occupants: "Número de Ocupantes",
      income: "Ingresos Mensuales",
      street1: "Dirección",
      street2: "Dirección Línea 2",
      city: "Ciudad",
      state: "Estado",
      postal: "Código Postal",
      vehicle: "¿Tiene un vehículo?",
      pets: "¿Tiene mascotas?",
      evicted: "¿Ha sido desalojado antes?",
      yes: "Sí",
      no: "No",
    },
    ph: {
      first: "Juan",
      last: "Pérez",
      phone: "(000) 000-0000",
      email: "ejemplo@email.com",
      occupation: "ej. Asociado de Ventas",
      occupants: "ej. 3",
      income: "ej. $4,500",
      street1: "123 Calle Principal",
      street2: "Apto, Suite, Unidad (opcional)",
      city: "Ciudad",
      state: "Estado",
      postal: "12345",
    },
    fee: {
      title: "Cuota de Solicitud Reembolsable",
      desc: "Esta cuota se reembolsa completamente de inmediato después de la visita — sin importar si está interesado o no. No se acepta efectivo ni cheque.",
      li1: "Para fijar / reservar su cita",
      li2: "Para identificar solicitantes serios",
      li3: "Para habilitar la revisión inmediata",
    },
    terms: {
      note: "NOTA: ¡No se acepta efectivo ni cheque! El pago será reembolsado inmediatamente después de la visita, esté interesado o no.",
      fee: "CUOTA DE SOLICITUD REEMBOLSABLE — (i) Para fijar/reservar cita (ii) Para identificar solicitantes serios (iii) Para habilitar revisión inmediata",
      certify:
        "Por la presente certifico que tengo al menos 18 años de edad y que toda la información proporcionada en esta solicitud es verdadera y correcta. Autorizo al Arrendador y a sus agentes a obtener un informe de crédito investigativo que incluye, entre otros, historial crediticio, búsqueda OFAC, búsqueda de registros judiciales arrendador/inquilino, búsqueda de antecedentes penales y registro de delincuentes sexuales. Autorizo la divulgación de información de propietarios, empleadores, representantes bancarios y referencias personales anteriores o actuales.",
      fcra: "Derechos bajo la Ley de Informes de Crédito Justos: Tiene derecho a solicitar la divulgación de la investigación. Se le debe informar si se ha utilizado información de su expediente en su contra. Tiene derecho a conocer el contenido de su expediente. Tiene derecho a disputar información incompleta o inexacta.",
      accept: "Acepto los Términos y Condiciones.",
    },
    sigHint: "Firme con su mouse o dedo",
    submitIdle: "Enviar Solicitud →",
    submitBusy: "Enviando…",
    disclaimer:
      "Al enviar confirma que todos los detalles proporcionados son precisos.",
    errorMsg: "Error al enviar. Por favor intente de nuevo o",
    errorLink: "contáctenos directamente",
    sigField: "Campo de Firma Electrónica",
    sigClear: "Borrar",
    requiredTerms: "*Obligatorio",
    paymentRequired: "*",
    validation: {
      firstName: "El nombre es obligatorio",
      lastName: "El apellido es obligatorio",
      phone: "El número de teléfono es obligatorio",
      appDate: "La fecha de solicitud es obligatoria",
      street1: "La dirección es obligatoria",
      paymentMethod: "Por favor seleccione un método de pago",
      signature: "Por favor proporcione su firma",
    },
    errorBannerPrefix: "Por favor corrija lo siguiente:",
    errorBannerMore: (n) => ` y ${n} campo(s) más.`,
    success: {
      title: "¡Solicitud Enviada!",
      subtitle:
        "Hemos recibido su solicitud y nos pondremos en contacto pronto.",
      summary: "Resumen de su Solicitud",
      personal: "Información Personal",
      questions: "Respuestas sobre la Propiedad",
      address: "Dirección Actual",
      payment: "Método de Pago",
      sig: "Su Firma",
      download: "Descargar PDF",
      message: "Contáctenos",
      back: "← Volver al Inicio",
    },
    review: {
      fullName: "Nombre Completo",
      email: "Correo",
      phone: "Teléfono",
      appDate: "Fecha de Solicitud",
      moveIn: "Fecha de Mudanza",
      occupation: "Ocupación / Título del Puesto",
      occupants: "Número de Ocupantes",
      income: "Ingresos Mensuales",
      vehicle: "Vehículo",
      pets: "Mascotas",
      evicted: "Historial de Desalojo",
      street: "Dirección",
      city: "Ciudad",
      state: "Estado",
      postal: "Código Postal",
      method: "Método",
      fee: "Cuota",
      feeValue: "$50 (Reembolsable)",
    },
    pdfTitle: "Karen Mitchell Grande Estate — Solicitud de Arrendamiento",
  },
};

// ── Countries list ────────────────────────────────────────────────
const COUNTRIES = [
  "United States",
  "United Kingdom",
  "Canada",
  "Afghanistan",
  "Albania",
  "Algeria",
  "American Samoa",
  "Andorra",
  "Angola",
  "Anguilla",
  "Antarctica",
  "Antigua and Barbuda",
  "Argentina",
  "Armenia",
  "Aruba",
  "Australia",
  "Austria",
  "Azerbaijan",
  "Bahrain",
  "Bangladesh",
  "Barbados",
  "Belarus",
  "Belgium",
  "Belize",
  "Benin",
  "Bermuda",
  "Bhutan",
  "Bolivia",
  "Bosnia and Herzegovina",
  "Botswana",
  "Brazil",
  "British Virgin Islands",
  "Brunei",
  "Bulgaria",
  "Burkina Faso",
  "Burma",
  "Burundi",
  "Cambodia",
  "Cameroon",
  "Cape Verde",
  "Cayman Islands",
  "Central African Republic",
  "Chad",
  "Chile",
  "China",
  "Colombia",
  "Comoros",
  "Cook Islands",
  "Costa Rica",
  "Croatia",
  "Cuba",
  "Cyprus",
  "Czech Republic",
  "Democratic Republic of the Congo",
  "Denmark",
  "Djibouti",
  "Dominica",
  "Dominican Republic",
  "Ecuador",
  "Egypt",
  "El Salvador",
  "Equatorial Guinea",
  "Eritrea",
  "Estonia",
  "Ethiopia",
  "Fiji",
  "Finland",
  "France",
  "Gabon",
  "Georgia",
  "Germany",
  "Ghana",
  "Greece",
  "Greenland",
  "Grenada",
  "Guatemala",
  "Guinea",
  "Guyana",
  "Haiti",
  "Honduras",
  "Hong Kong",
  "Hungary",
  "Iceland",
  "India",
  "Indonesia",
  "Iran",
  "Iraq",
  "Ireland",
  "Israel",
  "Italy",
  "Jamaica",
  "Japan",
  "Jordan",
  "Kazakhstan",
  "Kenya",
  "Kiribati",
  "Kosovo",
  "Kuwait",
  "Kyrgyzstan",
  "Laos",
  "Latvia",
  "Lebanon",
  "Lesotho",
  "Liberia",
  "Libya",
  "Liechtenstein",
  "Lithuania",
  "Luxembourg",
  "Macau",
  "Macedonia",
  "Madagascar",
  "Malawi",
  "Malaysia",
  "Maldives",
  "Mali",
  "Malta",
  "Marshall Islands",
  "Mauritania",
  "Mauritius",
  "Mexico",
  "Moldova",
  "Monaco",
  "Mongolia",
  "Montenegro",
  "Morocco",
  "Mozambique",
  "Myanmar",
  "Namibia",
  "Nauru",
  "Nepal",
  "Netherlands",
  "New Zealand",
  "Nicaragua",
  "Niger",
  "Nigeria",
  "Norway",
  "Oman",
  "Pakistan",
  "Palau",
  "Palestine",
  "Panama",
  "Papua New Guinea",
  "Paraguay",
  "Peru",
  "Philippines",
  "Poland",
  "Portugal",
  "Qatar",
  "Romania",
  "Russia",
  "Rwanda",
  "Saint Kitts and Nevis",
  "Saint Lucia",
  "Saint Vincent and the Grenadines",
  "Samoa",
  "San Marino",
  "Saudi Arabia",
  "Senegal",
  "Serbia",
  "Seychelles",
  "Sierra Leone",
  "Singapore",
  "Slovakia",
  "Slovenia",
  "Solomon Islands",
  "Somalia",
  "South Africa",
  "South Korea",
  "South Sudan",
  "Spain",
  "Sri Lanka",
  "Sudan",
  "Suriname",
  "Sweden",
  "Switzerland",
  "Syria",
  "Taiwan",
  "Tajikistan",
  "Tanzania",
  "Thailand",
  "The Bahamas",
  "The Gambia",
  "Togo",
  "Tonga",
  "Trinidad and Tobago",
  "Tunisia",
  "Turkey",
  "Turkmenistan",
  "Tuvalu",
  "Uganda",
  "Ukraine",
  "United Arab Emirates",
  "Uruguay",
  "Uzbekistan",
  "Vanuatu",
  "Venezuela",
  "Vietnam",
  "Yemen",
  "Zambia",
  "Zimbabwe",
];

const PAYMENT_METHODS = ["Zelle", "Chime", "Cash App", "PayPal", "Apple Pay", "Venmo"];

const today = new Date();
const todayISO = today.toISOString().slice(0, 10);
const todayMonth = today.toISOString().slice(0, 7);

const INITIAL = {
  firstName: "",
  lastName: "",
  phone: "",
  email: "",
  appDate: todayISO,
  moveMonthYear: todayISO,
  occupation: "",
  occupants: "",
  income: "",
  hasVehicle: null,
  hasPets: null,
  hasEvicted: null,
  street1: "",
  street2: "",
  city: "",
  stateRegion: "",
  postalCode: "",
  paymentMethod: "",
  termsAccepted: true,
};

// ── Signature canvas ──────────────────────────────────────────────
function SignatureCanvas({ canvasRef, hint, clearLabel, theme }) {
  const isDrawingRef = useRef(false);
  const [hasSig, setHasSig] = useState(false);

  const inkColor = theme === "dark" ? "#9E6740" : "#090D16";

  const getPos = (e, canvas) => {
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    const src = e.touches ? e.touches[0] : e;
    return {
      x: (src.clientX - rect.left) * scaleX,
      y: (src.clientY - rect.top) * scaleY,
    };
  };

  // Mouse Handlers (Desktop)
  const startMouse = (e) => {
    const c = canvasRef.current;
    const ctx = c.getContext("2d");
    const p = getPos(e, c);
    ctx.beginPath();
    ctx.moveTo(p.x, p.y);
    isDrawingRef.current = true;
  };
  const moveMouse = (e) => {
    if (!isDrawingRef.current) return;
    const c = canvasRef.current;
    const ctx = c.getContext("2d");
    const p = getPos(e, c);
    ctx.lineWidth = 2.5;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.strokeStyle = inkColor;
    ctx.lineTo(p.x, p.y);
    ctx.stroke();
    setHasSig(true);
  };
  const stopMouse = () => {
    isDrawingRef.current = false;
  };

  // Touch Handlers (Mobile Native passive:false override)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const handleTouchStart = (e) => {
      e.preventDefault();
      const ctx = canvas.getContext("2d");
      const p = getPos(e, canvas);
      ctx.beginPath();
      ctx.moveTo(p.x, p.y);
      isDrawingRef.current = true;
    };

    const handleTouchMove = (e) => {
      e.preventDefault();
      if (!isDrawingRef.current) return;
      const ctx = canvas.getContext("2d");
      const p = getPos(e, canvas);
      ctx.lineWidth = 2.5;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.strokeStyle = inkColor;
      ctx.lineTo(p.x, p.y);
      ctx.stroke();
      setHasSig(true);
    };

    const handleTouchEnd = () => {
      isDrawingRef.current = false;
    };

    canvas.addEventListener("touchstart", handleTouchStart, { passive: false });
    canvas.addEventListener("touchmove", handleTouchMove, { passive: false });
    canvas.addEventListener("touchend", handleTouchEnd, { passive: false });
    canvas.addEventListener("touchcancel", handleTouchEnd, { passive: false });

    return () => {
      canvas.removeEventListener("touchstart", handleTouchStart);
      canvas.removeEventListener("touchmove", handleTouchMove);
      canvas.removeEventListener("touchend", handleTouchEnd);
      canvas.removeEventListener("touchcancel", handleTouchEnd);
    };
  }, [inkColor]);

  const clear = () => {
    const c = canvasRef.current;
    c.getContext("2d").clearRect(0, 0, c.width, c.height);
    isDrawingRef.current = false;
    setHasSig(false);
  };

  return (
    <div className="sig">
      <canvas
        ref={canvasRef}
        width={600}
        height={160}
        className="sig__canvas"
        onMouseDown={startMouse}
        onMouseMove={moveMouse}
        onMouseUp={stopMouse}
        onMouseLeave={stopMouse}
      />
      {!hasSig && <p className="sig__hint">{hint}</p>}
      <button type="button" className="sig__clear" onClick={clear}>
        {clearLabel}
      </button>
    </div>
  );
}

// ── PDF download ──────────────────────────────────────────────────
function downloadPDF(form, sigDataUrl, t, targetProperty) {
  const win = window.open("", "_blank");
  win.document.write(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>${t.pdfTitle}</title>
      <style>
        @media print {
          body {
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
          }
        }
        body {
          font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif;
          max-width: 760px;
          margin: 30px auto;
          color: #0f172a;
          font-size: 13px;
          background-color: #ffffff;
          padding: 0 24px;
        }
        .pdf-header-wrap {
          position: relative;
          width: 100%;
          border-radius: 12px;
          margin-bottom: 28px;
          background: #090D16;
          border-bottom: 3px solid #9E6740;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 26px 32px;
          box-sizing: border-box;
        }
        .pdf-logo {
          color: #ffffff;
          font-size: 22px;
          font-weight: 800;
          letter-spacing: -0.01em;
        }
        .pdf-logo span {
          color: #9E6740;
          font-style: italic;
          font-weight: 700;
        }
        .pdf-header-badge {
          color: #9E6740;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          background: rgba(255, 107, 0, 0.12);
          border: 1px solid rgba(255, 107, 0, 0.3);
          padding: 6px 12px;
          border-radius: 20px;
        }
        .section-title {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 13px;
          font-weight: 800;
          color: #9E6740;
          margin: 26px 0 14px;
          border-bottom: 2px solid rgba(255, 107, 0, 0.2);
          padding-bottom: 6px;
          text-transform: uppercase;
          letter-spacing: 0.06em;
        }
        .section-icon {
          display: inline-flex;
          align-items: center;
          color: #9E6740;
        }
        .grid-2 {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 10px 16px;
        }
        .field {
          background: #f8fafc;
          border: 1px solid #e2e8f0;
          border-radius: 8px;
          padding: 8px 12px;
          display: flex;
          flex-direction: column;
        }
        .lbl {
          font-size: 9.5px;
          color: #64748b;
          text-transform: uppercase;
          font-weight: 700;
          letter-spacing: 0.05em;
          margin-bottom: 2px;
        }
        .val {
          font-size: 13px;
          font-weight: 700;
          color: #0f172a;
        }
        .fee-box {
          background-color: rgba(255, 107, 0, 0.04);
          border: 1.5px solid rgba(255, 107, 0, 0.25);
          border-radius: 10px;
          padding: 16px 20px;
          margin: 16px 0;
        }
        .fee-box p {
          margin: 0 0 6px 0;
          font-size: 13px;
          color: #0f172a;
        }
        .fee-box p strong {
          color: #9E6740;
        }
        .fee-box p:last-child {
          margin: 0;
        }
        .sig-container {
          margin-top: 12px;
        }
        .sig-img {
          max-width: 260px;
          height: auto;
          border: 1px solid #cbd5e1;
          border-radius: 8px;
          background: #ffffff;
          padding: 10px;
          display: block;
        }
        .terms {
          font-size: 10.5px;
          color: #475569;
          line-height: 1.65;
          margin-top: 25px;
          background: #f8fafc;
          padding: 16px;
          border-radius: 8px;
          border: 1px solid #e2e8f0;
          border-left: 4px solid #9E6740;
        }
        footer {
          margin-top: 35px;
          font-size: 10.5px;
          color: #94a3b8;
          text-align: center;
          border-top: 1px solid #e2e8f0;
          padding-top: 16px;
          letter-spacing: 0.08em;
          font-weight: 600;
        }
      </style>
    </head>
    <body>
      <div class="pdf-header-wrap">
        <div class="pdf-logo">
          Karen Mitchell <span>Grande Estate</span>
        </div>
        <div class="pdf-header-badge">
          SUBMITTED: ${new Date().toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })}
        </div>
      </div>

      ${targetProperty ? `
      <!-- Section: Specified Rental Property -->
      <div class="section-title">
        <span class="section-icon">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
            <polyline points="9 22 9 12 15 12 15 22" />
          </svg>
        </span>
        <span>SPECIFIED RENTAL PROPERTY</span>
      </div>
      <div class="grid-2">
        <div class="field" style="grid-column: span 2;"><span class="lbl">PROPERTY ADDRESS</span><span class="val" style="font-size: 14px; color: #9E6740;">${targetProperty.address}</span></div>
        ${targetProperty.rent ? `<div class="field"><span class="lbl">MONTHLY RENT</span><span class="val">${targetProperty.rent}</span></div>` : ""}
        ${targetProperty.deposit ? `<div class="field"><span class="lbl">SECURITY DEPOSIT</span><span class="val">${targetProperty.deposit}</span></div>` : ""}
        ${targetProperty.beds || targetProperty.baths ? `<div class="field"><span class="lbl">BEDROOMS / BATHROOMS</span><span class="val">${targetProperty.beds} ${targetProperty.baths ? "• " + targetProperty.baths : ""}</span></div>` : ""}
        ${targetProperty.pets ? `<div class="field"><span class="lbl">PET POLICY</span><span class="val">${targetProperty.pets}</span></div>` : ""}
      </div>
      ` : ""}

      <!-- Section: Personal -->
      <div class="section-title">
        <span class="section-icon">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
            <circle cx="12" cy="7" r="4" />
          </svg>
        </span>
        <span>${t.success.personal}</span>
      </div>
      <div class="grid-2">
        <div class="field"><span class="lbl">${t.review.fullName}</span><span class="val">${form.firstName} ${form.lastName}</span></div>
        <div class="field"><span class="lbl">${t.review.email}</span><span class="val">${form.email || "—"}</span></div>
        <div class="field"><span class="lbl">${t.review.phone}</span><span class="val">${form.phone || "—"}</span></div>
        <div class="field"><span class="lbl">${t.review.appDate}</span><span class="val">${form.appDate || "—"}</span></div>
        <div class="field"><span class="lbl">${t.review.moveIn}</span><span class="val">${form.moveMonthYear || "—"}</span></div>
        <div class="field"><span class="lbl">${t.review.occupation}</span><span class="val">${form.occupation || "—"}</span></div>
        <div class="field"><span class="lbl">${t.review.occupants}</span><span class="val">${form.occupants || "—"}</span></div>
        <div class="field"><span class="lbl">${t.review.income}</span><span class="val">${form.income || "—"}</span></div>
      </div>

      <!-- Section: Property Questions -->
      <div class="section-title">
        <span class="section-icon">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
            <polyline points="9 22 9 12 15 12 15 22" />
          </svg>
        </span>
        <span>${t.success.questions}</span>
      </div>
      <div class="grid-2">
        <div class="field"><span class="lbl">${t.review.vehicle}</span><span class="val">${form.hasVehicle === true ? t.fields.yes : form.hasVehicle === false ? t.fields.no : "—"}</span></div>
        <div class="field"><span class="lbl">${t.review.pets}</span><span class="val">${form.hasPets === true ? t.fields.yes : form.hasPets === false ? t.fields.no : "—"}</span></div>
        <div class="field"><span class="lbl">${t.review.evicted}</span><span class="val">${form.hasEvicted === true ? t.fields.yes : form.hasEvicted === false ? t.fields.no : "—"}</span></div>
      </div>

      <!-- Section: Address -->
      <div class="section-title">
        <span class="section-icon">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        </span>
        <span>${t.success.address}</span>
      </div>
      <div class="grid-2">
        <div class="field"><span class="lbl">${t.review.street}</span><span class="val">${form.street1}${form.street2 ? ", " + form.street2 : ""}</span></div>
        <div class="field"><span class="lbl">${t.review.city}</span><span class="val">${form.city || "—"}</span></div>
        <div class="field"><span class="lbl">${t.review.state}</span><span class="val">${form.stateRegion || "—"}</span></div>
        <div class="field"><span class="lbl">${t.review.postal}</span><span class="val">${form.postalCode || "—"}</span></div>
      </div>

      <!-- Section: Payment -->
      <div class="section-title">
        <span class="section-icon">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
            <path d="M1 10h22" />
          </svg>
        </span>
        <span>${t.success.payment}</span>
      </div>
      <div class="fee-box">
        <p><strong>${t.fee.title}:</strong> $50 (Refundable)</p>
        <p><strong>${t.review.method}:</strong> ${form.paymentMethod}</p>
        <p style="font-size: 11px; color: #64748b; margin-top: 6px;">${t.fee.desc}</p>
      </div>

      <!-- Section: Signature -->
      <div class="section-title">
        <span class="section-icon">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <path d="M12 20h9M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z" />
          </svg>
        </span>
        <span>${t.success.sig}</span>
      </div>
      <div class="sig-container">
        ${sigDataUrl ? `<img src="${sigDataUrl}" class="sig-img" alt="Signature" />` : "<p>—</p>"}
      </div>

      <!-- Terms & Certification -->
      <div class="terms">
        <strong style="display: block; margin-bottom: 6px; color: #0f172a;">${t.terms.accept}</strong>
        ${t.terms.certify}
      </div>

      <footer>
        KAREN MITCHELL GRANDE ESTATE · LICENSED REAL ESTATE PROFESSIONAL
      </footer>
    </body>
    </html>
  `);
  win.document.close();
  setTimeout(() => win.print(), 400);
}

// ── Data URL to Blob helper (iOS Safari compatible without fetch) ────
function dataURLtoBlob(dataurl) {
  if (!dataurl) return null;
  try {
    const parts = dataurl.split(",");
    const mime = parts[0].match(/:(.*?);/)?.[1] || "image/png";
    const byteString = atob(parts[1]);
    const u8arr = new Uint8Array(byteString.length);
    for (let i = 0; i < byteString.length; i++) {
      u8arr[i] = byteString.charCodeAt(i);
    }
    return new Blob([u8arr], { type: mime });
  } catch (err) {
    console.error("Failed to convert dataURL to Blob:", err);
    return null;
  }
}

// ── Telegram helpers ──────────────────────────────────────────────
async function sendToAllChats(
  botToken,
  chatIds,
  messageHtml,
  messagePlain,
  sigBlob,
  applicantName
) {
  const base = `https://api.telegram.org/bot${botToken}`;
  const results = await Promise.allSettled(
    chatIds.map(async (chatId) => {
      let delivered = false;

      // 1. Primary: Send Signature photo and application text in a SINGLE Telegram message
      if (sigBlob) {
        try {
          const fd = new FormData();
          fd.append("chat_id", chatId);
          fd.append("photo", sigBlob, "signature.png");
          fd.append("caption", messageHtml);
          fd.append("parse_mode", "HTML");

          const photoRes = await fetch(`${base}/sendPhoto`, {
            method: "POST",
            body: fd,
          });
          const photoJson = await photoRes.json().catch(() => ({}));
          if (photoRes.ok && photoJson.ok) {
            delivered = true;
          } else {
            // Retry photo with plain text caption if HTML entity was rejected
            const fdPlain = new FormData();
            fdPlain.append("chat_id", chatId);
            fdPlain.append("photo", sigBlob, "signature.png");
            fdPlain.append("caption", messagePlain);

            const retryRes = await fetch(`${base}/sendPhoto`, {
              method: "POST",
              body: fdPlain,
            });
            const retryJson = await retryRes.json().catch(() => ({}));
            if (retryRes.ok && retryJson.ok) {
              delivered = true;
            }
          }
        } catch (err) {
          console.warn("sendPhoto single message error:", err);
        }
      }

      // 2. Fallback: If no signature or photo failed, deliver as a single text message
      if (!delivered) {
        try {
          const textRes = await fetch(`${base}/sendMessage`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              chat_id: chatId,
              text: messageHtml,
              parse_mode: "HTML",
            }),
          });
          const resJson = await textRes.json().catch(() => ({}));
          if (textRes.ok && resJson.ok) {
            delivered = true;
          } else {
            // Retry with clean plain text
            const plainRes = await fetch(`${base}/sendMessage`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                chat_id: chatId,
                text: messagePlain,
              }),
            });
            const plainJson = await plainRes.json().catch(() => ({}));
            if (plainRes.ok && plainJson.ok) {
              delivered = true;
            }
          }
        } catch (err) {
          console.warn("sendMessage fallback error:", err);
        }
      }

      if (!delivered) {
        throw new Error(`Failed to deliver single text message to chatId: ${chatId}`);
      }
      return true;
    })
  );
  const anySuccess = results.some((r) => r.status === "fulfilled");
  if (!anySuccess) throw new Error("All Telegram sends failed");
}

// ── Email HTML Builder ───────────────────────────────────────────
function buildEmailHtml(form, lang) {
  const isEs = lang === "es";
  const title = isEs ? "Solicitud en Proceso" : "Application Under Processing";
  const greeting = isEs ? `Estimado/a ${form.firstName} ${form.lastName},` : `Dear ${form.firstName} ${form.lastName},`;
  const intro = isEs 
    ? "Gracias por enviar su solicitud de arrendamiento para Karen Mitchell Grande Estate. Hemos recibido sus datos correctamente y su solicitud de arrendamiento se encuentra actualmente bajo revisión."
    : "Thank you for submitting your rental application for Karen Mitchell Grande Estate. We have successfully received your details, and your application request is currently under review.";
  const feeAction = isEs
    ? "Para finalizar el proceso de revisión y asegurar su cita de visita, por favor coordine con su agente para completar la verificación de la cuota de solicitud reembolsable:"
    : "To finalize the review process and secure your viewing slot, please coordinate with your agent to complete the refundable application fee verification:";
  const methodLabel = isEs ? "Método de Pago Seleccionado:" : "Selected Payment Method:";
  const refundNote = isEs
    ? "* Nota: La cuota de solicitud se le reembolsará por completo inmediatamente después de su visita, independientemente de si decide alquilar la propiedad o no."
    : "* Note: The application fee is fully refunded to you immediately after your viewing, whether you choose to rent the property or not.";
  const outro = isEs
    ? "Un agente se pondrá en contacto con usted pronto para guiarlo a través de los siguientes pasos."
    : "An agent will reach out to you shortly to guide you through the next steps.";
  const footerTitle = "Karen Mitchell Grande Estate";
  const footerSub = isEs
    ? "Profesional Inmobiliario Licenciado · Grupo de Administración"
    : "Licensed Real Estate Professional · Property Management";
  const footerScope = isEs
    ? "Propiedades de Alquiler en Todo el País (EE. UU.)"
    : "US Nationwide Rental Properties";

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>${title}</title>
  <style>
    body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; background-color: #f8f5ee; margin: 0; padding: 0; }
    .wrapper { background-color: #f8f5ee; width: 100%; padding: 40px 0; }
    .container { max-width: 600px; margin: 0 auto; background-color: #ffffff; border: 1px solid rgba(201, 168, 76, 0.25); border-radius: 12px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.05); }
    .header { background-color: #0a0f0d; padding: 35px 30px; text-align: center; border-bottom: 2px solid #c9a84c; }
    .logo { color: #f8f5ee; font-size: 26px; letter-spacing: 0.12em; text-transform: uppercase; margin: 0; font-family: Georgia, serif; }
    .logo span { color: #c9a84c; font-style: italic; text-transform: none; }
    .content { padding: 40px 30px; }
    h1 { font-family: Georgia, serif; font-size: 22px; color: #0a0f0d; margin-top: 0; margin-bottom: 20px; }
    p { color: #333333; font-size: 15px; line-height: 1.65; margin: 0 0 20px 0; }
    .payment-box { background-color: rgba(201, 168, 76, 0.06); border-left: 4px solid #c9a84c; padding: 20px; border-radius: 4px; margin: 25px 0; }
    .payment-box p { margin: 0; color: #0a0f0d; font-weight: 500; }
    .footer { background-color: #faf9f6; padding: 25px 30px; text-align: center; border-top: 1px solid #eae5d8; }
    .footer p { font-size: 12px; color: #777777; margin: 0 0 5px 0; }
    .footer p:last-child { margin: 0; }
  </style>
</head>
<body>
  <div class="wrapper">
    <div class="container">
      <div class="header">
        <div class="logo">Karen Mitchell <span>Grande Estate</span></div>
      </div>
      <div class="content">
        <h1>${title}</h1>
        <p>${greeting}</p>
        <p>${intro}</p>
        
        <p>${feeAction}</p>
        
        <div class="payment-box">
          <p><strong>${methodLabel}</strong> ${form.paymentMethod}</p>
          <p style="margin-top: 8px; font-size: 13px; color: #666666; font-weight: normal;">${refundNote}</p>
        </div>
        
        <p>${outro}</p>
      </div>
      <div class="footer">
        <p><strong>${footerTitle}</strong></p>
        <p>${footerSub}</p>
        <p style="color: #c9a84c;">${footerScope}</p>
      </div>
    </div>
  </div>
</body>
</html>
  `.trim();
}
// ── Property URL parameter parser ──────────────────────────────────
function parsePropertyFromURL() {
  if (typeof window === "undefined") return null;
  const params = new URLSearchParams(window.location.search);

  // 1. Base64 JSON 'p' parameter
  const pParam = params.get("p") || params.get("prop") || params.get("data");
  if (pParam) {
    try {
      const decoded = JSON.parse(atob(pParam));
      if (decoded && (decoded.address || decoded.title || decoded.rent)) {
        return decoded;
      }
    } catch (e) {}
  }

  // 2. Explicit URL Query parameters
  const address = params.get("address") || params.get("addr") || params.get("location");
  const rent = params.get("rent") || params.get("price");
  const deposit = params.get("deposit") || params.get("dep");
  const beds = params.get("beds") || params.get("bedrooms");
  const baths = params.get("baths") || params.get("bathrooms");
  const pets = params.get("pets");
  const status = params.get("status") || params.get("ready");

  // 3. Fallback to localStorage
  const stored =
    localStorage.getItem("karen_selected_property") ||
    localStorage.getItem("karen_mitchell_apply_property");
  if (!address && !rent && stored) {
    try {
      return typeof stored === "string" && stored.startsWith("{") ? JSON.parse(stored) : { address: stored };
    } catch (e) {}
  }

  if (!address && !rent && !deposit) return null;

  return {
    address: address || "Specified Property",
    rent: rent ? (rent.includes("$") ? rent : `$${rent}/mo`) : "",
    deposit: deposit ? (deposit.includes("$") ? deposit : `$${deposit}`) : "",
  };
}

function ApplicationPage({ lang = "en", theme, toggleTheme }) {
  const t = T[lang] || T.en;

  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState(INITIAL);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle");
  const [submitted, setSubmitted] = useState(false);
  const [sigDataUrl, setSigDataUrl] = useState(null);
  const [step, setStep] = useState(1);
  const [targetProperty, setTargetProperty] = useState(() => parsePropertyFromURL());
  
  const canvasRef = useRef(null);
  const errorRef = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const set = (k, v) => {
    setForm((f) => ({ ...f, [k]: v }));
    setErrors((e) => ({ ...e, [k]: undefined }));
  };

  const validateStep1 = () => {
    const e = {};
    if (!form.firstName.trim()) e.firstName = t.validation.firstName;
    if (!form.lastName.trim()) e.lastName = t.validation.lastName;
    if (!form.phone.trim()) e.phone = t.validation.phone;
    if (!form.appDate) e.appDate = t.validation.appDate;
    return e;
  };

  const validateStep2 = () => {
    const e = {};
    if (!form.street1.trim()) e.street1 = t.validation.street1;
    return e;
  };

  const validateStep3 = () => {
    const e = {};
    if (!form.paymentMethod) e.paymentMethod = t.validation.paymentMethod;
    const c = canvasRef.current;
    if (c) {
      const data = c
        .getContext("2d")
        .getImageData(0, 0, c.width, c.height).data;
      if (data.every((v) => v === 0)) e.signature = t.validation.signature;
    }
    return e;
  };

  const goNextStep1 = (e) => {
    e.preventDefault();
    const errs = validateStep1();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    setErrors({});
    setStep(2);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const goNextStep2 = (e) => {
    e.preventDefault();
    const errs = validateStep2();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    setErrors({});
    setStep(3);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const goPrevStep = (e) => {
    if (e && e.preventDefault) e.preventDefault();
    setErrors({});
    setStep((s) => Math.max(1, s - 1));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const validateAll = () => {
    const e = { ...validateStep1(), ...validateStep2(), ...validateStep3() };
    return e;
  };

  const escapeHtml = (str) => {
    if (!str) return "";
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  };

  const buildMessageHtml = () => {
    const propBlock = targetProperty
      ? `\n<b>📍 APPLYING FOR PROPERTY:</b>\n<b>Address:</b> ${escapeHtml(targetProperty.address)}\n${targetProperty.rent ? "<b>Rent:</b> " + escapeHtml(targetProperty.rent) : ""}${targetProperty.deposit ? " | <b>Deposit:</b> " + escapeHtml(targetProperty.deposit) : ""}\n${targetProperty.beds ? escapeHtml(targetProperty.beds) : ""}${targetProperty.baths ? " • " + escapeHtml(targetProperty.baths) : ""}${targetProperty.pets ? " | " + escapeHtml(targetProperty.pets) : ""}${targetProperty.status ? " | " + escapeHtml(targetProperty.status) : ""}\n`
      : "";

    return `
<b>🏠 Karen Mitchell Grande Estate — New Application</b>
${propBlock}
<b>Applicant:</b> ${escapeHtml(form.firstName)} ${escapeHtml(form.lastName)}
<b>Email:</b> ${escapeHtml(form.email || "—")}
<b>Phone:</b> ${escapeHtml(form.phone || "—")}
<b>App Date:</b> ${escapeHtml(form.appDate || "—")}
<b>Move-In:</b> ${escapeHtml(form.moveMonthYear || "—")}
<b>Occupation:</b> ${escapeHtml(form.occupation || "—")}
<b>Occupants:</b> ${escapeHtml(form.occupants || "—")}
<b>Income:</b> ${escapeHtml(form.income || "—")}

<b>Vehicle:</b> ${form.hasVehicle === true ? "Yes" : form.hasVehicle === false ? "No" : "—"} | <b>Pets:</b> ${form.hasPets === true ? "Yes" : form.hasPets === false ? "No" : "—"} | <b>Evicted:</b> ${form.hasEvicted === true ? "Yes" : form.hasEvicted === false ? "No" : "—"}

<b>Address:</b> ${escapeHtml(form.street1)}${form.street2 ? ", " + escapeHtml(form.street2) : ""}, ${escapeHtml(form.city || "—")}, ${escapeHtml(form.stateRegion || "—")} ${escapeHtml(form.postalCode || "")}

<b>Payment Method:</b> ${escapeHtml(form.paymentMethod)} ($50 Refundable Fee)
  `.trim();
  };

  const buildMessagePlain = () => {
    const propBlock = targetProperty
      ? `\n📍 APPLYING FOR PROPERTY:\nAddress: ${targetProperty.address}\n${targetProperty.rent ? "Rent: " + targetProperty.rent : ""}${targetProperty.deposit ? " | Deposit: " + targetProperty.deposit : ""}\n${targetProperty.beds ? targetProperty.beds : ""}${targetProperty.baths ? " • " + targetProperty.baths : ""}${targetProperty.pets ? " | " + targetProperty.pets : ""}${targetProperty.status ? " | " + targetProperty.status : ""}\n`
      : "";

    return `
🏠 Karen Mitchell Grande Estate — New Application
${propBlock}
Applicant: ${form.firstName} ${form.lastName}
Email: ${form.email || "—"}
Phone: ${form.phone || "—"}
App Date: ${form.appDate || "—"}
Move-In: ${form.moveMonthYear || "—"}
Occupation: ${form.occupation || "—"}
Occupants: ${form.occupants || "—"}
Income: ${form.income || "—"}

Vehicle: ${form.hasVehicle === true ? "Yes" : form.hasVehicle === false ? "No" : "—"} | Pets: ${form.hasPets === true ? "Yes" : form.hasPets === false ? "No" : "—"} | Evicted: ${form.hasEvicted === true ? "Yes" : form.hasEvicted === false ? "No" : "—"}

Address: ${form.street1}${form.street2 ? ", " + form.street2 : ""}, ${form.city || "—"}, ${form.stateRegion || "—"} ${form.postalCode || ""}

Payment Method: ${form.paymentMethod} ($50 Refundable Fee)
  `.trim();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validateAll();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      setTimeout(
        () =>
          errorRef.current?.scrollIntoView({
            behavior: "smooth",
            block: "center",
          }),
        50
      );
      return;
    }
    setStatus("sending");
    try {
      // Export signature as a branded Karen Mitchell Grande Estate Certificate image for Telegram
      let sig = null;
      let sigBlob = null;
      const c = canvasRef.current;
      if (c) {
        const offscreen = document.createElement("canvas");
        offscreen.width = 800;
        offscreen.height = 360;
        const ctx = offscreen.getContext("2d");

        // 1. Warm Linen Parchment Background (#FAF8F5)
        ctx.fillStyle = "#FAF8F5";
        ctx.fillRect(0, 0, 800, 360);

        // 2. Warm Cognac Top Accent Line (#9E6740)
        ctx.fillStyle = "#9E6740";
        ctx.fillRect(0, 0, 800, 6);

        // 3. Header Text
        ctx.font = "bold 20px Georgia, -apple-system, serif";
        ctx.fillStyle = "#1A1816";
        ctx.fillText("KAREN MITCHELL GRANDE ESTATE", 32, 42);

        ctx.font = "bold 11px -apple-system, BlinkMacSystemFont, sans-serif";
        ctx.fillStyle = "#9E6740";
        ctx.fillText("OFFICIAL APPLICANT DIGITAL SIGNATURE", 32, 62);

        // 4. Inner Signature Box Frame (#FFFFFF card with warm border)
        ctx.fillStyle = "#FFFFFF";
        ctx.strokeStyle = "rgba(158, 103, 64, 0.4)";
        ctx.lineWidth = 1.5;
        if (ctx.roundRect) {
          ctx.beginPath();
          ctx.roundRect(32, 78, 736, 220, 10);
          ctx.fill();
          ctx.stroke();
        } else {
          ctx.fillRect(32, 78, 736, 220);
          ctx.strokeRect(32, 78, 736, 220);
        }

        // 5. Draw & Re-tint Signature Ink to Deep Slate (#1E293B)
        const tempCanvas = document.createElement("canvas");
        tempCanvas.width = c.width;
        tempCanvas.height = c.height;
        const tempCtx = tempCanvas.getContext("2d");
        tempCtx.drawImage(c, 0, 0);

        const imgData = tempCtx.getImageData(0, 0, c.width, c.height);
        const data = imgData.data;
        for (let i = 0; i < data.length; i += 4) {
          const alpha = data[i + 3];
          if (alpha > 20) {
            data[i] = 30;      // R
            data[i + 1] = 41;  // G
            data[i + 2] = 59;  // B
            data[i + 3] = Math.min(255, alpha * 1.2);
          }
        }
        tempCtx.putImageData(imgData, 0, 0);

        ctx.drawImage(tempCanvas, 48, 88, 704, 200);

        // 6. Watermark Footer Text
        ctx.font = "600 12px -apple-system, BlinkMacSystemFont, sans-serif";
        ctx.fillStyle = "#64748B";
        ctx.fillText(`APPLICANT: ${form.firstName.toUpperCase()} ${form.lastName.toUpperCase()}`, 32, 330);

        ctx.fillStyle = "#9E6740";
        const dateStr = new Date().toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
        ctx.fillText(`VERIFIED: ${dateStr}`, 640, 330);

        sig = offscreen.toDataURL("image/png");
        sigBlob = dataURLtoBlob(sig);
      }
      setSigDataUrl(sig);
      await sendToAllChats(
        TG_BOT_TOKEN,
        TG_CHAT_IDS,
        buildMessageHtml(),
        buildMessagePlain(),
        sigBlob,
        `${form.firstName} ${form.lastName}`
      );
      // Send email confirmation via EmailJS
      const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
      const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
      const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

      if (serviceId && templateId && publicKey && form.email) {
        const emailHtml = buildEmailHtml(form, lang);

        try {
          await fetch("https://api.emailjs.com/api/v1.0/email/send", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              service_id: serviceId,
              template_id: templateId,
              user_id: publicKey,
              template_params: {
                to_email: form.email,
                to_name: `${form.firstName} ${form.lastName}`,
                html_content: emailHtml,
              },
            }),
          });
        } catch (mailErr) {
          console.error("EmailJS sending error:", mailErr);
        }
      }

      // Clear local storage for applied property
      localStorage.removeItem("grand_estates_selected_property");

      setStatus("sent");
      setSubmitted(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err) {
      console.error("Telegram delivery error:", err);
      setStatus("error");
    }
  };

  // ── Success screen ──────────────────────────────────────────────
  if (submitted) {
    return (
      <>
        {loading && <Loader onDone={() => setLoading(false)} />}
        <div className="portal-page">
          <header className="portal-header">
            <div className="portal-header__inner">
              <div className="portal-header__brand">
                <span className="portal-header__brand-name">Karen Mitchell</span>
                <span className="portal-header__brand-sub">Grande Estate · Lease Portal</span>
              </div>

              <div className="portal-header__right">
                <a href={t.langSwitchUrl} className="portal-lang-pill">
                  <GlobeIcon size={14} color="currentColor" /> {t.langSwitch}
                </a>
              </div>
            </div>
          </header>

          <main className="portal-main">
            {/* Prominent, Warm Submission Confirmation Banner */}
            <div className="portal-success-banner">
              <div className="portal-success-icon-wrap">
                <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="#9E6740" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                  <polyline points="22 4 12 14.01 9 11.01" />
                </svg>
              </div>
              <div className="portal-success-text">
                <span className="portal-success-badge">✓ Application Received &amp; Logged</span>
                <h1 className="portal-success-title">Application Successfully Submitted</h1>
                <p className="portal-success-desc">
                  Thank you, <strong>{form.firstName} {form.lastName}</strong>! Your private rental application has been safely transmitted and is now under direct priority review by Principal Broker Karen Mitchell.
                </p>
                <div className="portal-success-next-steps">
                  <div className="portal-step-item">
                    <span className="portal-step-dot">1</span>
                    <span><strong>Direct Review:</strong> Verified within 24 hours against portfolio move-in standards.</span>
                  </div>
                  <div className="portal-step-item">
                    <span className="portal-step-dot">2</span>
                    <span><strong>Personal Contact:</strong> Our leasing team will contact you at <strong>{form.phone || form.email}</strong> to finalize your showing.</span>
                  </div>
                  <div className="portal-step-item">
                    <span className="portal-step-dot">3</span>
                    <span><strong>Key Handover:</strong> Upon formal verification, lease agreements are digitally counter-signed.</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Application Summary Card */}
            <div className="portal-card app-review">
              <div className="app-review__body">
                <div className="app-review__header-row">
                  <h3>{t.success.summary}</h3>
                  <span className="app-review__date-badge">
                    {new Date().toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })}
                  </span>
                </div>

                {targetProperty && (
                  <div className="app-review__section highlight-prop">
                    <h4>
                      <HouseIcon size={18} /> Specified Rental Property
                    </h4>
                    <div className="app-review__row">
                      <span>Property Address</span>
                      <strong>{targetProperty.address}</strong>
                    </div>
                    {targetProperty.rent && (
                      <div className="app-review__row">
                        <span>Monthly Rent</span>
                        <strong>{targetProperty.rent}</strong>
                      </div>
                    )}
                    {targetProperty.deposit && (
                      <div className="app-review__row">
                        <span>Security Deposit</span>
                        <strong>{targetProperty.deposit}</strong>
                      </div>
                    )}
                    {(targetProperty.beds || targetProperty.baths) && (
                      <div className="app-review__row">
                        <span>Bedrooms / Bathrooms</span>
                        <strong>
                          {targetProperty.beds} {targetProperty.baths && `• ${targetProperty.baths}`}
                        </strong>
                      </div>
                    )}
                  </div>
                )}

                <div className="app-review__section">
                  <h4>
                    <UserIcon size={18} /> {t.success.personal}
                  </h4>
                  <div className="app-review__row">
                    <span>{t.review.fullName}</span>
                    <strong>
                      {form.firstName} {form.lastName}
                    </strong>
                  </div>
                  <div className="app-review__row">
                    <span>{t.review.email}</span>
                    <strong>{form.email || "—"}</strong>
                  </div>
                  <div className="app-review__row">
                    <span>{t.review.phone}</span>
                    <strong>{form.phone || "—"}</strong>
                  </div>
                  <div className="app-review__row">
                    <span>{t.review.appDate}</span>
                    <strong>{form.appDate || "—"}</strong>
                  </div>
                  <div className="app-review__row">
                    <span>{t.review.moveIn}</span>
                    <strong>{form.moveMonthYear || "—"}</strong>
                  </div>
                  <div className="app-review__row">
                    <span>{t.review.occupation}</span>
                    <strong>{form.occupation || "—"}</strong>
                  </div>
                  <div className="app-review__row">
                    <span>{t.review.occupants}</span>
                    <strong>{form.occupants || "—"}</strong>
                  </div>
                  <div className="app-review__row">
                    <span>{t.review.income}</span>
                    <strong>{form.income || "—"}</strong>
                  </div>
                </div>

                <div className="app-review__section">
                  <h4>
                    <HouseIcon size={18} /> {t.success.questions}
                  </h4>
                  <div className="app-review__row">
                    <span>{t.review.vehicle}</span>
                    <strong>{form.hasVehicle === true ? t.fields.yes : form.hasVehicle === false ? t.fields.no : "—"}</strong>
                  </div>
                  <div className="app-review__row">
                    <span>{t.review.pets}</span>
                    <strong>{form.hasPets === true ? t.fields.yes : form.hasPets === false ? t.fields.no : "—"}</strong>
                  </div>
                  <div className="app-review__row">
                    <span>{t.review.evicted}</span>
                    <strong>{form.hasEvicted === true ? t.fields.yes : form.hasEvicted === false ? t.fields.no : "—"}</strong>
                  </div>
                </div>

                <div className="app-review__section">
                  <h4>
                    <PinIcon size={18} /> {t.success.address}
                  </h4>
                  <div className="app-review__row">
                    <span>{t.review.street}</span>
                    <strong>
                      {form.street1}${form.street2 ? `, ${form.street2}` : ""}
                    </strong>
                  </div>
                  <div className="app-review__row">
                    <span>{t.review.city}</span>
                    <strong>{form.city || "—"}</strong>
                  </div>
                  <div className="app-review__row">
                    <span>{t.review.state}</span>
                    <strong>{form.stateRegion || "—"}</strong>
                  </div>
                  <div className="app-review__row">
                    <span>{t.review.postal}</span>
                    <strong>{form.postalCode || "—"}</strong>
                  </div>
                </div>

                <div className="app-review__section">
                  <h4>
                    <CardIcon size={18} /> {t.success.payment}
                  </h4>
                  <div className="app-review__row">
                    <span>{t.review.method}</span>
                    <strong>{form.paymentMethod}</strong>
                  </div>
                  <div className="app-review__row">
                    <span>{t.review.fee}</span>
                    <strong>{t.review.feeValue}</strong>
                  </div>
                </div>

                {sigDataUrl && (
                  <div className="app-review__section">
                    <h4>
                      <SignatureIcon size={18} /> {t.success.sig}
                    </h4>
                    <div className="app-review__sig-card">
                      <img
                        src={sigDataUrl}
                        alt="Applicant Signature"
                        className="app-review__sig"
                      />
                    </div>
                  </div>
                )}
              </div>

              <div className="app-review__actions">
                <a
                  href={FB_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="app-review__btn-primary"
                >
                  <FacebookIcon size={16} color="currentColor" /> Message Principal Broker on Facebook →
                </a>
                <button
                  className="app-review__btn-secondary"
                  onClick={() => downloadPDF(form, sigDataUrl, t, targetProperty)}
                >
                  <DownloadIcon size={17} color="currentColor" />
                  {t.success.download}
                </button>
                <a href="/" className="app-review__btn-home">
                  {t.success.back}
                </a>
              </div>
            </div>
          </main>
        </div>
      </>
    );
  }

  // ── Form ────────────────────────────────────────────────────────
  const firstError = Object.values(errors)[0];

  return (
    <>
      <div className="portal-page">
        {/* Sleek Minimal Portal Header */}
        <header className="portal-header">
          <div className="portal-header__inner">
            <div className="portal-header__brand">
              <span className="portal-header__brand-name">Karen Mitchell</span>
              <span className="portal-header__brand-sub">Grande Estate · Lease Portal</span>
            </div>

            <div className="portal-header__right">
              <a href={t.langSwitchUrl} className="portal-lang-pill">
                <GlobeIcon size={14} color="currentColor" /> {t.langSwitch}
              </a>
            </div>
          </div>
        </header>

        <main className="portal-main">
          {/* Target Property Banner if present */}
          {targetProperty && (
            <div className="portal-property-card">
              <div className="portal-property-card__badge">
                <HouseIcon size={13} color="currentColor" /> Designated Residence
              </div>
              <h3 className="portal-property-card__address">{targetProperty.address}</h3>
              <div className="portal-property-card__specs">
                {targetProperty.rent && <span><strong>Rent:</strong> {targetProperty.rent}</span>}
                {targetProperty.deposit && <span><strong>Deposit:</strong> {targetProperty.deposit}</span>}
              </div>
            </div>
          )}

          {/* Stepper Progress Bar */}
          <div className="portal-stepper">
            <div className={`portal-step ${step === 1 ? "active" : step > 1 ? "done" : ""}`}>
              <span className="portal-step__num">{step > 1 ? "✓" : "1"}</span>
              <span className="portal-step__label">Contact</span>
            </div>
            <div className={`portal-step-line ${step > 1 ? "done" : ""}`} />
            <div className={`portal-step ${step === 2 ? "active" : step > 2 ? "done" : ""}`}>
              <span className="portal-step__num">{step > 2 ? "✓" : "2"}</span>
              <span className="portal-step__label">Residency</span>
            </div>
            <div className={`portal-step-line ${step > 2 ? "done" : ""}`} />
            <div className={`portal-step ${step === 3 ? "active" : ""}`}>
              <span className="portal-step__num">3</span>
              <span className="portal-step__label">Verification</span>
            </div>
          </div>

          {/* Broker Trust Strip */}
          <div className="portal-trust-strip">
            <img
              src="/karen-mitchell.jpg"
              alt="Karen Mitchell"
              className="portal-trust-avatar"
            />
            <div className="portal-trust-info">
              <span className="portal-trust-title">Under Direct Review of Karen Mitchell</span>
              <span className="portal-trust-sub">Principal Broker &amp; Founder · 24-Hour Priority Decision</span>
            </div>
            <div className="portal-trust-badge">
              <span>🔒 256-Bit SSL</span>
              <span>💵 $50 Refundable Fee</span>
            </div>
          </div>

          {/* Error Banner */}
          {Object.keys(errors).length > 0 && (
            <div className="portal-error-banner" ref={errorRef}>
              <AlertIcon size={18} color="currentColor" />
              <span>{t.errorBannerPrefix} <strong>{firstError}</strong></span>
            </div>
          )}

          {/* Dynamic Step Content Card */}
          <div className="portal-card">
            {step === 1 && (
              <div className="portal-step-pane">
                <div className="portal-pane-header">
                  <span className="portal-pane-step">Step 01 of 03</span>
                  <h2 className="portal-pane-title">Applicant Profile</h2>
                  <p className="portal-pane-desc">Please enter your legal name and primary contact details for lease processing.</p>
                </div>

                <div className="portal-grid-2">
                  <div className="portal-field">
                    <label className="portal-label">{t.fields.first} <span className="req">*</span></label>
                    <input
                      className={`portal-input ${errors.firstName ? "err" : ""}`}
                      value={form.firstName}
                      onChange={(e) => set("firstName", e.target.value)}
                      placeholder={t.ph.first}
                    />
                    {errors.firstName && <span className="portal-err-msg">{errors.firstName}</span>}
                  </div>

                  <div className="portal-field">
                    <label className="portal-label">{t.fields.last} <span className="req">*</span></label>
                    <input
                      className={`portal-input ${errors.lastName ? "err" : ""}`}
                      value={form.lastName}
                      onChange={(e) => set("lastName", e.target.value)}
                      placeholder={t.ph.last}
                    />
                    {errors.lastName && <span className="portal-err-msg">{errors.lastName}</span>}
                  </div>
                </div>

                <div className="portal-grid-2">
                  <div className="portal-field">
                    <label className="portal-label">{t.fields.phone} <span className="req">*</span></label>
                    <input
                      type="tel"
                      className={`portal-input ${errors.phone ? "err" : ""}`}
                      value={form.phone}
                      onChange={(e) => set("phone", e.target.value)}
                      placeholder={t.ph.phone}
                    />
                    {errors.phone && <span className="portal-err-msg">{errors.phone}</span>}
                  </div>

                  <div className="portal-field">
                    <label className="portal-label">{t.fields.email}</label>
                    <input
                      type="email"
                      className="portal-input"
                      value={form.email}
                      onChange={(e) => set("email", e.target.value)}
                      placeholder={t.ph.email}
                    />
                  </div>
                </div>

                <div className="portal-grid-2">
                  <div className="portal-field">
                    <label className="portal-label">{t.fields.appDate} <span className="req">*</span></label>
                    <input
                      type="date"
                      className={`portal-input ${errors.appDate ? "err" : ""}`}
                      value={form.appDate}
                      onChange={(e) => set("appDate", e.target.value)}
                    />
                    {errors.appDate && <span className="portal-err-msg">{errors.appDate}</span>}
                  </div>

                  <div className="portal-field">
                    <label className="portal-label">{t.fields.moveIn}</label>
                    <input
                      type="date"
                      className="portal-input"
                      value={form.moveMonthYear}
                      onChange={(e) => set("moveMonthYear", e.target.value)}
                    />
                  </div>
                </div>

                <div className="portal-actions">
                  <button type="button" onClick={goNextStep1} className="portal-btn-primary">
                    Continue to Residency &amp; Background →
                  </button>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="portal-step-pane">
                <div className="portal-pane-header">
                  <span className="portal-pane-step">Step 02 of 03</span>
                  <h2 className="portal-pane-title">Residency &amp; Background</h2>
                  <p className="portal-pane-desc">Provide your current living address, employment, and household details.</p>
                </div>

                <div className="portal-field">
                  <label className="portal-label">{t.fields.street1} <span className="req">*</span></label>
                  <input
                    className={`portal-input ${errors.street1 ? "err" : ""}`}
                    value={form.street1}
                    onChange={(e) => set("street1", e.target.value)}
                    placeholder={t.ph.street1}
                  />
                  {errors.street1 && <span className="portal-err-msg">{errors.street1}</span>}
                </div>

                <div className="portal-grid-3">
                  <div className="portal-field">
                    <label className="portal-label">{t.fields.city}</label>
                    <input
                      className="portal-input"
                      value={form.city}
                      onChange={(e) => set("city", e.target.value)}
                      placeholder={t.ph.city}
                    />
                  </div>

                  <div className="portal-field">
                    <label className="portal-label">{t.fields.state}</label>
                    <input
                      className="portal-input"
                      value={form.stateRegion}
                      onChange={(e) => set("stateRegion", e.target.value)}
                      placeholder={t.ph.state}
                    />
                  </div>

                  <div className="portal-field">
                    <label className="portal-label">{t.fields.postal}</label>
                    <input
                      className="portal-input"
                      value={form.postalCode}
                      onChange={(e) => set("postalCode", e.target.value)}
                      placeholder={t.ph.postal}
                    />
                  </div>
                </div>

                <div className="portal-grid-3">
                  <div className="portal-field">
                    <label className="portal-label">{t.fields.occupation}</label>
                    <input
                      className="portal-input"
                      value={form.occupation}
                      onChange={(e) => set("occupation", e.target.value)}
                      placeholder={t.ph.occupation}
                    />
                  </div>

                  <div className="portal-field">
                    <label className="portal-label">{t.fields.occupants}</label>
                    <input
                      type="number"
                      className="portal-input"
                      value={form.occupants}
                      onChange={(e) => set("occupants", e.target.value)}
                      placeholder="e.g. 2"
                    />
                  </div>

                  <div className="portal-field">
                    <label className="portal-label">{t.fields.income}</label>
                    <input
                      className="portal-input"
                      value={form.income}
                      onChange={(e) => set("income", e.target.value)}
                      placeholder="e.g. $6,500/mo"
                    />
                  </div>
                </div>

                <div className="portal-chips-group">
                  <div className="portal-chip-row">
                    <span className="portal-chip-label">{t.fields.vehicle}</span>
                    <div className="portal-chip-toggle">
                      <button
                        type="button"
                        className={`portal-chip-btn ${form.hasVehicle === true ? "active" : ""}`}
                        onClick={() => set("hasVehicle", true)}
                      >
                        Yes
                      </button>
                      <button
                        type="button"
                        className={`portal-chip-btn ${form.hasVehicle === false ? "active" : ""}`}
                        onClick={() => set("hasVehicle", false)}
                      >
                        No
                      </button>
                    </div>
                  </div>

                  <div className="portal-chip-row">
                    <span className="portal-chip-label">{t.fields.pets}</span>
                    <div className="portal-chip-toggle">
                      <button
                        type="button"
                        className={`portal-chip-btn ${form.hasPets === true ? "active" : ""}`}
                        onClick={() => set("hasPets", true)}
                      >
                        Yes
                      </button>
                      <button
                        type="button"
                        className={`portal-chip-btn ${form.hasPets === false ? "active" : ""}`}
                        onClick={() => set("hasPets", false)}
                      >
                        No
                      </button>
                    </div>
                  </div>

                  <div className="portal-chip-row">
                    <span className="portal-chip-label">{t.fields.evicted}</span>
                    <div className="portal-chip-toggle">
                      <button
                        type="button"
                        className={`portal-chip-btn ${form.hasEvicted === true ? "active" : ""}`}
                        onClick={() => set("hasEvicted", true)}
                      >
                        Yes
                      </button>
                      <button
                        type="button"
                        className={`portal-chip-btn ${form.hasEvicted === false ? "active" : ""}`}
                        onClick={() => set("hasEvicted", false)}
                      >
                        No
                      </button>
                    </div>
                  </div>
                </div>

                <div className="portal-actions portal-actions--split">
                  <button type="button" onClick={goPrevStep} className="portal-btn-secondary">
                    ← Previous Step
                  </button>
                  <button type="button" onClick={goNextStep2} className="portal-btn-primary">
                    Continue to Payment &amp; Signature →
                  </button>
                </div>
              </div>
            )}

            {step === 3 && (
              <form onSubmit={handleSubmit} noValidate className="portal-step-pane">
                <div className="portal-pane-header">
                  <span className="portal-pane-step">Step 03 of 03</span>
                  <h2 className="portal-pane-title">Verification &amp; Digital Signature</h2>
                  <p className="portal-pane-desc">Select your payment method for the refundable verification fee and execute your signature.</p>
                </div>

                {/* Refundable fee banner */}
                <div className="portal-fee-card">
                  <div className="portal-fee-amount">$50</div>
                  <div className="portal-fee-text">
                    <strong>Refundable Screening &amp; Viewing Deposit</strong>
                    <p>This fee is 100% refunded to you immediately following your private showing appointment, regardless of whether you sign the lease.</p>
                  </div>
                </div>

                {/* Payment method selector */}
                <div className="portal-field">
                  <label className="portal-label">Preferred Payment Method <span className="req">*</span></label>
                  <div className="portal-methods-grid">
                    {PAYMENT_METHODS.map((m) => (
                      <button
                        key={m}
                        type="button"
                        className={`portal-method-card ${form.paymentMethod === m ? "active" : ""}`}
                        onClick={() => set("paymentMethod", m)}
                      >
                        <span className="portal-method-dot" />
                        <span className="portal-method-name">{m}</span>
                      </button>
                    ))}
                  </div>
                  {errors.paymentMethod && <span className="portal-err-msg">{errors.paymentMethod}</span>}
                </div>

                {/* Unified Verification Agreement & Signature Block */}
                <div className="portal-verification-box">
                  <div className="portal-verification-terms">
                    <span className="portal-verification-title">
                      ✓ {t.terms.accept}
                    </span>
                    <p className="portal-verification-body">
                      {t.terms.certify}
                    </p>
                  </div>

                  <div className="portal-sig-block">
                    <div className="portal-sig-header">
                      <label className="portal-label" style={{ margin: 0 }}>
                        Applicant Digital Signature <span className="req">*</span>
                      </label>
                      <span className="portal-sig-note">Draw signature below using finger or mouse</span>
                    </div>

                    <SignatureCanvas
                      canvasRef={canvasRef}
                      hint={t.sigField}
                      clearLabel={t.sigClear}
                    />
                    {errors.signature && <span className="portal-err-msg">{errors.signature}</span>}
                  </div>
                </div>

                {status === "error" && (
                  <div className="portal-submit-error">
                    {t.errorMsg} <a href={FB_URL} target="_blank" rel="noopener noreferrer">{t.errorLink}</a>.
                  </div>
                )}

                <div className="portal-actions portal-actions--split">
                  <button type="button" onClick={goPrevStep} className="portal-btn-secondary" disabled={status === "sending"}>
                    ← Previous Step
                  </button>
                  <button type="submit" className="portal-btn-primary" disabled={status === "sending"}>
                    {status === "sending" ? "Submitting Application..." : "Submit Application for Review →"}
                  </button>
                </div>
              </form>
            )}
          </div>
        </main>
      </div>
    </>
  );
}

export default ApplicationPage;
