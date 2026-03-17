// ─── Hero ───────────────────────────────────────────────────────────────────
export type HeroContent = {
  badgeInner: string;
  badgeOuter: string;
  titleBefore: string;
  titleHighlight: string;
  titleAfter: string;
  subtitle: string;
  primaryCta: { label: string; href: string };
  secondaryCta: { label: string; href: string };
  heroImageLight: string;
  heroImageDark: string;
  heroImageAlt: string;
};

// ...types unchanged...

export const defaultHomeContent: HomeContent = {
  // ── Hero ─────────────────────────────────────────────────────────────────
  hero: {
    badgeInner: "Launch",
    badgeOuter: "The modern way to manage your customers",
    titleBefore: "Grow your business with ",
    titleHighlight: "CoreCRM",
    titleAfter: "",
    subtitle:
      "CoreCRM provides powerful contact management, workflow automation, and team collaboration — all in a simple, secure, and beautifully designed platform.",
    primaryCta: { label: "Get Started", href: "#pricing" },
    secondaryCta: { label: "View Demo", href: "#features" },
    heroImageLight: "/hero-image-light.jpeg",
    heroImageDark: "/hero-image-dark.jpeg",
    heroImageAlt: "CoreCRM dashboard preview",
  },

  // ── Sponsors ─────────────────────────────────────────────────────────────
  sponsors: {
    heading: "Powered by trusted tech",
    items: [
      { icon: "Crown", name: "Vercel" },
      { icon: "Vegan", name: "Stripe" },
      { icon: "Ghost", name: "OpenAI" },
      { icon: "Puzzle", name: "Supabase" },
      { icon: "Squirrel", name: "Clerk" },
      { icon: "Drama", name: "Sentry" },
    ],
  },

  // ── Benefits ─────────────────────────────────────────────────────────────
  benefits: {
    eyebrow: "Why CoreCRM",
    heading: "A clean, production-grade start for modern teams",
    description:
      "Focus on your customers and revenue. CoreCRM comes with the essential features every SMB needs, and nothing to slow you down.",
    items: [
      {
        icon: "Blocks",
        title: "Simple, Flexible CRM",
        description: "Store contacts, manage deals, and organize workflows on day one.",
      },
      {
        icon: "LineChart",
        title: "Real-Time Collaboration",
        description: "Empower your team with shared pipelines and streamlined tasks.",
      },
      {
        icon: "Wallet",
        title: "Own Your Data",
        description: "Your customer data stays secure and accessible, not locked into a closed ecosystem.",
      },
      {
        icon: "Sparkle",
        title: "Designed for Growth",
        description: "Start with CoreCRM and expand as your team and needs scale.",
      },
    ],
  },

  // ── Features ─────────────────────────────────────────────────────────────
  features: {
    eyebrow: "Product Features",
    heading: "Everything you need to win more business",
    subtitle:
      "Get business-standard CRM features in a modern, easy-to-use package.",
    items: [
      { icon: "TabletSmartphone", title: "Work from Anywhere", description: "Desktop and mobile-ready CRM for sales and support teams on the go." },
      { icon: "BadgeCheck", title: "Contact Management", description: "Store all your contacts and companies in one secure, filterable place." },
      { icon: "Goal", title: "Deal Pipelines", description: "Visualize and track sales stages, values, and activity at a glance." },
      { icon: "PictureInPicture", title: "Task Automation", description: "Streamline daily tasks and reminders, so nothing falls through the cracks." },
      { icon: "MousePointerClick", title: "Team Collaboration", description: "Assign leads, share pipelines, and log activity together." },
      { icon: "Newspaper", title: "Integrate Easily", description: "Connect CoreCRM to your existing tools with an open API (coming soon)." },
    ],
  },

  // ── Services ─────────────────────────────────────────────────────────────
  services: {
    eyebrow: "Services",
    heading: "Internal CRM foundation",
    subtitle:
      "Deploy instantly. Collaborate seamlessly, customize easily, and control your business data.",
    items: [
      { title: "Contact & Pipeline Management", description: "Log every lead, deal, and customer conversation in one place.", pro: false },
      { title: "Custom Fields & Tags", description: "Adapt CoreCRM to your own process — no engineer required.", pro: false },
      { title: "Secure Team Collaboration", description: "Manage permissions and see user activity with robust access control.", pro: false },
      { title: "Self-Serve Reporting", description: "Track sales, action items, and KPIs with smarter dashboards.", pro: true },
    ],
  },

  // ── Testimonials ─────────────────────────────────────────────────────────
  testimonials: {
    eyebrow: "Testimonials",
    heading: "Trusted by SMB teams and founders",
    reviews: [
      { image: "/demo-img.jpg", name: "Aarav Shah", role: "CTO, Retail Squad", comment: "CoreCRM was up and running in minutes. We migrated our whole customer list and never looked back.", rating: 5.0 },
      { image: "/demo-img.jpg", name: "Maya Patel", role: "CX Lead, ServiceLoop", comment: "Best onboarding experience I've ever had in a CRM. Simple and fast, with all the essentials out of the box.", rating: 4.9 },
      { image: "/demo-img.jpg", name: "Emma Brooks", role: "Founder, BlueGo", comment: "Replacing our spreadsheet with CoreCRM multiplied our team's efficiency.", rating: 5.0 },
      { image: "/demo-img.jpg", name: "Daniel Kim", role: "Growth Manager, Frictionless", comment: "Affordable, modern, and developer-friendly. We finally control our customer data.", rating: 5.0 },
    ],
  },

  // ── Team ─────────────────────────────────────────────────────────────────
  team: {
    eyebrow: "Team",
    heading: "Built and maintained by Chirag Dodiya",
    members: [
      {
        imageUrl: "/team1.jpg",
        firstName: "Chirag",
        lastName: "Dodiya",
        positions: ["Founder", "Product & Engineering"],
        socialNetworks: [
          { name: "LinkedIn", url: "https://www.linkedin.com/in/chiragdodiya" },
          { name: "Github", url: "https://github.com/chiragdodiya" },
          { name: "X", url: "https://x.com/chiragdodiya" },
        ],
      },
    ],
  },

  // ── Pricing ──────────────────────────────────────────────────────────────
  pricing: {
    eyebrow: "Pricing",
    heading: "Plans for every business",
    subtitle: "Transparent pricing for startups and teams. Try for free — no credit card required.",
    priceSuffix: "/month",
    plans: [
      {
        title: "Free",
        popular: false,
        price: 0,
        description: "Ideal for founders and small teams just getting started.",
        buttonText: "Get Started Free",
        benefits: ["Unlimited records", "All CRM features", "Community support", "Basic reporting", "Fast onboarding"],
      },
      {
        title: "Team",
        popular: true,
        price: 39,
        description: "For growing teams and collaborative sales/support organizations.",
        buttonText: "Start Team Trial",
        benefits: ["Unlimited teammates", "Advanced permissions", "Team pipelines", "Premium support", "Custom fields"],
      },
      {
        title: "Enterprise",
        popular: false,
        price: 149,
        description: "Power, support, and scale for large teams and compliance-driven organizations.",
        buttonText: "Contact Sales",
        benefits: ["Priority onboarding", "Dedicated success manager", "Audit logging", "API access", "Custom integration support"],
      },
    ],
  },

  // ── Contact ──────────────────────────────────────────────────────────────
  contact: {
    eyebrow: "Contact",
    heading: "Talk to CoreCRM",
    description:
      "Want a personalized onboarding, have migration questions, or need advanced setup? Email us or fill out the form below — we'll help you move fast.",
    mailtoAddress: "hi@chirag.co",
    info: {
      address: { label: "Find us", value: "Remote-first • Bengaluru, India" },
      phone: { label: "Call us", value: "" },
      email: { label: "Email us", value: "hi@chirag.co" },
      hours: { label: "Hours", value: ["Monday - Friday", "10AM - 7PM IST"] },
    },
    formSubjects: ["Demo Request", "Migration", "Product Questions", "Integration", "Custom Setup"],
    formSubmitLabel: "Send Contact Request",
  },

  // ── FAQ ──────────────────────────────────────────────────────────────────
  faq: {
    eyebrow: "FAQ",
    heading: "Frequently Asked Questions",
    items: [
      { question: "Is CoreCRM free to start?", answer: "Yes. The Free plan includes all key CRM features and unlimited records for individuals and small teams." },
      { question: "Where is my data stored?", answer: "All data is stored securely in a private, GDPR-compliant cloud instance. You retain full ownership." },
      { question: "Is there an API or integrations?", answer: "Open API and plug-and-play integrations are planned for launch in Q3 2024." },
      { question: "Can I import data from other CRM tools?", answer: "Yes! CSV import support is available today, and we offer migration help for teams as needed." },
      { question: "Who can I contact for help?", answer: "Chirag Dodiya (hi@chirag.co) is your point of contact for support, onboarding, or advanced product needs." },
    ],
  },

  // ── Footer ───────────────────────────────────────────────────────────────
  footer: {
    brandName: "CoreCRM",
    columns: [
      {
        heading: "Contact",
        links: [
          { label: "hi@chirag.co", href: "mailto:hi@chirag.co" },
          { label: "Github", href: "https://github.com/chiragdodiya" },
          { label: "LinkedIn", href: "https://www.linkedin.com/in/chiragdodiya" },
          { label: "X (Twitter)", href: "https://x.com/chiragdodiya" },
        ],
      },
      {
        heading: "Product",
        links: [
          { label: "Features", href: "#features" },
          { label: "Pricing", href: "#pricing" },
          { label: "Contact", href: "#contact" },
        ],
      },
      {
        heading: "Help",
        links: [
          { label: "Contact Us", href: "#contact" },
          { label: "FAQ", href: "#faq" },
          { label: "Docs", href: "https://nextjs.org/docs" },
        ],
      },
      {
        heading: "Socials",
        links: [
          { label: "GitHub", href: "https://github.com/chiragdodiya" },
          { label: "LinkedIn", href: "https://www.linkedin.com/in/chiragdodiya" },
          { label: "X", href: "https://x.com/chiragdodiya" },
        ],
      },
    ],
    copyright: "© 2026 CoreCRM. Built by Chirag Dodiya.",
    attribution: { label: "Built on Next.js", href: "https://nextjs.org" },
  },

  // ── Navbar ───────────────────────────────────────────────────────────────
  navbar: {
    brandName: "CoreCRM",
    routes: [
      { href: "/#testimonials", label: "Testimonials" },
      { href: "/#team", label: "Team" },
      { href: "/#contact", label: "Contact" },
      { href: "/#faq", label: "FAQ" },
    ],
    featureDropdownLabel: "Product",
    featureImage: { src: "/demo-img.jpg", alt: "CoreCRM preview" },
    features: [
      { title: "Contact & Deal Management", description: "Manage leads, customers, and sales pipeline in one place." },
      { title: "Workflow Automation", description: "Automate repetitive tasks and follow-ups for your team." },
      { title: "Seamless Collaboration", description: "Work together with permissions, notes, and shared records." },
    ],
    signInLabel: "Sign in",
    signUpLabel: "Get Started",
    dashboardLabel: "Dashboard",
    githubLink: { href: "https://github.com/chiragdodiya", ariaLabel: "CoreCRM GitHub" },
  },
};

export function getHomeContent(): HomeContent {
  return defaultHomeContent;
}