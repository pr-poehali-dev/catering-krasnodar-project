import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '@/components/ui/icon';
import PreorderModal from '@/components/PreorderModal';

const HIDDEN_PREFIXES = ['/admin', '/product'];

type TabLinkProps = {
  to: string;
  icon: string;
  label: string;
  active: boolean;
};

const TabLink = ({ to, icon, label, active }: TabLinkProps) => (
  <Link
    to={to}
    className="flex flex-col items-center justify-center gap-1 py-1.5 rounded-2xl transition"
  >
    <Icon name={icon} size={20} className={active ? 'text-graphite' : 'text-ash'} />
    <span className={`text-[10px] font-medium ${active ? 'text-graphite' : 'text-ash'}`}>{label}</span>
    <span className={`w-1 h-1 rounded-full transition ${active ? 'bg-lime' : 'bg-transparent'}`} />
  </Link>
);

const MobileTabBar = () => {
  const location = useLocation();
  const [preorderOpen, setPreorderOpen] = useState(false);

  if (HIDDEN_PREFIXES.some((p) => location.pathname.startsWith(p))) return null;

  const isActive = (to: string) => {
    if (to === '/') return location.pathname === '/' && !location.hash;
    if (to.startsWith('/#')) return location.pathname === '/' && location.hash === to.slice(1);
    return location.pathname === to;
  };

  return (
    <>
      <nav
        className="md:hidden fixed bottom-0 inset-x-0 z-50"
        style={{ paddingBottom: 'max(0.75rem, env(safe-area-inset-bottom))' }}
      >
        <div className="relative mx-3">
          <div className="glass border border-graphite/10 rounded-[28px] shadow-lg px-2 py-2 grid grid-cols-4 items-end gap-1">
            <TabLink to="/" icon="Home" label="Главная" active={isActive('/')} />
            <TabLink to="/menu" icon="UtensilsCrossed" label="Меню" active={isActive('/menu')} />

            <div className="flex flex-col items-center justify-end gap-1 py-1.5">
              <button
                type="button"
                onClick={() => setPreorderOpen(true)}
                className="btn-shadow w-14 h-14 -mt-8 rounded-full bg-graphite text-snow flex items-center justify-center ring-4 ring-snow active:scale-95 transition"
                aria-label="Оформить предзаказ"
              >
                <Icon name="ShoppingBag" size={22} />
              </button>
              <span className="text-[10px] font-medium text-ash">Заказ</span>
            </div>

            <TabLink to="/#contacts" icon="MessageCircle" label="Контакты" active={isActive('/#contacts')} />
          </div>
        </div>
      </nav>

      <PreorderModal open={preorderOpen} onClose={() => setPreorderOpen(false)} />
    </>
  );
};

export default MobileTabBar;
