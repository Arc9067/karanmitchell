import { useState, useEffect } from "react";

// Full US state code mapping
const US_STATES = {
  AL: "Alabama", AK: "Alaska", AZ: "Arizona", AR: "Arkansas", CA: "California",
  CO: "Colorado", CT: "Connecticut", DE: "Delaware", FL: "Florida", GA: "Georgia",
  HI: "Hawaii", ID: "Idaho", IL: "Illinois", IN: "Indiana", IA: "Iowa",
  KS: "Kansas", KY: "Kentucky", LA: "Louisiana", ME: "Maine", MD: "Maryland",
  MA: "Massachusetts", MI: "Michigan", MN: "Minnesota", MS: "Mississippi", MO: "Missouri",
  MT: "Montana", NE: "Nebraska", NV: "Nevada", NH: "New Hampshire", NJ: "New Jersey",
  NM: "New Mexico", NY: "New York", NC: "North Carolina", ND: "North Dakota", OH: "Ohio",
  OK: "Oklahoma", OR: "Oregon", PA: "Pennsylvania", RI: "Rhode Island", SC: "South Carolina",
  SD: "South Dakota", TN: "Tennessee", TX: "Texas", UT: "Utah", VT: "Vermont",
  VA: "Virginia", WA: "Washington", WV: "West Virginia", WI: "Wisconsin", WY: "Wyoming"
};

// Convert 2-letter country code (e.g. NG, US, GB, CA) to full English country name
function getCountryName(code) {
  if (!code) return "United States";
  try {
    const regionNames = new Intl.DisplayNames(["en"], { type: "region" });
    return regionNames.of(code.trim().toUpperCase()) || code;
  } catch (e) {
    return code;
  }
}

// Cross-reference timezone to prevent ISP headquarters false-positives (e.g. Wave Broadband CA vs actual CO)
function verifyStateWithTimezone(detectedRegion, detectedCode, rawCountry) {
  if (rawCountry !== "US") return { region: detectedRegion, regionCode: detectedCode };
  try {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || "";
    // If ISP geolocates to California but browser/system is in Mountain Time (Colorado)
    if (tz === "America/Denver" && (detectedRegion === "California" || detectedCode === "CA")) {
      return { region: "Colorado", regionCode: "CO" };
    }
    // If ISP geolocates to California but browser is in Central Time
    if (tz === "America/Chicago" && (detectedRegion === "California" || detectedCode === "CA")) {
      return { region: "Texas", regionCode: "TX" };
    }
    // If ISP geolocates to California but browser is in Eastern Time
    if (tz === "America/New_York" && (detectedRegion === "California" || detectedCode === "CA")) {
      return { region: "Florida", regionCode: "FL" };
    }
  } catch (e) {}
  return { region: detectedRegion, regionCode: detectedCode };
}

export function useGeoLocation() {
  const [geo, setGeo] = useState(() => {
    // 1. URL parameter override for instant testing (e.g. ?state=CO, ?state=TX, ?state=FL)
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const urlState = params.get("state") || params.get("region");
      if (urlState) {
        const stateUpper = urlState.trim().toUpperCase();
        const regionName = US_STATES[stateUpper] || urlState;
        const code = stateUpper.length === 2 ? stateUpper : "US";
        return {
          city: "",
          region: regionName,
          regionCode: code,
          countryCode: "US",
          country: "United States",
          isUS: true,
          loading: false,
        };
      }
    }
    return {
      city: "",
      region: "Florida",
      regionCode: "FL",
      countryCode: "US",
      country: "United States",
      isUS: true,
      loading: true,
    };
  });

  useEffect(() => {
    let isMounted = true;
    const CACHE_KEY = "karen_geo_location_v4";

    // Clear obsolete caches that may contain inaccurate ISP HQ results
    try {
      sessionStorage.removeItem("karen_geo_location");
      sessionStorage.removeItem("karen_geo_location_v2");
      sessionStorage.removeItem("karen_geo_location_v3");
    } catch (_) {}

    // Check current session storage cache
    const cached = sessionStorage.getItem(CACHE_KEY);
    if (cached) {
      try {
        const parsed = JSON.parse(cached);
        if (parsed && parsed.region) {
          if (isMounted) setGeo(parsed);
          return;
        }
      } catch (e) {}
    }

    async function detectLocation() {
      // Primary API: ipapi.co (High-precision regional routing, accurately detects Colorado)
      try {
        const res = await fetch("https://ipapi.co/json/", { signal: AbortSignal.timeout(3500) });
        if (res.ok) {
          const data = await res.json();
          if (data && (data.country_code || data.ip)) {
            const rawCountry = data.country_code || "US";
            const isUS = rawCountry === "US" && Boolean(data.region);
            const { region, regionCode } = verifyStateWithTimezone(
              isUS ? data.region : "Florida",
              isUS ? (data.region_code || "FL") : "FL",
              rawCountry
            );
            const info = {
              ip: data.ip || "",
              city: isUS ? data.city : (data.city || "Miami"),
              region: region,
              regionCode: regionCode,
              countryCode: rawCountry,
              country: data.country_name || getCountryName(rawCountry),
              rawCity: data.city || "",
              rawRegion: data.region || "",
              rawCountry: rawCountry,
              org: data.org || "",
              isUS: isUS,
              loading: false,
            };
            sessionStorage.setItem(CACHE_KEY, JSON.stringify(info));
            if (isMounted) setGeo(info);
            return;
          }
        }
      } catch (err) {}

      // Secondary API: ipinfo.io with Timezone verification safeguard
      try {
        const res2 = await fetch("https://ipinfo.io/json", { signal: AbortSignal.timeout(3500) });
        if (res2.ok) {
          const data2 = await res2.json();
          if (data2 && (data2.country || data2.ip)) {
            const rawCountry = data2.country || "US";
            const isUS = rawCountry === "US" && Boolean(data2.region);
            const { region, regionCode } = verifyStateWithTimezone(
              isUS ? data2.region : "Florida",
              isUS ? (data2.region || "FL") : "FL",
              rawCountry
            );
            const info = {
              ip: data2.ip || "",
              city: isUS ? data2.city : (data2.city || "Miami"),
              region: region,
              regionCode: regionCode,
              countryCode: rawCountry,
              country: getCountryName(rawCountry),
              rawCity: data2.city || "",
              rawRegion: data2.region || "",
              rawCountry: rawCountry,
              org: data2.org || "",
              isUS: isUS,
              loading: false,
            };
            sessionStorage.setItem(CACHE_KEY, JSON.stringify(info));
            if (isMounted) setGeo(info);
            return;
          }
        }
      } catch (e) {}

      // Fallback default
      const fallback = {
        ip: "Local Network",
        city: "Denver",
        region: "Colorado",
        regionCode: "CO",
        countryCode: "US",
        country: "United States",
        rawCity: "",
        rawRegion: "",
        rawCountry: "US",
        org: "Direct Access",
        isUS: true,
        loading: false,
      };
      if (isMounted) {
        setGeo(fallback);
      }
    }

    detectLocation();

    return () => {
      isMounted = false;
    };
  }, []);

  return geo;
}
