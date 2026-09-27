"use client";

import { useEffect } from "react";
import { useTheme } from "next-themes";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { useFoodyStore } from "@/lib/store";

export function CommandPalette() {
  const commandOpen = useFoodyStore((s) => s.commandOpen);
  const setCommandOpen = useFoodyStore((s) => s.setCommandOpen);
  const setWeather = useFoodyStore((s) => s.setWeather);
  const setEventImpact = useFoodyStore((s) => s.setEventImpact);
  const setSupplyLevel = useFoodyStore((s) => s.setSupplyLevel);
  const setRescueTime = useFoodyStore((s) => s.setRescueTime);
  const { setTheme, theme } = useTheme();

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setCommandOpen(!commandOpen);
      }
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [commandOpen, setCommandOpen]);

  function run(fn: () => void) {
    fn();
    setCommandOpen(false);
  }

  function goTo(id: string) {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <CommandDialog open={commandOpen} onOpenChange={setCommandOpen}>
      <CommandInput placeholder="Type a command or search…" />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Quick actions">
          <CommandItem
            onSelect={() =>
              run(() => {
                setWeather(Math.floor(Math.random() * 100));
                setEventImpact(Math.floor(Math.random() * 100));
                goTo("forecast");
              })
            }
          >
            Run forecast
          </CommandItem>
          <CommandItem
            onSelect={() =>
              run(() => {
                setSupplyLevel(8);
                goTo("supply");
              })
            }
          >
            Clear stock
          </CommandItem>
          <CommandItem
            onSelect={() =>
              run(() => {
                setRescueTime(21.5);
                goTo("rescue");
              })
            }
          >
            Trigger surplus rescue
          </CommandItem>
        </CommandGroup>
        <CommandGroup heading="Navigate">
          <CommandItem onSelect={() => run(() => goTo("overview"))}>
            Go to overview
          </CommandItem>
          <CommandItem onSelect={() => run(() => goTo("heat"))}>
            Go to heatmap
          </CommandItem>
        </CommandGroup>
        <CommandGroup heading="Preferences">
          <CommandItem
            onSelect={() => run(() => setTheme(theme === "dark" ? "light" : "dark"))}
          >
            Toggle theme
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
}
