type LinkTarget = '_blank' | '_self';

interface LegacyAction {
  label: string;
  url: string;
  variant?: 'primary' | 'secondary' | 'light';
  target?: LinkTarget;
  rel?: string;
}

interface LegacySection {
  id?: string;
  title: string;
  body: string;
  items?: string[];
}

export interface LegacyPageContent {
  meta: {
    title: string;
    description: string;
  };
  service: string;
  tagline: string;
  navigation: { label: string; url: string }[];
  footerLinks: { label: string; url: string; target?: LinkTarget; rel?: string }[];
  eyebrow: string;
  title: string;
  summary: string;
  highlights: string[];
  primaryAction?: LegacyAction;
  sections: LegacySection[];
  related: { label: string; url: string }[];
}

const service = 'The Living God Tabernacle';
const tagline = "God's Spoken Word Evangelism";

const navigation = [
  { label: 'Home', url: '/' },
  { label: 'Message', url: '/message' },
  { label: 'Services', url: '/services' },
  { label: 'Resources', url: '/resources' },
  { label: 'Q&A', url: '/questions' },
  { label: 'Prayer', url: '/prayer' },
];

const footerLinks = [
  { label: 'Home', url: '/' },
  { label: 'Resources', url: '/resources' },
  { label: 'Questions', url: '/questions' },
  { label: 'Health', url: '/api/health' },
];

function page(
  slug: string,
  content: Omit<LegacyPageContent, 'meta' | 'service' | 'tagline' | 'navigation' | 'footerLinks'>,
): LegacyPageContent & { slug: string } {
  return {
    slug,
    service,
    tagline,
    navigation,
    footerLinks,
    meta: {
      title: `${content.title} | ${service}`,
      description: content.summary,
    },
    ...content,
  };
}

