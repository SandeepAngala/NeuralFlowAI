export interface TierConfig {
  baseUSD: number;
  label: string;
  features: string[];
}

export interface CurrencyConfig {
  symbol: string;
  tariff: number;
}

export interface PricingMatrixType {
  tiers: Record<string, TierConfig>;
  currencyConfig: Record<string, CurrencyConfig>;
  annualDiscount: number;
}

export const PRICING_MATRIX: PricingMatrixType = {
  tiers: {
    starter: {
      baseUSD: 29,
      label: "Starter",
      features: [
        "5 pipelines",
        "10GB storage",
        "Email support",
        "Basic analytics",
      ],
    },
    pro: {
      baseUSD: 79,
      label: "Pro",
      features: [
        "50 pipelines",
        "100GB storage",
        "Priority support",
        "Advanced analytics",
        "Custom integrations",
      ],
    },
    enterprise: {
      baseUSD: 249,
      label: "Enterprise",
      features: [
        "Unlimited pipelines",
        "1TB storage",
        "Dedicated support",
        "Full analytics suite",
        "SSO + RBAC",
        "SLA guarantee",
      ],
    },
  },
  currencyConfig: {
    USD: { symbol: "$", tariff: 1.0 },
    INR: { symbol: "₹", tariff: 83.5 },
    EUR: { symbol: "€", tariff: 0.92 },
  },
  annualDiscount: 0.2,
};

/**
 * Compute final price — NEVER hardcode display prices.
 * Formula: baseUSD * tariff * (1 - annualDiscount if annual)
 * Rounded to nearest integer.
 */
export function computePrice(
  tierKey: string,
  currency: string,
  isAnnual: boolean
): string {
  const tier = PRICING_MATRIX.tiers[tierKey];
  const config = PRICING_MATRIX.currencyConfig[currency];
  if (!tier || !config) return "";

  const raw = tier.baseUSD * config.tariff * (isAnnual ? 1 - PRICING_MATRIX.annualDiscount : 1);
  const rounded = Math.round(raw);
  return `${config.symbol}${rounded}`;
}
