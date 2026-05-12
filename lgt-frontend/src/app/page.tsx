import React from 'react';

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

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL?.replace(/\/$/, '') || '';

async function getLgtData(): Promise<ApiResponse | null> {
  if (!API_BASE_URL) {
    console.error("NEXT_PUBLIC_API_BASE_URL is missing!");
    return null;
  }

  try {
    const res = await fetch(`${API_BASE_URL}/api/info`, {
      cache: "no-store", // Ensure we always get fresh status
    });

    if (!res.ok) {
      const errorText = await res.text();
      console.error(`API Error: ${res.status}`, errorText);
      return null;
    }

    return res.json();
  } catch (error) {
    console.error("Network connection to API failed:", error);
    return null;
  }
}

const getModuleIcon = (id: string) => {
  switch (id) {
    case 'altar': return '🔥';
    case 'explorers': return '🧱';
    case 'regen': return '⚡';
    case 'fellowship': return '🤝';
    case 'prayer': return '🙏';
    case 'events': return '📅';
    case 'media': return '📺';
    case 'ministries': return '🛡️';
    default: return '✨';
  }
};

export default async function Home() {
  const data = await getLgtData();

  if (!data || !data.churchInfo) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-red-50 p-6">
        <div className="max-w-md rounded-xl bg-white p-8 shadow-lg text-center">
          <h1 className="text-xl font-bold text-red-600 mb-2">Connection Error</h1>
          <p className="text-gray-600">The frontend cannot reach the LGT API. Please ensure the backend is running on port 3009 and <code>.env.local</code> is configured.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen items-center justify-center bg-[#f8f5f0] p-4 md:p-6 font-sans selection:bg-blue-100">
      {data.about.liveNow && (
        <div className="fixed top-6 bg-red-600 text-white px-6 py-2 rounded-full animate-pulse font-bold shadow-xl z-50 flex items-center gap-2 border border-white/20">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
          </span>
          🔴 LIVE NOW: Sunday Service
        </div>
      )}

      <main className="flex w-full max-w-lg flex-col items-center rounded-[2.5rem] bg-white/80 backdrop-blur-xl p-8 md:p-12 shadow-[0_32px_64px_-16px_rgba(30,58,138,0.1)] border border-white/60">
        <header className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-[#1e3a8a] font-serif mb-3 leading-tight">
            {data.service}
          </h1>
          <p className="text-gray-500 italic text-lg font-medium opacity-90">
            {data.vision}
          </p>
          <div className="mt-6 p-5 bg-blue-50/40 rounded-2xl text-sm text-[#1e3a8a] border border-blue-100/50 shadow-inner">
            <p className="flex items-center justify-center gap-2"><strong>⛪ Join Us:</strong> {data.churchInfo.serviceTime}</p>
            <p className="mt-1 opacity-80">{data.churchInfo.address}</p>
          </div>
        </header>

        <div className="flex gap-3 mb-10 w-full">
          <a href={data.churchInfo.socialLinks.youtube} className="flex-1 bg-red-600 text-white py-3 rounded-xl text-center font-bold text-sm hover:bg-red-700 active:scale-95 transition-all shadow-lg shadow-red-600/20">YouTube</a>
          <a href={data.churchInfo.socialLinks.facebook} className="flex-1 bg-blue-700 text-white py-3 rounded-xl text-center font-bold text-sm hover:bg-blue-800 active:scale-95 transition-all shadow-lg shadow-blue-700/20">Facebook</a>
          <a href={data.churchInfo.givingUrl} className="flex-1 bg-emerald-600 text-white py-3 rounded-xl text-center font-bold text-sm hover:bg-emerald-700 active:scale-95 transition-all shadow-lg shadow-emerald-600/20">Give</a>
        </div>

        <div className="flex w-full flex-col gap-4 mb-8">
          {data.modules.map((module) => (
            <div
              key={module.id}
              className={`group flex items-center justify-between rounded-2xl border-2 p-5 transition-all hover:scale-[1.02] ${
                module.active
                  ? "border-gray-100 bg-white hover:border-[#d97706] cursor-pointer shadow-sm hover:shadow-md"
                  : "border-gray-50 bg-gray-50/50 opacity-60"
              }`}
            >
              <div className="flex items-center gap-4">
                <span className="text-2xl" role="img" aria-hidden="true">{getModuleIcon(module.id)}</span>
                <div className="flex flex-col">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#d97706] mb-1">
                    {module.for}
                  </span>
                  <h3 className="text-xl font-bold text-gray-900">{module.name}</h3>
                </div>
              </div>
              <div className="flex items-center">
                {module.active ? (
                  <div className="h-3 w-3 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
                ) : (
                  <span className="text-xs font-medium text-gray-400 italic">Coming Soon</span>
                )}
              </div>
            </div>
          ))}
        </div>

        <footer className="w-full border-t border-gray-100 pt-8 text-center text-sm text-gray-400 mt-2">
          <p className="mb-6 font-medium">Overcoming together through faith and fellowship.</p>
          <div className="flex justify-center gap-6 font-semibold text-[#1e3a8a]">
            <a href={`${API_BASE_URL}${data.links.docs}`} className="hover:underline">API Docs</a>
            <a href={`${API_BASE_URL}${data.links.health}`} className="hover:underline">Health Status</a>
          </div>
        </footer>
      </main>
    </div>
  );
}
