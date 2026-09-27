"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useFoodyStore } from "@/lib/store";
import { Sidebar } from "@/components/dashboard/sidebar";
import { Topbar } from "@/components/dashboard/topbar";
import { CommandPalette } from "@/components/dashboard/command-palette";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const isAuthed = useFoodyStore((s) => s.isAuthed);
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  useEffect(() => setMounted(true), []);
  useEffect(() => {
    if (mounted && !isAuthed) router.replace("/");
  }, [mounted, isAuthed, router]);

  if (!mounted) return null;

  return (
    <div className="min-h-screen">
      <Topbar />
      <div className="flex">
        <Sidebar />
        <main className="min-w-0 flex-1 px-6 py-6">{children}</main>
      </div>
      <CommandPalette />
    </div>
  );
}
