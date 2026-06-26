'use client'
import { useRef, useEffect, useCallback } from 'react'
import { computePrice, type Currency } from '@/lib/pricingMatrix'

const TIERS = [
  {
    key: 'starter' as const,
    baseUSD: 29,
    label: 'Starter',
    popular: false,
    cta: 'Start Free Trial',
    features: ['5 pipelines', '10GB storage', 'Email support', 'Basic analytics']
  },
  {
    key: 'pro' as const,
    baseUSD: 79,
    label: 'Pro',
    popular: true,
    cta: 'Start Free Trial',
    features: ['50 pipelines', '100GB storage', 'Priority support', 'Advanced analytics', 'Custom integrations']
  },
  {
    key: 'enterprise' as const,
    baseUSD: 249,
    label: 'Enterprise',
    popular: false,
    cta: 'Contact Sales',
    features: ['Unlimited pipelines', '1TB storage', 'Dedicated support', 'Full analytics suite', 'SSO + RBAC', 'SLA guarantee']
  }
]

export default function Pricing() {
  // useRef for ALL state — zero useState to prevent re-renders
  const currencyRef = useRef<Currency>('USD')
  const isAnnualRef = useRef(false)
  const saveBadgeRef = useRef<HTMLSpanElement>(null)
  const monthlyBtnRef = useRef<HTMLButtonElement>(null)
  const annualBtnRef = useRef<HTMLButtonElement>(null)

  // One ref per price span
  const priceRefs = {
    starter:    useRef<HTMLSpanElement>(null),
    pro:        useRef<HTMLSpanElement>(null),
    enterprise: useRef<HTMLSpanElement>(null),
  }

  const updateAllPrices = useCallback(() => {
    const currency = currencyRef.current
    const isAnnual = isAnnualRef.current
    TIERS.forEach(tier => {
      const el = priceRefs[tier.key].current
      if (el) el.textContent = computePrice(tier.baseUSD, currency, isAnnual)
    })
    // Show/hide save badge
    if (saveBadgeRef.current) {
      saveBadgeRef.current.style.opacity = isAnnual ? '1' : '0'
      saveBadgeRef.current.style.transform = isAnnual ? 'scale(1)' : 'scale(0.8)'
    }
    // Update toggle button styles via direct DOM
    if (monthlyBtnRef.current && annualBtnRef.current) {
      if (isAnnual) {
        monthlyBtnRef.current.setAttribute('data-active', 'false')
        annualBtnRef.current.setAttribute('data-active', 'true')
      } else {
        monthlyBtnRef.current.setAttribute('data-active', 'true')
        annualBtnRef.current.setAttribute('data-active', 'false')
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    updateAllPrices()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function handleBillingToggle(annual: boolean) {
    isAnnualRef.current = annual
    updateAllPrices()
  }

  function handleCurrencyChange(e: React.ChangeEvent<HTMLSelectElement>) {
    currencyRef.current = e.target.value as Currency
    updateAllPrices()
  }

  return (
    <section id="pricing" aria-labelledby="pricing-heading">
      <div className="pricing-container">
        <p className="section-eyebrow">PRICING MATRIX</p>
        <h2 id="pricing-heading">Flexible Plans for Every Scale</h2>
        <p className="section-sub">Simple transparent pricing that scales with your automation requirements.</p>

        {/* Controls — billing toggle + currency */}
        <div className="pricing-controls">
          <div className="billing-toggle" role="group" aria-label="Billing cycle">
            <button
              ref={monthlyBtnRef}
              data-active="true"
              onClick={() => handleBillingToggle(false)}
              aria-pressed="true"
              className="toggle-btn"
            >
              Monthly
            </button>
            <button
              ref={annualBtnRef}
              data-active="false"
              onClick={() => handleBillingToggle(true)}
              aria-pressed="false"
              className="toggle-btn"
            >
              Annual
            </button>
          </div>

          <span
            ref={saveBadgeRef}
            className="save-badge"
            aria-live="polite"
            style={{ opacity: 0, transform: 'scale(0.8)', transition: 'opacity 200ms ease-out, transform 200ms ease-out' }}
          >
            Save 20%
          </span>

          <select
            onChange={handleCurrencyChange}
            aria-label="Select currency"
            className="currency-select"
            defaultValue="USD"
          >
            <option value="USD">USD ($)</option>
            <option value="INR">INR (₹)</option>
            <option value="EUR">EUR (€)</option>
          </select>
        </div>

        {/* Pricing cards */}
        <div className="pricing-grid" role="list">
          {TIERS.map(tier => (
            <article
              key={tier.key}
              className={`pricing-card ${tier.popular ? 'pricing-card--popular' : ''}`}
              role="listitem"
            >
              {tier.popular && <div className="popular-badge">Most Popular</div>}
              <h3>{tier.label}</h3>
              <div className="price-display">
                <span ref={priceRefs[tier.key]} className="price-amount" aria-live="polite">
                  ${tier.baseUSD}
                </span>
                <span className="price-period">per month</span>
              </div>
              <ul className="feature-list" aria-label={`${tier.label} features`}>
                {tier.features.map(f => (
                  <li key={f}>
                    <svg aria-hidden="true" width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M3 8l3.5 3.5L13 4.5" stroke="var(--color-success)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    {f}
                  </li>
                ))}
              </ul>
              <button
                className={`cta-btn ${tier.popular ? 'cta-btn--primary' : 'cta-btn--ghost'}`}
                aria-label={`${tier.cta} for ${tier.label} plan`}
              >
                {tier.cta}
              </button>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
