"use client";

import React, { useEffect, useState } from "react";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  function smoothScroll(id: string) {
    setIsMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <header className={`header anim-nav ${isScrolled ? "scrolled" : ""}`}>
      <div className="header-inner">
        <a href="#" className="logo" aria-label="NeuralFlow AI Home">
          <svg
            className="logo-icon"
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
            <circle cx="12" cy="12" r="3" fill="var(--color-accent)" />
            <circle cx="12" cy="2" r="2" fill="var(--color-primary)" />
            <circle cx="12" cy="22" r="2" fill="var(--color-primary)" />
          </svg>
          <span className="logo-text">NeuralFlow</span>
        </a>

        <nav aria-label="Main navigation">
          <ul className={`nav-links ${isMenuOpen ? "open" : ""}`}>
            <li>
              <a
                href="#features"
                className="nav-link"
                onClick={(e) => { e.preventDefault(); smoothScroll("features"); }}
              >
                Features
              </a>
            </li>
            <li>
              <a
                href="#pricing"
                className="nav-link"
                onClick={(e) => { e.preventDefault(); smoothScroll("pricing"); }}
              >
                Pricing
              </a>
            </li>
            <li>
              <a href="#" className="nav-link" aria-label="Documentation">
                Docs
              </a>
            </li>
            <li>
              <a href="#" className="nav-link" aria-label="Blog">
                Blog
              </a>
            </li>
            <li className="nav-mobile-cta">
              <button
                className="btn btn-primary"
                style={{ width: "100%", marginTop: "1rem" }}
                onClick={() => smoothScroll("cta")}
              >
                Start Free Trial
              </button>
            </li>
          </ul>
        </nav>

        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <button
            className="btn btn-gradient-border nav-desktop-cta"
            onClick={() => smoothScroll("cta")}
          >
            Start Free Trial
          </button>

          <button
            className="mobile-toggle"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-expanded={isMenuOpen}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              {isMenuOpen ? (
                <path d="M18 6 6 18M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
}
