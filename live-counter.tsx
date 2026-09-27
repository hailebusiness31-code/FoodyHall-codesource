"use client";

import { useEffect, useState } from "react";

export function LiveCounter() {
  const [count, setCount] = useState(1024);

  useEffect(() => {
    const id = setInterval(() => {
      setCount((c) => c + Math.floor(Math.random() * 6) + 1);
    }, 4000);
    return () => clearInterval(id);
  }, []);

  return (
    <b className="font-semibold tabular-nums text-foreground">
      {count.toLocaleString()}
    </b>
  );
}
