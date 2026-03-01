'use client'

import { useState } from "react";


const TerminalViewer = () => {
  const [isFlat, setIsFlat] = useState(false);

  return (
    <div className="flex-1 w-full max-w-2xl lg:max-w-none perspective-1000">
      {/* ADDED: h-[540px] and flex-col to lock the container height */}
      <div className="rounded-2xl bg-white border border-neutral-200 shadow-2xl shadow-neutral-300/50 overflow-hidden transform lg:rotate-[-2deg] lg:hover:rotate-0 transition-transform duration-500 ease-out ring-1 ring-black/5 flex flex-col h-[540px]">

        {/* Terminal Header */}
        <div className="flex items-center justify-between px-4 py-3 bg-neutral-50/80 backdrop-blur-sm border-b border-neutral-200 shrink-0">
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-rose-400" />
            <div className="w-3 h-3 rounded-full bg-amber-400" />
            <div className="w-3 h-3 rounded-full bg-emerald-400" />
          </div>

          {/* Dynamic Tab Title */}
          <div className="flex items-center gap-2 px-3 py-1 bg-white border border-neutral-200 rounded-md shadow-sm">
            <span className="text-xs text-neutral-600 font-mono font-medium">
              {isFlat ? "Mr. Jsawn (flat)" : "Mr. Jsawn"}
            </span>
          </div>

          {/* Flat Toggle Switch */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-medium text-neutral-500">Flat</span>
            <button
              onClick={() => setIsFlat(!isFlat)}
              className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-neutral-400 focus:ring-offset-2 ${isFlat ? "bg-neutral-800" : "bg-neutral-300"
                }`}
              aria-pressed={isFlat}
            >
              <span
                className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white transition-transform ${isFlat ? "translate-x-4.5" : "translate-x-1"
                  }`}
              />
            </button>
          </div>
        </div>

        {/* Terminal Body */}
        {/* ADDED: overflow-hidden on wrapper, so inner elements control scrolling */}
        <div className="p-6 font-mono text-sm leading-relaxed flex flex-col flex-1 overflow-hidden">

          {/* ADDED: overflow-auto here to make only the code block scrollable if needed */}
          <div className="flex-1 overflow-auto pr-2">
            <pre>
              {isFlat ? (
                // FLATTENED VIEW
                <code className="text-neutral-500">
                  <div className="bg-teal-50 -mx-6 px-6 py-0.5 border-l-2 border-teal-400">
                    <span className="text-teal-700">.[0].address.city</span> = <span className="text-emerald-600">&quot;Gwenborough&quot;</span>
                  </div>
                  <span className="text-teal-700">.[0].address.geo.lat</span> = <span className="text-emerald-600">&quot;-37.3159&quot;</span>{"\n"}
                  <span className="text-teal-700">.[0].address.geo.lng</span> = <span className="text-emerald-600">&quot;81.1496&quot;</span>{"\n"}
                  <span className="text-teal-700">.[0].address.street</span> = <span className="text-emerald-600">&quot;Kulas Light&quot;</span>{"\n"}
                  <span className="text-teal-700">.[0].company.name</span> = <span className="text-emerald-600">&quot;Romaguera-Crona&quot;</span>{"\n"}
                  <span className="text-teal-700">.[0].email</span> = <span className="text-emerald-600">&quot;Sincere@april.biz&quot;</span>{"\n"}
                  <span className="text-teal-700">.[0].id</span> = <span className="text-amber-600">1</span>{"\n"}
                  <span className="text-teal-700">.[1].address.city</span> = <span className="text-emerald-600">&quot;Wisokyburgh&quot;</span>{"\n"}
                  <span className="text-teal-700">.[1].address.geo.lat</span> = <span className="text-emerald-600">&quot;-43.9509&quot;</span>{"\n"}
                  <span className="text-teal-700">.[1].address.geo.lng</span> = <span className="text-emerald-600">&quot;-34.4618&quot;</span>{"\n"}
                  <span className="text-teal-700">.[1].company.name</span> = <span className="text-emerald-600">&quot;Deckow-Crist&quot;</span>{"\n"}
                  <span className="text-teal-700">.[1].email</span> = <span className="text-emerald-600">&quot;Shanna@melissa.tv&quot;</span>{"\n"}
                  <span className="text-teal-700">.[1].id</span> = <span className="text-amber-600">2</span>{"\n"}
                </code>
              ) : (
                // NESTED TREE VIEW
                <code className="text-neutral-500">
                  <span className="text-neutral-400">[</span>{"\n"}
                  <span className="text-teal-700">  0</span>: <span className="text-neutral-400">{"{"}</span>{"\n"}
                  <span className="text-teal-700">    &quot;address&quot;</span>: <span className="text-neutral-400">{"{"}</span>{"\n"}
                  <div className="bg-teal-50 -mx-6 px-6 py-0.5 border-l-2 border-teal-400">
                    <span className="text-teal-700">      &quot;city&quot;</span>: <span className="text-emerald-600">&quot;Gwenborough&quot;</span>,
                  </div>
                  <span className="text-teal-700">      &quot;geo&quot;</span>: <span className="text-neutral-400">{"{"}</span>{"\n"}
                  <span className="text-teal-700">        &quot;lat&quot;</span>: <span className="text-emerald-600">&quot;-37.3159&quot;</span>,{"\n"}
                  <span className="text-teal-700">        &quot;lng&quot;</span>: <span className="text-emerald-600">&quot;81.1496&quot;</span>{"\n"}
                  <span className="text-neutral-400">      {"}"}</span>,{"\n"}
                  <span className="text-teal-700">      &quot;street&quot;</span>: <span className="text-emerald-600">&quot;Kulas Light&quot;</span>{"\n"}
                  <span className="text-neutral-400">    {"}"}</span>,{"\n"}
                  <span className="text-teal-700">    &quot;company&quot;</span>: <span className="text-neutral-400">{"{"}</span>{"\n"}
                  <span className="text-teal-700">      &quot;name&quot;</span>: <span className="text-emerald-600">&quot;Romaguera-Crona&quot;</span>{"\n"}
                  <span className="text-neutral-400">    {"}"}</span>,{"\n"}
                  <span className="text-teal-700">    &quot;email&quot;</span>: <span className="text-emerald-600">&quot;Sincere@april.biz&quot;</span>,{"\n"}
                  <span className="text-teal-700">    &quot;id&quot;</span>: <span className="text-amber-600">1</span>{"\n"}
                  <span className="text-neutral-400">  {"}"}</span>{"\n"}
                  <span className="text-neutral-400">]</span>{"\n"}
                </code>
              )}
            </pre>
          </div>

          {/* Light Mode TUI Vim Status Bar */}
          {/* ADDED: shrink-0 so the footer doesn't get crushed if code is too long */}
          <div className="mt-4 flex flex-wrap gap-y-3 items-center justify-between text-xs text-neutral-500 border-t border-neutral-200 pt-4 shrink-0">
            <div className="flex gap-4">
              <span className="flex items-center gap-1.5"><kbd className="bg-neutral-100 border border-neutral-200 px-1.5 py-0.5 rounded text-neutral-600 font-sans shadow-sm">j/k</kbd> Navigate</span>
              <span className="flex items-center gap-1.5"><kbd className="bg-neutral-100 border border-neutral-200 px-1.5 py-0.5 rounded text-neutral-600 font-sans shadow-sm">h/l</kbd> Fold</span>
              <span className="flex items-center gap-1.5"><kbd className="bg-neutral-100 border border-neutral-200 px-1.5 py-0.5 rounded text-neutral-600 font-sans shadow-sm">/</kbd> Search</span>
            </div>
            <div className="flex gap-4">
              <span className="text-neutral-400">~ 2.4MB</span>
              <span className="text-teal-600 font-bold tracking-widest uppercase">NORMAL</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TerminalViewer
