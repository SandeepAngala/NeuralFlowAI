import React from "react";

const COMPANIES = [
  { name: "Acme Corp", icon: "▲ Acme" },
  { name: "Globex", icon: "● Globex" },
  { name: "Initech", icon: "■ Initech" },
  { name: "Umbrella", icon: "◆ Umbrella" },
  { name: "Hooli", icon: "⬢ Hooli" },
];

const TESTIMONIALS = [
  {
    quote: "NeuralFlow automated our entire analytics pipeline in a weekend. We went from manual SQL exports to real-time streams with zero schema errors.",
    initials: "JD",
    name: "Jane Doe",
    title: "VP of Engineering at Acme Corp",
  },
  {
    quote: "The sub-30ms latency guarantee was something we were skeptical about, but NeuralFlow consistently delivers real-time sync across multi-cloud clusters.",
    initials: "MS",
    name: "Marcus Smith",
    title: "Lead Architect at Globex",
  },
  {
    quote: "Using the pricing matrix engine and multi-cloud sync, we cut AWS overhead by 40%. The predictive anomaly alerts caught three critical outages before they hit.",
    initials: "EH",
    name: "Elena Rostova",
    title: "Director of Data Operations at Initech",
  },
];

export default function SocialProof() {
  return (
    <section id="social-proof" className="section" aria-labelledby="social-proof-title">
      <span className="sr-only" id="social-proof-title">Social Proof and Testimonials</span>
      <div className="text-center" style={{ marginBottom: "3rem" }}>
        <span className="section-label">Trusted Worldwide</span>
        <h2 className="section-title">Trusted by 500+ teams at</h2>
        
        <div className="logos-row" role="list">
          {COMPANIES.map((company, idx) => (
            <div key={idx} className="logo-item" role="listitem">
              <span className="sr-only">{company.name}</span>
              {/* Displaying simple stylized typographic logo representations */}
              <span aria-hidden="true" style={{ letterSpacing: "0.05em" }}>
                {company.icon}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="testimonials-grid">
        {TESTIMONIALS.map((t, idx) => (
          <article key={idx} className="testimonial-card">
            <p className="testimonial-quote">&ldquo;{t.quote}&rdquo;</p>
            <div className="testimonial-author">
              <div className="testimonial-avatar" aria-hidden="true">
                {t.initials}
              </div>
              <div>
                <h3 className="testimonial-name">{t.name}</h3>
                <p className="testimonial-title">{t.title}</p>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
