import { Link } from 'react-router-dom';

type LogoProps = {
  size?: 'sm' | 'md' | 'lg';
  variant?: 'dark' | 'light';
  to?: string | null;
  showWordmark?: boolean;
  showTagline?: boolean;
  className?: string;
};

const iconSizeMap = {
  sm: 'w-8 h-8 sm:w-9 sm:h-9',
  md: 'w-10 h-10 sm:w-11 sm:h-11',
  lg: 'w-14 h-14 sm:w-16 sm:h-16',
};

const wordmarkSizeMap = {
  sm: 'text-[17px] sm:text-[19px]',
  md: 'text-[20px] sm:text-[23px]',
  lg: 'text-[26px] sm:text-[30px]',
};

const Logo = ({ size = 'md', variant = 'dark', to = '/', showTagline = false, className = '' }: LogoProps) => {
  const isLight = variant === 'light';
  const inkColor = isLight ? '#FAFAFA' : '#0A0A0A';
  const mutedColor = isLight ? 'text-snow/60' : 'text-ash';

  const content = (
    <span className={`logo group inline-flex items-center gap-2.5 ${className}`}>
      <svg
        viewBox="0 0 40 40"
        fill="none"
        className={`${iconSizeMap[size]} shrink-0`}
      >
        <rect x="0.5" y="0.5" width="39" height="39" rx="11.5" className="transition-colors" fill={isLight ? 'rgba(250,250,250,0.08)' : '#0A0A0A'} />
        <g className="logo-cloche">
          <path
            d="M10.5 24.2c0-6.2 4.3-11 9.5-11s9.5 4.8 9.5 11"
            stroke="#D4F542"
            strokeWidth="2"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d="M14.2 20.5c1.3-2.6 3.4-4 5.8-4"
            stroke="#D4F542"
            strokeOpacity="0.45"
            strokeWidth="1.3"
            strokeLinecap="round"
            fill="none"
          />
          <rect x="9" y="24.2" width="22" height="2.7" rx="1.35" fill="#D4F542" />
          <path d="M20 13.4V9.6" stroke="#D4F542" strokeWidth="2" strokeLinecap="round" />
          <circle cx="20" cy="8.6" r="1.7" fill="#FF5C2B" />
        </g>
        <path
          className="logo-stroke"
          d="M9 28.6h22"
          stroke={isLight ? '#FAFAFA' : '#FAFAFA'}
          strokeOpacity="0.3"
          strokeWidth="1.4"
          strokeLinecap="round"
        />
      </svg>

      <span className="inline-flex flex-col leading-none">
        <span className={`font-sans font-semibold tracking-tight ${wordmarkSizeMap[size]}`} style={{ color: inkColor }}>
          <span className="font-serif italic font-normal">Furshet</span> in Box
        </span>
        {showTagline && (
          <span className={`mt-1 text-[10px] sm:text-[11px] uppercase tracking-[0.18em] font-medium ${mutedColor}`}>
            Гастробоксы и фуршеты
          </span>
        )}
      </span>
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