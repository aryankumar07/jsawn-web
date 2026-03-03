const footerSections = [
  {
    title: "Github",
    links: [
      {
        title: "Jsawn",
        link: "#"
      },
      {
        title: "Jsawn-web",
        link: "#"
      },
    ],
  },
  {
    title: "Author",
    links: [
      {
        title: "Aryan",
        link: "#"
      }
    ],
  },
];

export default function Footer() {
  return (
    <footer className="relative pt-24 pb-12 px-6 overflow-hidden font-sans">
      <div className="mx-auto max-w-7xl relative z-10">

        <div className="flex flex-col sm:flex-row items-start justify-between gap-12 mb-32">

          <div className="shrink-0">
            <img src="/assets/jsawn-logo.png" alt="Jsawn logo" className="w-8 h-8 object-contain" />
          </div>

          {footerSections.map((section) => (
            <div key={section.title} className="flex flex-col gap-4">
              <h3 className="text-sm font-semibold text-neutral-900">
                {section.title}
              </h3>
              {section.links.length > 0 && (
                <ul className="flex flex-col gap-3">
                  {section.links.map((data) => (
                    <li key={data.title}>
                      <a
                        href={data.link}
                        className="text-sm text-neutral-500 hover:text-neutral-900 transition-colors"
                      >
                        {data.title}
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500">
          <p>&copy; 2026 jsawn Inc. All rights reserved.</p>

          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.6)]"></span>
            <span>All Systems Normal</span>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 translate-y-1/3 left-0 w-full flex justify-center pointer-events-none select-none">
        <h1 className="text-[18vw] font-bold tracking-tighter leading-none bg-clip-text text-transparent bg-gradient-to-b from-blue-500 to-indigo-600 opacity-25">
          jsawn
        </h1>
      </div>
    </footer>
  );
}
