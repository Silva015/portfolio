import Image from "next/image";
import type { ComponentProps, ReactNode } from "react";
import { twMerge } from "tailwind-merge";

export function cn(...classes: Array<string | false | null | undefined>) {
  return twMerge(classes.filter(Boolean).join(" "));
}

export function Container({ className, ...props }: ComponentProps<"div">) {
  return <div className={cn("mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8", className)} {...props} />;
}

export function Section({
  id,
  className,
  children,
}: {
  id?: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className={cn("py-20 sm:py-28", className)}>
      <Container>{children}</Container>
    </section>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: ReactNode;
  description?: ReactNode;
}) {
  return (
    <div className="reveal mb-12 max-w-2xl sm:mb-16">
      <p className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-accent">{eyebrow}</p>
      <h2 className="text-3xl font-semibold tracking-tight text-balance sm:text-4xl">{title}</h2>
      {description ? <p className="mt-4 text-pretty text-muted sm:text-lg">{description}</p> : null}
    </div>
  );
}

export function Chip({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border border-border bg-surface/60 px-2.5 py-1 font-mono text-[11px] leading-none text-muted",
        className,
      )}
    >
      {children}
    </span>
  );
}

const buttonStyles = {
  primary:
    "bg-accent text-accent-fg hover:bg-accent-strong shadow-[0_0_0_1px_var(--accent),0_8px_30px_-8px_var(--glow)]",
  secondary: "border border-border-strong bg-surface/70 text-fg hover:bg-surface-2",
  ghost: "text-muted hover:text-fg hover:bg-surface",
} as const;

export function buttonClass(variant: keyof typeof buttonStyles = "secondary", className?: string) {
  return cn(
    "inline-flex h-11 items-center justify-center gap-2 rounded-full px-5 text-sm font-medium transition-colors",
    buttonStyles[variant],
    className,
  );
}

export function ButtonLink({
  variant,
  className,
  external,
  ...props
}: ComponentProps<"a"> & { variant?: keyof typeof buttonStyles; external?: boolean }) {
  return (
    <a
      className={buttonClass(variant, className)}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      {...props}
    />
  );
}

export function Monogram({ initials, className }: { initials: string; className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "inline-grid size-8 place-items-center rounded-lg border border-border-strong bg-surface font-mono text-[11px] font-semibold tracking-wider text-fg",
        className,
      )}
    >
      {initials}
    </span>
  );
}

/** Profile photo when one is configured, otherwise the monogram. */
export function Avatar({
  src,
  initials,
  size,
  alt = "",
  priority,
  className,
}: {
  src?: string;
  initials: string;
  size: number;
  alt?: string;
  priority?: boolean;
  className?: string;
}) {
  if (!src) {
    return (
      <Monogram
        initials={initials}
        className={cn("rounded-full text-sm", className)}
      />
    );
  }
  return (
    <Image
      src={src}
      alt={alt}
      width={size}
      height={size}
      priority={priority}
      className={cn("shrink-0 rounded-full object-cover ring-1 ring-border-strong", className)}
      style={{ width: size, height: size }}
    />
  );
}
