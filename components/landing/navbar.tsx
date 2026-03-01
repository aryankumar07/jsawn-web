"use client";

import { Github } from "lucide-react";
import Link from "next/link";

export default function Navbar() {
  return (
    <div className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4">
      <nav className="flex items-center justify-between w-full max-w-2xl rounded-full bg-white border border-neutral-200 pl-8 pr-3 py-2 shadow-sm">

        <Link
          href="/"
          className="flex items-center gap-2 text-3xl font-extrabold tracking-tighter text-[#222]"
        >
          <img src="/assets/jsawn-logo.png" alt="Jsawn logo" className="w-8 h-8 object-contain" />
          Jsawn
        </Link>

        <div className="flex items-center gap-2 sm:gap-3">
          <a
            href="https://github.com/aryankumar07/jsawn"
            target="_blank"
            rel="noreferrer"
            className="text-neutral-400 hover:text-black transition-colors p-2"
            aria-label="GitHub"
          >
            <Github className="w-5 h-5" />
          </a>

          <a
            href="#your-target-section"
            className="bg-[#111] text-white text-sm font-medium px-6 py-2.5 rounded-full hover:bg-black transition-all shadow-sm"
          >
            Get started
          </a>
        </div>

      </nav>
    </div>
  );
}
