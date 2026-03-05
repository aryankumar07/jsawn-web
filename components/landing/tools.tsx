"use client"
import { motion, type Variants } from 'framer-motion';
import { Search, FoldVertical, Route, Palette, Sparkles } from 'lucide-react';

const features = [
  {
    title: "Search with Auto-expand",
    description: "Hit / to search — matching nodes expand automatically so nothing stays hidden. Cycle results with n/N and see highlights inline.",
    icon: Search,
    className: "md:col-span-2 md:row-span-2 bg-gradient-to-br from-zinc-100 via-white to-zinc-50",
  },
  {
    title: "Depth-based Folding",
    description: "Press a number key to collapse the entire tree to that depth. Instantly tame unfamiliar JSON.",
    icon: FoldVertical,
    className: "bg-gradient-to-b from-white to-zinc-50",
  },
  {
    title: "Live jq Breadcrumb",
    description: "The footer shows the full jq path of your selection. Always know exactly where you are.",
    icon: Route,
    className: "bg-gradient-to-tr from-zinc-50 to-white",
  },
  {
    title: "Syntax Highlighting",
    description: "Color-coded types at a glance. Collapsed nodes show summaries like {… 12 keys} so you never expand blind.",
    icon: Palette,
    className: "md:col-span-2 bg-gradient-to-r from-white via-zinc-50 to-zinc-100",
  },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 100, damping: 20 }
  },
  hover: {
    scale: 0.98,
    transition: { type: "spring", stiffness: 400, damping: 25 }
  }
};

const iconWrapperVariants: Variants = {
  hidden: { scale: 1, rotate: 0 },
  visible: { scale: 1, rotate: 0 },
  hover: {
    scale: 1.1,
    rotate: [0, -10, 10, -5, 0],
    transition: { duration: 0.5, type: "spring" }
  }
};

const shimmerVariants: Variants = {
  hidden: { x: "-100%", opacity: 0 },
  visible: { x: "-100%", opacity: 0 },
  hover: {
    x: "200%",
    opacity: 0.6,
    transition: { duration: 1, ease: "easeInOut" }
  }
};

export default function ToolSection() {
  return (
    <section className="py-24 px-6 md:px-12 text-zinc-900 font-sans overflow-hidden">
      <div className="max-w-5xl mx-auto">

        <div className="mb-16 max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 py-1 mb-6 rounded-full bg-zinc-50 border border-zinc-200 text-sm font-medium shadow-sm"
          >
            <Sparkles className="w-4 h-4 text-zinc-500" />
            <span className="text-zinc-700">Core tools</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, filter: "blur(16px)", y: 20 }}
            whileInView={{ opacity: 1, filter: "blur(0px)", y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="text-4xl md:text-6xl font-semibold tracking-tight mb-6 leading-[1.1]"
          >
            Built for the{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-zinc-400 via-zinc-600 to-zinc-900">
              terminal-native.
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, filter: "blur(8px)" }}
            whileInView={{ opacity: 1, filter: "blur(0px)" }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-lg md:text-xl text-zinc-500 leading-relaxed"
          >
            Keyboard-first navigation, instant search, and smart folding — no fluff, just the tools you actually use.
          </motion.p>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-4 gap-4 auto-rows-[minmax(220px,auto)]"
        >
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                variants={cardVariants}
                whileHover="hover"
                className={`group relative overflow-hidden rounded-[2rem] p-8 border border-zinc-200/60 shadow-sm transition-colors hover:border-zinc-300 flex flex-col justify-between cursor-pointer ${feature.className}`}
              >
                <motion.div
                  variants={shimmerVariants}
                  className="absolute inset-0 z-0 bg-gradient-to-r from-transparent via-white to-transparent skew-x-12"
                />

                <div className="relative z-10">
                  <motion.div
                    variants={iconWrapperVariants}
                    className="w-12 h-12 rounded-2xl bg-white shadow-sm border border-zinc-100 flex items-center justify-center mb-6"
                  >
                    <Icon className="w-5 h-5 text-zinc-700" />
                  </motion.div>
                </div>

                <div className="relative z-10">
                  <h3 className="text-xl font-medium mb-2 tracking-tight text-zinc-900">{feature.title}</h3>
                  <p className="text-zinc-500 text-sm leading-relaxed max-w-[90%]">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

      </div>
    </section>
  );
}
