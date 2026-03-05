'use client'

import { useState, useCallback, useEffect, useMemo, useRef } from "react";

// Sample JSON data matching what was previously hardcoded
const SAMPLE_DATA = [
  {
    id: 1,
    email: "Sincere@april.biz",
    address: {
      street: "Kulas Light",
      city: "Gwenborough",
      geo: {
        lat: "-37.3159",
        lng: "81.1496",
      },
    },
    company: {
      name: "Romaguera-Crona",
    },
  },
  {
    id: 2,
    email: "Shanna@melissa.tv",
    address: {
      street: "Victor Plains",
      city: "Wisokyburgh",
      geo: {
        lat: "-43.9509",
        lng: "-34.4618",
      },
    },
    company: {
      name: "Deckow-Crist",
    },
  },
];

type LineType = "open" | "close" | "value" | "flat-value";

interface JsonLine {
  id: string;
  depth: number;
  type: LineType;
  key?: string;
  value?: string | number | boolean | null;
  bracket?: string;
  closeBracket?: string;
  arrayIndex?: number;
  collapsible?: boolean;
  childCount?: number;
  comma?: boolean;
  path?: string;
}

function getLineSearchText(line: JsonLine): string {
  const parts: string[] = [];
  if (line.key !== undefined) parts.push(line.key);
  if (line.value !== undefined && line.value !== null) parts.push(String(line.value));
  if (line.path) parts.push(line.path);
  if (line.arrayIndex !== undefined) parts.push(String(line.arrayIndex));
  return parts.join(" ").toLowerCase();
}

function buildLines(
  data: unknown,
  depth: number = 0,
  key?: string,
  path: string = "",
  isLast: boolean = true
): JsonLine[] {
  const lines: JsonLine[] = [];
  const comma = !isLast;
  const currentPath = key !== undefined ? `${path}.${key}` : path;

  if (Array.isArray(data)) {
    const id = `${currentPath}[`;
    lines.push({
      id,
      depth,
      type: "open",
      key,
      bracket: "[",
      closeBracket: "]",
      collapsible: true,
      childCount: data.length,
    });
    data.forEach((item, i) => {
      const childLines = buildLines(
        item,
        depth + 1,
        undefined,
        `${currentPath}[${i}]`,
        i === data.length - 1
      );
      if (childLines.length > 0) {
        childLines[0].arrayIndex = i;
      }
      lines.push(...childLines);
    });
    lines.push({
      id: `${currentPath}]`,
      depth,
      type: "close",
      closeBracket: "]",
      comma,
    });
  } else if (data !== null && typeof data === "object") {
    const id = `${currentPath}{`;
    lines.push({
      id,
      depth,
      type: "open",
      key,
      bracket: "{",
      closeBracket: "}",
      collapsible: true,
      arrayIndex: undefined,
    });
    const entries = Object.entries(data);
    entries.forEach(([k, v], i) => {
      lines.push(
        ...buildLines(v, depth + 1, k, currentPath, i === entries.length - 1)
      );
    });
    lines.push({
      id: `${currentPath}}`,
      depth,
      type: "close",
      closeBracket: "}",
      comma,
    });
  } else {
    lines.push({
      id: currentPath,
      depth,
      type: "value",
      key,
      value: data as string | number | boolean | null,
      comma,
    });
  }

  return lines;
}

function buildFlatLines(data: unknown, path: string = ""): JsonLine[] {
  const lines: JsonLine[] = [];

  if (Array.isArray(data)) {
    data.forEach((item, i) => {
      lines.push(...buildFlatLines(item, `${path}[${i}]`));
    });
  } else if (data !== null && typeof data === "object") {
    const entries = Object.entries(data);
    entries.forEach(([k, v]) => {
      const newPath = path ? `${path}.${k}` : `.${k}`;
      if (typeof v === "object" && v !== null) {
        lines.push(...buildFlatLines(v, newPath));
      } else {
        lines.push({
          id: newPath,
          depth: 0,
          type: "flat-value",
          path: newPath,
          value: v as string | number | boolean | null,
        });
      }
    });
  }

  return lines;
}

