"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  LayoutGrid,
  TrendingUp,
  Package,
  Timer,
  MapPin,
  PanelLeftClose,
  PanelLeft,
} from "lucide-react";
import { useFoodyStore } from "@/lib/store";
import { cn } from "@/lib/utils";

const items = [
  { id: "overview", label: "Overview", icon: LayoutGrid },
  { id: "forecast", label: "Demand forecast", icon: TrendingUp },
  { id: "supply", label: "Supply monitor", icon: Package },
  { id: "rescue", label: "Surplus rescue", icon: Timer },
  { id: "heat", label: "Heatmap", icon: MapPin },
];

export function Sidebar() {
  const collapsed = useFoodyStore((s) => s.sidebarCollapsed);
  const toggleSidebar = useFoodyStore((s) => s.toggleSidebar);
  const width = useFoodyStore((s) => s.sidebarWidth);
  const setSidebarWidth = useFoodyStore((s) => s.setSidebarWidth);
  const [active, setActive] = useState("overview");
  const resizing = useRef(false);

  useEffect(() => {
    const sections = items
      .map((i) => document.getElementById(i.id))
      .filter(Boolean) as HTMLElement[];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-40% 0px -50% 0px" }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  const onMouseDown = useCallback(() => {
    resizing.current = true;
    document.body.style.cursor = "col-resize";
    function onMove(e: MouseEvent) {
      if (!resizing.current) return;
      setSidebarWidth(Math.max(180, Math.min(340, e.clientX)));
    }
    function onUp() {
      resizing.current = false;
      document.body.style.cursor = "";
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
    }
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
  }, [setSidebarWidth]);

  return (
    <div
      className="relative shrink-0 border-r border-border p-2.5 transition-[width]"
      style={{ width: collapsed ? 64 : width }}
    >
      <button
        onClick={toggleSidebar}
        className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-muted/40 hover:bg-accent"
        aria-label="Toggle sidebar"
      >
        {collapsed ? <PanelLeft className="h-4 w-4" /> : <PanelLeftClose className="h-4 w-4" />}
      </button>

      <nav className="space-y-0.5">
        {items.map((item) => {
          const Icon = item.icon;
          const isActive = active === item.id;
          return (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={(e) => {
                e.preventDefault();
                document
                  .getElementById(item.id)
                  ?.scrollIntoView({ behavior: "smooth", block: "start" });
              }}
              className={cn(
                "flex items-center gap-2.5 overflow-hidden whitespace-nowrap rounded-lg border-l-2 border-transparent px-2.5 py-2 text-sm text-muted-foreground transition-colors",
                isActive && "border-primary bg-muted/60 text-foreground"
              )}
            >
              <Icon className="h-4 w-4 shrink-0" />
              {!collapsed && <span>{item.label}</span>}
            </a>
          );
        })}
      </nav>

      {!collapsed && (
        <div
          onMouseDown={onMouseDown}
          className="absolute right-0 top-0 h-full w-1 cursor-col-resize hover:bg-primary/40"
        />
      )}
    </div>
  );
}
