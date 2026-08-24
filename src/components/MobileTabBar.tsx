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
    className="tap-scale relative flex flex-col items-center justify-center gap-1 py-1.5 rounded-2xl transition"
  >
    <div className={`relative flex items-center justify-center w-9 h-9 rounded-full transition-colors ${active ? 'bg-graphite/8' : ''}`}>
      <Icon name={icon} size={20} className={active ? 'text-graphite' : 'text-ash'} />
    </div>
    <span className={`text-[10px] font-medium leading-none transition-colors ${active ? 'text-graphite' : 'text-ash'}`}>{label}</span>
  </Link>
);

const MobileTabBar = () => {
  const location = useLocation();
  const [preorderOpen, setPreorderOpen] = useState(false);

  if (HIDDEN_PREFIXES.some((p) => location.pathname.startsWith(p))) return null;

  const isHome = location.pathname === '/' && !location.hash;
  const isMenu = location.pathname === '/menu' || location.pathname.startsWith('/events');
  const isContacts = location.pathname === '/' && location.hash === '#contacts';

  return (
    <>
      <nav
        className="md:hidden fixed bottom-0 inset-x-0 z-50"
        style={{ paddingBottom: 'max(0.5rem, env(safe-area-inset-bottom))' }}
      >
        <div className="mx-3">
          <div className="glass border border-graphite/10 rounded-[28px] shadow-lg px-2 pt-2 pb-1.5 grid grid-cols-4 items-end gap-1">
            <TabLink to="/" icon="Home" label="Главная" active={isHome} />
            <TabLink to="/menu" icon="UtensilsCrossed" label="Меню" active={isMenu} />

            <div className="flex flex-col items-center justify-end gap-1 py-1">
              <button
                type="button"
                onClick={() => setPreorderOpen(true)}
                className="btn-shadow tap-scale w-14 h-14 -mt-7 rounded-full bg-graphite text-snow flex items-center justify-center ring-4 ring-snow"
                aria-label="Оформить предзаказ"
              >
                <Icon name="ShoppingBag" size={22} />
              </button>
              <span className="text-[10px] font-medium text-ash leading-none">Заказ</span>
            </div>

            <TabLink to="/#contacts" icon="MessageCircle" label="Контакты" active={isContacts} />
          </div>
        </div>
      </nav>

      <PreorderModal open={preorderOpen} onClose={() => setPreorderOpen(false)} />
    </>
  );
};

export default MobileTabBar;
