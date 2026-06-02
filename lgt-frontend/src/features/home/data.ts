import { fallbackData } from "@/features/home/content";
import type { ApiResponse, MinistryModule } from "@/features/home/types";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL?.replace(/\/$/, "") ?? "";

function isCompleteModule(module: Partial<MinistryModule> | null | undefined): module is MinistryModule {
  return Boolean(module?.id && module?.name && module?.audience) && typeof module?.active === "boolean";
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
      contactEmail:
        data?.churchInfo?.contactEmail ||
        // Backward compatibility with the current API shape.
        (data?.churchInfo as { contact?: string } | undefined)?.contact ||
        fallbackData.churchInfo.contactEmail,
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
      data?.modules
        ?.map((module) =>
          module && "for" in module
            ? {
                id: module.id,
                name: module.name,
                active: module.active,
                audience: String(module.for),
              }
            : module,
        )
        .filter(isCompleteModule) || fallbackData.modules,
    links: {
      docs: data?.links?.docs || fallbackData.links.docs,
      health: data?.links?.health || fallbackData.links.health,
      portal: data?.links?.portal || fallbackData.links.portal,
    },
  };
}

export function getAbsoluteUrl(path: string) {
  if (!path) {
    return "#";
  }

  if (/^https?:\/\//i.test(path) || path.startsWith("#") || path.startsWith("mailto:")) {
    return path;
  }

  return API_BASE_URL ? `${API_BASE_URL}${path}` : path;
}

export async function getLgtData(): Promise<{ data: ApiResponse; usingFallback: boolean }> {
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
