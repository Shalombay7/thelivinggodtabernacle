"use client";

import { useCallback, useEffect, useState } from "react";

const DISMISSED_KEY = "tlg-install-prompt-dismissed";

type InstallChoice = { outcome: "accepted" | "dismissed"; platform: string };
type InstallPromptEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<InstallChoice>;
};

function isIosDevice() {
  return /iphone|ipad|ipod/i.test(navigator.userAgent) ||
    (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
}

export function InstallPrompt() {
  const [visible, setVisible] = useState(false);
  const [ios, setIos] = useState(false);
  const [installEvent, setInstallEvent] = useState<InstallPromptEvent | null>(null);
  const [showInstructions, setShowInstructions] = useState(false);
  const [installed, setInstalled] = useState(false);

  const dismiss = useCallback(() => {
    window.sessionStorage.setItem(DISMISSED_KEY, "true");
    setVisible(false);
  }, []);

  useEffect(() => {
    const standalone = window.matchMedia("(display-mode: standalone)").matches ||
      ("standalone" in navigator && Boolean((navigator as Navigator & { standalone?: boolean }).standalone));
    if (standalone) {
      setInstalled(true);
      return;
    }

    const iosDevice = isIosDevice();
    const androidDevice = /android/i.test(navigator.userAgent);
    setIos(iosDevice);
    if (!iosDevice && !androidDevice) return;

    const showTimer = window.setTimeout(() => {
      if (window.sessionStorage.getItem(DISMISSED_KEY) !== "true") setVisible(true);
    }, 4500);

    function onBeforeInstall(event: Event) {
      event.preventDefault();
      setInstallEvent(event as InstallPromptEvent);
      if (window.sessionStorage.getItem(DISMISSED_KEY) !== "true") setVisible(true);
    }

    function onInstalled() {
      setInstalled(true);
      setVisible(false);
    }

    window.addEventListener("beforeinstallprompt", onBeforeInstall);
    window.addEventListener("appinstalled", onInstalled);
    return () => {
      window.clearTimeout(showTimer);
      window.removeEventListener("beforeinstallprompt", onBeforeInstall);
      window.removeEventListener("appinstalled", onInstalled);
    };
  }, []);

  async function install() {
    if (installEvent) {
      await installEvent.prompt();
      const choice = await installEvent.userChoice;
      setInstallEvent(null);
      if (choice.outcome === "accepted") {
        setInstalled(true);
        dismiss();
        return;
      }
    }
    setShowInstructions((current) => !current);
  }

  if (!visible || installed) return null;

  return (
    <aside
      aria-label="Install The Living God Tabernacle app"
      className="fixed bottom-4 left-4 right-4 z-40 mx-auto max-w-lg rounded-2xl border border-emerald-950/10 bg-white p-4 text-[#1e3027] shadow-[0_16px_55px_rgba(16,36,27,0.22)] sm:bottom-6 sm:left-auto sm:right-6 sm:p-5"
    >
      <div className="flex items-start gap-3">
        <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-emerald-900 text-sm font-bold tracking-tight text-[#e4c47f]" aria-hidden="true">TLG</div>
        <div className="min-w-0 flex-1 pr-5">
          <h2 className="text-sm font-bold text-emerald-950">Keep the Word close</h2>
          <p className="mt-1 text-xs leading-5 text-stone-600">Add The Living God Tabernacle to your home screen for quick access to sermons, Scripture, and fellowship.</p>
        </div>
        <button type="button" onClick={dismiss} className="-mr-1 -mt-1 grid h-8 w-8 shrink-0 place-items-center rounded-full text-xl text-stone-400 hover:bg-stone-100 hover:text-stone-700" aria-label="Not now">×</button>
      </div>

      <button type="button" onClick={install} className="mt-4 flex min-h-11 w-full items-center justify-center rounded-lg bg-emerald-900 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-800 focus-visible:outline-emerald-700">
        {installEvent ? "Install app" : ios ? "Show iPhone / iPad install steps" : "Install app"}
      </button>

      {showInstructions && (
        <div className="mt-3 rounded-lg bg-[#f6f7f4] p-3 text-xs leading-5 text-stone-700" role="status">
          {ios ? (
            <ol className="list-inside list-decimal space-y-1">
              <li>Open this page in Safari, then tap the <strong>Share</strong> button.</li>
              <li>Scroll the share menu and tap <strong>Add to Home Screen</strong>.</li>
              <li>Tap <strong>Add</strong> to finish.</li>
            </ol>
          ) : (
            <p>Open your browser menu and choose <strong>Install app</strong> or <strong>Add to Home screen</strong>. If neither option appears, try Chrome on Android.</p>
          )}
        </div>
      )}
      <button type="button" onClick={dismiss} className="mt-2 w-full rounded-md py-1 text-xs font-medium text-stone-500 hover:text-stone-800">Maybe later</button>
    </aside>
  );
}
