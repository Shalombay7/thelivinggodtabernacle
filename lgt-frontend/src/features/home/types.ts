export interface MinistryModule {
  id: string;
  name: string;
  active: boolean;
  audience: string;
}

export interface ChurchInfo {
  address: string;
  serviceTime: string;
  contactEmail: string;
  socialLinks: {
    facebook: string;
    youtube: string;
    instagram: string;
  };
  givingUrl: string;
}

export interface ApiResponse {
  service: string;
  vision: string;
  about: {
    mission: string;
    statementOfFaith: string;
    liveNow: boolean;
  };
  churchInfo: ChurchInfo;
  leadership: {
    pastor: string;
    message: string;
    image: string;
  };
  modules: MinistryModule[];
  links: {
    docs: string;
    health: string;
    portal: string;
  };
}

export interface Highlight {
  title: string;
  text: string;
}
