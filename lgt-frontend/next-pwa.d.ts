declare module "next-pwa" {
  import type { NextConfig } from "next";

  interface NextPwaOptions {
    dest: string;
    register?: boolean;
    skipWaiting?: boolean;
    disable?: boolean;
  }

  type WithPwa = (config: NextConfig) => NextConfig;

  export default function withPWAInit(options: NextPwaOptions): WithPwa;
}
