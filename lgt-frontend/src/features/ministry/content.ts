export type MinistryPage = {
  slug: string;
  title: string;
  eyebrow: string;
  summary: string;
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

export const ministryNavigation = [
  { href: "/", label: "Home" },
  { href: "/message", label: "Message" },
  { href: "/services", label: "Services" },
  { href: "/resources", label: "Resources" },
  { href: "/modules", label: "App Modules" },
  { href: "/prayer", label: "Prayer" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
  { href: "/posts", label: "Recent Posts" },
];

export const ministryPages: MinistryPage[] = [
  {
    slug: "message",
    title: "Malachi 4:5-6",
    eyebrow: "The End Time Message",
    summary:
      "Malachi 4:5-6 places God's promise of restoration before the coming of the Lord at the center of this message.",
    primaryAction: {
      label: "Explore the sermons",
      href: "/sermons",
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
        title: "Living the Message",
        body:
          "Follow the Scripture theme into sermons, Bible studies, prayer, and fellowship throughout the ministry.",
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
      "Join the Living God Tabernacle for in-person and online worship, prayer, and fellowship throughout the week.",
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
          "Join Sunday worship and Wednesday and Friday services. Online streaming is available when services are in session.",
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
    eyebrow: "Explore the Library",
    summary:
      "Explore sermons, Bible studies, hymns, videos, ministry photographs, and Bible questions in one place.",
    highlights: ["Audio sermons", "Did You Know?", "Only Believe songs", "Bible Q&A"],
    sections: [
      {
        title: "Primary Resource Areas",
        body:
          "Browse the ministry's teaching and worship resources directly in this app.",
        items: ["Audio sermons", "Did You Know? teachings", "Only Believe hymns", "Must-watch videos", "Gallery and quotes", "Bible questions and answers"],
      },
      {
        title: "Browse the Collections",
        body:
          "Choose a collection below to explore its available teaching, music, video, and community resources.",
      },
    ],
    related: [
      { label: "Sermons", href: "/sermons" },
      { label: "Teachings", href: "/teachings" },
      { label: "Hymns", href: "/hymns" },
      { label: "Questions", href: "/questions" },
      { label: "Pure Biblical Teachings", href: "/pure-biblical-teachings" },
      { label: "Videos", href: "/videos" },
      { label: "Gallery", href: "/gallery" },
      { label: "Prayer and testimonies", href: "/prayer" },
    ],
  },
  {
    slug: "sermons",
    title: "Audio Sermons",
    eyebrow: "Sermon Archive",
    summary:
      "Browse audio messages and Bible teaching from the Living God Tabernacle, with the archive arranged by year.",
    primaryAction: {
      label: "Browse by year",
      href: "/sermons#archive-years",
    },
    highlights: ["2026 sermons", "2025 sermons", "2024 sermons", "Download paths"],
    sections: [
      {
        title: "Archive by Year",
        body:
          "The audio archive is arranged chronologically so listeners can find messages from each available year.",
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
      "Explore Bible studies and teaching topics, with Scripture as the foundation for every subject.",
    primaryAction: {
      label: "Browse Bible questions",
      href: "/questions",
    },
    highlights: ["Revelation 10:7", "Study topics", "Doctrine articles"],
    sections: [
      {
        title: "Scripture Focus",
        body:
          "The homepage introduces Did You Know? with Revelation 10:7, emphasizing the finishing of the mystery of God in the days of the seventh angel's voice.",
      },
      {
        title: "Article Pathways",
        body:
          "Study topics include Origins, Music and Religion Through the Ages, Spiritual Roots, The Music of Laodicea, and related Bible subjects.",
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
      "Find familiar hymns and songs for worship, including Only Believe, Amazing Grace, Sweet Hour of Prayer, and Victory in Jesus.",
    primaryAction: {
      label: "Browse ministry audio",
      href: "/sermons",
    },
    highlights: ["Only Believe", "Amazing Grace", "Sweet Hour Of Prayer", "Victory In Jesus"],
    sections: [
      {
        title: "Hymn Index",
        body:
          "Browse the numbered hymn collection and continue through additional song lists for personal and congregational worship.",
        items: ["0001 Only Believe", "0002 Amazing Grace", "0005 Sweet Hour Of Prayer", "0022 Victory In Jesus", "0031 Standing On The Promises"],
      },
      {
        title: "Worship in Song",
        body:
          "Use this collection to find traditional hymns and songs for worship and congregational singing.",
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
      "Watch ministry videos featuring sermons, testimonies, music, and encouragement for Christian life.",
    primaryAction: {
      label: "Browse audio messages",
      href: "/sermons",
    },
    highlights: ["Sermon video", "Testimony video", "Song video"],
    sections: [
      {
        title: "Video Library",
        body:
          "Explore video resources selected to encourage faith and draw hearts closer to the Lord Jesus Christ. Some videos may come from other sources.",
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
      "Browse ministry photographs and inspirational quotes selected to encourage Christian life.",
    primaryAction: {
      label: "Explore ministry resources",
      href: "/resources",
    },
    highlights: ["Gallery", "Quotes", "Ministry memories"],
    sections: [
      {
        title: "Visual Archive",
        body:
          "The gallery brings together church memories and faith-centered quotes in one place.",
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
      "Bring sincere questions about the Bible and Christian faith to Scripture-centered answers and study.",
    primaryAction: {
      label: "Explore Bible studies",
      href: "/teachings",
    },
    highlights: ["Romans 7:25", "Salvation questions", "Book of Life", "Body of Christ"],
    sections: [
      {
        title: "Recent Questions",
        body:
          "Explore questions about salvation, the Book of Life, the Body of Christ, and the new birth.",
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
      { label: "All recent posts", href: "/posts" },
    ],
  },
  {
    slug: "posts",
    title: "Recent Posts",
    eyebrow: "Ministry Articles and Questions",
    summary:
      "Browse ministry articles, Bible questions, and recent posts from the Living God Tabernacle archive.",
    highlights: ["Bible questions", "Ministry articles", "Christian encouragement"],
    sections: [
      {
        title: "From the Archive",
        body:
          "Open any article below to read its full content in this app. Question-and-answer posts explore Scripture, Christian life, and the message of William Marrion Branham.",
      },
    ],
    related: [
      { label: "Bible questions and answers", href: "/questions" },
      { label: "Bible teachings", href: "/teachings" },
    ],
  },
  {
    slug: "prayer",
    title: "Prayer and Testimonies",
    eyebrow: "Immediate Care",
    summary:
      "Share a prayer need with the ministry and read testimonies of answered prayer and encouragement.",
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
          "If you need prayer, contact the ministry. The prayer and testimony area is here to offer care, encouragement, and a place to share God's faithfulness.",
      },
      {
        title: "Archive",
        body:
          "Read and share testimonies that encourage the church in prayer and faith.",
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
          "Each module gives a part of church life a dedicated space, connected to the message, worship, and fellowship of the ministry.",
      },
      {
        title: "Ministry Life",
        body:
          "Find teaching, prayer, fellowship, and ministry updates through these dedicated spaces.",
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
      "Listen to ministry radio for sermons, hymns, and Bible teaching throughout the week.",
    primaryAction: {
      label: "Browse audio sermons",
      href: "/sermons",
    },
    highlights: ["24/7 access", "Sermons", "Hymns"],
    sections: [
      {
        title: "Radio Access",
        body:
          "Visit the audio sermon collection for messages and Bible teaching available in the app.",
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
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    slug: "contact",
    title: "Contact The Living God Tabernacle",
    eyebrow: "We Would Love to Hear From You",
    summary:
      "Reach out for service information, pastoral care, prayer, or help finding your way around the ministry.",
    primaryAction: {
      label: "Send an email",
      href: "mailto:connect@thelivinggodtabernacle.org",
      external: true,
    },
    highlights: ["Accra, Ghana", "connect@thelivinggodtabernacle.org", "Sunday, Wednesday, and Friday services"],
    sections: [
      {
        title: "Get in Touch",
        body:
          "For questions about worship, ministry resources, or visiting the assembly, contact the church by email. We will be glad to help you connect.",
      },
      {
        title: "Visit a Service",
        body:
          "The church gathers on Sundays, Wednesdays, and Fridays. Visit the services page for the current schedule and online stream information.",
      },
    ],
    related: [
      { label: "Service times", href: "/services" },
      { label: "Prayer and testimonies", href: "/prayer" },
      { label: "About the ministry", href: "/about" },
    ],
  },
  {
    slug: "pure-biblical-teachings",
    title: "Pure Biblical Teachings",
    eyebrow: "The Bible as Our Foundation",
    summary:
      "Study Bible teaching with Scripture as the source and final authority for Christian faith and practice.",
    highlights: ["The Word of God", "Bible study", "Questions and answers"],
    sections: [
      {
        title: "A Scripture-First Approach",
        body:
          "Bible questions should be answered from the Scriptures. Explore the teachings, compare each subject with the Word, and read in context.",
      },
      {
        title: "Study Topics",
        body:
          "Explore Bible subjects including the Godhead, salvation, water baptism, the Holy Ghost, the church ages, and the promises for the end time.",
      },
    ],
    related: [
      { label: "Did You Know? studies", href: "/teachings" },
      { label: "Bible questions and answers", href: "/questions" },
      { label: "Water baptism", href: "/water-baptism" },
    ],
  },
  {
    slug: "water-baptism",
    title: "Water Baptism",
    eyebrow: "Bible Study",
    summary:
      "Explore the ministry's Bible study resources about Christian water baptism and its place in the believer's life.",
    highlights: ["Matthew 28:19", "Acts 2:38", "Romans 6:3-4"],
    sections: [
      {
        title: "Study the Scriptures",
        body:
          "Read the passages in their biblical context and compare the accounts of baptism in the Gospels and Acts.",
      },
      {
        title: "Related Teaching",
        body:
          "Continue with Bible studies and questions that explore foundational Christian teaching.",
      },
    ],
    related: [
      { label: "Pure Biblical Teachings", href: "/pure-biblical-teachings" },
      { label: "Did You Know? studies", href: "/teachings" },
      { label: "Bible questions and answers", href: "/questions" },
    ],
  },
];

export const ministryPageMap = new Map(ministryPages.map((page) => [page.slug, page]));

export function getMinistryPage(slug: string) {
  return ministryPageMap.get(slug);
}

export function getMinistrySlugs() {
  return ministryPages.map((page) => page.slug);
}
