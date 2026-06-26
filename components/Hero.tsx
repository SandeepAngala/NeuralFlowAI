import React from "react";

export default function Hero() {
  return (
    <section id="hero" className="hero" aria-labelledby="hero-title">
      <div className="hero-mesh">
        <div className="hero-mesh-orb" />
        <div className="hero-mesh-orb" />
        <div className="hero-mesh-orb" />
      </div>

      <div className="hero-content">
        <span className="eyebrow anim-eyebrow">Next-Gen AI Automation</span>
        
        <h1 id="hero-title" className="anim-h1">
          Automate Everything.<br />
          <span className="gradient-text">Intelligently.</span>
        </h1>
        
        <p className="hero-sub anim-subheadline">
          NeuralFlow transforms raw enterprise data into automated intelligence pipelines — at machine speed, with human precision.
        </p>

        <div className="hero-ctas anim-cta">
          <a href="#pricing" className="btn btn-primary">
            Get Started Free
          </a>
          <a href="#demo" className="btn btn-ghost">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="currentColor"
              stroke="none"
              aria-hidden="true"
              style={{ marginRight: "0.25rem" }}
            >
              <polygon points="5 3 19 12 5 21 5 3" />
            </svg>
            Watch Demo
          </a>
        </div>

        <div className="stats-bar anim-stats" role="list">
          <div className="stat-item" role="listitem">
            <strong>10M+</strong> Pipelines Automated
          </div>
          <div className="stat-divider" aria-hidden="true" />
          <div className="stat-item" role="listitem">
            <strong>99.97%</strong> Uptime
          </div>
          <div className="stat-divider" aria-hidden="true" />
          <div className="stat-item" role="listitem">
            <strong>&lt;30ms</strong> Latency
          </div>
          <div className="stat-divider" aria-hidden="true" />
          <div className="stat-item" role="listitem">
            <strong>SOC2</strong> Certified
          </div>
        </div>
      </div>
    </section>
  );
}
