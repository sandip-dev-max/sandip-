export type WorkWithUsMetric = {
  id: string;
  label: string;
  thumb: string;
  icon: "spark" | "globe" | "layers";
  accent: string;
};

export type WorkWithUsWorkflowNode = {
  id: string;
  label: string;
};

export type WorkWithUsTeamMember = {
  id: string;
  name: string;
  imageSrc: string;
  ring: "outer" | "inner";
  angle: number;
};

export const WORK_WITH_US = {
  eyebrow: "Work with me",
  team: {
    headline: "A strong hand on every build",
    members: [
      {
        id: "m1",
        name: "Yudeat",
        imageSrc: "/hero.png",
        ring: "outer",
        angle: -18,
      },
      {
        id: "m2",
        name: "Design lead",
        imageSrc: "/field/IMG_6662.jpg",
        ring: "outer",
        angle: 52,
      },
      {
        id: "m3",
        name: "Frontend",
        imageSrc: "/field/IMG_6704.jpg",
        ring: "outer",
        angle: 128,
      },
      {
        id: "m4",
        name: "Product",
        imageSrc: "/field/IMG_6689.jpg",
        ring: "outer",
        angle: 205,
      },
      {
        id: "m5",
        name: "Strategy",
        imageSrc: "/field/IMG_6730.jpg",
        ring: "inner",
        angle: 12,
      },
      {
        id: "m6",
        name: "Motion",
        imageSrc: "/field/IMG_6711.jpg",
        ring: "inner",
        angle: 142,
      },
      {
        id: "m7",
        name: "Content",
        imageSrc: "/field/IMG_6695.jpg",
        ring: "inner",
        angle: 262,
      },
    ] satisfies WorkWithUsTeamMember[],
  },
  metrics: {
    title: "Results driven",
    tag: "Metrics",
    items: [
      {
        id: "metric-1",
        label: "12+ products shipped across web & brand",
        thumb: "/project4.png",
        icon: "spark",
        accent: "#f5d547",
      },
      {
        id: "metric-2",
        label: "Clients across 4 countries",
        thumb: "/project2.png",
        icon: "globe",
        accent: "#6ea8ff",
      },
      {
        id: "metric-3",
        label: "Design systems built for long-term scale",
        thumb: "/project1.png",
        icon: "layers",
        accent: "#c4b5fd",
      },
    ] satisfies WorkWithUsMetric[],
  },
  workflow: {
    title: "Specialised frameworks & workflows",
    tag: "Our approach",
    nodes: [
      { id: "research", label: "Research" },
      { id: "audit", label: "Brand perception audit" },
      { id: "analysis", label: "Data analysis" },
      { id: "positioning", label: "Positioning strategy" },
    ] satisfies WorkWithUsWorkflowNode[],
  },
} as const;
