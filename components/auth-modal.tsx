"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/dialog";
import { Tabs, TabsList, TabsTrigger } from "@/components/tabs";
import { Button } from "@/components/button";
import { useFoodyStore } from "@/lib/store";

export function AuthModal({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (o: boolean) => void;
}) {
  const [tab, setTab] = useState("google");
  const [status, setStatus] = useState<"idle" | "loading" | "done">("idle");
  const setAuthed = useFoodyStore((s) => s.setAuthed);
  const router = useRouter();

  function signIn() {
    setStatus("loading");
    setTimeout(() => {
      setStatus("done");
      setAuthed(true);
      setTimeout(() => {
        onOpenChange(false);
        router.push("/dashboard");
      }, 400);
    }, 1100);
  }

  const ctaLabel =
    status === "loading"
      ? "Signing you in…"
      : status === "done"
        ? "Signed in ✓"
        : `Continue with ${tab === "google" ? "Google" : tab === "phone" ? "phone" : "email"}`;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Sign in to FoodyHall</DialogTitle>
          <DialogDescription>
            Demo access — no real account needed.
          </DialogDescription>
        </DialogHeader>

        <Tabs value={tab} onValueChange={setTab}>
          <TabsList className="mb-4 grid w-full grid-cols-3">
            <TabsTrigger value="google">Google</TabsTrigger>
            <TabsTrigger value="phone">Phone</TabsTrigger>
            <TabsTrigger value="email">Email</TabsTrigger>
          </TabsList>
        </Tabs>

        {tab === "phone" && (
          <input
            className="mb-3 w-full rounded-lg border border-border bg-muted/30 px-3 py-2.5 text-sm outline-none focus:border-primary"
            placeholder="+84 xxx xxx xxx"
          />
        )}
        {tab === "email" && (
          <>
            <input
              className="mb-3 w-full rounded-lg border border-border bg-muted/30 px-3 py-2.5 text-sm outline-none focus:border-primary"
              placeholder="you@company.com"
            />
            <input
              type="password"
              className="mb-3 w-full rounded-lg border border-border bg-muted/30 px-3 py-2.5 text-sm outline-none focus:border-primary"
              placeholder="Password"
            />
          </>
        )}

        <Button className="w-full" onClick={signIn} disabled={status === "loading"}>
          {ctaLabel}
        </Button>
      </DialogContent>
    </Dialog>
  );
}
