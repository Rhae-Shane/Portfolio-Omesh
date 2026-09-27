"use client";

import { ChevronDown } from "lucide-react";
import * as React from "react";

import { cn } from "@/lib/utils";

const RAIL_X = 1;
const INDENT = 12;
const STEP = 6;
const READING_LINE = 120;

type TocItem = {
  title?: React.ReactNode;
  url: string;
  depth: number;
};

type Segment = { top: number; height: number };

type Geometry = {
  d: string;
  width: number;
  height: number;
  segments: Record<string, Segment>;
};

function levelOf(depth: number) {
  return Math.max(0, Math.min(2, depth - 2));
}

function railX(level: number) {
  return RAIL_X + level * INDENT;
}

function outline(
  items: { url: string; level: number; top: number; bottom: number }[],
): Geometry {
  const parts: string[] = [];
  const segments: Record<string, Segment> = {};
  let deepest = 0;

  items.forEach((item, i) => {
    const previous = items[i - 1];
    const next = items[i + 1];
    const x = railX(item.level);
    const start =
      item.top + (previous && previous.level !== item.level ? STEP : 0);
    const end = item.bottom - (next && next.level !== item.level ? STEP : 0);

    deepest = Math.max(deepest, item.level);
    segments[item.url] = { height: Math.max(1, end - start), top: start };

    if (i === 0) {
      parts.push(`M${x} ${start}`);
    } else if (previous && previous.level !== item.level) {
      parts.push(`L${x} ${start}`);
    }
    parts.push(`L${x} ${end}`);
  });

  return {
    d: parts.join(" "),
    height: items.at(-1)?.bottom ?? 0,
    segments,
    width: railX(deepest) + 1,
  };
}

function maskUrl(geometry: Geometry) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${geometry.width} ${geometry.height}"><path d="${geometry.d}" stroke="white" stroke-width="1" fill="none"/></svg>`;
  return `url("data:image/svg+xml,${encodeURIComponent(svg)}")`;
}

function useActiveItem(itemIds: string[]) {
  const [activeId, setActiveId] = React.useState<string | null>(null);
  const key = itemIds.join("|");

  React.useEffect(() => {
    const ids = key ? key.split("|") : [];
    if (ids.length === 0) {
      return;
    }

    let queued = false;

    const pick = () => {
      const passed = ids.filter((id) => {
        const el = document.getElementById(id);
        return el ? el.getBoundingClientRect().top <= READING_LINE : false;
      });
      setActiveId(passed.at(-1) ?? ids[0] ?? null);
    };

    const schedule = () => {
      if (queued) {
        return;
      }
      queued = true;
      // Microtask-ish coalescing that still runs when the tab is hidden.
      setTimeout(() => {
        queued = false;
        pick();
      }, 0);
    };

    pick();
    window.addEventListener("scroll", schedule, { passive: true });

    return () => {
      window.removeEventListener("scroll", schedule);
    };
  }, [key]);

  return activeId;
}

export function DocsTableOfContents({
  toc,
  className,
}: {
  toc: TocItem[];
  className?: string;
}) {
  const listRef = React.useRef<HTMLDivElement>(null);
  const [geometry, setGeometry] = React.useState<Geometry | null>(null);
  const [open, setOpen] = React.useState(false);

  const itemIds = React.useMemo(
    () => toc.map((item) => item.url.replace("#", "")),
    [toc],
  );
  const activeHeading = useActiveItem(itemIds);

  // Layout effect, not a frame callback: requestAnimationFrame never fires in
  // a background tab, so a TOC opened in one would render no outline at all
  // until the tab was focused.
  React.useLayoutEffect(() => {
    const list = listRef.current;
    if (!list || toc.length === 0) {
      return;
    }

    let timer: ReturnType<typeof setTimeout> | undefined;
    let tries = 0;

    const measure = () => {
      const items = toc.map((item, i) => {
        const child = list.children[i] as HTMLElement | undefined;
        return {
          bottom: child ? child.offsetTop + child.offsetHeight : 0,
          level: levelOf(item.depth),
          top: child?.offsetTop ?? 0,
          url: item.url,
        };
      });

      if (!items.at(-1)?.bottom) {
        if (tries++ < 20) {
          timer = setTimeout(measure, 50);
        }
        return;
      }

      setGeometry(outline(items));
    };

    measure();
    const observer = new ResizeObserver(() => {
      tries = 0;
      measure();
    });
    observer.observe(list);

    return () => {
      if (timer) {
        clearTimeout(timer);
      }
      observer.disconnect();
    };
  }, [toc, open]);

  if (!toc?.length) {
    return null;
  }

  const thumb =
    geometry && activeHeading
      ? geometry.segments[`#${activeHeading}`]
      : undefined;

  const activeTitle =
    toc.find((item) => item.url === `#${activeHeading}`)?.title ?? "On this page";

  return (
    <div
      className={cn(
        "z-10 flex flex-col gap-1 py-2 ps-6 pe-4 text-sm",
        className,
      )}
    >
      <button
        type="button"
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
        className="flex w-full items-center justify-between gap-3 rounded-md border border-dashed border-border bg-background/60 px-3 py-2 text-left transition-colors hover:bg-muted/50"
      >
        <span className="min-w-0">
          <span className="block text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
            On this page
          </span>
          <span className="mt-0.5 block truncate text-[.8125rem] text-foreground/80">
            {activeTitle}
          </span>
        </span>
        <ChevronDown
          className={cn(
            "size-4 shrink-0 text-muted-foreground transition-transform duration-200",
            open && "rotate-180",
          )}
        />
      </button>
      <div
        className={cn(
          "relative ms-3.5 mt-2 max-h-[min(24rem,60vh)] overflow-y-auto",
          !open && "hidden",
        )}
      >
        {geometry ? (
          <>
            <svg
              aria-hidden
              className="pointer-events-none absolute top-0 left-0 text-border"
              fill="none"
              height={geometry.height}
              viewBox={`0 0 ${geometry.width} ${geometry.height}`}
              width={geometry.width}
            >
              <path d={geometry.d} stroke="currentColor" strokeWidth="1" />
            </svg>
            <div
              aria-hidden
              className="pointer-events-none absolute top-0 left-0 overflow-hidden"
              style={{
                height: geometry.height,
                maskImage: maskUrl(geometry),
                maskRepeat: "no-repeat",
                maskSize: "100% 100%",
                width: geometry.width,
              }}
            >
              <div
                className="w-full bg-primary transition-[transform,height] duration-300 ease-out"
                style={{
                  height: thumb?.height ?? 0,
                  opacity: thumb ? 1 : 0,
                  transform: `translateY(${thumb?.top ?? 0}px)`,
                }}
              />
            </div>
          </>
        ) : null}

        <div className="relative flex flex-col" ref={listRef}>
          {toc.map((item) => (
            <a
              className={cn(
                "py-1 text-[.8125rem] leading-4.5 no-underline transition-colors",
                "text-muted-foreground hover:bg-transparent hover:text-foreground",
                "data-[active=true]:bg-transparent data-[active=true]:text-foreground",
                // one line per entry; the rail reads as a list, not a paragraph
                "block truncate whitespace-nowrap",
              )}
              title={typeof item.title === "string" ? item.title : undefined}
              data-active={item.url === `#${activeHeading}`}
              data-depth={item.depth}
              href={item.url}
              key={item.url}
              onClick={() => setOpen(false)}
              style={{ paddingInlineStart: railX(levelOf(item.depth)) + 11 }}
            >
              {item.title}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
