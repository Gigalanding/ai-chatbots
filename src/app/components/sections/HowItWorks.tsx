"use client";

import React, { useEffect, useState } from "react";
import { ArrowRight, Check, ArrowUpRight } from "lucide-react";
import { marketing } from "@/app/config/marketing";
import { MotionScene } from "../ui/Motion";

function DiscoveryVisual({ active }: { active: number }) {
  return (
    <MotionScene className={`discovery-scene discovery-${active}`}>
      <div className="discovery-scene-label">
        <span className="live-dot" />
        YOUR NEXT CHAPTER
      </div>
      {active === 0 && (
        <div className="context-scene scene-enter" aria-hidden="true">
          <div className="scene-document">
            <span className="eyebrow">LET’S START WITH YOU</span>
            <h4>
              Hello, educator<span>↗</span>
            </h4>
            <div className="sample-field">
              <small>YOUR ROLE</small>
              <span>University lecturer</span>
            </div>
            <div className="sample-field">
              <small>YOUR BIGGEST CHALLENGE</small>
              <span className="typed-line">
                More time teaching. Less admin.
              </span>
            </div>
            <div className="scene-send">
              A little context <ArrowRight size={16} />
            </div>
          </div>
          <span className="floating-note">No long questionnaires.</span>
        </div>
      )}
      {active === 1 && (
        <div className="call-scene scene-enter" aria-hidden="true">
          <div className="call-window">
            <div className="call-window-top">
              <span>Discovery conversation</span>
              <span>LIVE</span>
            </div>
            <div className="call-people">
              <div>
                <span className="call-avatar avatar-teacher">You</span>
                <small>Your experience</small>
              </div>
              <span className="call-wave">
                <i />
                <i />
                <i />
                <i />
                <i />
                <i />
                <i />
              </span>
              <div>
                <span className="call-avatar avatar-team">Us</span>
                <small>A fresh perspective</small>
              </div>
            </div>
            <div className="call-bottom">
              <span className="live-dot" />
              Good ideas start with listening.
            </div>
          </div>
          <span className="floating-note">
            All about your workflow.
          </span>
        </div>
      )}
      {active === 2 && (
        <div className="recommendation-scene scene-enter" aria-hidden="true">
          <div className="scene-document">
            <span className="eyebrow">YOUR WORKFLOW, RECONSIDERED</span>
            <h4>A plan that fits.</h4>
            {[
              "Simplify your tool stack",
              "Automate the repetitive parts",
              "Make room for teaching",
            ].map((text, i) => (
              <div
                className="recommendation-line"
                key={text}
                style={{ animationDelay: `${i * 140}ms` }}
              >
                <span>
                  <Check size={14} />
                </span>
                {text}
              </div>
            ))}
            <div className="recommendation-footer">
              Practical next steps <ArrowUpRight size={16} />
            </div>
          </div>
          <span className="floating-note">
            Made for your actual day-to-day.
          </span>
        </div>
      )}
    </MotionScene>
  );
}

export function HowItWorks() {
  const [active, setActive] = useState(0);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const replay = window.setInterval(() => {
      setActive((current) => (current + 1) % marketing.howItWorks.length);
    }, 5000);
    return () => window.clearInterval(replay);
  }, []);

  return (
    <section id="how-it-works" className="discovery-section editorial-section">
      <div className="editorial-container">
        <div className="section-heading centered-heading">
          <span className="eyebrow">
            <span /> A SMALL FIRST STEP
          </span>
          <h2>
            How it works.
            <br />
            <span className="serif-accent">Human from the start.</span>
          </h2>
        </div>
        <div className="discovery-layout">
          <div
            className="discovery-steps"
            role="tablist"
            aria-label="Discovery process"
            aria-orientation="vertical"
          >
            {marketing.howItWorks.map((step, i) => (
              <button
                key={step.step}
                type="button"
                role="tab"
                id={`discovery-tab-${i}`}
                aria-selected={active === i}
                aria-controls="discovery-panel"
                tabIndex={active === i ? 0 : -1}
                className={`discovery-step ${active === i ? "is-active" : ""}`}
                onClick={() => setActive(i)}
                onKeyDown={(event) => {
                  if (
                    ["ArrowDown", "ArrowUp", "Home", "End"].includes(event.key)
                  ) {
                    event.preventDefault();
                    const next =
                      event.key === "Home"
                        ? 0
                        : event.key === "End"
                          ? 2
                          : (active + (event.key === "ArrowDown" ? 1 : 2)) % 3;
                    setActive(next);
                    document.getElementById(`discovery-tab-${next}`)?.focus();
                  }
                }}
              >
                <span className="discovery-number">0{step.step}</span>
                <span className="discovery-step-copy">
                  <span className="discovery-title">{step.title}</span>
                </span>
                <ArrowUpRight
                  className="discovery-step-arrow"
                  size={19}
                  aria-hidden="true"
                />
              </button>
            ))}
          </div>
          <div
            role="tabpanel"
            id="discovery-panel"
            aria-labelledby={`discovery-tab-${active}`}
            tabIndex={0}
          >
            <DiscoveryVisual key={active} active={active} />
          </div>
        </div>
        <div className="discovery-cta">
          <span className="eyebrow">
            <span /> READY WHEN YOU ARE
          </span>
          <a
            href="#book"
            className="editorial-button button-dark"
            onClick={() =>
              window.plausible?.("cta_click", {
                props: { location: "how-it-works", label: "primary" },
              })
            }
          >
            {marketing.primaryCTA}
            <ArrowUpRight size={17} aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
}
