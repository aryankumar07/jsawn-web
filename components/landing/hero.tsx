'use client'

import { useState } from "react";
import { ArrowRight, Terminal, Copy, Check } from "lucide-react";
import TerminalViewer from "../ui/terminal-viewer";

export default function Hero() {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText("brew tap aryankumar07/tap\nbrew install jsawn");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-32 overflow-hidden">
      <div className="absolute left-[-10%] top-[-10%] -z-10 h-[500px] w-[500px] rounded-full bg-blue-400/20 blur-[120px]"></div>

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8 flex flex-col lg:flex-row items-center gap-16 lg:gap-20">

        {/* Left Content */}
        <div className="flex-1 max-w-2xl text-left">
          <div className="inline-flex items-center gap-2 rounded-full bg-black/5 backdrop-blur-md border border-black/10 px-4 py-1.5 mb-8">
            <Terminal size={14} className="text-neutral-700" />
            <span className="text-xs font-semibold text-neutral-800 tracking-wide uppercase">
              Built with Go ⚡️
            </span>
          </div>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-neutral-900 leading-[1.05]">
            Read JSON like <br className="hidden lg:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-neutral-900 to-neutral-400">
              you read code.
            </span>
          </h1>

          <p className="mt-6 text-lg sm:text-xl text-neutral-600 leading-relaxed max-w-xl">
            An interactive, tree-based TUI viewer for JSON. Instantly explore massive payloads right from your terminal with collapsible nodes, syntax highlighting, and native Vim-style navigation.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-start gap-4">
            {/* Primary CTA */}
            <a
              href="#"
              className="group bg-neutral-900 text-white px-8 py-4 rounded-xl text-sm font-semibold hover:bg-neutral-800 hover:scale-[1.02] active:scale-[0.98] transition-all inline-flex items-center gap-2 shadow-xl shadow-neutral-900/20 h-[72px]"
            >
              Get Started
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </a>

            {/* Modern Unified Multi-line Command Box */}
            <div className="relative flex flex-col justify-center border border-neutral-200 bg-white/80 backdrop-blur-xl px-5 py-3.5 rounded-xl shadow-sm hover:shadow-md transition-shadow h-[72px] w-full sm:w-auto overflow-hidden group">
              <div className="flex items-start justify-between gap-6">
                <div className="flex flex-col gap-1.5 font-mono text-sm text-neutral-800">
                  <div className="flex items-center gap-3">
                    <span className="text-neutral-400 select-none">$</span>
                    <span>brew tap aryankumar07/tap</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-neutral-400 select-none">$</span>
                    <span>brew install jsawn</span>
                  </div>
                </div>

                {/* Copy Button */}
                <button
                  onClick={handleCopy}
                  className="p-1.5 text-neutral-400 hover:text-neutral-900 hover:bg-neutral-100 rounded-md transition-colors"
                  aria-label="Copy installation commands"
                >
                  {copied ? <Check size={16} className="text-emerald-500" /> : <Copy size={16} />}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Content - Isolated Terminal Component */}
        <TerminalViewer />

      </div>
    </section>
  );
}
