"use client";

import { useEffect, useState } from "react";
import { InstallPrompt } from "@/components/home/install-prompt";
import { WelcomeMessage } from "@/components/home/welcome-message";

const VISITED_KEY = "tlg-visitor-seen-v1";

export type VisitorMessage = { heading: string; verse: string; reference: string; reflection: string };

const FIRST_MESSAGE: VisitorMessage = {
  heading: "A promise to remember",
  verse: "Behold, I will send you Elijah the prophet before the coming of the great and dreadful day of the LORD: And he shall turn the heart of the fathers to the children, and the heart of the children to their fathers.",
  reference: "Malachi 4:5–6 · King James Version",
  reflection: "Take a quiet moment with this promise. Explore the End Time Message and the sermons of William Marrion Branham with Scripture as your guide.",
};

const RETURN_MESSAGES: VisitorMessage[] = [
  { heading: "Strength for today", verse: "I can do all things through Christ which strengtheneth me.", reference: "Philippians 4:13 · King James Version", reflection: "Whatever this day holds, you do not walk through it alone." },
  { heading: "Rest for your soul", verse: "Come unto me, all ye that labour and are heavy laden, and I will give you rest.", reference: "Matthew 11:28 · King James Version", reflection: "Pause, breathe, and bring your burdens to God." },
  { heading: "Hope for the journey", verse: "They that wait upon the LORD shall renew their strength; they shall mount up with wings as eagles.", reference: "Isaiah 40:31 · King James Version", reflection: "Wait with hope. God can renew your strength for the next step." },
  { heading: "Peace in every season", verse: "The LORD is nigh unto all them that call upon him, to all that call upon him in truth.", reference: "Psalm 145:18 · King James Version", reflection: "You can draw near to God in every season of life." },
  { heading: "A light for your path", verse: "Thy word is a lamp unto my feet, and a light unto my path.", reference: "Psalm 119:105 · King James Version", reflection: "Let the Word guide one step at a time." },
];

function getMessage(): VisitorMessage {
  const now = new Date();
  // Keep one gentle reflection for each calendar day, changing without repeated pop-ups in a session.
  const day = Math.floor(Date.UTC(now.getFullYear(), now.getMonth(), now.getDate()) / 86_400_000);
  return RETURN_MESSAGES[day % RETURN_MESSAGES.length];
}

export function VisitorNotifications() {
  const [firstVisit, setFirstVisit] = useState<boolean | null>(null);
  const [message, setMessage] = useState<VisitorMessage>(FIRST_MESSAGE);

  useEffect(() => {
    const first = window.localStorage.getItem(VISITED_KEY) !== "true";
    setFirstVisit(first);
    if (!first) setMessage(getMessage());
    window.localStorage.setItem(VISITED_KEY, "true");
  }, []);

  if (firstVisit === null) return null;
  const activeMessage = firstVisit ? FIRST_MESSAGE : message;
  return <>
    <WelcomeMessage firstVisit={firstVisit} message={activeMessage} />
    <InstallPrompt firstVisit={firstVisit} message={activeMessage} />
  </>;
}