function renderValue(value: string | number | boolean | null | undefined) {
  if (value === null || value === undefined) {
    return <span className="text-neutral-400">null</span>;
  }
  if (typeof value === "number") {
    return <span className="text-amber-600">{value}</span>;
  }
  if (typeof value === "boolean") {
    return <span className="text-violet-600">{value ? "true" : "false"}</span>;
  }
  return <span className="text-emerald-600">&quot;{value}&quot;</span>;
}

function getVisibleLines(
  allLines: JsonLine[],
  collapsed: Set<string>
): JsonLine[] {
  const visible: JsonLine[] = [];
  let skipUntilDepth: number | null = null;

  for (const line of allLines) {
    if (skipUntilDepth !== null) {
      if (line.type === "close" && line.depth === skipUntilDepth) {
        skipUntilDepth = null;
      }
      continue;
    }

    visible.push(line);

    if (line.type === "open" && line.collapsible && collapsed.has(line.id)) {
      skipUntilDepth = line.depth;
    }
  }

  return visible;
}

type Mode = "normal" | "search";

const TerminalViewer = () => {
  const [isFlat, setIsFlat] = useState(false);
  const [cursor, setCursor] = useState(0);
  const [collapsed, setCollapsed] = useState<Set<string>>(new Set());
  const [isFocused, setIsFocused] = useState(false);

  // Search state
  const [mode, setMode] = useState<Mode>("normal");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeSearch, setActiveSearch] = useState(""); // confirmed search (after Enter or for n/N)
  const [matchIndices, setMatchIndices] = useState<number[]>([]);
  const [currentMatchIdx, setCurrentMatchIdx] = useState(-1);

  const containerRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const lineRefs = useRef<Map<number, HTMLDivElement>>(new Map());

  const allTreeLines = useMemo(() => buildLines(SAMPLE_DATA, 0, undefined, ""), []);
  const flatLines = useMemo(() => buildFlatLines(SAMPLE_DATA), []);

  const visibleLines = useMemo(() => {
    if (isFlat) return flatLines;
    return getVisibleLines(allTreeLines, collapsed);
  }, [isFlat, allTreeLines, flatLines, collapsed]);

  // Compute matches whenever activeSearch or visibleLines change
  useEffect(() => {
    if (!activeSearch) {
      setMatchIndices([]);
      setCurrentMatchIdx(-1);
      return;
    }
    const query = activeSearch.toLowerCase();
    const indices: number[] = [];
    visibleLines.forEach((line, i) => {
      if (getLineSearchText(line).includes(query)) {
        indices.push(i);
      }
    });
    setMatchIndices(indices);
    // Jump to first match at or after cursor
    if (indices.length > 0) {
      const atOrAfter = indices.find((idx) => idx >= cursor);
      const matchIdx = atOrAfter !== undefined ? indices.indexOf(atOrAfter) : 0;
      setCurrentMatchIdx(matchIdx);
      setCursor(indices[matchIdx]);
    } else {
      setCurrentMatchIdx(-1);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeSearch, visibleLines]);

  // Clamp cursor when visible lines change
  useEffect(() => {
    setCursor((prev) => Math.min(prev, visibleLines.length - 1));
  }, [visibleLines.length]);

  // Scroll the active line into view
  useEffect(() => {
    const el = lineRefs.current.get(cursor);
    if (el && scrollRef.current) {
      const container = scrollRef.current;
      const elTop = el.offsetTop;
      const elBottom = elTop + el.offsetHeight;
      const scrollTop = container.scrollTop;
      const viewHeight = container.clientHeight;

      if (elTop < scrollTop) {
        container.scrollTop = elTop;
      } else if (elBottom > scrollTop + viewHeight) {
        container.scrollTop = elBottom - viewHeight;
      }
    }
  }, [cursor]);

  // Focus search input when entering search mode
  useEffect(() => {
    if (mode === "search") {
      searchInputRef.current?.focus();
    }
  }, [mode]);

  const jumpToNextMatch = useCallback(() => {
    if (matchIndices.length === 0) return;
    const nextIdx = (currentMatchIdx + 1) % matchIndices.length;
    setCurrentMatchIdx(nextIdx);
    setCursor(matchIndices[nextIdx]);
  }, [matchIndices, currentMatchIdx]);

  const jumpToPrevMatch = useCallback(() => {
    if (matchIndices.length === 0) return;
    const prevIdx = (currentMatchIdx - 1 + matchIndices.length) % matchIndices.length;
    setCurrentMatchIdx(prevIdx);
    setCursor(matchIndices[prevIdx]);
  }, [matchIndices, currentMatchIdx]);

  const closeSearch = useCallback(() => {
    setMode("normal");
    setSearchQuery("");
    // Keep activeSearch and matches so n/N still works
    containerRef.current?.focus();
  }, []);

  const clearSearch = useCallback(() => {
    setMode("normal");
    setSearchQuery("");
    setActiveSearch("");
    setMatchIndices([]);
    setCurrentMatchIdx(-1);
    containerRef.current?.focus();
  }, []);

  const handleSearchKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
        e.preventDefault();
        setActiveSearch(searchQuery);
        closeSearch();
      } else if (e.key === "Escape") {
        e.preventDefault();
        closeSearch();
      }
    },
    [searchQuery, closeSearch]
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (mode === "search") return;

      switch (e.key) {
        case "/": {
          e.preventDefault();
          setSearchQuery("");
          setMode("search");
          break;
        }
        case "Escape": {
          e.preventDefault();
          clearSearch();
          break;
        }
        case "n": {
          e.preventDefault();
          jumpToNextMatch();
          break;
        }
        case "N": {
          e.preventDefault();
          jumpToPrevMatch();
          break;
        }
        case "j": {
          e.preventDefault();
          setCursor((prev) => Math.min(prev + 1, visibleLines.length - 1));
          break;
        }
        case "k": {
          e.preventDefault();
          setCursor((prev) => Math.max(prev - 1, 0));
          break;
        }
        case "l": {
          e.preventDefault();
          if (isFlat) break;
          const currentLine = visibleLines[cursor];
          if (currentLine?.type === "open" && currentLine.collapsible) {
            setCollapsed((prev) => {
              const next = new Set(prev);
              next.delete(currentLine.id);
              return next;
            });
          }
          break;
        }
        case "h": {
          e.preventDefault();
          if (isFlat) break;
          const line = visibleLines[cursor];
          if (line?.type === "open" && line.collapsible) {
            setCollapsed((prev) => {
              const next = new Set(prev);
              next.add(line.id);
              return next;
            });
          } else {
            const targetDepth = line.depth - 1;
            for (let i = cursor - 1; i >= 0; i--) {
              const candidate = visibleLines[i];
              if (
                candidate.type === "open" &&
                candidate.collapsible &&
                candidate.depth === targetDepth
              ) {
                setCollapsed((prev) => {
                  const next = new Set(prev);
                  next.add(candidate.id);
                  return next;
                });
                setCursor(i);
                break;
              }
            }
          }
          break;
        }
      }
    },
    [visibleLines, cursor, isFlat, mode, jumpToNextMatch, jumpToPrevMatch, clearSearch]
  );

  const setLineRef = useCallback(
    (index: number, el: HTMLDivElement | null) => {
      if (el) {
        lineRefs.current.set(index, el);
      } else {
        lineRefs.current.delete(index);
      }
    },
    []
  );

  const isMatch = useCallback(
    (index: number) => matchIndices.includes(index),
    [matchIndices]
  );

  const lineClassName = useCallback(
    (index: number) => {
      const isActive = cursor === index;
      const matched = activeSearch && isMatch(index);

      if (isActive) {
        return "px-6 -mx-6 leading-6 cursor-pointer bg-teal-50 border-l-2 border-teal-400 pl-[22px]";
      }
      if (matched) {
        return "px-6 -mx-6 leading-6 cursor-pointer bg-amber-50 border-l-2 border-amber-300 pl-[22px]";
      }
      return "px-6 -mx-6 leading-6 cursor-pointer border-l-2 border-transparent pl-[22px]";
    },
    [cursor, activeSearch, isMatch]
  );

  const renderTreeLine = (line: JsonLine, index: number) => {
    const indent = "  ".repeat(line.depth);

    let content: React.ReactNode;

    if (line.type === "open") {
      const isCollapsed = collapsed.has(line.id);
      const keyPart =
        line.key !== undefined ? (
          <>
            <span className="text-teal-700">&quot;{line.key}&quot;</span>
            <span className="text-neutral-500">: </span>
          </>
        ) : line.arrayIndex !== undefined ? (
          <>
            <span className="text-teal-700">{line.arrayIndex}</span>
            <span className="text-neutral-500">: </span>
          </>
        ) : null;

      content = (
        <>
          {indent}
          {keyPart}
          <span className="text-neutral-400">{line.bracket}</span>
          {isCollapsed && (
            <>
              <span className="text-neutral-400"> ... </span>
              <span className="text-neutral-400">{line.closeBracket}</span>
              {(() => {
                let depth = 0;
                const startIdx = allTreeLines.indexOf(line);
                for (let i = startIdx + 1; i < allTreeLines.length; i++) {
                  if (allTreeLines[i].type === "open") depth++;
                  if (allTreeLines[i].type === "close") {
                    if (depth === 0) {
                      return allTreeLines[i].comma ? (
                        <span className="text-neutral-500">,</span>
                      ) : null;
                    }
                    depth--;
                  }
                }
                return null;
              })()}
            </>
          )}
        </>
      );
    } else if (line.type === "close") {
      content = (
        <>
          {indent}
          <span className="text-neutral-400">{line.closeBracket}</span>
          {line.comma && <span className="text-neutral-500">,</span>}
        </>
      );
    } else {
      const keyPart = line.key !== undefined ? (
        <>
          <span className="text-teal-700">&quot;{line.key}&quot;</span>
          <span className="text-neutral-500">: </span>
        </>
      ) : null;

      content = (
        <>
          {indent}
          {keyPart}
          {renderValue(line.value)}
          {line.comma && <span className="text-neutral-500">,</span>}
        </>
      );
    }

    return (
      <div
        key={line.id + index}
        ref={(el) => setLineRef(index, el)}
        className={lineClassName(index)}
        onClick={() => setCursor(index)}
      >
        {content}
      </div>
    );
  };

  const renderFlatLine = (line: JsonLine, index: number) => {
    return (
      <div
        key={line.id}
        ref={(el) => setLineRef(index, el)}
        className={lineClassName(index)}
        onClick={() => setCursor(index)}
      >
        <span className="text-teal-700">{line.path}</span>
        <span className="text-neutral-500"> = </span>
        {renderValue(line.value)}
      </div>
    );
  };

  return (
    <div className="flex-1 w-full max-w-2xl lg:max-w-none perspective-1000">
      <div
        ref={containerRef}
        tabIndex={0}
        onKeyDown={handleKeyDown}
        onFocus={() => setIsFocused(true)}
        onBlur={(e) => {
          // Don't lose focus if clicking the search input
          if (searchInputRef.current?.contains(e.relatedTarget as Node)) return;
          setIsFocused(false);
        }}
        className={`rounded-2xl bg-white border shadow-2xl shadow-neutral-300/50 overflow-hidden transform lg:rotate-[-2deg] lg:hover:rotate-0 transition-all duration-500 ease-out ring-1 ring-black/5 flex flex-col h-[540px] outline-none ${
          isFocused ? "border-teal-300" : "border-neutral-200"
        }`}
      >
        {/* Title bar */}
        <div className="flex items-center justify-between px-4 py-3 bg-neutral-50/80 backdrop-blur-sm border-b border-neutral-200 shrink-0">
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-rose-400" />
            <div className="w-3 h-3 rounded-full bg-amber-400" />
            <div className="w-3 h-3 rounded-full bg-emerald-400" />
          </div>

          <div className="flex items-center gap-2 px-3 py-1 bg-white border border-neutral-200 rounded-md shadow-sm">
            <span className="text-xs text-neutral-600 font-mono font-medium">
              {isFlat ? "Mr. Jsawn (flat)" : "Mr. Jsawn"}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-medium text-neutral-500">Flat</span>
            <button
              onClick={() => {
                setIsFlat(!isFlat);
                setCursor(0);
                clearSearch();
              }}
              className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-neutral-400 focus:ring-offset-2 ${
                isFlat ? "bg-neutral-800" : "bg-neutral-300"
              }`}
              aria-pressed={isFlat}
            >
              <span
                className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white transition-transform ${
                  isFlat ? "translate-x-4.5" : "translate-x-1"
                }`}
              />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 font-mono text-sm leading-relaxed flex flex-col flex-1 overflow-hidden">
          <div
            ref={scrollRef}
            className="flex-1 overflow-auto pr-2"
            onClick={() => containerRef.current?.focus()}
          >
            <pre className="whitespace-pre">
              <code className="text-neutral-500">
                {visibleLines.map((line, i) =>
                  isFlat ? renderFlatLine(line, i) : renderTreeLine(line, i)
                )}
              </code>
            </pre>
          </div>

          {/* Search bar (replaces status bar when searching) */}
          {mode === "search" ? (
            <div className="mt-4 flex items-center gap-2 text-sm border-t border-neutral-200 pt-4 shrink-0">
              <span className="text-teal-600 font-mono font-bold">/</span>
              <input
                ref={searchInputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={handleSearchKeyDown}
                className="flex-1 bg-transparent outline-none font-mono text-neutral-800 placeholder-neutral-400 text-sm"
                placeholder="Search keys and values..."
                autoComplete="off"
                spellCheck={false}
              />
              <span className="text-xs text-neutral-400">
                Enter to confirm · Esc to close
              </span>
            </div>
          ) : (
            <div className="mt-4 flex flex-wrap gap-y-3 items-center justify-between text-xs text-neutral-500 border-t border-neutral-200 pt-4 shrink-0">
              <div className="flex gap-4">
                <span className="flex items-center gap-1.5">
                  <kbd className="bg-neutral-100 border border-neutral-200 px-1.5 py-0.5 rounded text-neutral-600 font-sans shadow-sm">
                    j/k
                  </kbd>{" "}
                  Navigate
                </span>
                {!isFlat && (
                  <span className="flex items-center gap-1.5">
                    <kbd className="bg-neutral-100 border border-neutral-200 px-1.5 py-0.5 rounded text-neutral-600 font-sans shadow-sm">
                      h/l
                    </kbd>{" "}
                    Fold
                  </span>
                )}
                <span className="flex items-center gap-1.5">
                  <kbd className="bg-neutral-100 border border-neutral-200 px-1.5 py-0.5 rounded text-neutral-600 font-sans shadow-sm">
                    /
                  </kbd>{" "}
                  Search
                </span>
                {activeSearch && (
                  <span className="flex items-center gap-1.5">
                    <kbd className="bg-neutral-100 border border-neutral-200 px-1.5 py-0.5 rounded text-neutral-600 font-sans shadow-sm">
                      n/N
                    </kbd>{" "}
                    Next/Prev
                  </span>
                )}
              </div>
              <div className="flex gap-4 items-center">
                {activeSearch && (
                  <span className="text-amber-600 font-mono">
                    &quot;{activeSearch}&quot;{" "}
                    {matchIndices.length > 0
                      ? `${currentMatchIdx + 1}/${matchIndices.length}`
                      : "no matches"}
                  </span>
                )}
                <span className="text-neutral-400">
                  {cursor + 1}/{visibleLines.length}
                </span>
                <span className="text-teal-600 font-bold tracking-widest uppercase">
                  NORMAL
                </span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Click-to-focus hint */}
      {!isFocused && (
        <p className="text-center text-xs text-neutral-400 mt-3">
          Click the terminal and use j/k to navigate{!isFlat && ", h/l to fold"}
        </p>
      )}
    </div>
  );
};

export default TerminalViewer;
