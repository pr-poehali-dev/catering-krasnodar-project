import { Link } from 'react-router-dom';

type LogoProps = {
  size?: 'sm' | 'md' | 'lg';
  variant?: 'dark' | 'light';
  to?: string | null;
  showWordmark?: boolean;
  showTagline?: boolean;
  className?: string;
};

const sizeMap = {
  sm: { text: 'text-[32px] sm:text-[36px]', tagline: 'text-[8px] sm:text-[9px]', icon: 18, gap: 'gap-1.5' },
  md: { text: 'text-[42px]', tagline: 'text-[10px]', icon: 22, gap: 'gap-2' },
  lg: { text: 'text-[56px] sm:text-[68px]', tagline: 'text-[11px] sm:text-[13px]', icon: 30, gap: 'gap-2.5' },
};

const Logo = ({
  size = 'md',
  variant = 'dark',
  to = '/',
  showWordmark = true,
  showTagline = false,
  className = '',
}: LogoProps) => {
  const s = sizeMap[size];
  const wordClr = variant === 'dark' ? 'text-graphite' : 'text-snow';
  const accent = 'text-lime';

  const content = (
    <span className={`logo group inline-flex flex-col items-start ${className}`}>
      <span className={`inline-flex items-end ${s.gap}`}>
        {showWordmark && (
          <span
            className={`relative font-normal tracking-tight ${s.text} ${wordClr} whitespace-nowrap leading-[0.9]`}
            style={{ fontFamily: '"Allura", cursive' }}
          >
            Furshet in Box
          </span>
        )}
      </span>
      {showTagline && (
        <span
          className={`mt-1 sm:mt-1.5 ${s.tagline} ${accent} font-bold uppercase tracking-[0.45em] whitespace-nowrap`}
        ></span>
      )}
    </span>
  );

  if (!to) return content;
  return (
    <Link to={to} className="inline-flex transition">
      {content}
    </Link>
  );
};

export default Logo;