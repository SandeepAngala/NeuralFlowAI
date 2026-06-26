'use client'
import { useEffect, useRef } from 'react'

// Active index stored in plain variable — NOT React state
let activeIndex = -1

const features = [
  { icon: '⚡', title: 'Neural Pipeline Builder', desc: 'Build, configure, and orchestrate AI data pipelines with an intuitive drag-and-drop workspace.' },
  { icon: '🔄', title: 'Real-Time Data Sync', desc: 'Streaming sync engine that processes data with sub-30ms latency for real-time analytics.' },
  { icon: '🗂️', title: 'Auto-Schema Detection', desc: 'Instantly detect, map, and adapt to schema changes dynamically with zero human intervention.' },
  { icon: '☁️', title: 'Multi-Cloud Orchestration', desc: 'Deploy, run, and scale workloads across AWS, Google Cloud, and Microsoft Azure with ease.' },
  { icon: '🔔', title: 'Predictive Anomaly Alerts', desc: 'ML-driven detection algorithms alert security and ops teams before failures cascade.' },
  { icon: '🔐', title: 'Enterprise RBAC', desc: 'Role-based access controls paired with comprehensive audit trails and data governance protocols.' },
]

export default function Features() {
  const gridRef = useRef<HTMLDivElement>(null)
  const accordionRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const MOBILE_BREAKPOINT = 768
    let wasMobile = window.innerWidth < MOBILE_BREAKPOINT

    const observer = new ResizeObserver(() => {
      const isMobile = window.innerWidth < MOBILE_BREAKPOINT

      // Crossing desktop → mobile
      if (!wasMobile && isMobile && activeIndex >= 0) {
        // Close all accordion panels first
        accordionRefs.current.forEach((el) => {
          if (el) {
            el.style.maxHeight = '0px'
            el.parentElement?.setAttribute('data-open', 'false')
          }
        })
        // Open the active one
        const target = accordionRefs.current[activeIndex]
        if (target) {
          target.style.maxHeight = target.scrollHeight + 'px'
          target.parentElement?.setAttribute('data-open', 'true')
        }
      }

      wasMobile = isMobile
    })

    observer.observe(document.body)
    return () => observer.disconnect()
  }, [])

  function handleBentoHover(index: number) {
    activeIndex = index
    if (gridRef.current) {
      gridRef.current.setAttribute('data-active-index', String(index))
    }
    // Update card active states
    gridRef.current?.querySelectorAll('.bento-card').forEach((card, i) => {
      card.setAttribute('data-active', i === index ? 'true' : 'false')
    })
  }

  function handleAccordionToggle(index: number) {
    activeIndex = index
    accordionRefs.current.forEach((el, i) => {
      if (!el) return
      const isOpen = i === index && el.style.maxHeight !== '0px'
      el.style.maxHeight = (!isOpen && i === index) ? el.scrollHeight + 'px' : '0px'
      el.parentElement?.setAttribute('data-open', (!isOpen && i === index) ? 'true' : 'false')
    })
  }

  return (
    <section id="features" aria-labelledby="features-heading">
      <div className="features-container">
        <p className="section-eyebrow">FEATURES</p>
        <h2 id="features-heading">Engineered for Next-Gen Data Ops</h2>
        <p className="section-sub">Everything you need to orchestrate complex data flows with absolute precision.</p>

        {/* DESKTOP: Bento Grid */}
        <div ref={gridRef} className="bento-grid" data-active-index="-1" role="list">
          {features.map((f, i) => (
            <article
              key={i}
              className={`bento-card ${i === 1 ? 'bento-card--wide' : ''}`}
              data-active="false"
              onMouseEnter={() => handleBentoHover(i)}
              onMouseLeave={() => handleBentoHover(-1)}
              role="listitem"
              tabIndex={0}
              onFocus={() => handleBentoHover(i)}
              onBlur={() => handleBentoHover(-1)}
            >
              <span className="bento-icon" aria-hidden="true">{f.icon}</span>
              <h3>{f.title}</h3>
              <p>{f.desc}</p>
            </article>
          ))}
        </div>

        {/* MOBILE: Accordion */}
        <div className="accordion-list" role="list">
          {features.map((f, i) => (
            <div
              key={i}
              className="accordion-item"
              data-open="false"
              role="listitem"
            >
              <button
                className="accordion-trigger"
                onClick={() => handleAccordionToggle(i)}
                aria-expanded="false"
                aria-controls={`accordion-panel-${i}`}
              >
                <span>{f.icon} {f.title}</span>
                <svg className="accordion-icon" aria-hidden="true" width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M5 7.5L10 12.5L15 7.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              </button>
              <div
                id={`accordion-panel-${i}`}
                className="accordion-content"
                ref={el => { accordionRefs.current[i] = el }}
                style={{ maxHeight: '0px', overflow: 'hidden', transition: 'max-height 350ms ease-in-out' }}
              >
                <p className="accordion-body">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
