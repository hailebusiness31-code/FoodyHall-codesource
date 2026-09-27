"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { LiveCounter } from "@/components/landing/live-counter";
import { AuthModal } from "@/components/landing/auth-modal";
import { useFoodyStore } from "@/lib/store";

const features = [
  { title: "Demand prediction", desc: "Weather & event-adjusted forecasts" },
  { title: "Supply monitor", desc: "Live stock-vs-orders tracking" },
  { title: "Surplus rescue", desc: "Auto-discounts before closing" },
];

export function Hero() {
  const [authOpen, setAuthOpen] = useState(false);
  const isAuthed = useFoodyStore((s) => s.isAuthed);
  const router = useRouter();

  useEffect(() => {
    if (isAuthed) router.replace("/dashboard");
  }, [isAuthed, router]);

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden px-6 py-24 text-center">
      <div
        className="pointer-events-none absolute left-1/2 top-[-10%] h-[560px] w-[560px] -translate-x-1/2 rounded-full opacity-30 blur-3xl"
        style={{
          background: "radial-gradient(circle, hsl(var(--primary)), transparent 65%)",
        }}
      />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 max-w-2xl"
      >
        <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-border bg-muted/40 px-3.5 py-1.5 text-sm text-muted-foreground">
          <span className="h-1.5 w-1.5 rounded-full bg-success shadow-[0_0_8px_theme(colors.success)]" />
          <LiveCounter /> restaurants syncing live
        </div>
        <h1 className="mb-5 text-4xl font-bold leading-tight tracking-tight sm:text-5xl">
          Nothing on the shelf goes to waste on{" "}
          <span className="gradient-text">our watch</span>.
        </h1>
        <p className="mx-auto mb-8 max-w-lg text-lg text-muted-foreground">
          FoodyHall forecasts demand, watches your stock in real time, and
          prices down surplus before it becomes waste — built for Da Nang&apos;s
          food supply network.
        </p>
        <div className="flex items-center justify-center gap-3">
          <Button onClick={() => setAuthOpen(true)}>Get started</Button>
          <Button
            variant="ghost"
            onClick={() =>
              document.getElementById("features")?.scrollIntoView({ behavior: "smooth" })
            }
          >
            See what it does
          </Button>
        </div>
        <div id="features" className="mt-14 flex flex-wrap justify-center gap-3">
          {features.map((f) => (
            <div
              key={f.title}
              className="w-44 rounded-xl border border-border bg-muted/30 p-4 text-left text-sm"
            >
              <div className="font-semibold">{f.title}</div>
              <div className="mt-1 text-xs text-muted-foreground">{f.desc}</div>
            </div>
          ))}
        </div>
      </motion.div>
      <AuthModal open={authOpen} onOpenChange={setAuthOpen} />
    </div>
  );
}