export const legacyPages = [
  page('message', {
    eyebrow: 'Legacy Teaching',
    title: 'Malachi 4:5-6',
    summary:
      "The ministry's message center now lives inside this app, keeping the promise of restoration visible without sending visitors back to the legacy site.",
    highlights: ['Malachi 4:5-6', 'Revelation 10:7', 'Acts 3:19-21'],
    primaryAction: { label: 'Browse sermons', url: '/sermons', variant: 'primary' },
    sections: [
      {
        title: 'Core Scripture',
        body:
          'The page opens with the promise that Elijah would come before the great and dreadful day of the Lord, turning hearts back according to Scripture.',
      },
      {
        title: 'Restoration Emphasis',
        body:
          'Its teaching connects the ministry of John the Baptist, the words of Jesus in Matthew 17, and the end-time promise of a restoration of all things.',
      },
    ],
    related: [
      { label: 'Sermons', url: '/sermons' },
      { label: 'Teachings', url: '/teachings' },
      { label: 'Questions', url: '/questions' },
    ],
  }),
  page('services', {
    eyebrow: 'Worship Rhythm',
    title: 'Services and Live Fellowship',
    summary:
      'Service information is presented as a direct app page for worship times, local fellowship, live streaming, and online radio.',
    highlights: ['Sundays 9:30 AM-12:00 PM GMT', 'Wednesdays 6:30 PM-8:00 PM GMT', 'Fridays 6:30 PM-8:00 PM GMT'],
    primaryAction: {
      label: 'Open live stream',
      url: 'https://web.facebook.com/thelivinggodtabernacle/',
      variant: 'primary',
      target: '_blank',
      rel: 'noopener noreferrer',
    },
    sections: [
      {
        title: 'Gathering Times',
        body:
          'Join live services on Sundays, Wednesdays, and Fridays, with streaming available when services are in session.',
      },
      {
        title: 'Live Online Radio',
        body:
          'The radio path remains available for worship, hymns, sermons, and ongoing encouragement throughout the week.',
      },
    ],
    related: [
      { label: 'Live Radio', url: '/radio' },
      { label: 'Prayer', url: '/prayer' },
      { label: 'Resources', url: '/resources' },
    ],
  }),
  page('resources', {
    eyebrow: 'Legacy Content Paths',
    title: 'Resource Library',
    summary:
      'Sermons, songs, Bible Q&A, teachings, videos, radio, and gallery content are grouped into a native resource hub inside this app.',
    highlights: ['Audio sermons', 'Did You Know?', 'Only Believe songs', 'Bible Q&A'],
    sections: [
      {
        title: 'Primary Resource Areas',
        body:
          'The resource hub preserves the legacy destinations while preparing them for cleaner app-native browsing.',
        items: ['Audio sermons', 'Did You Know? teachings', 'Only Believe hymns', 'Must-watch videos', 'Gallery and quotes', 'Bible questions and answers'],
      },
    ],
    related: [
      { label: 'Sermons', url: '/sermons' },
      { label: 'Teachings', url: '/teachings' },
      { label: 'Hymns', url: '/hymns' },
      { label: 'Questions', url: '/questions' },
    ],
  }),
  page('sermons', {
    eyebrow: 'Sermon Archive',
    title: 'Audio Sermons',
    summary:
      'The sermon archive pathway is now represented inside the app with room for year-by-year browsing, downloads, and saved listening.',
    highlights: ['2026 sermons', '2025 sermons', '2024 sermons', 'Download paths'],
    sections: [
      {
        title: 'Archive Structure',
        body:
          'Audio sermons are organized by year so believers can move through the message archive chronologically.',
        items: ['2026 Sermons', '2025 Sermons', '2024 Sermons', '2023 Sermons', '2022 Sermons', '2021 Sermons', '2020 Sermons', '2018 Sermons'],
      },
      {
        title: 'Recent Questions Nearby',
        body:
          "The sermon archive connects naturally into the app's Questions page for related teaching answers.",
      },
    ],
    related: [
      { label: 'Message', url: '/message' },
      { label: 'Questions', url: '/questions' },
      { label: 'Live Radio', url: '/radio' },
    ],
  }),
  page('teachings', {
    eyebrow: 'Bible Teaching',
    title: 'Did You Know?',
    summary:
      'Bible teaching topics from the legacy site are now kept as an app pathway for doctrine, study, and spiritual grounding.',
    highlights: ['Revelation 10:7', 'Study topics', 'Doctrine articles'],
    sections: [
      {
        title: 'Legacy Emphasis',
        body:
          "The teaching path emphasizes the finishing of the mystery of God in the days of the seventh angel's voice.",
      },
      {
        title: 'Article Pathways',
        body:
          'Indexed topics include Origins, Music and Religion Through the Ages, Spiritual Roots, The Music of Laodicea, and related studies.',
      },
    ],
    related: [
      { label: 'Message', url: '/message' },
      { label: 'Questions', url: '/questions' },
      { label: 'Resources', url: '/resources' },
    ],
  }),
  page('hymns', {
    eyebrow: 'Worship Songs',
    title: 'Only Believe Songs',
    summary:
      'The hymns area keeps familiar songs visible for worship, encouragement, and congregational memory inside the app.',
    highlights: ['Only Believe', 'Amazing Grace', 'Sweet Hour Of Prayer', 'Victory In Jesus'],
    sections: [
      {
        title: 'Hymn Index',
        body:
          'The app prepares a clear destination for hymn browsing, favorites, lyrics, and audio-safe worship resources.',
        items: ['0001 Only Believe', '0002 Amazing Grace', '0005 Sweet Hour Of Prayer', '0022 Victory In Jesus', '0031 Standing On The Promises'],
      },
    ],
    related: [
      { label: 'Services', url: '/services' },
      { label: 'Radio', url: '/radio' },
      { label: 'Resources', url: '/resources' },
    ],
  }),
  page('videos', {
    eyebrow: 'Watch',
    title: 'Videos',
    summary:
      'Sermons, testimonies, songs, and visual ministry resources now have a dedicated app route.',
    highlights: ['Sermon video', 'Testimony video', 'Song video'],
    sections: [
      {
        title: 'Video Library',
        body:
          'This page prepares a cleaner app-native pathway for must-watch videos and future curated media collections.',
      },
    ],
    related: [
      { label: 'Sermons', url: '/sermons' },
      { label: 'Gallery', url: '/gallery' },
      { label: 'Services', url: '/services' },
    ],
  }),
  page('gallery', {
    eyebrow: 'Ministry Moments',
    title: 'Gallery and Quotes',
    summary:
      'Photos, quote graphics, and ministry memories are represented by a polished app route.',
    highlights: ['Gallery', 'Quotes', 'Ministry memories'],
    sections: [
      {
        title: 'Visual Archive',
        body:
          'This page prepares a destination for church photos, quote graphics, and event memories as the app content library grows.',
      },
    ],
    related: [
      { label: 'Videos', url: '/videos' },
      { label: 'Resources', url: '/resources' },
      { label: 'About', url: '/about' },
    ],
  }),
  page('questions', {
    eyebrow: 'Study Help',
    title: 'Bible Questions and Answers',
    summary:
      'Bible Q&A is now a native app route for recent questions and teaching answers.',
    highlights: ['Romans 7:25', 'Salvation questions', 'Book of Life', 'Body of Christ'],
    sections: [
      {
        title: 'Recent Legacy Questions',
        body:
          'The app surfaces Q&A posts across the archive, giving visitors direct answers to common Bible and faith questions.',
        items: [
          'Romans 7:25: with the mind I myself serve the law of God, but with the flesh the law of sin.',
          'Can a child born out of wedlock ever be saved or go in the rapture?',
          'How can a person have their name on the Book of Life and still be lost?',
          'How does one know their rightful position in the Body of Christ?',
          'Is it true that you are not saved unless you have received the Holy Ghost?',
        ],
      },
      {
        id: 'romans-7-25',
        title: 'Question 102: Romans 7:25',
        body:
          "This answer explains Paul's words in Romans 7:25 by pointing to the inward life: with the mind of Christ, the believer serves God, while the flesh remains subject to the law of sin. It connects the heart, the subconscious, faith, and the new birth, emphasizing that Eternal Life within will raise the body at the last day.",
      },
    ],
    related: [
      { label: 'Teachings', url: '/teachings' },
      { label: 'Sermons', url: '/sermons' },
      { label: 'Prayer', url: '/prayer' },
    ],
  }),
  page('prayer', {
    eyebrow: 'Immediate Care',
    title: 'Prayer and Testimonies',
    summary:
      'Prayer remains a first-class app path, connecting immediate prayer support with the testimony archive direction.',
    highlights: ['Prayer requests', 'Testimonies', 'Answered prayer'],
    primaryAction: {
      label: 'Request prayer on WhatsApp',
      url: 'https://api.whatsapp.com/send/?phone=233208171538&app_absent=0',
      variant: 'primary',
      target: '_blank',
      rel: 'noopener noreferrer',
    },
    sections: [
      {
        title: 'Prayer Path',
        body:
          'The app keeps prayer easy to reach and prepares room for requests, responses, moderation, and testimonies.',
      },
      {
        title: 'Archive Direction',
        body:
          'Prayer requests and testimonies now have an internal app destination while the native prayer wall grows.',
      },
    ],
    related: [
      { label: 'Services', url: '/services' },
      { label: 'About', url: '/about' },
      { label: 'Resources', url: '/resources' },
    ],
  }),
  page('radio', {
    eyebrow: 'Audio Stream',
    title: 'Live Online Radio',
    summary:
      'The online radio pathway remains visible in the app for sermons, hymns, and ministry audio throughout the week.',
    highlights: ['Live radio', 'Sermons', 'Hymns'],
    primaryAction: {
      label: 'Listen online',
      url: 'https://thelivinggodtab.radio12345.com/',
      variant: 'primary',
      target: '_blank',
      rel: 'noopener noreferrer',
    },
    sections: [
      {
        title: 'Audio Stream',
        body:
          'This app route keeps the radio channel discoverable while future native audio features are prepared.',
      },
    ],
    related: [
      { label: 'Sermons', url: '/sermons' },
      { label: 'Hymns', url: '/hymns' },
      { label: 'Services', url: '/services' },
    ],
  }),
];

export const legacyPagesBySlug = new Map(
  legacyPages.map((legacyPage) => [legacyPage.slug, legacyPage]),
);

export const legacyPathAliases = new Map<string, string>([
  ['malachi-4-5-6', 'message'],
  ['malachi-4-5-6/audio-sermons-2', 'sermons'],
  ['did-you-know', 'teachings'],
  ['malachi-4-5-6/hymns', 'hymns'],
  ['malachi-4-5-6/hymns/01-2', 'hymns'],
  ['malachi-4-5-6/videos', 'videos'],
  ['malachi-4-5-6/gallery', 'gallery'],
  ['elementor-landing-page-3362', 'questions'],
  ['malachi-4-5-6/prayer-requests-and-testimonies', 'prayer'],
  ['q-a002', 'questions'],
  [
    'dear-brother-branham-if-a-baby-is-born-of-a-out-of-wedlock-can-this-child-ever-be-saved-or-go-in-the-rapture',
    'questions',
  ],
  ['how-can-a-person-have-their-name-on-the-book-of-life-and-still-be-lost', 'questions'],
  ['how-does-one-know-their-rightful-position-in-the-body-of-christ', 'questions'],
]);
