export type Project = {
  id: string;
  slug: string;
  title: string;
  tagline: string;
  description: string;
  tech: string[];
  category: "Machine Learning" | "Software";
  repo_url: string | null;
  demo_url: string | null;
  image_url: string | null;
  sort_order: number;
  published: boolean;
};

// Seed mirrors the CV and real repositories. It renders until Supabase
// is configured, then the database becomes the single source of truth.
export const seedProjects: Project[] = [
  {
    id: "seed-1",
    slug: "physics-informed-neural-networks",
    title: "Physics-Informed Neural Networks",
    tagline: "Reconstructing fluid flow from sparse data in PyTorch",
    description:
      "Neural networks that embed the governing PDEs directly into the training loss, solving Burgers' equation and recovering hidden fluid-flow fields from sparse measurements. Implemented in PyTorch, following published research.",
    tech: ["PyTorch", "Python", "Jupyter"],
    category: "Machine Learning",
    repo_url: "https://github.com/MRRzkS/physics-informed-burgers-pinn",
    demo_url: null,
    image_url: "/projects/pinn.png",
    sort_order: 10,
    published: true,
  },
  {
    id: "seed-2",
    slug: "kolmogorov-arnold-network",
    title: "Kolmogorov-Arnold Network",
    tagline: "Learnable spline activations as an alternative to MLPs",
    description:
      "A KAN implementation exploring learnable spline-based activations, benchmarked against a standard MLP on convergence and decision-boundary quality.",
    tech: ["PyTorch", "Python"],
    category: "Machine Learning",
    repo_url: "https://github.com/MRRzkS/Kolmogorov-Arnold-Network",
    demo_url: null,
    image_url: "/projects/kan.png",
    sort_order: 20,
    published: true,
  },
  {
    id: "seed-3",
    slug: "catatstok",
    title: "CatatStok",
    tagline: "Warehouse inventory desktop app, primary developer",
    description:
      "A working OOP inventory system in Java and JavaFX with Maven: item and category CRUD, inbound and outbound stock transactions with audit history, low-stock alerts, and CSV report export through a centralized data service.",
    tech: ["Java", "JavaFX", "Maven"],
    category: "Software",
    repo_url: "https://github.com/MRRzkS",
    demo_url: null,
    image_url: "/projects/catatstok.png",
    sort_order: 30,
    published: true,
  },
  {
    id: "seed-4",
    slug: "hitter-protocol",
    title: "Hitter Protocol",
    tagline: "Offline-first volleyball training PWA, no framework",
    description:
      "An installable Progressive Web App for daily volleyball training, built in vanilla JavaScript. Offline-first service worker, a dynamic routine engine with a half-effort Dial mode, Web Audio cues, haptics, Screen Wake Lock, and streak tracking with export and import.",
    tech: ["JavaScript", "PWA", "Service Worker"],
    category: "Software",
    repo_url: "https://github.com/MRRzkS/fly-high",
    demo_url: null,
    image_url: "/projects/hitter.png",
    sort_order: 40,
    published: true,
  },
  {
    id: "seed-5",
    slug: "telemedicine-system",
    title: "Telemedicine System",
    tagline: "Full SDLC software engineering project",
    description:
      "Requirements analysis, context diagram, DFD, ERD, data dictionary, UI design, Java implementation, and black-box testing, delivered end to end with a team of three.",
    tech: ["Java", "UML", "SDLC"],
    category: "Software",
    repo_url: null,
    demo_url: null,
    image_url: null,
    sort_order: 50,
    published: true,
  },
  {
    id: "seed-6",
    slug: "sleep-health-classification",
    title: "Sleep Health Classification",
    tagline: "Four-model pipeline, written up IEEE-style",
    description:
      "A classification pipeline comparing SVM, Decision Tree, k-NN, and Random Forest with confusion-matrix evaluation. Results written up as an IEEE-format paper in LaTeX.",
    tech: ["Python", "scikit-learn", "LaTeX"],
    category: "Machine Learning",
    repo_url: null,
    demo_url: null,
    image_url: null,
    sort_order: 60,
    published: true,
  },
  {
    id: "seed-7",
    slug: "culturanet",
    title: "CulturaNet",
    tagline: "PKM-KC 2026 proposal for artifact classification",
    description:
      "Co-authored a national student innovation program proposal to classify Indonesian archaeological artifacts with a MultiTaskCNN Edge-Aware architecture, including budget compliance and reviewer-driven revisions.",
    tech: ["Deep Learning", "Mobile concept", "Proposal"],
    category: "Machine Learning",
    repo_url: null,
    demo_url: null,
    image_url: null,
    sort_order: 70,
    published: true,
  },
];

export const categories = ["All", "Machine Learning", "Software"] as const;
export type Category = (typeof categories)[number];
