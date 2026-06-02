import Link from "next/link";
import type { ReactNode } from "react";

interface SmartLinkProps {
  href: string;
  className?: string;
  children: ReactNode;
  "aria-label"?: string;
}

function isExternal(href: string) {
  return /^https?:\/\//i.test(href) || href.startsWith("mailto:");
}

export function SmartLink({ href, className, children, ...props }: SmartLinkProps) {
  if (href.startsWith("#")) {
    return (
      <a href={href} className={className} {...props}>
        {children}
      </a>
    );
  }

  if (isExternal(href)) {
    return (
      <a
        href={href}
        className={className}
        target="_blank"
        rel="noreferrer"
        {...props}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={className} {...props}>
      {children}
    </Link>
  );
}
