import React from "react";
import "./Testimonials.css";

const STATE_CITIES = {
  FL: ["Miami", "Tampa", "Orlando", "Jacksonville", "Fort Lauderdale"],
  CA: ["Los Angeles", "San Francisco", "San Diego", "Sacramento", "San Jose"],
  TX: ["Austin", "Houston", "Dallas", "San Antonio", "Fort Worth"],
  NY: ["New York City", "Buffalo", "Albany", "Rochester", "Syracuse"],
  IL: ["Chicago", "Naperville", "Rockford", "Springfield", "Peoria"],
  GA: ["Atlanta", "Savannah", "Augusta", "Alpharetta", "Macon"],
  NC: ["Charlotte", "Raleigh", "Durham", "Greensboro", "Wilmington"],
  OH: ["Columbus", "Cleveland", "Cincinnati", "Akron", "Dayton"],
  PA: ["Philadelphia", "Pittsburgh", "Allentown", "Erie", "Scranton"],
  MI: ["Detroit", "Grand Rapids", "Ann Arbor", "Lansing", "Flint"],
  VA: ["Richmond", "Virginia Beach", "Arlington", "Norfolk", "Alexandria"],
  WA: ["Seattle", "Tacoma", "Spokane", "Bellevue", "Olympia"],
  AZ: ["Phoenix", "Tucson", "Mesa", "Scottsdale", "Chandler"],
  TN: ["Nashville", "Memphis", "Knoxville", "Chattanooga", "Clarksville"],
  CO: ["Denver", "Colorado Springs", "Aurora", "Boulder", "Fort Collins"],
  MA: ["Boston", "Cambridge", "Worcester", "Springfield", "Lowell"],
  MD: ["Baltimore", "Annapolis", "Bethesda", "Silver Spring", "Frederick"],
  NJ: ["Jersey City", "Newark", "Hoboken", "Princeton", "Trenton"],
};

function getReviewsForLocation(geo) {
  if (!geo.isUS || !geo.region) {
    return [
      {
        name: "Marcus Vance",
        role: "Tenant — Miami, FL",
        quote: "Karen Mitchell Grande Estate made relocating seamless. Submitted my application online, verified the refundable deposit, and secured my keys within 48 hours.",
      },
      {
        name: "Elena Rostova",
        role: "Property Owner — Austin, TX",
        quote: "Exceptional property management. Their tenant vetting process is flawless, ensuring responsible tenants and consistent rental yields.",
      },
      {
        name: "David & Sarah Jenkins",
        role: "Tenants — Chicago, IL",
        quote: "Transparent terms, zero surprises. The digital application and e-signature portal was the smoothest leasing experience we've ever had.",
      },
    ];
  }

  const code = (geo.regionCode || "").toUpperCase();
  const stateName = geo.region;
  const userCity = geo.city;

  let city1 = userCity || (STATE_CITIES[code]?.[0] || `${stateName} Metro`);
  let city2 = STATE_CITIES[code]?.[1] || `${stateName} Region`;
  let city3 = STATE_CITIES[code]?.[2] || `${stateName} Central`;

  if (userCity && STATE_CITIES[code]) {
    const list = STATE_CITIES[code].filter((c) => c.toLowerCase() !== userCity.toLowerCase());
    city2 = list[0] || `${stateName} Region`;
    city3 = list[1] || `${stateName} Central`;
  }

  const tag1 = code ? `${city1}, ${code}` : `${city1}, ${stateName}`;
  const tag2 = code ? `${city2}, ${code}` : `${city2}, ${stateName}`;
  const tag3 = code ? `${city3}, ${code}` : `${city3}, ${stateName}`;

  return [
    {
      name: "Marcus Vance",
      role: `Tenant — ${tag1}`,
      quote: `Karen Mitchell Grande Estate made relocating in ${stateName} seamless. Submitted my application online, verified the deposit, and secured my keys within 48 hours.`,
    },
    {
      name: "Elena Rostova",
      role: `Property Owner — ${tag2}`,
      quote: `Exceptional property management across ${stateName}. Their tenant vetting process is flawless, ensuring responsible tenants and consistent rental yields.`,
    },
    {
      name: "David & Sarah Jenkins",
      role: `Tenants — ${tag3}`,
      quote: `Transparent terms, zero surprises. Finding a managed home in ${stateName} with their digital portal was the smoothest leasing experience we've ever had.`,
    },
  ];
}

export default function Testimonials() {
  const reviews = getReviewsForLocation(geo);

  return (
    <section id="testimonials" className="reviews-section">
      <div className="section-inner">
        <div className="reviews-header text-center">
          <span className="section-tag">Client Feedback</span>
          <h2 className="section-title">
            Trusted by <span>Tenants & Property Owners</span>
          </h2>
          <p className="section-sub">
            {geo.isUS && geo.region
              ? `Hear from residents and property owners across ${geo.region} who experience our commitment to transparent leasing.`
              : "Hear from residents and property owners who experience our commitment to transparent leasing and dedicated property management."}
          </p>
        </div>

        <div className="reviews-grid">
          {reviews.map((rev, i) => (
            <div key={i} className="review-card">
              <div className="review-stars">★★★★★</div>
              <p className="review-quote">"{rev.quote}"</p>
              <div className="review-author">
                <strong>{rev.name}</strong>
                <span>{rev.role}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
