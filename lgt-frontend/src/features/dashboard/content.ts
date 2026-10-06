export type Metric = {
  label: string;
  value: string;
  change: string;
  tone: "good" | "steady" | "watch";
};

export type MediaItem = {
  title: string;
  type: "Audio" | "Video";
  status: "Published" | "Review" | "Draft";
  audience: string;
  plays: string;
  source: string;
};

export type TrafficSource = {
  label: string;
  value: string;
  percent: number;
};

export type ContentPerformance = {
  title: string;
  page: string;
  visitors: string;
  engagement: string;
};

export const dashboardMetrics: Metric[] = [
  { label: "Total Visitors", value: "18,420", change: "+12.8% this month", tone: "good" },
  { label: "Media Plays", value: "6,934", change: "+846 this week", tone: "good" },
  { label: "Prayer Requests", value: "142", change: "28 awaiting response", tone: "watch" },
  { label: "Avg. Session", value: "4m 18s", change: "Stable engagement", tone: "steady" },
];

export const mediaLibrary: MediaItem[] = [
  {
    title: "Sunday Worship Service",
    type: "Video",
    status: "Published",
    audience: "Public",
    plays: "2,184",
    source: "Facebook livestream",
  },
  {
    title: "Malachi 4 Teaching Series",
    type: "Audio",
    status: "Review",
    audience: "Members",
    plays: "812",
    source: "Legacy sermon archive",
  },
  {
    title: "Only Believe Hymn Collection",
    type: "Audio",
    status: "Draft",
    audience: "Public",
    plays: "356",
    source: "Hymns archive",
  },
  {
    title: "Youth Fellowship Recap",
    type: "Video",
    status: "Published",
    audience: "Youth",
    plays: "689",
    source: "Uploaded media",
  },
];

export const trafficSources: TrafficSource[] = [
  { label: "Direct visits", value: "7,820", percent: 42 },
  { label: "Facebook", value: "5,460", percent: 30 },
  { label: "Search", value: "3,980", percent: 21 },
  { label: "Shared links", value: "1,160", percent: 7 },
];

export const contentPerformance: ContentPerformance[] = [
  {
    title: "Malachi 4:5-6",
    page: "/message",
    visitors: "4,902",
    engagement: "68%",
  },
  {
    title: "Audio Sermons",
    page: "/sermons",
    visitors: "3,744",
    engagement: "61%",
  },
  {
    title: "Prayer and Testimonies",
    page: "/prayer",
    visitors: "2,280",
    engagement: "73%",
  },
  {
    title: "Only Believe Songs",
    page: "/hymns",
    visitors: "1,936",
    engagement: "54%",
  },
];
