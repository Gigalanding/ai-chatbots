"use client";

import React, { useEffect, useRef } from "react";

/** Shared wrapper for decorative motion; the OS reduced-motion setting is respected in CSS. */
export function MotionProvider({ children }: { children: React.ReactNode }) {
  return <div className="motion-shell">{children}</div>;
}

/** Pause looping scenes outside the viewport without a requestAnimationFrame loop. */
export function MotionScene({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const node = ref.current;
    if (!node || !("IntersectionObserver" in window)) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        node.classList.toggle("is-visible", entry.isIntersecting);
      },
      { threshold: 0.12 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);
  return (
    <div ref={ref} className={`motion-scene ${className}`}>
      {children}
    </div>
  );
}
