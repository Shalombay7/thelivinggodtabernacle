interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "start" | "between";
  titleId?: string;
  theme?: "light" | "dark";
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "start",
  titleId,
  theme = "light",
}: SectionHeadingProps) {
  return (
    <div className={align === "between" ? "flex flex-col gap-3 md:flex-row md:items-end md:justify-between" : ""}>
      <div>
        <p className={theme === "dark" ? "text-sm font-semibold uppercase tracking-[0.22em] text-white/70" : "eyebrow"}>
          {eyebrow}
        </p>
        <h2
          id={titleId}
          className={theme === "dark" ? "mt-3 font-[family-name:var(--font-heading)] text-4xl text-white" : "section-title mt-3"}
        >
          {title}
        </h2>
      </div>
      {description ? (
        <p className={theme === "dark" ? "max-w-xl text-sm leading-7 text-white/80" : "max-w-xl text-sm leading-7 text-[var(--color-muted)]"}>
          {description}
        </p>
      ) : null}
    </div>
  );
}
