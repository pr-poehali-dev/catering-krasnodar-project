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

const ClocheIcon = ({ size, accent }: { size: number; accent: string }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 48 48"
    fill="none"
    stroke="currentColor"
    className={`${accent} logo-cloche shrink-0`}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    {/* Искра слева */}
    <path d="M6 16 L7.5 19.5 L11 21 L7.5 22.5 L6 26 L4.5 22.5 L1 21 L4.5 19.5 Z" strokeWidth="1.6" />
    {/* Купол клоше */}
    <path d="M14 32 C14 22, 20 18, 24 18 C28 18, 34 22, 34 32" strokeWidth="2.4" />
    {/* Колечко сверху */}
    <circle cx="24" cy="13.5" r="1.8" strokeWidth="2" />
    <path d="M24 15.3 L24 18" strokeWidth="2" />
    {/* Блик */}
    <path d="M28 23 C30 24.5, 31 27, 31 30" strokeWidth="1.6" />
    {/* Поднос */}
    <path d="M11 34 L37 34" strokeWidth="2.4" />
    <path d="M14 37 L34 37" strokeWidth="2.4" />
    {/* Искра справа */}
    <path d="M42 18 L43.5 21.5 L47 23 L43.5 24.5 L42 28 L40.5 24.5 L37 23 L40.5 21.5 Z" strokeWidth="1.6" />
    <path d="M40 36 L41 38 L43 39 L41 40 L40 42 L39 40 L37 39 L39 38 Z" strokeWidth="1.4" />
  </svg>
);

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
        <ClocheIcon size={s.icon} accent={accent} />
      </span>
      {showTagline && (
        <span
          className={`mt-1 sm:mt-1.5 ${s.tagline} ${accent} font-bold uppercase tracking-[0.45em] whitespace-nowrap`}
        >
          Premium service
        </span>
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