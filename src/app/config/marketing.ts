// Marketing configuration - central place for all copy, branding, and settings
export const marketing = {
  brandName: "EduWorkflow Labs",
  brandTagline: "Streamline teaching workflows — without sacrificing quality.",
  targetAudience: "K–12 teachers, professors, tutors, and edtech teams",
  primaryCTA: "Book a 15‑minute call",
  secondaryCTA: "Share your workflow",
  
  // Value proposition bullets
  valueBullets: [
    "Cut busywork with smart automation & simpler flows",
    "Fewer disconnected tools — more teaching time",
    "Faster planning, grading, and communication"
  ],
  
  // Institutions shown in the hero (names only, no logos)
  institutions: [
    "TU Darmstadt",
    "Hochschule Darmstadt",
    "TH Deggendorf"
  ],

  // Product pipeline (how the learning platform works)
  productPipeline: [
    {
      step: 1,
      icon: "Upload",
      title: "Add your material",
      description: "Upload a PDF book or lecture script, paste text, or add a link. The course material stays the single source of truth."
    },
    {
      step: 2,
      icon: "BookOpen",
      title: "Read and highlight",
      description: "Students read in a built-in reader. Highlights and snippets become notes, each linked back to its page."
    },
    {
      step: 3,
      icon: "Sparkles",
      title: "Generate quizzes with AI",
      description: "Pick a section, question type, difficulty, language and number of questions. Questions are generated from that exact material."
    },
    {
      step: 4,
      icon: "BarChart3",
      title: "Practice and review",
      description: "Students take the quiz and see their results. Teachers rate, edit or remove questions, so every quiz gets better over time."
    }
  ],

  productScreens: [
    {
      src: "/product-reader.webp",
      width: 1600,
      height: 785,
      title: "Reader with notes",
      caption: "Read the material, highlight passages and keep page-linked notes next to the text."
    },
    {
      src: "/product-quiz.webp",
      width: 1600,
      height: 788,
      title: "Quiz generator",
      caption: "Generate multiple-choice quizzes from a book or section, then rate and edit each question."
    }
  ],

  // FAQ addressing common objections
  faq: [
    {
      q: "Is this a sales call?",
      a: "No. It's a 15–30 minute discovery chat to learn about your current workflow and pain points. If there's a fit later, great — if not, you still get value."
    },
    {
      q: "What do I get out of it?",
      a: "A concise set of tailored recommendations after the call, plus early access to tools we're building around your needs."
    },
    {
      q: "How do you handle privacy?",
      a: "We store only what you submit, keep it confidential, and never share it without permission. See our Privacy Policy for details."
    },
    {
      q: "How long does the call take?",
      a: "Most calls are 15-20 minutes. We respect your time and keep things focused on practical solutions."
    },
    {
      q: "Do you work with all education levels?",
      a: "Yes! We help K–12 teachers, university professors, tutors, and edtech teams streamline their workflows."
    }
  ],
  
  // Contact form configuration
  contactFormFields: [
    { name: "name", label: "Full name", type: "text", required: true, placeholder: "Your full name" },
    { name: "email", label: "Work email", type: "email", required: true, placeholder: "your.email@school.edu" },
    { name: "role", label: "Role", type: "text", required: true, placeholder: "e.g., Teacher, Professor, Principal" },
    { name: "organization", label: "School/Organization", type: "text", required: false, placeholder: "Optional" },
    { name: "painPoint", label: "Biggest workflow challenge", type: "textarea", required: true, placeholder: "Describe your main workflow frustration in 1-2 sentences" }
  ],
  
  // Legal and company information
  legal: {
    companyName: "EduWorkflow Labs",
    address: "Darmstadt, Germany",
    city: "Darmstadt",
    countryCode: "DE",
    email: "support@eduworkflow.org"
  },
  
  // Booking system configuration
  booking: {
    provider: "calcom" as "calcom" | "calendly" | "native", // 'calcom' | 'calendly' | 'native'
    calcomUsername: "eduworkflow",
    calendlyUrl: "https://calendly.com/eduworkflow/intro",
    meetingLength: 15,
    meetingTitle: "EduWorkflow Discovery Call"
  },
  
  // Brand colors and styling
  colors: {
    primary: "#3B82F6", // Blue-500
    accent: "#10B981",  // Emerald-500
    secondary: "#6B7280" // Gray-500
  },
  
  // Pain points and benefits content
  painPoints: [
    {
      icon: "Clock",
      title: "Drowning in admin tasks",
      description: "Endless grading, planning, and reporting that takes time away from actual teaching"
    },
    {
      icon: "Puzzle",
      title: "Too many disconnected tools",
      description: "Juggling multiple platforms that don't talk to each other creates more work"
    },
    {
      icon: "Users",
      title: "Communication chaos",
      description: "Parent emails, student questions, and colleague updates scattered everywhere"
    },
    {
      icon: "FileText",
      title: "Repetitive documentation",
      description: "Creating the same reports and materials over and over with slight variations"
    }
  ],
  
  // How it works process
  howItWorks: [
    {
      step: 1,
      title: "Share your context",
      description: "Tell us about your current workflow and biggest pain points in 30 seconds",
      icon: "MessageSquare"
    },
    {
      step: 2,
      title: "Quick discovery call",
      description: "15-minute focused conversation about practical solutions for your specific situation",
      icon: "Phone"
    },
    {
      step: 3,
      title: "Get tailored recommendations",
      description: "Receive actionable suggestions you can implement immediately, plus early access to new tools",
      icon: "FileCheck"
    }
  ]
};

// A/B testing variants
export const experimentVariants = {
  headline: {
    A: "Streamline teaching workflows — without sacrificing quality",
    B: "Drowning in admin tasks? Cut busywork and get back to teaching"
  },
  cta: {
    A: { text: "Book a 15‑minute call", style: "rounded" },
    B: { text: "Schedule your 15‑minute chat", style: "squared" }
  }
} as const;

// Analytics event names
export const analyticsEvents = {
  CTA_CLICK: "cta_click",
  FORM_SUBMIT: "form_submit", 
  BOOKING_OPENED: "booking_opened",
  BOOKING_CLICK: "booking_click",
  EXPERIMENT_VIEW: "experiment_view"
} as const;
