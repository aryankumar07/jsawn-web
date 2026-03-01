import { ArrowRight } from "lucide-react";

export default function CTA() {
  return (
    <section className="py-20 sm:py-28 px-6">
      <div className="mx-auto max-w-3xl text-center">
        <div className="rounded-3xl bg-white/40 backdrop-blur-xl border border-black/[0.06] px-8 py-14 sm:px-16 sm:py-20 shadow-sm">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-neutral-900">
            Ready to ship faster?
          </h2>
          <p className="mt-4 text-lg text-neutral-500 max-w-md mx-auto">
            Join thousands of developers using jsawn to wrangle JSON at scale.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#"
              className="bg-neutral-900 text-white px-8 py-3.5 rounded-full text-sm font-medium hover:bg-neutral-800 transition-colors inline-flex items-center gap-2 shadow-lg shadow-neutral-900/10"
            >
              Get started for free <ArrowRight size={16} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
