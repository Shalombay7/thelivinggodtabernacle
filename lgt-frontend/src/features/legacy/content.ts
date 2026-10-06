export type LegacyPage = {
  slug: string;
  title: string;
  eyebrow: string;
  summary: string;
  sourceUrl?: string;
  primaryAction?: {
    label: string;
    href: string;
    external?: boolean;
  };
  highlights: string[];
  sections: {
    title: string;
    body: string;
    items?: string[];
  }[];
  related: {
    label: string;
    href: string;
  }[];
};

export const legacyNavigation = [
  { href: "/", label: "Home" },
  { href: "/message", label: "Message" },
  { href: "/services", label: "Services" },
  { href: "/resources", label: "Resources" },
  { href: "/modules", label: "App Modules" },
  { href: "/prayer", label: "Prayer" },
  { href: "/about", label: "About" },
  { href: "/dashboard", label: "Dashboard" },
];

export const legacyPages: LegacyPage[] = [
  {
    slug: "message",
    title: "Malachi 4:5-6",
    eyebrow: "Legacy Teaching",
    summary:
      "The legacy site places Malachi 4:5-6 at the center of its message, pointing believers to God's promise of restoration before the coming of the Lord.",
    sourceUrl: "https://thelivinggodtabernacle.org/malachi-4-5-6/",
    primaryAction: {
      label: "Open original teaching",
      href: "https://thelivinggodtabernacle.org/malachi-4-5-6/",
      external: true,
    },
    highlights: ["Malachi 4:5-6", "Revelation 10:7", "Acts 3:19-21"],
    sections: [
      {
        title: "Core Scripture",
        body:
          "The page opens with the promise that Elijah would come before the great and dreadful day of the Lord, turning hearts back according to Scripture.",
      },
      {
        title: "Restoration Emphasis",
        body:
          "Its teaching connects the ministry of John the Baptist, the words of Jesus in Matthew 17, and the end-time promise of a restoration of all things.",
      },
      {
        title: "App Direction",
        body:
          "This app now gives that message a clearer route, so visitors can move from the foundational teaching into sermons, study resources, prayer, and fellowship without leaving the new experience.",
      },
    ],
    related: [
      { label: "Sermons", href: "/sermons" },
      { label: "Teachings", href: "/teachings" },
      { label: "Prayer", href: "/prayer" },
    ],
  },
  {
    slug: "services",
    title: "Services and Live Fellowship",
    eyebrow: "Worship Rhythm",
    summary:
      "Service information from the legacy site is now presented as a direct app page for worship times, live streaming, and online radio.",
    sourceUrl: "https://thelivinggodtabernacle.org/",
    primaryAction: {
      label: "Open live stream",
      href: "https://web.facebook.com/thelivinggodtabernacle/",
      external: true,
    },
    highlights: ["Sundays 9:30 AM-12:00 PM GMT", "Wednesdays 6:30 PM-8:00 PM GMT", "Fridays 6:30 PM-8:00 PM GMT"],
    sections: [
      {
        title: "Gathering Times",
        body:
          "The legacy homepage invites visitors to join live services on Sundays, Wednesdays, and Fridays, with streaming available when services are in session.",
      },
      {
        title: "Live Online Radio",
        body:
          "The ministry also points visitors to its online radio channel for worship, hymns, sermons, and ongoing encouragement throughout the week.",
      },
      {
        title: "Local Assembly",
        body:
          "The app keeps the visit path simple: worship location, service rhythm, livestream, and radio now sit together in one professional service page.",
      },
    ],
    related: [
      { label: "Live Radio", href: "/radio" },
      { label: "Sermons", href: "/sermons" },
      { label: "Prayer", href: "/prayer" },
    ],
  },
  {
    slug: "resources",
    title: "Resource Library",
    eyebrow: "Legacy Content Paths",
    summary:
      "The legacy site's sermon, teaching, hymn, video, gallery, and Bible Q&A links are now grouped into a native resource hub.",
    sourceUrl: "https://thelivinggodtabernacle.org/",
    highlights: ["Audio sermons", "Did You Know?", "Only Believe songs", "Bible Q&A"],
    sections: [
      {
        title: "Primary Resource Areas",
        body:
          "The resource hub preserves the legacy site's main destinations while preparing them for cleaner app-native browsing.",
        items: ["Audio sermons", "Did You Know? teachings", "Only Believe hymns", "Must-watch videos", "Gallery and quotes", "Bible questions and answers"],
      },
      {
        title: "Migration Approach",
        body:
          "Each legacy destination now has a matching app route. Visitors can read an app-ready overview first, then open the original source when they need the complete archive.",
      },
    ],
    related: [
      { label: "Sermons", href: "/sermons" },
      { label: "Teachings", href: "/teachings" },
      { label: "Hymns", href: "/hymns" },
      { label: "Questions", href: "/questions" },
    ],
  },
  {
    slug: "sermons",
    title: "Audio Sermons",
    eyebrow: "Sermon Archive",
    summary:
      "The legacy sermon archive is organized by year, with recent archives including 2026, 2025, 2024, 2023, 2022, 2021, 2020, and 2018.",
    sourceUrl: "https://thelivinggodtabernacle.org/malachi-4-5-6/audio-sermons-2/",
    primaryAction: {
      label: "Browse original archive",
      href: "https://thelivinggodtabernacle.org/malachi-4-5-6/audio-sermons-2/",
      external: true,
    },
    highlights: ["2026 sermons", "2025 sermons", "2024 sermons", "Download paths"],
    sections: [
      {
        title: "Archive Structure",
        body:
          "The legacy page lists audio sermons by year so believers can move through the message archive chronologically.",
        items: ["2026 Sermons", "2025 Sermons", "2024 Sermons", "2023 Sermons", "2022 Sermons", "2021 Sermons", "2020 Sermons", "2018 Sermons"],
      },
      {
        title: "Recent Questions Nearby",
        body:
          "The sermon archive also surfaces recent teaching questions, which are now connected through the app's Questions page.",
      },
    ],
    related: [
      { label: "Message", href: "/message" },
      { label: "Questions", href: "/questions" },
      { label: "Live Radio", href: "/radio" },
    ],
  },
  {
    slug: "teachings",
    title: "Did You Know?",
    eyebrow: "Bible Teaching",
    summary:
      "The legacy teaching path highlights Revelation 10:7 and a series of doctrine and study articles for believers.",
    sourceUrl: "https://thelivinggodtabernacle.org/did-you-know/",
    primaryAction: {
      label: "Open original teachings",
      href: "https://thelivinggodtabernacle.org/did-you-know/",
      external: true,
    },
    highlights: ["Revelation 10:7", "Study topics", "Doctrine articles"],
    sections: [
      {
        title: "Legacy Emphasis",
        body:
          "The homepage introduces Did You Know? with Revelation 10:7, emphasizing the finishing of the mystery of God in the days of the seventh angel's voice.",
      },
      {
        title: "Article Pathways",
        body:
          "Indexed legacy articles include Origins, Music and Religion Through the Ages, Spiritual Roots, The Music of Laodicea, and related study topics.",
      },
    ],
    related: [
      { label: "Message", href: "/message" },
      { label: "Questions", href: "/questions" },
      { label: "Resources", href: "/resources" },
    ],
  },
  {
    slug: "hymns",
    title: "Only Believe Songs",
    eyebrow: "Worship Songs",
    summary:
      "The legacy hymns area begins with familiar songs including Only Believe, Amazing Grace, Sweet Hour Of Prayer, Oh How I Love Jesus, and Victory In Jesus.",
    sourceUrl: "https://thelivinggodtabernacle.org/malachi-4-5-6/hymns/",
    primaryAction: {
      label: "Open original hymns",
      href: "https://thelivinggodtabernacle.org/malachi-4-5-6/hymns/",
      external: true,
    },
    highlights: ["Only Believe", "Amazing Grace", "Sweet Hour Of Prayer", "Victory In Jesus"],
    sections: [
      {
        title: "Hymn Index",
        body:
          "The legacy page lists numbered hymns and continues through additional song pages for worship and congregational singing.",
        items: ["0001 Only Believe", "0002 Amazing Grace", "0005 Sweet Hour Of Prayer", "0022 Victory In Jesus", "0031 Standing On The Promises"],
      },
      {
        title: "App Direction",
        body:
          "This route gives hymns their own destination now, with room later for search, favorites, lyrics, and audio-safe worship resources.",
      },
    ],
    related: [
      { label: "Services", href: "/services" },
      { label: "Radio", href: "/radio" },
      { label: "Resources", href: "/resources" },
    ],
  },
  {
    slug: "videos",
    title: "Videos",
    eyebrow: "Watch",
    summary:
      "The legacy videos destination is preserved as a dedicated app route for sermons, testimonies, songs, and visual ministry resources.",
    sourceUrl: "https://thelivinggodtabernacle.org/malachi-4-5-6/videos/",
    primaryAction: {
      label: "Open original videos",
      href: "https://thelivinggodtabernacle.org/malachi-4-5-6/videos/",
      external: true,
    },
    highlights: ["Sermon video", "Testimony video", "Song video"],
    sections: [
      {
        title: "Video Library",
        body:
          "The previous site directs visitors to must-watch videos. The app now gives that media pathway a cleaner landing page while the full archive remains available at the original link.",
      },
    ],
    related: [
      { label: "Sermons", href: "/sermons" },
      { label: "Gallery", href: "/gallery" },
      { label: "Services", href: "/services" },
    ],
  },
  {
    slug: "gallery",
    title: "Gallery and Quotes",
    eyebrow: "Ministry Moments",
    summary:
      "The legacy gallery and quotes destination is now represented by a polished app route for visual memories and inspirational material.",
    sourceUrl: "https://thelivinggodtabernacle.org/malachi-4-5-6/gallery/",
    primaryAction: {
      label: "Open original gallery",
      href: "https://thelivinggodtabernacle.org/malachi-4-5-6/gallery/",
      external: true,
    },
    highlights: ["Gallery", "Quotes", "Ministry memories"],
    sections: [
      {
        title: "Visual Archive",
        body:
          "This page prepares a clear destination for church photos, quote graphics, and event memories while keeping the current legacy gallery one click away.",
      },
    ],
    related: [
      { label: "Videos", href: "/videos" },
      { label: "Resources", href: "/resources" },
      { label: "About", href: "/about" },
    ],
  },
  {
    slug: "questions",
    title: "Bible Questions and Answers",
    eyebrow: "Study Help",
    summary:
      "The app now has a native Bible Q&A route for the recent questions and teaching articles that appear throughout the legacy site.",
    sourceUrl: "https://thelivinggodtabernacle.org/elementor-landing-page-3362/",
    primaryAction: {
      label: "Open original Q&A",
      href: "https://thelivinggodtabernacle.org/elementor-landing-page-3362/",
      external: true,
    },
    highlights: ["Romans 7:25", "Salvation questions", "Book of Life", "Body of Christ"],
    sections: [
      {
        title: "Recent Legacy Questions",
        body:
          "The legacy site surfaces recent Q&A posts across its archive, giving visitors direct answers to common Bible and faith questions.",
        items: [
          "Can a child born out of wedlock ever be saved or go in the rapture?",
          "Romans 7:25: with the mind I myself serve the law of God, but with the flesh the law of sin.",
          "How can a person have their name on the Book of Life and still be lost?",
          "How does one know their rightful position in the Body of Christ?",
          "Is it true that you are not saved unless you have received the Holy Ghost?",
        ],
      },
      {
        title: "Question 102: Romans 7:25",
        body:
          "This answer explains Paul's words in Romans 7:25 by pointing to the inward life: with the mind of Christ, the believer serves God, while the flesh remains subject to the law of sin. It connects the heart, the subconscious, faith, and the new birth, emphasizing that Eternal Life within will raise the body at the last day.",
      },
    ],
    related: [
      { label: "Teachings", href: "/teachings" },
      { label: "Sermons", href: "/sermons" },
      { label: "Prayer", href: "/prayer" },
    ],
  },
  {
    slug: "prayer",
    title: "Prayer and Testimonies",
    eyebrow: "Immediate Care",
    summary:
      "Prayer remains a first-class path in the upgraded app, connecting WhatsApp prayer support with the legacy prayer and testimonies archive.",
    sourceUrl: "https://thelivinggodtabernacle.org/malachi-4-5-6/prayer-requests-and-testimonies/",
    primaryAction: {
      label: "Request prayer on WhatsApp",
      href: "https://api.whatsapp.com/send/?phone=233208171538&app_absent=0",
      external: true,
    },
    highlights: ["Prayer requests", "Testimonies", "Answered prayer"],
    sections: [
      {
        title: "Prayer Path",
        body:
          "The legacy site points people directly to prayer. The app keeps that priority clear and prepares room for prayer requests, responses, moderation, and testimonies.",
      },
      {
        title: "Archive",
        body:
          "The existing prayer and testimonies archive remains linked as the source while the app grows a native prayer wall experience.",
      },
    ],
    related: [
      { label: "Services", href: "/services" },
      { label: "About", href: "/about" },
      { label: "Resources", href: "/resources" },
    ],
  },
  {
    slug: "modules",
    title: "App Modules",
    eyebrow: "Product Direction",
    summary:
      "The modern app organizes ministry life into clear spaces for devotion, children, youth, adults, prayer, events, media, and resources.",
    highlights: ["Daily Manna", "Kingdom Explorers", "Re-Gen Hub", "LifeCircles", "Prayer Wall", "Upcoming Events"],
    sections: [
      {
        title: "Ministry Spaces",
        body:
          "Each module gives a familiar part of church life a more intentional digital home, while staying connected to the message and resources from the legacy site.",
      },
      {
        title: "Growth Path",
        body:
          "This structure supports future native features such as saved sermons, reading plans, member care, event reminders, prayer requests, and testimonies.",
      },
    ],
    related: [
      { label: "Resources", href: "/resources" },
      { label: "Prayer", href: "/prayer" },
      { label: "Services", href: "/services" },
    ],
  },
  {
    slug: "radio",
    title: "Live Online Radio",
    eyebrow: "Audio Stream",
    summary:
      "The legacy homepage links to live online radio for sermons, hymns, and ministry audio throughout the week.",
    sourceUrl: "https://thelivinggodtab.radio12345.com/",
    primaryAction: {
      label: "Listen online",
      href: "https://thelivinggodtab.radio12345.com/",
      external: true,
    },
    highlights: ["24/7 access", "Sermons", "Hymns"],
    sections: [
      {
        title: "Radio Access",
        body:
          "This page keeps radio visible inside the app navigation while sending listeners to the current streaming service.",
      },
    ],
    related: [
      { label: "Services", href: "/services" },
      { label: "Hymns", href: "/hymns" },
      { label: "Sermons", href: "/sermons" },
    ],
  },
  {
    slug: "about",
    title: "About The Living God Tabernacle",
    eyebrow: "Biblical Foundation",
    summary:
      "The about page presents the ministry's foundation in Scripture, God's servants, prophetic promises, and end-time restoration.",
    sourceUrl: "https://thelivinggodtabernacle.org/",
    highlights: ["John 13:20", "Amos 3:7", "Malachi 4:5-6", "Revelation 22:18-19"],
    sections: [
      {
        title: "Our Biblical Foundation",
        body:
          "We believe God sends vindicated messengers at the close of each age, calling His people back to the full Word of God as revealed in the Scriptures.",
      },
      {
        title: "The Word and God's Servants",
        body:
          "The Bible is the complete written revelation of Jesus Christ. True servants of God point back to the Scriptures, and their message must agree with the Word.",
      },
      {
        title: "End-Time Promises",
        body:
          "The ministry looks to God's promises for the end time, including His work in the spirit of Elijah to turn hearts back to the faith of the fathers.",
      },
    ],
    related: [
      { label: "Message", href: "/message" },
      { label: "Services", href: "/services" },
      { label: "Prayer", href: "/prayer" },
    ],
  },
];

export const legacyPageMap = new Map(legacyPages.map((page) => [page.slug, page]));

export function getLegacyPage(slug: string) {
  return legacyPageMap.get(slug);
}

export function getLegacySlugs() {
  return legacyPages.map((page) => page.slug);
}
