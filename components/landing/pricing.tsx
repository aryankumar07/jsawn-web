import { Check } from "lucide-react";

const tiers = [
  {
    name: "Free",
    price: "$0",
    period: "forever",
    description: "For individuals exploring jsawn",
    features: [
      "1,000 requests/day",
      "Basic parsing & validation",
      "Community support",
      "CLI access",
    ],
    cta: "Get Started",
    highlighted: false,
  },
  {
    name: "Pro",
    price: "$19",
    period: "/month",
    description: "For teams shipping production data",
    features: [
      "Unlimited requests",
      "All transforms & pipelines",
      "API Playground",
      "Priority support",
      "Team collaboration",
    ],
    cta: "Start free trial",
    highlighted: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "",
    description: "For organizations with custom needs",
    features: [
      "Everything in Pro",
      "SSO & SAML",
      "99.99% SLA",
      "Dedicated support",
      "On-prem deployment",
    ],
    cta: "Contact sales",
    highlighted: false,
  },
];

export default function Pricing() {
  return (
    <section id="pricing" className="py-20 sm:py-28 px-6">
      <div className="mx-auto max-w-5xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-neutral-900">
            Simple, transparent pricing
          </h2>
          <p className="mt-4 text-lg text-neutral-500 max-w-xl mx-auto">
            Start free. Scale when you&apos;re ready.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {tiers.map((tier) => (
            <div
              key={tier.name}
              className={`rounded-2xl p-8 border shadow-sm transition-all duration-300 ${
                tier.highlighted
                  ? "bg-neutral-900 border-neutral-800 text-white scale-[1.02]"
                  : "bg-white/40 backdrop-blur-xl border-black/[0.06] hover:bg-white/55"
              }`}
            >
              <h3
                className={`text-xs font-semibold tracking-widest uppercase ${
                  tier.highlighted ? "text-neutral-400" : "text-neutral-500"
                }`}
              >
                {tier.name}
              </h3>
              <div className="mt-4 flex items-baseline gap-1">
                <span className="text-4xl font-bold tracking-tight">
                  {tier.price}
                </span>
                <span
                  className={`text-sm ${
                    tier.highlighted ? "text-neutral-400" : "text-neutral-500"
                  }`}
                >
                  {tier.period}
                </span>
              </div>
              <p
                className={`mt-3 text-sm ${
                  tier.highlighted ? "text-neutral-400" : "text-neutral-500"
                }`}
              >
                {tier.description}
              </p>

              <ul className="mt-8 space-y-3">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-3 text-sm">
                    <Check
                      size={16}
                      className={
                        tier.highlighted
                          ? "text-white/60 shrink-0"
                          : "text-neutral-400 shrink-0"
                      }
                    />
                    <span
                      className={
                        tier.highlighted ? "text-neutral-200" : "text-neutral-700"
                      }
                    >
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              <a
                href="#"
                className={`mt-8 block text-center text-sm font-medium py-3 rounded-full transition-colors ${
                  tier.highlighted
                    ? "bg-white text-neutral-900 hover:bg-neutral-100"
                    : "bg-neutral-900 text-white hover:bg-neutral-800"
                }`}
              >
                {tier.cta}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
