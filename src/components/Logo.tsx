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
  const stroke = dark ? 'stroke-graphite' : 'stroke-snow';
  const fill = dark ? 'fill-graphite' : 'fill-snow';
  const accent = 'fill-lime';
  const px = sizeMap[size].box;

  return (
    <span
      className={`${px} relative inline-flex items-center justify-center shrink-0`}
      aria-hidden
    >
      <svg viewBox="0 0 40 40" className="w-full h-full" fill="none">
        {/* Корпус коробки */}
        <path
          d="M6 14 L20 8 L34 14 L34 30 C34 31.1 33.1 32 32 32 L8 32 C6.9 32 6 31.1 6 30 Z"
          className={stroke}
          strokeWidth="2.4"
          strokeLinejoin="round"
        />
        {/* Створки сверху */}
        <path
          d="M6 14 L20 20 L34 14"
          className={stroke}
          strokeWidth="2.4"
          strokeLinejoin="round"
        />
        <path
          d="M20 20 L20 32"
          className={stroke}
          strokeWidth="2.4"
          strokeLinejoin="round"
        />
        {/* Вырезанная буква F (вырез — белый по тёмному фону через mask-like эффект: рисуем буквы поверх) */}
        <g transform="translate(11.5 22)">
          <rect x="0" y="0" width="2" height="7.5" className={fill} rx="0.5" />
          <rect x="0" y="0" width="5" height="1.6" className={fill} rx="0.5" />
          <rect x="0" y="3.2" width="3.6" height="1.4" className={fill} rx="0.5" />
        </g>
        {/* Акцентная точка */}
        <circle cx="29" cy="11" r="2.2" className={accent} />
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
          Furshet in Box
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