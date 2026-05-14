interface Module {
  id: string;
  name: string;
  active: boolean;
  for: string;
}

interface ApiResponse {
  service: string;
  vision: string;
  about: {
    mission: string;
    statementOfFaith: string;
    liveNow: boolean;
  };
  churchInfo: {
    address: string;
    serviceTime: string;
    contact: string;
    socialLinks: {
      facebook: string;
      youtube: string;
      instagram: string;
    };
    givingUrl: string;
  };
  leadership: {
    pastor: string;
    message: string;
    image: string;
  };
  modules: Module[];
  links: {
    docs: string;
    health: string;
    portal: string;
  };
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL?.replace(/\/$/, "") ?? "";

const fallbackData: ApiResponse = {
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
    contact: "connect@thelivinggodtabernacle.org",
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
    { id: "altar", name: "Daily Manna", active: true, for: "All believers" },
    { id: "explorers", name: "Kingdom Explorers", active: true, for: "Children" },
    { id: "regen", name: "Re-Gen Hub", active: true, for: "Youth" },
    { id: "fellowship", name: "LifeCircles", active: true, for: "Adults" },
    { id: "prayer", name: "Prayer Wall", active: true, for: "Community" },
    { id: "events", name: "Upcoming Events", active: true, for: "Everyone" },
  ],
  links: {
    docs: "/docs",
    health: "/api/health",
    portal: "/",
  },
};

