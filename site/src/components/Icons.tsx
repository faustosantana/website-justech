type IconProps = { className?: string; title?: string };

export function IconGrid({ className, title }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden={title ? undefined : true} role={title ? "img" : undefined}>
      {title ? <title>{title}</title> : null}
      <rect x="3" y="3" width="7" height="7" stroke="currentColor" strokeWidth="1.5" />
      <rect x="14" y="3" width="7" height="7" stroke="currentColor" strokeWidth="1.5" />
      <rect x="3" y="14" width="7" height="7" stroke="currentColor" strokeWidth="1.5" />
      <rect x="14" y="14" width="7" height="7" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

export function IconShield({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M12 3 5 6v6c0 5 3.2 8.2 7 9.5 3.8-1.3 7-4.5 7-9.5V6l-7-3Z" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

export function IconNodes({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="6" cy="12" r="2.2" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="18" cy="6" r="2.2" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="18" cy="18" r="2.2" stroke="currentColor" strokeWidth="1.5" />
      <path d="M8 12h8M16.2 7.6 8.8 11M16.2 16.4 8.8 13" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

export function IconStack({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M4 8h16v10H4V8Z" stroke="currentColor" strokeWidth="1.5" />
      <path d="M7 8V6h10v2M7 18v2h10v-2" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

export function IconPulse({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M3 12h4l2-6 4 12 2-6h6" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
  );
}
