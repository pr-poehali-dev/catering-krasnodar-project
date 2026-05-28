import Icon from '@/components/ui/icon';

type Props = {
  tab: 'catalog' | 'preorders';
  setTab: (t: 'catalog' | 'preorders') => void;
  productsCount: number;
  newPreordersCount: number;
  onLogout: () => void;
};

const AdminHeader = ({ tab, setTab, productsCount, newPreordersCount, onLogout }: Props) => {
  return (
    <header className="sticky top-0 z-40 bg-snow/95 backdrop-blur border-b border-graphite/10">
      <div className="container mx-auto py-4 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2 bg-stone rounded-full p-1">
          <button
            onClick={() => setTab('preorders')}
            className={`relative px-4 py-2 rounded-full text-[13px] font-medium transition inline-flex items-center gap-2 ${
              tab === 'preorders' ? 'bg-graphite text-snow' : 'text-graphite hover:bg-graphite/5'
            }`}
          >
            <Icon name="Inbox" size={14} /> Заявки
            {newPreordersCount > 0 && (
              <span className={`text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center ${tab === 'preorders' ? 'bg-lime text-graphite' : 'bg-accent2 text-snow'}`}>
                {newPreordersCount}
              </span>
            )}
          </button>
          <button
            onClick={() => setTab('catalog')}
            className={`px-4 py-2 rounded-full text-[13px] font-medium transition inline-flex items-center gap-2 ${
              tab === 'catalog' ? 'bg-graphite text-snow' : 'text-graphite hover:bg-graphite/5'
            }`}
          >
            <Icon name="Package" size={14} /> Каталог · {productsCount}
          </button>
        </div>
        <div className="flex gap-2">
          <a href="/" className="px-4 py-2 rounded-full text-[13px] border border-graphite/15 hover:bg-graphite/5 transition inline-flex items-center gap-1.5">
            <Icon name="ExternalLink" size={13} /> <span className="hidden sm:inline">Сайт</span>
          </a>
          <button onClick={onLogout} className="px-4 py-2 rounded-full text-[13px] border border-graphite/15 hover:bg-graphite/5 transition inline-flex items-center gap-1.5">
            <Icon name="LogOut" size={13} /> <span className="hidden sm:inline">Выйти</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;
