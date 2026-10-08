"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ArrowRight, ArrowUpRight, Check, Maximize2, X } from "lucide-react";
import { marketing } from "@/app/config/marketing";
import { MotionScene } from "../ui/Motion";

const shortLabels = [
  "Your material",
  "Connected notes",
  "Better questions",
  "Tested knowledge",
];
const stageHeadings = [
  "Start with what you teach.",
  "A good thought, kept in context.",
  "Turn understanding into questions.",
  "Make learning a feedback loop.",
];
const stageTags = [
  "PDF · TEXT · LINKS",
  "READ · HIGHLIGHT · REMEMBER",
  "GENERATE · EDIT · REFINE",
  "PRACTICE · REVIEW · IMPROVE",
];

function LearningGraphic({ step }: { step: number }) {
  const [answer, setAnswer] = useState<number | null>(null);
  return (
    <MotionScene className={`learning-graphic learning-graphic-${step}`}>
      {step === 0 && (
        <div className="material-demo scene-enter" aria-hidden="true">
          <span className="orbit-label orbit-label-a">A book</span>
          <span className="orbit-label orbit-label-b">A lecture script</span>
          <span className="orbit-label orbit-label-c">A useful link</span>
          <div className="material-paper">
            <div className="document-fold" />
            <span className="document-kicker">YOUR COURSE MATERIAL</span>
            <strong>
              Great teaching
              <br />
              starts here.
            </strong>
            <div className="document-lines">
              <i />
              <i />
              <i />
            </div>
            <span className="file-type">
              PDF <span>↗</span>
            </span>
          </div>
          <span className="material-status">
            <Check size={14} />
            One source of truth
          </span>
          <svg className="material-orbit" viewBox="0 0 460 290" fill="none">
            <ellipse
              cx="230"
              cy="145"
              rx="190"
              ry="100"
              stroke="currentColor"
              strokeDasharray="3 7"
            />
          </svg>
        </div>
      )}
      {step === 1 && (
        <div className="highlight-demo scene-enter" aria-hidden="true">
          <div className="demo-page">
            <span className="document-kicker">
              CHAPTER 02 · LEARNING IN CONTEXT
            </span>
            <h4>
              Every insight
              <br />
              has a source.
            </h4>
            <p>
              Ideas are easier to revisit when they stay connected to the
              material.
            </p>
            <p>
              <mark className="animated-highlight">
                A highlight becomes a note, linked to the page it came from.
              </mark>
            </p>
            <div className="document-lines">
              <i />
              <i />
            </div>
            <span className="page-number">24</span>
          </div>
          <div className="linked-note">
            <small>
              YOUR NOTE <span>↗ p. 24</span>
            </small>
            <p>
              Keep the idea.
              <br />
              Keep the context.
            </p>
            <span className="note-connection" />
          </div>
        </div>
      )}
      {step === 2 && (
        <div className="generate-demo scene-enter" aria-hidden="true">
          <div className="generation-settings">
            <span className="document-kicker">QUIZ STUDIO</span>
            <h4>
              Good questions.
              <br />
              Your material.
            </h4>
            <div className="generation-tags">
              <span>Multiple choice</span>
              <span>English</span>
              <span>Medium</span>
              <span>5 questions</span>
            </div>
            <div className="generation-line">
              <span className="live-dot" />
              Grounded in your course material
            </div>
          </div>
          <div className="generated-card">
            <span>
              QUESTION 01 <span>✦</span>
            </span>
            <div className="skeleton-line line-long" />
            <div className="skeleton-line" />
            <div className="skeleton-answer">
              <i />
              <span />
            </div>
            <div className="skeleton-answer">
              <i />
              <span />
            </div>
            <div className="skeleton-answer">
              <i />
              <span />
            </div>
            <div className="generated-footer">
              <Check size={13} />
              Ready for your review
            </div>
          </div>
        </div>
      )}
      {step === 3 && (
        <div className="practice-demo scene-enter">
          <span className="document-kicker">TRY A LITTLE QUESTION</span>
          <h4>
            What keeps a note connected
            <br className="desktop-break" /> to its context?
          </h4>
          <div className="practice-answers">
            {[
              "A link to its source page",
              "A separate, disconnected app",
              "A screenshot with no reference",
            ].map((label, i) => (
              <button
                key={label}
                type="button"
                aria-pressed={answer === i}
                className={`practice-answer ${answer === i ? (i === 0 ? "answer-correct" : "answer-incorrect") : ""}`}
                onClick={() => setAnswer(i)}
              >
                <span>
                  {answer === i && i === 0 ? (
                    <Check size={14} />
                  ) : (
                    String.fromCharCode(65 + i)
                  )}
                </span>
                {label}
              </button>
            ))}
          </div>
          <p className="practice-feedback" role="status">
            {answer === null
              ? "Choose an answer to see the feedback."
              : answer === 0
                ? "Exactly. Every note leads back to its source."
                : "Try again. Think about finding the original passage."}
          </p>
        </div>
      )}
    </MotionScene>
  );
}

