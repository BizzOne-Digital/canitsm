import { useCallback, useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Intro from "./Intro";
import Header from "./Header";
import Footer from "./Footer";
import "./Layout.css";

gsap.registerPlugin(ScrollTrigger);

export default function Layout() {
  const location = useLocation();
  const isHome = location.pathname === "/";
  const [introDone, setIntroDone] = useState(() => {
    if (typeof window === "undefined") return false;
    return sessionStorage.getItem("canitsm-intro") === "1" || !isHome;
  });

  const handleIntroComplete = useCallback(() => {
    sessionStorage.setItem("canitsm-intro", "1");
    setIntroDone(true);
    requestAnimationFrame(() => ScrollTrigger.refresh());
  }, []);

  useEffect(() => {
    if (!introDone && isHome) {
      document.documentElement.style.overflow = "hidden";
      document.body.style.overflow = "hidden";
      return;
    }
    document.documentElement.style.overflow = "";
    document.body.style.overflow = "";
    const t = window.setTimeout(() => ScrollTrigger.refresh(), 80);
    return () => window.clearTimeout(t);
  }, [introDone, isHome, location.pathname]);

  useEffect(() => {
    // Keep scroll position when opening/closing service rock overlay
    if (location.pathname.startsWith("/services")) {
      ScrollTrigger.refresh();
      return;
    }
    window.scrollTo(0, 0);
    ScrollTrigger.refresh();
  }, [location.pathname]);

  const showIntro = isHome && !introDone;
  const ready = introDone || !isHome;

  return (
    <>
      {showIntro && <Intro onComplete={handleIntroComplete} />}
      <div className={`app ${ready ? "app--ready" : "app--locked"}`}>
        <Header ready={ready} />
        <Outlet context={{ introDone: ready }} />
        <Footer />
        <div className="site-grain" aria-hidden="true" />
        <div className="site-vignette" aria-hidden="true" />
      </div>
    </>
  );
}
