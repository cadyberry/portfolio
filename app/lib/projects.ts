export type Project = {
  slug: string
  name: string
  year: string
  tagline: string
  description: string[]
  tags: string[]
  cta?: { label: string; href: string }
}

export const PROJECTS: Project[] = [
  {
    slug: "themes",
    name: "Themes",
    year: "2025",
    tagline: "Five complete HTML/CSS theme systems, ready to drop in.",
    description: [
      "A collection of fully built UI theme systems — each one a distinct visual world with its own color palette, typography, component set, and personality. Not Tailwind utilities. Not a framework. Just clean, opinionated HTML and CSS you can actually use.",
      "Built for developers who want a strong aesthetic starting point without designing from scratch, and for designers who want to hand off something that already works.",
    ],
    tags: ["HTML", "CSS", "UI Systems", "Themes", "Design Tokens"],
  },
  {
    slug: "packs",
    name: "Packs",
    year: "2025",
    tagline: "Design resource packs built for real workflows.",
    description: [
      "Curated design packs — assets, templates, and components grouped by use case. Each pack is opinionated and complete, not a dump of raw files.",
      "Made for designers who are tired of hunting across five different sites for things that should just exist together.",
    ],
    tags: ["Design Assets", "Templates", "Components", "Figma"],
  },
  {
    slug: "gen-ai-tools",
    name: "Generative Art Tools",
    year: "2024",
    tagline: "AI-powered tools built from the ground up.",
    description: [
      "A set of generative AI tools built and shipped independently — not wrappers around ChatGPT, but purpose-built interfaces for specific creative and analytical tasks. Includes work in clinical NLP, document intelligence, and creative generation.",
      "Background: several years building AI systems at scale, including things running in hospitals. That infrastructure experience means these tools are built to actually work, not just demo.",
    ],
    tags: ["Generative AI", "NLP", "Python", "OpenAI", "ML Engineering"],
  },
  {
    slug: "animation",
    name: "Animation",
    year: "2025",
    tagline: "Motion and generative visuals.",
    description: [
      "Motion design, generative animation, and interactive visual experiments. The work here lives between code and art — some of it is UI animation, some of it is generative systems that produce something different every time.",
      "Built with Unicorn Studio, CSS animation, and custom canvas work.",
    ],
    tags: ["Motion Design", "Generative Art", "CSS Animation", "Interactive"],
  },
  {
    slug: "design-tools",
    name: "Design Tools",
    year: "2025",
    tagline: "Tools built because the right one didn't exist.",
    description: [
      "A collection of custom design utilities — color tools, layout helpers, typography testers, and more. Built in the browser, no install required.",
      "These exist because the tools that already exist are never quite strange enough, or fast enough, or opinionated in the right direction.",
    ],
    tags: ["Web Apps", "Color", "Typography", "Browser Tools"],
    cta: { label: "Explore the tools", href: "https://unafield.vercel.app" },
  },
  {
    slug: "ui-packs",
    name: "UI Packs",
    year: "2025",
    tagline: "Component libraries with a point of view.",
    description: [
      "Production-ready UI component packs — buttons, cards, forms, navigation, and more, all within a cohesive design system. Each pack ships with Figma source files and clean HTML/CSS.",
      "Designed to be used, not just looked at. Everything is accessible, responsive, and built to hold up in real products.",
    ],
    tags: ["UI Components", "Figma", "HTML", "CSS", "Design Systems"],
  },
  {
    slug: "audio",
    name: "Audio",
    year: "2025",
    tagline: "Original music produced in FL Studio.",
    description: [
      "Electronic and experimental music — produced entirely in FL Studio. The same sensibility that runs through the visual work: layered, textured, nothing quite where you expect it.",
    ],
    tags: ["FL Studio", "Electronic", "Experimental", "Audio Engineering"],
    cta: { label: "Listen on SoundCloud", href: "https://soundcloud.com/47c4dy" },
  },
  {
    slug: "github",
    name: "GitHub",
    year: "2018–",
    tagline: "",
    description: [],
    tags: ["Open Source", "TypeScript", "Python", "Angular", "React"],
    cta: { label: "View on GitHub", href: "https://github.com/cadyberry" },
  },
  {
    slug: "shop",
    name: "Shop",
    year: "2025",
    tagline: "60+ digital art prints, and three books in production.",
    description: [
      "Unavoide is the shop — digital art prints, physical prints, and books. The aesthetic runs neon, biomorphic, psychedelic. Nothing looks like anyone else's work because it's built on a personal visual language developed over years.",
      "Three books currently in production: a travel photography collection, a coloring book, and a print collection. The shop has been running since 2021.",
    ],
    tags: ["Digital Art", "Prints", "Photography", "Books"],
    cta: { label: "Visit the shop", href: "https://unavoide.com" },
  },
]

export function getProject(slug: string): Project | undefined {
  return PROJECTS.find(p => p.slug === slug)
}
