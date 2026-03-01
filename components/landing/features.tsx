'use client'
import { useState } from "react";
import { Zap, Shield, GitBranch, ArrowRight } from "lucide-react";

const topFeatures = [
  {
    icon: Zap,
    title: "Lightning Parser",
    description:
      "Parse JSON 10x faster with our WebAssembly engine. Handle gigabyte-scale files without breaking a sweat.",
  },
  {
    icon: Shield,
    title: "Schema Validation",
    description:
      "Auto-generate and validate JSON schemas with zero config. Catch malformed data before it hits production.",
  },
  {
    icon: GitBranch,
    title: "Transform Pipelines",
    description:
      "Chain transforms like flatten, dedupe, rename, and filter. Build reusable pipelines for complex data flows.",
  },
];

export default function FeatureShowcase() {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeFeature = topFeatures[activeIndex];

  return (
    <section className="py-20 px-6">
      <div className="mx-auto max-w-[1200px]">

        {/* Main Card Container */}
        {/* The border and border-radius are applied to this single parent container, masking everything inside. */}
        <div className="bg-gradient-to-br from-[#eef2ff] via-[#f4f1fe] to-[#fcfaff] rounded-[2.5rem] p-8 lg:p-12 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white/80 relative overflow-hidden">

          {/* Decorative background blur/glow */}
          <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-white/50 blur-3xl rounded-full -translate-x-1/3 -translate-y-1/3 pointer-events-none" />

          <div className="relative z-10">

            {/* Tab Bar - Now cleanly integrated INSIDE the card */}
            <div className="flex items-center gap-1.5 bg-white/40 backdrop-blur-md p-1.5 rounded-2xl w-max mb-12 border border-white/60 shadow-sm">
              {topFeatures.map((feature, idx) => {
                const isActive = activeIndex === idx;

                return (
                  <button
                    key={idx}
                    onClick={() => setActiveIndex(idx)}
                    className={`
                      flex items-center gap-2.5 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 outline-none
                      ${isActive
                        ? "bg-white text-neutral-900 shadow-sm border border-neutral-100"
                        : "text-neutral-500 hover:text-neutral-700 hover:bg-white/50 border border-transparent"}
                    `}
                  >
                    <span className={`font-medium ${isActive ? "text-neutral-400" : "text-neutral-400"}`}>
                      0{idx + 1}
                    </span>

                    {/* Only show text for the active tab (or you can remove the condition to show for all) */}
                    {isActive && (
                      <span className="font-medium whitespace-nowrap overflow-hidden text-neutral-900 animate-[fadeIn_0.3s_ease-in-out]">
                        {feature.title}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Content Section */}
            <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-center">

              {/* Left Column: Text Content */}
              <div className="flex-1 flex flex-col justify-center">
                <div className="flex items-center gap-2 text-neutral-600 font-medium mb-6">
                  <div className="w-10 h-10 rounded-xl bg-white/60 border border-white flex items-center justify-center shadow-sm">
                    <activeFeature.icon size={20} className="text-neutral-700" />
                  </div>
                  <span>jsawn Core</span>
                </div>

                {/* Min-height prevents layout jump when text length changes */}
                <div className="min-h-[220px]">
                  <h2 className="text-4xl md:text-5xl font-bold text-neutral-900 tracking-tight mb-6">
                    {activeFeature.title}
                  </h2>

                  <p className="text-lg text-neutral-600 leading-relaxed mb-8 max-w-md">
                    {activeFeature.description}
                  </p>
                </div>

                <button className="flex items-center gap-2 bg-white/80 hover:bg-white backdrop-blur-sm border border-neutral-200/60 shadow-sm text-neutral-900 px-7 py-3 rounded-full font-medium transition-all duration-300 hover:shadow-md w-max">
                  Get Started <ArrowRight size={18} className="text-neutral-500" />
                </button>
              </div>

              {/* Right Column: Dummy App UI Image */}
              <div className="flex-[1.2] w-full relative min-h-[450px]">
                <div className="w-full h-full absolute right-0 top-0 bg-white/90 backdrop-blur-xl rounded-2xl shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] border border-white/80 overflow-hidden flex flex-col">

                  {/* Dummy Mac Window Header */}
                  <div className="h-12 border-b border-neutral-100 bg-neutral-50/50 flex items-center px-4 gap-2">
                    <div className="w-3 h-3 rounded-full bg-[#ff5f56] border border-[#e0443e]"></div>
                    <div className="w-3 h-3 rounded-full bg-[#ffbd2e] border border-[#dea123]"></div>
                    <div className="w-3 h-3 rounded-full bg-[#27c93f] border border-[#1aab29]"></div>
                    <div className="ml-4 text-xs text-neutral-400 font-medium">jsawn-workspace</div>
                  </div>

                  {/* Dummy Content Area */}
                  <div className="flex-1 bg-[#f8fafc] p-6 flex items-center justify-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:24px_24px]"></div>

                    {/* Image updates dynamically when tabs are clicked */}
                    <img
                      key={activeIndex}
                      src={`https://placehold.co/800x500/e2e8f0/475569?text=${activeFeature.title.replace(/ /g, '+')}+Interface`}
                      alt={activeFeature.title}
                      className="relative z-10 w-full h-full object-cover rounded shadow-sm border border-neutral-200/60 animate-[fadeIn_0.4s_ease-out]"
                    />
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
