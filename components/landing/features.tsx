'use client'
import React, { useRef } from "react";
import { FileCode, Globe, List, ArrowRight } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";

const topFeatures = [
  {
    icon: FileCode,
    title: "In-Terminal Schema Generation",
    description: "Infer Go, TypeScript, or Zod schemas from any JSON in one command. Copy to clipboard instantly.",
    bgGradient: "from-[#eef2ff] via-[#f4f1fe] to-[#fcfaff]",
    image: "/assets/schema.png",
  },
  {
    icon: Globe,
    title: "Multi-Source Tabs & HTTP Client",
    description: "Open local files and API endpoints as switchable tabs. POST, inspect, and compare — all in one session.",
    bgGradient: "from-[#fff1f2] via-[#fff0f5] to-[#fcfaff]",
    image: "/assets/tabs.png",
  },
  {
    icon: List,
    title: "Flat View with jq Paths",
    description: "Press f to flatten the tree into .path = value pairs. Find any leaf without caring about nesting.",
    bgGradient: "from-[#f0fdf4] via-[#f0fdfa] to-[#fcfaff]",
    image: "/assets/flatten.png",
  },
];

type Feature = {
  icon: React.ElementType;
  title: string;
  description: string;
  bgGradient: string;
  image: string;
};

const FeatureCard = ({ feature, index, totalCards }: { feature: Feature; index: number; totalCards: number }) => {
  const cardRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start start", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.9]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0.4]);

  const ActiveIcon = feature.icon;

  const isLast = index === totalCards - 1;

  return (
    <div
      ref={cardRef}
      className={`sticky top-0 h-screen w-full flex items-center justify-center px-6 ${isLast ? "mb-32" : ""}`}
    >
      <motion.div
        style={{ scale, opacity }}
        className={`w-full max-w-[1200px] bg-gradient-to-br ${feature.bgGradient} rounded-[2.5rem] p-8 lg:p-12 shadow-[0_-10px_40px_rgb(0,0,0,0.06)] border border-white/80 relative overflow-hidden min-h-[600px] flex flex-col justify-center origin-top`}
      >

        <div className="absolute top-0 left-0 w-[600px] h-[600px] blur-3xl rounded-full -translate-x-1/3 -translate-y-1/3 pointer-events-none" />

        <div className="relative z-10 w-full">
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-center">

            <div className="flex-1 flex flex-col justify-center">
              <div className="flex items-center gap-2 text-neutral-600 font-medium mb-6">
                <div className="w-10 h-10 rounded-xl bg-white/60 border border-white flex items-center justify-center shadow-sm">
                  <ActiveIcon size={20} className="text-neutral-700" />
                </div>
                <span>jsawn Core • Step 0{index + 1}</span>
              </div>

              <h2 className="text-4xl md:text-5xl font-semibold tracking-tight mb-6 leading-[1.1]">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-neutral-700 via-neutral-900 to-neutral-600">
                  {feature.title}
                </span>
              </h2>

              <p className="text-lg text-neutral-500 leading-relaxed mb-8 max-w-md">
                {feature.description}
              </p>

              <button className="flex items-center gap-2 bg-white/80 hover:bg-white backdrop-blur-sm border border-neutral-200/60 shadow-sm text-neutral-900 px-7 py-3 rounded-full font-medium transition-all duration-300 hover:shadow-md w-max">
                Get Started <ArrowRight size={18} className="text-neutral-500" />
              </button>
            </div>

            <div className="flex-[1.2] w-full relative min-h-[400px]">
              <div className="w-full h-full absolute right-0 top-0 bg-white/90 backdrop-blur-xl rounded-2xl shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] border border-white/80 overflow-hidden flex flex-col">
                <div className="h-12 border-b border-neutral-100 bg-neutral-50/50 flex items-center px-4 gap-2 relative z-20">
                  <div className="w-3 h-3 rounded-full bg-[#ff5f56] border border-[#e0443e]"></div>
                  <div className="w-3 h-3 rounded-full bg-[#ffbd2e] border border-[#dea123]"></div>
                  <div className="w-3 h-3 rounded-full bg-[#27c93f] border border-[#1aab29]"></div>
                  <div className="ml-4 text-xs text-neutral-400 font-medium">jsawn-workspace</div>
                </div>

                <div className="flex-1 bg-[#1a1a1a] flex items-center justify-center relative overflow-hidden">
                  <img
                    src={feature.image}
                    alt={feature.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>

          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default function FeatureShowcase() {
  return (
    <section className="relative w-full pt-20">
      {topFeatures.map((feature, index) => (
        <FeatureCard
          key={index}
          feature={feature}
          index={index}
          totalCards={topFeatures.length}
        />
      ))}
    </section>
  );
}
