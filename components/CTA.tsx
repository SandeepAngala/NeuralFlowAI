"use client";

import React from "react";

export default function CTA() {
  return (
    <section id="cta" className="cta-section" aria-labelledby="cta-title">
      <div className="cta-bg" />
      <div className="cta-content">
        <h2 id="cta-title" className="section-title">
          Ready to automate your data stack?
        </h2>
        <p className="section-subtitle" style={{ margin: "0 auto" }}>
          Join 10,000+ engineers using NeuralFlow to orchestrate pipeline intelligence.
        </p>
        
        <form className="cta-form" onSubmit={(e) => {
          e.preventDefault();
          const target = e.target as HTMLFormElement;
          const email = (target.elements.namedItem('cta-email') as HTMLInputElement).value;
          alert(`Success! Check ${email} for your onboarding link.`);
          target.reset();
        }}>
          <label htmlFor="cta-email" className="sr-only">
            Email Address
          </label>
          <input
            id="cta-email"
            name="cta-email"
            type="email"
            placeholder="Enter your email"
            className="cta-input"
            required
          />
          <button type="submit" className="btn btn-primary">
            Start Free
          </button>
        </form>
      </div>
    </section>
  );
}
