import { Link } from 'react-router-dom';

type LogoProps = {
  size?: 'sm' | 'md' | 'lg';
  variant?: 'dark' | 'light';
  to?: string | null;
  showWordmark?: boolean;
  showTagline?: boolean;
  className?: string;
};

const LOGO_IMG = 'https://cdn.poehali.dev/projects/a8ae25f0-9542-4f49-bc05-8b8f1da19cee/bucket/0a5bdef0-5ac8-4b93-b466-85ad21e8c6a4.png';

const sizeMap = {
  sm: 'h-12 sm:h-14',
  md: 'h-16 sm:h-20',
  lg: 'h-24 sm:h-28',
};

const Logo = ({ size = 'md', to = '/', className = '' }: LogoProps) => {
  const h = sizeMap[size];

  const content = (
    <span className={`logo group inline-flex items-center ${className}`}>
      <img src={LOGO_IMG} alt="Furshet in Box" className={`${h} w-auto object-contain`} />
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