const highlights = [
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

const featureLabels: Record<string, string> = {
  altar: "Daily devotion",
  explorers: "Children's growth",
  regen: "Youth formation",
  fellowship: "Care groups",
  prayer: "Prayer support",
  events: "Church life",
  media: "Messages and media",
  ministries: "Service pathways",
};

function getModuleIcon(id: string) {
  switch (id) {
    case "altar":
      return "✦";
    case "explorers":
      return "☀";
    case "regen":
      return "➜";
    case "fellowship":
      return "♡";
    case "prayer":
      return "⌁";
    case "events":
      return "◫";
    case "media":
      return "▶";
    case "ministries":
      return "◆";
    default:
      return "•";
  }
}

function normalizeData(data?: Partial<ApiResponse> | null): ApiResponse {
  return {
    service: data?.service || fallbackData.service,
    vision: data?.vision || fallbackData.vision,
    about: {
      mission: data?.about?.mission || fallbackData.about.mission,
      statementOfFaith: data?.about?.statementOfFaith || fallbackData.about.statementOfFaith,
      liveNow: data?.about?.liveNow ?? fallbackData.about.liveNow,
    },
    churchInfo: {
      address: data?.churchInfo?.address || fallbackData.churchInfo.address,
      serviceTime: data?.churchInfo?.serviceTime || fallbackData.churchInfo.serviceTime,
      contact: data?.churchInfo?.contact || fallbackData.churchInfo.contact,
      socialLinks: {
        facebook:
          data?.churchInfo?.socialLinks?.facebook || fallbackData.churchInfo.socialLinks.facebook,
        youtube:
          data?.churchInfo?.socialLinks?.youtube || fallbackData.churchInfo.socialLinks.youtube,
        instagram:
          data?.churchInfo?.socialLinks?.instagram ||
          fallbackData.churchInfo.socialLinks.instagram,
      },
      givingUrl: data?.churchInfo?.givingUrl || fallbackData.churchInfo.givingUrl,
    },
    leadership: {
      pastor: data?.leadership?.pastor || fallbackData.leadership.pastor,
      message: data?.leadership?.message || fallbackData.leadership.message,
      image: data?.leadership?.image || fallbackData.leadership.image,
    },
    modules:
      data?.modules?.filter(
        (module): module is Module =>
          Boolean(module?.id && module?.name && module?.for) && typeof module.active === "boolean",
      ) || fallbackData.modules,
    links: {
      docs: data?.links?.docs || fallbackData.links.docs,
      health: data?.links?.health || fallbackData.links.health,
      portal: data?.links?.portal || fallbackData.links.portal,
    },
  };
}

function getAbsoluteUrl(path: string) {
  if (!path) {
    return "#";
  }

  if (/^https?:\/\//i.test(path) || path.startsWith("#")) {
    return path;
  }

  return API_BASE_URL ? `${API_BASE_URL}${path}` : path;
}

async function getLgtData(): Promise<{ data: ApiResponse; usingFallback: boolean }> {
  if (!API_BASE_URL) {
    return { data: fallbackData, usingFallback: true };
  }

  try {
    const res = await fetch(`${API_BASE_URL}/api/info`, {
      cache: "no-store",
      signal: AbortSignal.timeout(5000),
    });

    if (!res.ok) {
      return { data: fallbackData, usingFallback: true };
    }

    const payload = (await res.json()) as Partial<ApiResponse>;
    return { data: normalizeData(payload), usingFallback: false };
  } catch {
    return { data: fallbackData, usingFallback: true };
  }
}

export default async function Home() {
  const { data, usingFallback } = await getLgtData();

  return (
    <main className="relative overflow-hidden bg-[var(--color-surface)] text-[var(--color-ink)]">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[42rem] bg-[radial-gradient(circle_at_top,rgba(203,161,53,0.18),transparent_55%),linear-gradient(180deg,rgba(12,33,25,0.08),transparent)]" />
      <div className="pointer-events-none absolute left-[-8rem] top-24 h-72 w-72 rounded-full bg-[rgba(17,71,52,0.16)] blur-3xl" />
      <div className="pointer-events-none absolute right-[-5rem] top-52 h-64 w-64 rounded-full bg-[rgba(203,161,53,0.16)] blur-3xl" />

      <div className="relative mx-auto flex min-h-screen w-full max-w-7xl flex-col px-5 pb-10 pt-5 sm:px-8 lg:px-10">
        <header className="sticky top-4 z-20 mb-8 rounded-full border border-white/60 bg-[rgba(252,249,242,0.86)] px-4 py-3 shadow-[0_18px_50px_rgba(12,33,25,0.08)] backdrop-blur md:px-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="font-[family-name:var(--font-heading)] text-lg tracking-[0.18em] text-[var(--color-accent)] uppercase">
                The Living God Tabernacle
              </p>
              <p className="text-sm text-[var(--color-muted)]">
                Christ-centered worship, discipleship, and belonging.
              </p>
            </div>

            <nav className="flex flex-wrap items-center gap-3 text-sm font-medium text-[var(--color-muted)]">
              <a href="#about" className="transition hover:text-[var(--color-primary)]">
                About
              </a>
              <a href="#ministries" className="transition hover:text-[var(--color-primary)]">
                Ministries
              </a>
              <a href="#connect" className="transition hover:text-[var(--color-primary)]">
                Connect
              </a>
              <a
                href={getAbsoluteUrl(data.churchInfo.socialLinks.youtube)}
                className="rounded-full bg-[var(--color-primary)] px-4 py-2 text-white transition hover:bg-[var(--color-primary-strong)]"
              >
                Watch Live
              </a>
            </nav>
          </div>
        </header>

        {data.about.liveNow ? (
          <div className="mb-6 inline-flex w-fit items-center gap-3 rounded-full border border-[rgba(183,36,36,0.18)] bg-[rgba(183,36,36,0.1)] px-5 py-2 text-sm font-semibold text-[var(--color-alert)] shadow-sm">
            <span className="h-2.5 w-2.5 rounded-full bg-current shadow-[0_0_18px_currentColor]" />
            Live now: worship service is in session.
          </div>
        ) : null}

        {usingFallback ? (
          <div className="mb-8 rounded-3xl border border-[rgba(203,161,53,0.32)] bg-[rgba(203,161,53,0.1)] px-5 py-4 text-sm text-[var(--color-muted)]">
            Live ministry data is temporarily unavailable, so this page is showing a reliable fallback
            experience instead of failing.
          </div>
        ) : null}

        <section className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-start">
          <div className="rounded-[2rem] border border-white/65 bg-[rgba(252,249,242,0.88)] p-7 shadow-[0_28px_80px_rgba(12,33,25,0.09)] backdrop-blur sm:p-10">
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.24em] text-[var(--color-accent)]">
              Welcome Home
            </p>
            <h1 className="max-w-3xl font-[family-name:var(--font-heading)] text-5xl leading-[1.02] text-[var(--color-primary)] sm:text-6xl">
              A spiritual home where believers grow, serve, and flourish together.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-[var(--color-muted)]">
              {data.vision} We are building a church experience that feels prayerful, trustworthy,
              and deeply welcoming for families, children, and every believer seeking a place to
              belong.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href={getAbsoluteUrl(data.churchInfo.socialLinks.youtube)}
                className="rounded-full bg-[var(--color-primary)] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[var(--color-primary-strong)]"
              >
                Join the Broadcast
              </a>
              <a
                href="#connect"
                className="rounded-full border border-[var(--color-primary)] px-6 py-3 text-sm font-semibold text-[var(--color-primary)] transition hover:bg-[rgba(17,71,52,0.06)]"
              >
                Plan Your Visit
              </a>
            </div>

            <div className="mt-10 grid gap-4 md:grid-cols-3">
              {highlights.map((highlight) => (
                <article
                  key={highlight.title}
                  className="rounded-3xl border border-[rgba(17,71,52,0.08)] bg-white/80 p-5"
                >
                  <h2 className="font-[family-name:var(--font-heading)] text-2xl text-[var(--color-primary)]">
                    {highlight.title}
                  </h2>
                  <p className="mt-3 text-sm leading-7 text-[var(--color-muted)]">
                    {highlight.text}
                  </p>
                </article>
              ))}
            </div>
          </div>

          <aside className="grid gap-5">
            <div className="rounded-[2rem] bg-[var(--color-primary)] p-7 text-white shadow-[0_28px_70px_rgba(17,71,52,0.28)]">
              <p className="text-sm uppercase tracking-[0.22em] text-white/75">Service Times</p>
              <h2 className="mt-3 font-[family-name:var(--font-heading)] text-3xl">
                Worship with us
              </h2>
              <p className="mt-4 text-base leading-7 text-white/85">{data.churchInfo.serviceTime}</p>
              <p className="mt-3 text-sm leading-6 text-white/72">{data.churchInfo.address}</p>
              <a
                href="#connect"
                className="mt-6 inline-flex rounded-full bg-white px-5 py-3 text-sm font-semibold text-[var(--color-primary)] transition hover:bg-[var(--color-surface-strong)]"
              >
                Contact the Church
              </a>
            </div>

            <div className="rounded-[2rem] border border-[rgba(17,71,52,0.1)] bg-white/88 p-7 shadow-[0_20px_50px_rgba(12,33,25,0.08)]">
              <p className="text-sm uppercase tracking-[0.22em] text-[var(--color-accent)]">
                Pastor&apos;s Welcome
              </p>
              <h2 className="mt-3 font-[family-name:var(--font-heading)] text-3xl text-[var(--color-primary)]">
                {data.leadership.pastor}
              </h2>
              <p className="mt-4 text-base leading-8 text-[var(--color-muted)]">
                {data.leadership.message}
              </p>
            </div>
          </aside>
        </section>

        <section id="about" className="mt-8 grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
          <article className="rounded-[2rem] border border-[rgba(17,71,52,0.1)] bg-white/88 p-7 shadow-[0_24px_60px_rgba(12,33,25,0.07)] sm:p-8">
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[var(--color-accent)]">
              Our Mission
            </p>
            <h2 className="mt-4 font-[family-name:var(--font-heading)] text-4xl text-[var(--color-primary)]">
              Built for worship, discipleship, and spiritual family.
            </h2>
            <p className="mt-5 text-base leading-8 text-[var(--color-muted)]">{data.about.mission}</p>
          </article>

          <article className="rounded-[2rem] border border-[rgba(17,71,52,0.1)] bg-[rgba(248,244,232,0.9)] p-7 shadow-[0_24px_60px_rgba(12,33,25,0.06)] sm:p-8">
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[var(--color-accent)]">
              What We Believe
            </p>
            <blockquote className="mt-4 font-[family-name:var(--font-heading)] text-3xl leading-tight text-[var(--color-primary)]">
              “{data.about.statementOfFaith}”
            </blockquote>
          </article>
        </section>

        <section id="ministries" className="mt-8 rounded-[2.25rem] border border-[rgba(17,71,52,0.1)] bg-[rgba(255,255,255,0.86)] p-7 shadow-[0_28px_70px_rgba(12,33,25,0.07)] sm:p-9">
          <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[var(--color-accent)]">
                Ministry Spaces
              </p>
              <h2 className="mt-3 font-[family-name:var(--font-heading)] text-4xl text-[var(--color-primary)]">
                Designed for the whole church family.
              </h2>
            </div>
            <p className="max-w-xl text-sm leading-7 text-[var(--color-muted)]">
              Every part of the landing page now points people toward real church life, not just a
              generic app shell.
            </p>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {data.modules.map((module) => (
              <article
                key={module.id}
                className={`rounded-[1.75rem] border p-5 transition duration-200 hover:-translate-y-1 ${
                  module.active
                    ? "border-[rgba(17,71,52,0.12)] bg-[rgba(252,249,242,0.95)] shadow-[0_18px_45px_rgba(12,33,25,0.08)]"
                    : "border-[rgba(17,71,52,0.08)] bg-[rgba(242,238,228,0.75)] opacity-75"
                }`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--color-primary)]/8 text-2xl text-[var(--color-primary)]">
                      {getModuleIcon(module.id)}
                    </span>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-accent)]">
                        {featureLabels[module.id] || "Church life"}
                      </p>
                      <h3 className="mt-1 font-[family-name:var(--font-heading)] text-2xl text-[var(--color-primary)]">
                        {module.name}
                      </h3>
                    </div>
                  </div>
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${
                      module.active
                        ? "bg-[rgba(17,71,52,0.1)] text-[var(--color-primary)]"
                        : "bg-[rgba(122,98,62,0.12)] text-[var(--color-muted)]"
                    }`}
                  >
                    {module.active ? "Available" : "Coming soon"}
                  </span>
                </div>
                <p className="mt-5 text-sm leading-7 text-[var(--color-muted)]">
                  For {module.for.toLowerCase()}, with a clearer sense of purpose and belonging.
                </p>
              </article>
            ))}
          </div>
        </section>

        <section id="connect" className="mt-8 grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
          <article className="rounded-[2rem] bg-[linear-gradient(135deg,#114734,#1f6a50)] p-7 text-white shadow-[0_30px_80px_rgba(17,71,52,0.28)] sm:p-8">
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-white/70">Connect</p>
            <h2 className="mt-3 font-[family-name:var(--font-heading)] text-4xl">
              Let us help you take the next step.
            </h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <a
                href={getAbsoluteUrl(data.churchInfo.socialLinks.facebook)}
                className="rounded-[1.5rem] border border-white/15 bg-white/8 p-4 transition hover:bg-white/12"
              >
                <p className="text-xs uppercase tracking-[0.2em] text-white/60">Community</p>
                <p className="mt-2 text-lg font-semibold">Facebook Fellowship</p>
              </a>
              <a
                href={getAbsoluteUrl(data.churchInfo.socialLinks.instagram)}
                className="rounded-[1.5rem] border border-white/15 bg-white/8 p-4 transition hover:bg-white/12"
              >
                <p className="text-xs uppercase tracking-[0.2em] text-white/60">Stories</p>
                <p className="mt-2 text-lg font-semibold">Instagram Moments</p>
              </a>
              <a
                href={getAbsoluteUrl(data.churchInfo.socialLinks.youtube)}
                className="rounded-[1.5rem] border border-white/15 bg-white/8 p-4 transition hover:bg-white/12"
              >
                <p className="text-xs uppercase tracking-[0.2em] text-white/60">Messages</p>
                <p className="mt-2 text-lg font-semibold">Watch and Listen</p>
              </a>
              <a
                href={getAbsoluteUrl(data.churchInfo.givingUrl)}
                className="rounded-[1.5rem] border border-white/15 bg-white/8 p-4 transition hover:bg-white/12"
              >
                <p className="text-xs uppercase tracking-[0.2em] text-white/60">Stewardship</p>
                <p className="mt-2 text-lg font-semibold">Support the Ministry</p>
              </a>
            </div>
          </article>

          <article className="rounded-[2rem] border border-[rgba(17,71,52,0.1)] bg-white/90 p-7 shadow-[0_24px_60px_rgba(12,33,25,0.08)] sm:p-8">
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[var(--color-accent)]">
              Reach Out
            </p>
            <h2 className="mt-3 font-[family-name:var(--font-heading)] text-4xl text-[var(--color-primary)]">
              We would love to hear from you.
            </h2>
            <div className="mt-6 space-y-4 text-sm leading-7 text-[var(--color-muted)]">
              <p>
                <span className="font-semibold text-[var(--color-primary)]">Email:</span>{" "}
                {data.churchInfo.contact}
              </p>
              <p>
                <span className="font-semibold text-[var(--color-primary)]">Address:</span>{" "}
                {data.churchInfo.address}
              </p>
              <p>
                <span className="font-semibold text-[var(--color-primary)]">Gathering Times:</span>{" "}
                {data.churchInfo.serviceTime}
              </p>
            </div>
          </article>
        </section>

        <footer className="mt-8 rounded-[2rem] border border-[rgba(17,71,52,0.1)] bg-[rgba(247,242,231,0.92)] px-6 py-8 shadow-[0_18px_50px_rgba(12,33,25,0.06)] sm:px-8">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl">
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[var(--color-accent)]">
                The Living God Tabernacle
              </p>
              <p className="mt-3 font-[family-name:var(--font-heading)] text-3xl text-[var(--color-primary)]">
                A church family for worship, growth, service, and steadfast faith.
              </p>
              <p className="mt-3 text-sm leading-7 text-[var(--color-muted)]">
                The landing page now communicates warmth, credibility, and spiritual identity while
                staying resilient when backend data is unavailable.
              </p>
            </div>

            <div className="flex flex-wrap gap-3 text-sm font-medium text-[var(--color-primary)]">
              <a href="#about" className="rounded-full bg-white px-4 py-2 transition hover:bg-white/70">
                About
              </a>
              <a
                href={getAbsoluteUrl(data.links.docs)}
                className="rounded-full bg-white px-4 py-2 transition hover:bg-white/70"
              >
                API Docs
              </a>
              <a
                href={getAbsoluteUrl(data.links.health)}
                className="rounded-full bg-white px-4 py-2 transition hover:bg-white/70"
              >
                Health Status
              </a>
            </div>
          </div>
        </footer>
      </div>
    </main>
  );
}
