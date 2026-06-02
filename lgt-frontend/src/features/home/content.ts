import type { ApiResponse, Highlight } from "@/features/home/types";

export const fallbackData: ApiResponse = {
  service: "The Living God Tabernacle",
  vision: "A welcoming home for worship, discipleship, prayer, and transformed lives.",
  about: {
    mission:
      "To raise wholehearted believers who know Christ, live His Word, and shine His love in every generation.",
    statementOfFaith:
      "We believe in salvation through Jesus Christ, the authority of Scripture, the power of prayer, and the work of the Holy Spirit in the Church.",
    liveNow: false,
  },
  churchInfo: {
    address: "Accra, Ghana",
    serviceTime: "Sunday Worship at 8:00 AM and Wednesday Bible Study at 6:00 PM",
    contactEmail: "connect@thelivinggodtabernacle.org",
    socialLinks: {
      facebook: "https://facebook.com",
      youtube: "https://youtube.com",
      instagram: "https://instagram.com",
    },
    givingUrl: "#connect",
  },
  leadership: {
    pastor: "The Living God Tabernacle Leadership",
    message:
      "You belong here. We are building a Christ-centered family where children, youth, adults, and new believers can grow with confidence and hope.",
    image: "",
  },
  modules: [
    { id: "altar", name: "Daily Manna", active: true, audience: "All believers" },
    { id: "explorers", name: "Kingdom Explorers", active: true, audience: "Children" },
    { id: "regen", name: "Re-Gen Hub", active: true, audience: "Youth" },
    { id: "fellowship", name: "LifeCircles", active: true, audience: "Adults" },
    { id: "prayer", name: "Prayer Wall", active: true, audience: "Community" },
    { id: "events", name: "Upcoming Events", active: true, audience: "Everyone" },
  ],
  links: {
    docs: "/docs",
    health: "/api/health",
    portal: "/",
  },
};

export const highlights: Highlight[] = [
  {
    title: "A place to belong",
    text: "Warm fellowship, pastoral care, and a church family that makes room for every stage of the journey.",
  },
  {
    title: "Children are seen here",
    text: "Faith-building spaces designed to help children of God grow with joy, clarity, and confidence in Christ.",
  },
  {
    title: "Rooted in the Word",
    text: "Biblical teaching, prayer, and discipleship that strengthen daily living beyond Sunday gatherings.",
  },
];

export const featureLabels: Record<string, string> = {
  altar: "Daily devotion",
  explorers: "Children's growth",
  regen: "Youth formation",
  fellowship: "Care groups",
  prayer: "Prayer support",
  events: "Church life",
  media: "Messages and media",
  ministries: "Service pathways",
};

export const navigationItems = [
  { href: "#about", label: "About" },
  { href: "#ministries", label: "Ministries" },
  { href: "#connect", label: "Connect" },
];

export const worshipPillars = [
  {
    title: "Prayer-Filled",
    text: "Every gathering is shaped to feel reverent, expectant, and close to the presence of God.",
  },
  {
    title: "Family-Centered",
    text: "Children, youth, adults, and new believers are welcomed with dignity and pastoral warmth.",
  },
  {
    title: "Word-Anchored",
    text: "Teaching, discipleship, and encouragement stay rooted in Scripture and daily transformation.",
  },
];
