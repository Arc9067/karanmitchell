import React, { useState, useCallback, useEffect, useRef } from "react";
import Nav from "./components/Nav";
import Hero from "./components/Hero";
import Residences from "./components/Residences";
import About from "./components/About";
import HowItWorks from "./components/HowItWorks";
import Footer from "./components/Footer";
import ApplicationPage from "./components/ApplicationPage";
import { useReveal } from "./hooks/useReveal";

function HomePage() {
  useReveal();

  useEffect(() => {
    const target = localStorage.getItem("karen_mitchell_scroll_target") || localStorage.getItem("karen_mitchell_scroll_target");
    if (target) {
      localStorage.removeItem("karen_mitchell_scroll_target");
      localStorage.removeItem("karen_mitchell_scroll_target");
      setTimeout(() => {
        document.getElementById(target)?.scrollIntoView({ behavior: "smooth" });
      }, 150);
    }
  }, []);

  return (
    <>
      <Hero />
      <Residences />
      <About />
      <HowItWorks />
      <Footer />
    </>
  );
}

function getRoute() {
  const path = window.location.pathname.replace(/\/$/, "");
  if (path === "/application" || path === "/application/en")
    return { view: "application", lang: "en" };
  if (path === "/application/es") return { view: "application", lang: "es" };
  return { view: "home", lang: "en" };
}

function App() {
  const [route, setRoute] = useState(getRoute);

  const mountedRef = useRef(true);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", "light");
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  }, []);

  const readRoute = useCallback(() => {
    if (!mountedRef.current) return;
    setRoute(getRoute());
  }, []);

  useEffect(() => {
    readRoute();
    window.addEventListener("popstate", readRoute);
    return () => window.removeEventListener("popstate", readRoute);
  }, [readRoute]);

  const isApp = route.view === "application";

  return (
    <>
      {!isApp && <Nav />}
      {isApp && <ApplicationPage lang={route.lang} />}
      {!isApp && <HomePage />}
    </>
  );
}

export default App;
