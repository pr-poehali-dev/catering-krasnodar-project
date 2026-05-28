import { Link } from 'react-router-dom';

type LogoProps = {
  size?: 'sm' | 'md' | 'lg';
  variant?: 'dark' | 'light';
  to?: string | null;
  showWordmark?: boolean;
  className?: string;
};

const sizeMap = {
  sm: { box: 'w-7 h-7', text: 'text-[18px] sm:text-[19px]', gap: 'gap-2' },
  md: { box: 'w-9 h-9', text: 'text-[22px]', gap: 'gap-2.5' },
  lg: { box: 'w-12 h-12 sm:w-14 sm:h-14', text: 'text-[28px] sm:text-[32px]', gap: 'gap-3' },
};

const LogoMark = ({ size = 'md', variant = 'dark' }: { size: 'sm' | 'md' | 'lg'; variant: 'dark' | 'light' }) => {
  const dark = variant === 'dark';
  const boxFill = dark ? 'fill-graphite' : 'fill-snow';
  const textFill = dark ? 'fill-snow' : 'fill-graphite';
  const accent = 'fill-lime';
  const px = sizeMap[size].box;

  return (
    <span
      className={`${px} relative inline-flex items-center justify-center shrink-0`}
      aria-hidden
    >
      <svg viewBox="0 0 40 40" className="w-full h-full" fill="none">
        {/* Скруглённая коробка — современный «squircle» */}
        <path
          d="M20 3.5 C32.5 3.5 36.5 7.5 36.5 20 C36.5 32.5 32.5 36.5 20 36.5 C7.5 36.5 3.5 32.5 3.5 20 C3.5 7.5 7.5 3.5 20 3.5 Z"
          className={boxFill}
        />
        {/* Лента-ручка коробки (акцент) */}
        <rect x="3.5" y="14.5" width="33" height="2.2" className={accent} />
        {/* Узелок ленты */}
        <circle cx="20" cy="15.6" r="2.6" className={accent} />
        <circle cx="20" cy="15.6" r="1" className={boxFill} />
        {/* Буква F — «вырезана» из нижней части */}
        <g transform="translate(14.6 22.4)">
          <rect x="0" y="0" width="2.2" height="10" rx="0.6" className={textFill} />
          <rect x="0" y="0" width="6.4" height="2.1" rx="0.6" className={textFill} />
          <rect x="0" y="4.2" width="4.6" height="1.8" rx="0.6" className={textFill} />
        </g>
        {/* Точка-акцент */}
        <circle cx="25.6" cy="31.4" r="1.4" className={accent} />
      </svg>
    </span>
  );
};

const Logo = ({
  size = 'md',
  variant = 'dark',
  to = '/',
  showWordmark = true,
  className = '',
}: LogoProps) => {
  const s = sizeMap[size];
  const textClr = variant === 'dark' ? 'text-graphite' : 'text-snow';
  const content = (
    <span className={`inline-flex items-center ${s.gap} ${className}`}>
      <LogoMark size={size} variant={variant} />
      {showWordmark && (
        <span
          className={`font-serif italic font-normal tracking-tight ${s.text} ${textClr} whitespace-nowrap leading-none`}
        >
          Furshet in <span className="text-lime">B</span>ox
        </span>
      )}
    </span>
  );

  if (!to) return content;
  return (
    <Link to={to} className="inline-flex hover:opacity-80 transition">
      {content}
    </Link>
  );
};

export default Logo;