type LinkTarget = '_blank' | '_self';

interface HomepageAction {
  label: string;
  url: string;
  variant?: 'primary' | 'secondary' | 'light';
  target?: LinkTarget;
  rel?: string;
}

interface HomepageCard {
  icon?: string;
  label?: string;
  title: string;
  body: string;
  url?: string;
  actionLabel?: string;
  meta?: string;
  target?: LinkTarget;
  rel?: string;
}

const externalLink = {
  target: '_blank' as const,
  rel: 'noopener noreferrer',
};

export const homepageContent = {
  meta: {
    title: 'The Living God Tabernacle | Message App & Ministry Home',
    description:
      'A modern ministry home for worship, sermons, Bible questions, prayer, testimonies, fellowship, and end-time message resources.',
  },
  service: 'The Living God Tabernacle',
  tagline: "God's Spoken Word Evangelism",
  badge: 'A home for end-time message believers',
  navigation: [
    { label: 'Home', url: '#top' },
    { label: 'Message', url: '#message' },
    { label: 'Services', url: '#gather' },
    { label: 'Resources', url: '#resources' },
    { label: 'App Modules', url: '#modules' },
    { label: 'Prayer', url: '#prayer' },
  ],
  hero: {
    eyebrow: 'Message-centered digital fellowship',
    title: 'A modern home for worship, discipleship, and the spoken Word.',
    body:
      'We are upgrading the ministry experience into an app-ready platform where believers can gather, listen, learn, request prayer, share testimonies, and grow in the Word from one trusted place.',
    primaryAction: {
      label: 'Plan a visit',
      url: '#gather',
      variant: 'primary',
    } satisfies HomepageAction,
    secondaryAction: {
      label: 'Explore resources',
      url: '#resources',
      variant: 'secondary',
    } satisfies HomepageAction,
    stats: [
      { value: 'Live', label: 'worship & streaming' },
      { value: '24/7', label: 'radio and sermon access' },
      { value: 'App', label: 'built for long-term growth' },
    ],
  },
  beliefs: [
    'No Creed, But Christ.',
    'No Law, But Love.',
    'No Book, But The Bible.',
  ],
  message: {
    eyebrow: 'Malachi 4:5-6',
    title: 'Have you considered Malachi 4:5-6?',
    body:
      'The legacy ministry site places this Scripture at the center of the message. The app keeps that emphasis visible while giving people clearer paths into sermons, Bible studies, songs, prayer, and fellowship.',
    scripture: {
      reference: 'Malachi 4:5-6',
      lines: [
        'Behold, I will send you Elijah the prophet before the coming of the great and dreadful day of the Lord.',
        'And he shall turn the heart of the fathers to the children, and the heart of the children to their fathers.',
      ],
    },
    action: {
      label: 'Read the legacy teaching',
      url: 'https://thelivinggodtabernacle.org/malachi-4-5-6/',
      variant: 'light',
      ...externalLink,
    } satisfies HomepageAction,
  },
  churchInfo: {
    address: 'Accra, Ghana',
    serviceTime:
      'Sundays 9:30 AM–12:00 PM GMT · Wednesdays and Fridays 6:30 PM–8:00 PM GMT',
    contact: 'connect@thelivinggodtabernacle.org',
    socialLinks: [
      {
        label: 'Facebook',
        url: 'https://web.facebook.com/thelivinggodtabernacle/',
        ...externalLink,
      },
      {
        label: 'WhatsApp Prayer',
        url: 'https://api.whatsapp.com/send/?phone=233208171538&app_absent=0',
        ...externalLink,
      },
    ],
  },
  gatheringCards: [
    {
      icon: '⛪',
      label: 'Visit',
      title: 'Worship with us',
      body:
        'Join the local assembly in Accra for worship, Bible study, prayer, and fellowship.',
      meta: 'Accra, Ghana',
    },
    {
      icon: '📡',
      label: 'Live',
      title: 'Live streaming',
      body:
        'Follow live services through the ministry Facebook stream when services are in session.',
      url: 'https://web.facebook.com/thelivinggodtabernacle/',
      actionLabel: 'Open livestream',
      ...externalLink,
    },
    {
      icon: '📻',
      label: 'Radio',
      title: 'Live online radio',
      body:
        'Keep the Word and hymns close throughout the week through the online radio channel.',
      url: 'https://thelivinggodtab.radio12345.com/',
      actionLabel: 'Listen online',
      ...externalLink,
    },
  ] satisfies HomepageCard[],
  resources: [
    {
      icon: '🎙️',
      label: 'Sermons',
      title: 'Audio sermons',
      body:
        'A clear entry point for sermon archives, downloads, and year-by-year message access.',
      url: 'https://thelivinggodtabernacle.org/malachi-4-5-6/audio-sermons-2/',
      actionLabel: 'Browse sermons',
      ...externalLink,
    },
    {
      icon: '💡',
      label: 'Teaching',
      title: 'Did You Know?',
      body:
        'Bible teaching topics from the legacy site, modernized as a resource pathway for the app.',
      url: 'https://thelivinggodtabernacle.org/did-you-know/',
      actionLabel: 'Explore teachings',
      ...externalLink,
    },
    {
      icon: '🎵',
      label: 'Songs',
      title: 'Only Believe hymns',
      body:
        'Old-time hymns and song ministrations kept visible for worship, encouragement, and memory.',
      url: 'https://thelivinggodtabernacle.org/malachi-4-5-6/hymns/01-2/',
      actionLabel: 'Open hymns',
      ...externalLink,
    },
    {
      icon: '🎬',
      label: 'Video',
      title: 'Must-watch videos',
      body:
        'A curated video entry for testimonies, sermons, music collections, and spiritual encouragement.',
      url: 'https://thelivinggodtabernacle.org/malachi-4-5-6/videos/',
      actionLabel: 'Watch videos',
      ...externalLink,
    },
    {
      icon: '🖼️',
      label: 'Gallery',
      title: 'Gallery and quotes',
      body:
        'Visual moments, inspirational quotes, and ministry memories organized for easier discovery.',
      url: 'https://thelivinggodtabernacle.org/malachi-4-5-6/gallery/',
      actionLabel: 'View gallery',
      ...externalLink,
    },
    {
      icon: '❓',
      label: 'Bible Q&A',
      title: 'Questions and answers',
      body:
        'A dedicated pathway for Bible questions, scriptural answers, and faith-building study topics.',
      url: 'https://thelivinggodtabernacle.org/elementor-landing-page-3362/',
      actionLabel: 'Open Q&A',
      ...externalLink,
    },
  ] satisfies HomepageCard[],
  appModules: [
    {
      title: 'Daily Manna',
      audience: 'All believers',
      body:
        'Daily devotional pathways, Scripture focus, sermon excerpts, and guided spiritual habits.',
    },
    {
      title: 'Kingdom Explorers',
      audience: 'Children',
      body:
        'Child-friendly Bible learning and discipleship experiences for the next generation.',
    },
    {
      title: 'Re-Gen Hub',
      audience: 'Youth',
      body:
        'Youth discipleship, identity, purity, service, and fellowship experiences designed for growth.',
    },
    {
      title: 'LifeCircles',
      audience: 'Adults',
      body:
        'Small-group fellowship, member care, local connection, and shared spiritual growth.',
    },
    {
      title: 'Prayer Wall',
      audience: 'Community',
      body:
        'Prayer requests, intercession, answered prayers, and testimonies in a moderated space.',
    },
    {
      title: 'Upcoming Events',
      audience: 'Everyone',
      body:
        'Service schedules, special meetings, livestream moments, reminders, and event updates.',
    },
  ],
  prayer: {
    eyebrow: 'Prayer and testimonies',
    title: 'If you have a need for prayer, we want the path to be immediate.',
    body:
      'The legacy site points people directly to prayer. The upgraded app keeps that priority and prepares the structure for prayer requests, responses, moderation, and testimonies.',
    actions: [
      {
        label: 'Request prayer on WhatsApp',
        url: 'https://api.whatsapp.com/send/?phone=233208171538&app_absent=0',
        variant: 'primary',
        ...externalLink,
      },
      {
        label: 'Prayer and testimonies archive',
        url: 'https://thelivinggodtabernacle.org/malachi-4-5-6/prayer-requests-and-testimonies/',
        variant: 'secondary',
        ...externalLink,
      },
    ] satisfies HomepageAction[],
  },
  recentQuestions: [
    {
      title:
        'Can a child born out of wedlock ever be saved or go in the rapture?',
      url: 'https://thelivinggodtabernacle.org/dear-brother-branham-if-a-baby-is-born-of-a-out-of-wedlock-can-this-child-ever-be-saved-or-go-in-the-rapture/',
      ...externalLink,
    },
    {
      title:
        'How can a person have their name on the Book of Life and still be lost?',
      url: 'https://thelivinggodtabernacle.org/how-can-a-person-have-their-name-on-the-book-of-life-and-still-be-lost/',
      ...externalLink,
    },
    {
      title: 'How does one know their rightful position in the Body of Christ?',
      url: 'https://thelivinggodtabernacle.org/how-does-one-know-their-rightful-position-in-the-body-of-christ/',
      ...externalLink,
    },
    {
      title:
        'Are you saved only after receiving the Holy Ghost?',
      url: 'https://thelivinggodtabernacle.org/q-a002/',
      ...externalLink,
    },
  ],
  footerLinks: [
    { label: 'Legacy website', url: 'https://thelivinggodtabernacle.org/', ...externalLink },
    { label: 'API docs', url: '/docs' },
    { label: 'Health', url: '/api/health' },
  ],
};
