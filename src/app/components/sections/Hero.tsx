"use client";

import React, { useEffect, useState } from "react";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { experimentVariants } from "@/app/config/marketing";
import { MotionScene } from "../ui/Motion";
import { SocialProof } from "./SocialProof";

/** Resolve experiments after hydration so the server and initial browser markup match. */
export function Hero() {
  const [variant, setVariant] = useState<"A" | "B">("A");
  useEffect(() => {
    const parameter = new URLSearchParams(window.location.search)
      .get("v")
      ?.toUpperCase();
    let stored: string | null = null;
    try {
      stored = localStorage.getItem("experiment-variant");
    } catch {
      /* Storage is optional. */
    }
    const selected =
      parameter === "A" || parameter === "B"
        ? parameter
        : stored === "A" || stored === "B"
          ? stored
          : Math.random() < 0.5
            ? "A"
            : "B";
    setVariant(selected);
    try {
      localStorage.setItem("experiment-variant", selected);
    } catch {
      /* Storage is optional. */
    }
    window.plausible?.("experiment_view", {
      props: { variant: selected, location: "hero" },
    });
  }, []);

  const track = (label: string) =>
    window.plausible?.("cta_click", {
      props: { location: "hero", label, variant },
    });
  return (
    <section className="editorial-hero">
      <div className="editorial-container">
        <div className="hero-layout">
          <div className="hero-copy">
            <h1>
              {variant === "A" ? (
                <>
                  Great teaching.
                  <br />
                  Less <span className="serif-accent">busywork.</span>
                </>
              ) : (
                <>
                  More teaching.
                  <br />
                  Less <span className="serif-accent">juggling.</span>
                </>
              )}
            </h1>
            <p>
              A calmer way to teach, plan, and create.
              <br className="desktop-break" /> Bring your material, notes, and
              quizzes into one connected workflow.
            </p>
            <div className="hero-actions">
              <a
                className="editorial-button button-dark"
                href="#book"
                onClick={() => track("primary")}
              >
                {experimentVariants.cta[variant].text}
                <ArrowUpRight size={17} aria-hidden="true" />
              </a>
              <a
                className="hero-secondary"
                href="#product"
                onClick={() => track("product")}
              >
                Explore the workspace <ArrowDown size={16} aria-hidden="true" />
              </a>
            </div>
          </div>
          <MotionScene className="hero-illustration">
            <div className="hero-orbit" aria-hidden="true">
              <span className="orbit-spark spark-a">✳</span>
              <span className="orbit-spark spark-b">✦</span>
              <svg viewBox="0 0 520 400" fill="none">
                <path
                  d="M43 218C-2 77 169 1 327 41S524 190 464 302 165 392 73 276"
                  stroke="currentColor"
                  strokeDasharray="3 8"
                />
              </svg>
            </div>
            <div className="hero-material" aria-hidden="true">
              <span className="mini-document-mark">↗</span>
              <span>
                Course material<small>The ideas you already teach.</small>
              </span>
              <span className="file-badge">PDF</span>
            </div>
            <div className="hero-workspace" aria-hidden="true">
              <div className="hero-window-top">
                <span className="window-dots">
                  <i />
                  <i />
                  <i />
                </span>
                <span>A LITTLE MORE HEADSPACE</span>
                <span>↗</span>
              </div>
              <div className="hero-workspace-body">
                <div className="hero-demo-header">
                  <span className="demo-book">↗</span>
                  <div>
                    <small>YOUR LEARNING WORKSPACE</small>
                    <strong>Everything, connected.</strong>
                  </div>
                </div>
                <div className="hero-demo-page">
                  <span className="document-kicker">CHAPTER 01</span>
                  <strong>
                    Make room for
                    <br />
                    the good work.
                  </strong>
                  <div className="hero-text-lines">
                    <i />
                    <i className="highlight-line" />
                    <i />
                    <i />
                  </div>
                  <span className="hero-page-number">01</span>
                </div>
                <div className="hero-demo-note">
                  <span>
                    A thought worth keeping <span>↗</span>
                  </span>
                  <p>
                    Less time switching tools.
                    <br />
                    More time making a difference.
                  </p>
                  <small>Linked to page 01</small>
                </div>
              </div>
            </div>
            <div className="hero-quiz-pill" aria-hidden="true">
              <span className="quiz-pill-symbol">✦</span>
              <span>
                Turn ideas into understanding.
                <small>Your next quiz starts here.</small>
              </span>
              <ArrowUpRight size={18} />
            </div>
            <span className="hero-art-caption">
              One workspace. A little breathing room.
            </span>
          </MotionScene>
        </div>
        <SocialProof />
      </div>
    </section>
  );
}

declare global {
  interface Window {
    plausible?: (
      event: string,
      options?: { props?: Record<string, unknown> },
    ) => void;
  }
}
