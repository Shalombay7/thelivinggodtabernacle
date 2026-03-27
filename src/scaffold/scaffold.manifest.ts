export interface ScaffoldRouteGroup {
  name: string;
  routes: string[];
  components: string[];
  notes: string[];
}

export interface ScaffoldManifest {
  stack: string;
  doctrineSources: string[];
  groups: ScaffoldRouteGroup[];
}

export const scaffoldManifest: ScaffoldManifest = {
  stack: 'NestJS API with Prisma/PostgreSQL',
  doctrineSources: ['KJV Bible', 'Sermons of Rev. William Marrion Branham'],
  groups: [
    {
      name: 'Home',
      routes: ['/api', '/api/scaffold'],
      components: ['HeroScripture', 'DailyQuoteCard', 'FeaturedSermonCard'],
      notes: ['Root response should stay lightweight and route users into doctrine quickly.'],
    },
    {
      name: 'Bible',
      routes: ['/api/bible', '/api/bible/books', '/api/bible/books/:book/chapters/:chapter'],
      components: ['BibleReader', 'VerseItem', 'CrossReferences', 'BookmarkButton'],
      notes: ['KJV text is read-only and should never be mutated by user flows.'],
    },
    {
      name: 'Sermons',
      routes: ['/api/sermons', '/api/sermons/:slug', '/api/sermons/search', '/api/sermons/topics'],
      components: ['SermonCard', 'SermonPlayer', 'TranscriptViewer', 'ScriptureReferences'],
      notes: ['Treat sermons as canonical ministry content with topic and scripture metadata.'],
    },
    {
      name: 'Prayer',
      routes: ['/api/prayer', '/api/prayer/requests', '/api/prayer/answered'],
      components: ['PrayerRequestForm', 'PrayerWallFeed', 'PrayerCard'],
      notes: ['Support moderation and anonymous submission.'],
    },
    {
      name: 'Fellowship',
      routes: ['/api/fellowship', '/api/fellowship/groups', '/api/fellowship/groups/:id'],
      components: ['GroupCard', 'GroupFeed', 'DiscussionThread'],
      notes: ['Keep group content distinct from doctrine content.'],
    },
    {
      name: 'Events',
      routes: ['/api/events', '/api/events/calendar', '/api/events/:id'],
      components: ['EventCard', 'EventCalendar', 'RSVPPanel'],
      notes: ['Support reminders and livestream links.'],
    },
    {
      name: 'Testimonies',
      routes: ['/api/testimonies', '/api/testimonies/share', '/api/testimonies/:id'],
      components: ['TestimonyCard', 'TestimonyForm'],
      notes: ['Approve before publishing.'],
    },
    {
      name: 'Devotion',
      routes: ['/api/devotion', '/api/devotion/daily', '/api/devotion/reading-plan'],
      components: ['DailyScriptureCard', 'DailyQuoteCard', 'ReflectionJournal'],
      notes: ['Combine KJV reading with Branham quote or excerpt.'],
    },
    {
      name: 'Locator',
      routes: ['/api/locator', '/api/locator/assemblies', '/api/locator/ministers'],
      components: ['MapView', 'LocationCard', 'RegionFilter'],
      notes: ['Normalize assemblies, house fellowships, and ministers into one location model.'],
    },
    {
      name: 'Downloads',
      routes: ['/api/downloads', '/api/downloads/sermons', '/api/downloads/bible'],
      components: ['OfflineLibraryManager', 'DownloadedSermons', 'DownloadedBibleContent'],
      notes: ['Track offline availability separately from canonical content.'],
    },
    {
      name: 'Profile',
      routes: ['/api/profile', '/api/profile/bookmarks', '/api/profile/notes'],
      components: ['ProfileHeader', 'UnifiedBookmarks', 'ReadingProgress'],
      notes: ['Aggregate user state from content modules rather than duplicating it.'],
    },
    {
      name: 'Support',
      routes: ['/api/support', '/api/support/give', '/api/support/contact'],
      components: ['GivingForm', 'NeedsBoard', 'ContactForm'],
      notes: ['Isolate payment flows from general content browsing.'],
    },
    {
      name: 'Admin',
      routes: ['/api/admin', '/api/admin/moderation', '/api/admin/sermons'],
      components: ['AdminDashboard', 'ModerationQueue', 'ContentManager'],
      notes: ['All writes should pass through service-level validation and audit trails.'],
    },
  ],
};
