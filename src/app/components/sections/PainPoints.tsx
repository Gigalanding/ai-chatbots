'use client';

import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { marketing } from '@/app/config/marketing';
import { MotionScene } from '../ui/Motion';

function AdminScene() {
  return (
    <div className="pain-art admin-art" aria-hidden="true">
      <div className="scene-meta">
        <span>THE NEVER-ENDING TO-DO</span>
        <span className="small-dot" />
      </div>
      <div className="task-stack">
        {['Grade assignments', 'Plan next week', 'Send progress reports'].map((task, i) => (
          <div className={`task-slip slip-${i}`} key={task}>
            <span className="empty-check" />
            <span>{task}</span>
            <span className="task-time">{['12', '08', '16'][i]}</span>
          </div>
        ))}
      </div>
      <div className="time-label">
        <span className="orbit-clock">
          <span />
        </span>
        There goes your afternoon.
      </div>
    </div>
  );
}

function ToolsScene() {
  return (
    <div className="pain-art tools-art" aria-hidden="true">
      <div className="scene-meta">
        <span>CONTEXT SWITCHING…</span>
        <span className="small-dot" />
      </div>
      <svg className="tool-wires" viewBox="0 0 280 160" fill="none">
        <path
          d="M56 50C160 10 115 125 227 99M55 119C145 145 113 45 226 40"
          stroke="currentColor"
          strokeDasharray="4 7"
        />
        <path d="m129 78 8 8m0-8-8 8" stroke="currentColor" strokeWidth="2" />
      </svg>
      <span className="tool-tile tile-a">
        <span className="tile-symbol">Aa</span>Docs
      </span>
      <span className="tool-tile tile-b">
        <span className="tile-symbol">▦</span>Calendar
      </span>
      <span className="tool-tile tile-c">
        <span className="tile-symbol">↗</span>Drive
      </span>
      <span className="tool-tile tile-d">
        <span className="tile-symbol">A+</span>Grades
      </span>
      <div className="scene-footnote">Your work. All over the place.</div>
    </div>
  );
}

function MessagesScene() {
  return (
    <div className="pain-art messages-art" aria-hidden="true">
      <div className="scene-meta">
        <span>EVERYONE NEEDS SOMETHING</span>
        <span className="small-dot" />
      </div>
      <div className="message-bubble bubble-a">
        <span className="mini-avatar">S</span>
        <span>
          When is the deadline?<small>Student · just now</small>
        </span>
        <span className="message-count">3</span>
      </div>
      <div className="message-bubble bubble-b">
        <span className="mini-avatar">P</span>
        <span>
          Just following up…<small>Parent · 2 min ago</small>
        </span>
      </div>
      <div className="typing-bubble">
        <i />
        <i />
        <i />
        <span>And another message.</span>
      </div>
    </div>
  );
}

function DocumentsScene() {
  return (
    <div className="pain-art documents-art" aria-hidden="true">
      <div className="scene-meta">
        <span>COPY. PASTE. REPEAT.</span>
        <span className="small-dot" />
      </div>
      <div className="paper-stack">
        {[0, 1, 2].map((i) => (
          <div className={`paper-sheet paper-${i}`} key={i}>
            <span>Weekly report</span>
            <i />
            <i />
            <i />
            <i />
            <b>v{i + 1}.final.pdf</b>
          </div>
        ))}
      </div>
      <span className="repeat-stamp">Again?</span>
    </div>
  );
}

const scenes = [AdminScene, ToolsScene, MessagesScene, DocumentsScene];

export function PainPoints() {
  return (
    <section id="pain-points" className="pain-section editorial-section">
      <div className="editorial-container">
        <div className="section-heading split-heading">
          <div>
            <span className="eyebrow">
              <span /> THE EVERYDAY FRICTION
            </span>
            <h2>
              Sound familiar<span className="serif-accent">?</span>
            </h2>
          </div>
          <p>
            You became an educator to teach and inspire.
            <br className="desktop-break" /> Somewhere along the way, the busywork took over.
          </p>
        </div>
        <div className="pain-grid">
          {marketing.painPoints.map((pain, index) => {
            const Scene = scenes[index];
            return (
              <MotionScene key={pain.title} className={`pain-card pain-card-${index}`}>
                <Scene />
                <div className="pain-copy">
                  <span className="item-index">0{index + 1}</span>
                  <h3>{pain.title}</h3>
                  <p>{pain.description}.</p>
                </div>
              </MotionScene>
            );
          })}
        </div>
        <div className="pain-bottom">
          <p>
            Less juggling. <span>More of the work you love.</span>
          </p>
          <a href="#product" className="text-link">
            Meet a simpler workflow <ArrowUpRight size={18} aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
}
