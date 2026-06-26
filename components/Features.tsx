"use client";

import React, { useEffect, useRef, useState } from "react";

interface FeatureItem {
  title: string;
  description: string;
  icon: React.ReactNode;
}

const FEATURES: FeatureItem[] = [
  {
    title: "Neural Pipeline Builder",
    description: "Build, configure, and orchestrate AI data pipelines with an intuitive drag-and-drop workspace.",
    icon: (
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
        <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
        <path d="M12 6v12M6 12h12" />
      </svg>
    ),
  },
  {
    title: "Real-Time Data Sync",
    description: "Streaming sync engine that processes data with sub-30ms latency for real-time analytics.",
    icon: (
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
        <path d="m21 2-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L20 4" />
        <path d="M10.5 4.5 13 7l-2.5 2.5" />
      </svg>
    ),
  },
  {
    title: "Auto-Schema Detection",
    description: "Instantly detect, map, and adapt to schema changes dynamically with zero human intervention.",
    icon: (
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
        <rect width="18" height="18" x="3" y="3" rx="2" />
        <path d="M7 7h10M7 12h10M7 17h10" />
      </svg>
    ),
  },
  {
    title: "Multi-Cloud Orchestration",
    description: "Deploy, run, and scale workloads across AWS, Google Cloud, and Microsoft Azure with ease.",
    icon: (
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
        <path d="M17.5 19A3.5 3.5 0 0 0 21 15.5c0-2.79-2.54-4.5-5-4.5-.47-.47-1.12-.79-1.84-.79C13.43 7.82 11.23 6 8.5 6 4.91 6 2 8.91 2 12.5a5.5 5.5 0 0 0 5.5 5.5h10z" />
      </svg>
    ),
  },
  {
    title: "Predictive Anomaly Alerts",
    description: "ML-driven detection algorithms alert security and operations teams before anomalies cause downtime.",
    icon: (
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
        <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
        <line x1="12" y1="9" x2="12" y2="13" />
        <line x1="12" y1="17" x2="12.01" y2="17" />
      </svg>
    ),
  },
  {
    title: "Enterprise RBAC",
    description: "Role-based access controls paired with comprehensive audit trails and data governance protocols.",
    icon: (
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
        <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
      </svg>
    ),
  },
];

export default function Features() {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const prevWidthRef = useRef<number>(0);

  // ResizeObserver to detect breakpoints and synchronize state
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    prevWidthRef.current = container.clientWidth;

    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const width = entry.contentRect.width;
        const wasDesktop = prevWidthRef.current >= 768;
        const isDesktop = width >= 768;

        if (wasDesktop !== isDesktop) {
          // Breakpoint crossed
          // State is naturally preserved in activeIndex.
          // The CSS transitions/classes will automatically apply for activeIndex on the new view.
        }
        prevWidthRef.current = width;
      }
    });

    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="features" className="section" ref={containerRef} aria-labelledby="features-title">
      <span className="section-label">Features</span>
      <h2 id="features-title" className="section-title">
        Engineered for Next-Gen Data Ops
      </h2>
      <p className="section-subtitle">
        Everything you need to orchestrate complex data flows with absolute precision.
      </p>

      {/* Bento Grid (Desktop >= 768px) */}
      <div
        className="bento-grid"
        data-active-index={activeIndex}
        role="region"
        aria-label="Features Bento Grid"
      >
        {FEATURES.map((feature, idx) => (
          <article
            key={idx}
            className="bento-card"
            data-active={activeIndex === idx}
            onMouseEnter={() => setActiveIndex(idx)}
          >
            <div className="bento-icon" aria-hidden="true">
              {feature.icon}
            </div>
            <h3>{feature.title}</h3>
            <p>{feature.description}</p>
          </article>
        ))}
      </div>

      {/* Accordion (Mobile < 768px) */}
      <div className="accordion" role="region" aria-label="Features Accordion">
        {FEATURES.map((feature, idx) => {
          const isActive = activeIndex === idx;
          return (
            <div
              key={idx}
              className={`accordion-item ${isActive ? "active" : ""}`}
            >
              <button
                className="accordion-trigger"
                onClick={() => setActiveIndex(idx)}
                aria-expanded={isActive}
                aria-controls={`accordion-content-${idx}`}
                id={`accordion-trigger-${idx}`}
              >
                <span className="accordion-trigger-left">
                  <span className="accordion-trigger-icon" aria-hidden="true">
                    {feature.icon}
                  </span>
                  {feature.title}
                </span>
                <svg
                  className="accordion-chevron"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </button>
              <div
                id={`accordion-content-${idx}`}
                className="accordion-content"
                role="region"
                aria-labelledby={`accordion-trigger-${idx}`}
              >
                <div className="accordion-body">
                  <p>{feature.description}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