export function Product() {
  const [active, setActive] = useState(0);
  const [selectedScreen, setSelectedScreen] = useState(0);
  const dialog = useRef<HTMLDialogElement>(null);
  const previousOverflow = useRef("");
  const steps = marketing.productPipeline;
  const screen = marketing.productScreens[selectedScreen];

  useEffect(
    () => () => {
      document.body.style.overflow = previousOverflow.current;
    },
    [],
  );

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const replay = window.setInterval(() => {
      setActive((current) => (current + 1) % steps.length);
    }, 5000);
    return () => window.clearInterval(replay);
  }, [steps.length]);

  const openScreen = (index: number) => {
    setSelectedScreen(index);
    previousOverflow.current = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    dialog.current?.showModal();
  };

  const selectWithKeyboard = (event: React.KeyboardEvent, index: number) => {
    if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;
    event.preventDefault();
    const next =
      event.key === "Home"
        ? 0
        : event.key === "End"
          ? steps.length - 1
          : (index + (event.key === "ArrowRight" ? 1 : steps.length - 1)) %
            steps.length;
    setActive(next);
    document.getElementById(`learning-tab-${next}`)?.focus();
  };

  return (
    <section id="product" className="product-section editorial-section">
      <div className="editorial-container">
        <div className="section-heading centered-heading">
          <span className="eyebrow">
            <span /> THE LEARNING WORKSPACE
          </span>
          <h2>
            From course material
            <br />
            to <span className="serif-accent">tested knowledge.</span>
          </h2>
        </div>
        <div className="learning-workspace">
          <div
            className="learning-rail"
            role="tablist"
            aria-label="Explore the learning workflow"
          >
            {steps.map((step, i) => (
              <button
                type="button"
                key={step.step}
                id={`learning-tab-${i}`}
                role="tab"
                aria-selected={active === i}
                aria-controls="learning-panel"
                tabIndex={active === i ? 0 : -1}
                onKeyDown={(event) => selectWithKeyboard(event, i)}
                onClick={() => setActive(i)}
                className={`learning-tab ${active === i ? "is-active" : ""}`}
              >
                <span className="rail-number">0{step.step}</span>
                <span>{shortLabels[i]}</span>
                <ArrowRight size={15} aria-hidden="true" />
              </button>
            ))}
          </div>
          <div
            className="learning-stage"
            role="tabpanel"
            id="learning-panel"
            aria-labelledby={`learning-tab-${active}`}
            tabIndex={0}
          >
            <div
              className="learning-stage-copy scene-enter"
              key={`copy-${active}`}
            >
              <span className="stage-tag">{stageTags[active]}</span>
              <h3>{stageHeadings[active]}</h3>
              <div className="stage-bottom">
                <span>
                  0{active + 1}
                  <span> / 04</span>
                </span>
                <button
                  type="button"
                  className="stage-next"
                  aria-label={
                    active === 3
                      ? "Replay the learning visuals"
                      : "Show the next learning visual"
                  }
                  onClick={() => setActive((active + 1) % steps.length)}
                >
                  <ArrowRight size={22} />
                </button>
              </div>
            </div>
            <LearningGraphic key={active} step={active} />
          </div>
        </div>

        <div className="screens-intro">
          <span className="eyebrow">LESS EXPLAINING. MORE SHOWING.</span>
          <h3>
            A closer look at
            <br />
            <span className="serif-accent">your new workspace.</span>
          </h3>
          <p>Real product screens. Room to see the details.</p>
        </div>
        <div className="product-screens">
          {marketing.productScreens.map((item, index) => (
            <figure
              key={item.src}
              className={`product-showcase showcase-${index}`}
            >
              <div className="showcase-heading">
                <div>
                  <span className="eyebrow">
                    0{index + 1} /{" "}
                    {index === 0
                      ? "KEEP THE GOOD IDEAS"
                      : "MAKE KNOWLEDGE STICK"}
                  </span>
                  <h4>{item.title}</h4>
                  <p>{item.caption}</p>
                </div>
                <button
                  type="button"
                  className="screen-expand"
                  onClick={() => openScreen(index)}
                >
                  <Maximize2 size={14} aria-hidden="true" />
                  View full size
                </button>
              </div>
              <MotionScene className="showcase-canvas">
                <div className="screen-annotation">
                  <span>
                    {index === 0
                      ? "Your notes, right where you need them."
                      : "From a chapter to a great question."}
                  </span>
                  <svg viewBox="0 0 120 75" fill="none" aria-hidden="true">
                    <path
                      d={
                        index === 0
                          ? "M112 5C46 2 106 52 14 60m0 0 14-16M14 60l22 3"
                          : "M8 5C81 4 15 53 105 61m0 0-15-16m15 16-22 2"
                      }
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <button
                  type="button"
                  className="product-screen-button"
                  onClick={() => openScreen(index)}
                  aria-label={`Enlarge ${item.title}`}
                >
                  <div className="product-window-bar">
                    <span className="window-dots">
                      <i />
                      <i />
                      <i />
                    </span>
                    <span>
                      {index === 0
                        ? "WORKSPACE / READER"
                        : "WORKSPACE / QUIZ STUDIO"}
                    </span>
                    <Maximize2 size={13} aria-hidden="true" />
                  </div>
                  <Image
                    src={item.src}
                    alt={`${item.title}: ${item.caption}`}
                    width={item.width}
                    height={item.height}
                    sizes="(min-width: 1280px) 1100px, 92vw"
                    unoptimized
                    className="product-screen-image"
                  />
                </button>
                <div className="showcase-caption">
                  <span className="live-dot" />
                  {index === 0
                    ? "Read. Highlight. Keep the context."
                    : "Generate. Review. Make it yours."}
                  <span className="showcase-chip">
                    {index === 0
                      ? "Page-linked notes"
                      : "Teacher-reviewed questions"}
                    <ArrowUpRight size={13} aria-hidden="true" />
                  </span>
                </div>
              </MotionScene>
              <figcaption className="sr-only">
                {item.caption} Select the image to see the full-size screenshot.
              </figcaption>
            </figure>
          ))}
        </div>
        <dialog
          ref={dialog}
          className="screen-dialog"
          aria-labelledby="screen-dialog-title"
          onClose={() => {
            document.body.style.overflow = previousOverflow.current;
          }}
          onClick={(event) => {
            if (event.target === event.currentTarget) dialog.current?.close();
          }}
        >
          <div className="screen-dialog-content">
            <div className="screen-dialog-header">
              <h3 id="screen-dialog-title">{screen.title}</h3>
              <button
                type="button"
                aria-label="Close full-size screenshot"
                autoFocus
                onClick={() => dialog.current?.close()}
              >
                <X size={22} />
              </button>
            </div>
            <div className="screen-dialog-scroll">
              <Image
                src={screen.src}
                alt={`${screen.title}: ${screen.caption}`}
                width={screen.width}
                height={screen.height}
                unoptimized
              />
            </div>
            <p>{screen.caption}</p>
          </div>
        </dialog>
      </div>
    </section>
  );
}
