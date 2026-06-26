"use client";

import React, { useEffect, useRef } from "react";
import { PRICING_MATRIX, computePrice } from "../lib/pricingMatrix";

export default function Pricing() {
  // refs for price spans to perform direct DOM updates and avoid parent re-renders
  const starterPriceRef = useRef<HTMLSpanElement>(null);
  const proPriceRef = useRef<HTMLSpanElement>(null);
  const enterprisePriceRef = useRef<HTMLSpanElement>(null);

  // ref for savings badge
  const savingsBadgeRef = useRef<HTMLSpanElement>(null);

  // refs for controls to handle state without causing React re-renders
  const isAnnualRef = useRef<boolean>(false);
  const currencyRef = useRef<string>("USD");

  // refs for toggle buttons to update styles directly
  const monthlyBtnRef = useRef<HTMLButtonElement>(null);
  const annualBtnRef = useRef<HTMLButtonElement>(null);

  // function to update pricing text directly in the DOM
  const updatePrices = () => {
    const currency = currencyRef.current;
    const isAnnual = isAnnualRef.current;

    const priceRefs: Record<string, React.RefObject<HTMLSpanElement>> = {
      starter: starterPriceRef,
      pro: proPriceRef,
      enterprise: enterprisePriceRef,
    };

    Object.keys(PRICING_MATRIX.tiers).forEach((key) => {
      const priceSpan = priceRefs[key]?.current;
      if (priceSpan) {
        const priceString = computePrice(key, currency, isAnnual);
        priceSpan.textContent = priceString;
      }
    });

    // Update savings badge visibility
    if (savingsBadgeRef.current) {
      if (isAnnual) {
        savingsBadgeRef.current.classList.add("visible");
      } else {
        savingsBadgeRef.current.classList.remove("visible");
      }
    }
  };

  // Set initial prices on mount (prevents hydration mismatch)
  useEffect(() => {
    updatePrices();
  }, []);

  const handleBillingToggle = (annual: boolean) => {
    if (isAnnualRef.current === annual) return;
    isAnnualRef.current = annual;

    // Toggle button active classes directly in the DOM
    if (monthlyBtnRef.current && annualBtnRef.current) {
      if (annual) {
        monthlyBtnRef.current.classList.remove("active");
        annualBtnRef.current.classList.add("active");
      } else {
        monthlyBtnRef.current.classList.add("active");
        annualBtnRef.current.classList.remove("active");
      }
    }

    updatePrices();
  };

  const handleCurrencyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    currencyRef.current = e.target.value;
    updatePrices();
  };

  return (
    <section id="pricing" className="section" aria-labelledby="pricing-title">
      <div className="text-center" style={{ marginBottom: "2rem" }}>
        <span className="section-label">Pricing Matrix</span>
        <h2 id="pricing-title" className="section-title">
          Flexible Plans for Every Scale
        </h2>
        <p className="section-subtitle" style={{ margin: "0 auto" }}>
          Simple transparent pricing that scales with your automation requirements.
        </p>
      </div>

      <div className="pricing-controls">
        <div className="billing-toggle" role="group" aria-label="Billing frequency selection">
          <button
            ref={monthlyBtnRef}
            type="button"
            className="billing-option active"
            onClick={() => handleBillingToggle(false)}
          >
            Monthly
          </button>
          <button
            ref={annualBtnRef}
            type="button"
            className="billing-option"
            onClick={() => handleBillingToggle(true)}
          >
            Annual
          </button>
        </div>

        <span ref={savingsBadgeRef} className="savings-badge" aria-live="polite">
          Save 20%
        </span>

        <label htmlFor="currency-selector" className="sr-only">
          Select Currency
        </label>
        <select
          id="currency-selector"
          className="currency-select"
          onChange={handleCurrencyChange}
          defaultValue="USD"
        >
          <option value="USD">USD ($)</option>
          <option value="INR">INR (₹)</option>
          <option value="EUR">EUR (€)</option>
        </select>
      </div>

      <div className="pricing-grid">
        {/* Starter Card */}
        <article className="pricing-card">
          <h3 className="pricing-tier">{PRICING_MATRIX.tiers.starter.label}</h3>
          <div className="pricing-price">
            <span ref={starterPriceRef}></span>
          </div>
          <div className="pricing-period">per month</div>
          <ul className="pricing-features">
            {PRICING_MATRIX.tiers.starter.features.map((feature, idx) => (
              <li key={idx} className="pricing-feature">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="var(--color-success)"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                {feature}
              </li>
            ))}
          </ul>
          <a href="#register" className="pricing-cta pricing-cta-ghost">
            Start Free Trial
          </a>
        </article>

        {/* Pro Card - Highlighted */}
        <article className="pricing-card popular">
          <span className="pricing-badge">Most Popular</span>
          <h3 className="pricing-tier">{PRICING_MATRIX.tiers.pro.label}</h3>
          <div className="pricing-price">
            <span ref={proPriceRef}></span>
          </div>
          <div className="pricing-period">per month</div>
          <ul className="pricing-features">
            {PRICING_MATRIX.tiers.pro.features.map((feature, idx) => (
              <li key={idx} className="pricing-feature">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="var(--color-success)"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                {feature}
              </li>
            ))}
          </ul>
          <a href="#register" className="pricing-cta pricing-cta-primary">
            Start Free Trial
          </a>
        </article>

        {/* Enterprise Card */}
        <article className="pricing-card">
          <h3 className="pricing-tier">{PRICING_MATRIX.tiers.enterprise.label}</h3>
          <div className="pricing-price">
            <span ref={enterprisePriceRef}></span>
          </div>
          <div className="pricing-period">per month</div>
          <ul className="pricing-features">
            {PRICING_MATRIX.tiers.enterprise.features.map((feature, idx) => (
              <li key={idx} className="pricing-feature">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="var(--color-success)"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                {feature}
              </li>
            ))}
          </ul>
          <a href="#contact" className="pricing-cta pricing-cta-ghost">
            Contact Sales
          </a>
        </article>
      </div>
    </section>
  );
}
