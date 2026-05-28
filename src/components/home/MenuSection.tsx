import Icon from '@/components/ui/icon';

const HERO_IMG = 'https://cdn.poehali.dev/projects/a8ae25f0-9542-4f49-bc05-8b8f1da19cee/files/b2163239-4ec3-4791-b1b8-87e0712ecd1f.jpg';
const WEDDING_IMG = 'https://cdn.poehali.dev/projects/a8ae25f0-9542-4f49-bc05-8b8f1da19cee/files/a0c3eada-d236-47e1-ac30-78632794e646.jpg';
const CORP_IMG = 'https://cdn.poehali.dev/projects/a8ae25f0-9542-4f49-bc05-8b8f1da19cee/files/a23a2735-2a81-4111-9781-c5416847d3e8.jpg';

const menuItems = [
  { name: 'Канапе с лососем', price: 180, category: 'Закуски', img: HERO_IMG },
  { name: 'Тарталетки с икрой', price: 220, category: 'Премиум', img: HERO_IMG },
  { name: 'Брускетта с пармой', price: 160, category: 'Закуски', img: HERO_IMG },
  { name: 'Мини-десерты', price: 140, category: 'Десерты', img: WEDDING_IMG },
  { name: 'Сырная тарелка', price: 380, category: 'Закуски', img: CORP_IMG },
  { name: 'Шеф-салат', price: 290, category: 'Салаты', img: CORP_IMG },
];

const MenuSection = () => {
  return (
    <section id="menu" className="py-24 lg:py-32 border-t border-graphite/10 relative">
      <div className="absolute inset-0 dotted-bg opacity-50 pointer-events-none" />
      <div className="container mx-auto relative">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-ash mb-5">
              <span className="w-6 h-px bg-ash" />
              Каталог
            </div>
            <h2 className="font-sans text-4xl lg:text-6xl xl:text-7xl tracking-tightest font-medium text-balance">
              Блюда, в которые
              <span className="font-serif italic font-normal"> влюбляются</span>
            </h2>
          </div>
          <div className="flex gap-2 flex-wrap">
            {['Все', 'Закуски', 'Десерты', 'Премиум'].map((t, i) => (
              <button
                key={t}
                className={`px-4 py-2 rounded-full text-[13px] font-medium border transition ${
                  i === 0 ? 'bg-graphite text-snow border-graphite' : 'bg-snow border-graphite/15 hover:border-graphite/40'
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {menuItems.map((item, i) => (
            <article key={i} className="bento-card group">
              <div className="aspect-[4/3] overflow-hidden bg-stone relative">
                <img src={item.img} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[1000ms] ease-out" />
                <div className="absolute top-3 left-3">
                  <span className="bg-snow/90 backdrop-blur text-[11px] font-medium px-2.5 py-1 rounded-full">
                    {item.category}
                  </span>
                </div>
                <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-snow/90 backdrop-blur flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
                  <Icon name="Plus" size={14} />
                </div>
              </div>
              <div className="p-5 flex items-start justify-between gap-3">
                <h3 className="font-sans text-[16px] tracking-tight font-medium leading-tight">{item.name}</h3>
                <div className="text-[15px] font-semibold whitespace-nowrap">
                  {item.price} ₽
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="text-center mt-12">
          <a href="#contacts" className="inline-flex items-center gap-2 bg-graphite text-snow px-5 py-3 rounded-full text-[14px] font-medium hover:bg-graphite/85 transition group">
            Открыть полное меню
            <span className="w-5 h-5 rounded-full bg-lime flex items-center justify-center group-hover:rotate-45 transition">
              <Icon name="ArrowRight" size={11} className="text-graphite" />
            </span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default MenuSection;
