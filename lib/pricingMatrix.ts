export const PRICING_MATRIX = {
  tiers: {
    starter:    { baseUSD: 29,  label: 'Starter',    cta: 'Start Free Trial' },
    pro:        { baseUSD: 79,  label: 'Pro',         cta: 'Start Free Trial' },
    enterprise: { baseUSD: 249, label: 'Enterprise',  cta: 'Contact Sales' }
  },
  currencyConfig: {
    USD: { symbol: '$',  tariff: 1.000, locale: 'en-US' },
    INR: { symbol: '₹', tariff: 83.50, locale: 'en-IN' },
    EUR: { symbol: '€', tariff: 0.920, locale: 'en-DE' }
  },
  annualDiscount: 0.20
} as const

export type Currency = keyof typeof PRICING_MATRIX.currencyConfig
export type Tier = keyof typeof PRICING_MATRIX.tiers

export function computePrice(baseUSD: number, currency: Currency, isAnnual: boolean): string {
  const config = PRICING_MATRIX.currencyConfig[currency]
  const raw = baseUSD * config.tariff * (isAnnual ? (1 - PRICING_MATRIX.annualDiscount) : 1)
  const price = Math.round(raw)
  return `${config.symbol}${price.toLocaleString(config.locale)}`
}
