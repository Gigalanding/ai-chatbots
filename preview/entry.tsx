import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import { ArrowUpRight } from "lucide-react";
import { MotionProvider } from "../src/app/components/ui/Motion";
import { Navigation } from "../src/app/components/layout/Navigation";
import { Footer } from "../src/app/components/layout/Footer";
import { StickyCTA } from "../src/app/components/layout/StickyCTA";
import { Hero } from "../src/app/components/sections/Hero";
import { PainPoints } from "../src/app/components/sections/PainPoints";
import { Product } from "../src/app/components/sections/Product";
import { HowItWorks } from "../src/app/components/sections/HowItWorks";
import { FAQ } from "../src/app/components/sections/FAQ";
import { ContactForm } from "../src/app/components/forms/ContactForm";

function BookingPreview() {
  return (
    <section id="book" className="editorial-section preview-booking">
      <div className="editorial-container">
        <div className="section-heading centered-heading">
          <span className="eyebrow">A BETTER WORKFLOW STARTS HERE</span>
          <h2>
            Let’s find a little
            <br />
            <span className="serif-accent">breathing room.</span>
          </h2>
          <p>Bring your current workflow. We&apos;ll map a useful next step together.</p>
        </div>
        <div className="preview-booking-card">
          <div className="preview-booking-mark">↗</div>
          <h3>
            Your next teaching day,
            <br />a little lighter.
          </h3>
          <p>
            This is a design preview. The live website uses your existing
            booking calendar.
          </p>
          <a href="#contact" className="editorial-button button-dark">
            Explore the contact form
            <ArrowUpRight size={16} />
          </a>
        </div>
      </div>
    </section>
  );
}

function ContactPreview() {
  const [attempted, setAttempted] = useState(false);
  return (
    <div
      className="preview-contact"
      onSubmitCapture={(event) => {
        event.preventDefault();
        event.stopPropagation();
        setAttempted(true);
      }}
    >
      <div className="preview-form-note" role="status">
        {attempted
          ? "Form interaction previewed. No information was sent."
          : "Design preview — form submissions are disabled."}
      </div>
      <ContactForm />
    </div>
  );
}

function Preview() {
  const [legalPage, setLegalPage] = useState("Privacy Policy");
  return (
    <MotionProvider>
      <div
        className="min-h-screen landing-page"
        onClickCapture={(event) => {
          const target = (event.target as HTMLElement).closest("a");
          if (
            target &&
            ["/privacy", "/terms"].includes(target.getAttribute("href") || "")
          ) {
            event.preventDefault();
            setLegalPage(
              target.getAttribute("href") === "/privacy"
                ? "Privacy Policy"
                : "Terms of Service",
            );
            (
              document.getElementById(
                "preview-legal-dialog",
              ) as HTMLDialogElement
            ).showModal();
          }
        }}
      >
        <Navigation />
        <main>
          <Hero />
          <PainPoints />
          <Product />
          <HowItWorks />
          <BookingPreview />
          <ContactPreview />
          <FAQ />
        </main>
        <Footer />
        <StickyCTA />
        <div className="preview-label">
          DESIGN PREVIEW <span>·</span>{" "}
          <a href="#product">Explore the changes ↗</a>
        </div>
        <dialog
          id="preview-legal-dialog"
          className="preview-legal-dialog"
          aria-labelledby="preview-legal-title"
        >
          <h2 id="preview-legal-title">{legalPage}</h2>
          <p>
            This single-file preview shows the landing-page design. The complete
            legal pages are included in the website source.
          </p>
          <form method="dialog">
            <button className="editorial-button button-dark">
              Return to the preview
            </button>
          </form>
        </dialog>
      </div>
    </MotionProvider>
  );
}

createRoot(document.getElementById("root")!).render(<Preview />);
