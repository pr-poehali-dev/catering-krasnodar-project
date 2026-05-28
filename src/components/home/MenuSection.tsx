import { useState } from 'react';
import Icon from '@/components/ui/icon';

const HERO_IMG = 'https://cdn.poehali.dev/projects/a8ae25f0-9542-4f49-bc05-8b8f1da19cee/files/b2163239-4ec3-4791-b1b8-87e0712ecd1f.jpg';
const WEDDING_IMG = 'https://cdn.poehali.dev/projects/a8ae25f0-9542-4f49-bc05-8b8f1da19cee/files/a0c3eada-d236-47e1-ac30-78632794e646.jpg';
const CORP_IMG = 'https://cdn.poehali.dev/projects/a8ae25f0-9542-4f49-bc05-8b8f1da19cee/files/a23a2735-2a81-4111-9781-c5416847d3e8.jpg';

const KANAPE_MIX_IMGS = [
  'https://cdn.poehali.dev/projects/a8ae25f0-9542-4f49-bc05-8b8f1da19cee/bucket/7e767775-7b54-426b-a9d9-5dafb80c1da9.jpg',
  'https://cdn.poehali.dev/projects/a8ae25f0-9542-4f49-bc05-8b8f1da19cee/bucket/80630363-ea63-4f79-902c-0fc92d3da22f.jpg',
  'https://cdn.poehali.dev/projects/a8ae25f0-9542-4f49-bc05-8b8f1da19cee/bucket/9d6eeafc-6164-465c-9d77-de9ffc8b3b5d.jpg',
];

const menuSections = [
  {
    id: 'kanape',
    title: 'Канапе',
    items: [
      {
        name: 'Канапе «Микс»',
        portion: '36 шт',
        description: 'Говядина и антипасто в соусе тар-тар · чизбол с вишней, орехами и ягодой · форель и огурец',
        images: KANAPE_MIX_IMGS,
        badge: 'Хит',
      },
    ],
  },
  {
    id: 'other',
    title: 'Другое',
    items: [
      { name: 'Тарталетки с икрой', price: 220, category: 'Премиум', img: HERO_IMG },
      { name: 'Брускетта с пармой', price: 160, category: 'Закуски', img: HERO_IMG },
      { name: 'Мини-десерты', price: 140, category: 'Десерты', img: WEDDING_IMG },
      { name: 'Сырная тарелка', price: 380, category: 'Закуски', img: CORP_IMG },
      { name: 'Шеф-салат', price: 290, category: 'Салаты', img: CORP_IMG },
    ],
  },
];

const KanapeMixCard = ({ images, name, portion, description, badge }: { images: string[]; name: string; portion: string; description: string; badge?: string }) => {
  const [active, setActive] = useState(0);
  return (
    <article className="bento-card group col-span-1 sm:col-span-2 lg:col-span-3 overflow-hidden">
      <div className="grid lg:grid-cols-5">
        {/* Gallery */}
        <div className="lg:col-span-3 relative aspect-[4/3] sm:aspect-[16/9] lg:aspect-auto bg-stone overflow-hidden">
          {images.map((src, i) => (
            <img
              key={src}
              src={src}
              alt={name}
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${active === i ? 'opacity-100' : 'opacity-0'}`}
            />
          ))}
          {badge && (
            <div className="absolute top-3 sm:top-4 left-3 sm:left-4">
              <span className="bg-lime text-graphite text-[11px] font-semibold px-3 py-1.5 rounded-full">
                {badge}
              </span>
            </div>
          )}
          <div className="absolute bottom-3 sm:bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                className={`h-1.5 rounded-full transition-all ${active === i ? 'w-6 bg-snow' : 'w-1.5 bg-snow/50'}`}
                aria-label={`Фото ${i + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Info */}
        <div className="lg:col-span-2 p-5 sm:p-6 lg:p-8 xl:p-10 flex flex-col">
          <div className="text-[11px] uppercase tracking-[0.2em] text-ash mb-3">{portion}</div>
          <h3 className="font-sans text-2xl sm:text-3xl lg:text-4xl xl:text-5xl tracking-tightest font-medium leading-[1.05]">
            {name.split('«')[0]}
            {name.includes('«') && (
              <>
                <br />
                <span className="font-serif italic font-normal text-accent2">«{name.split('«')[1]}</span>
              </>
            )}
          </h3>

          <ul className="mt-5 sm:mt-6 space-y-2 sm:space-y-2.5">
            {description.split(' · ').map((line, i) => (
              <li key={i} className="flex items-start gap-2.5 text-[13px] sm:text-[14px] lg:text-[15px] text-graphite/80 leading-relaxed">
                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-lime shrink-0" />
                {line}
              </li>
            ))}
          </ul>

          <div className="mt-6 sm:mt-auto pt-6 sm:pt-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <a href="#contacts" className="group/btn bg-graphite text-snow px-5 py-3 rounded-full text-[14px] font-medium inline-flex items-center justify-center gap-2 hover:bg-graphite/85 transition">
              Заказать
              <span className="w-5 h-5 rounded-full bg-lime flex items-center justify-center group-hover/btn:rotate-45 transition">
                <Icon name="ArrowRight" size={11} className="text-graphite" />
              </span>
            </a>
            <div className="flex items-center gap-1.5 text-[12px] text-ash">
              <Icon name="Sparkles" size={13} className="text-accent2" />
              Авторский набор
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};

const MenuSection = () => {
  return (
    <section id="menu" className="py-16 sm:py-24 lg:py-32 border-t border-graphite/10 relative">
      <div className="absolute inset-0 dotted-bg opacity-50 pointer-events-none" />
      <div className="container mx-auto relative">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10 sm:mb-12">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-ash mb-4 sm:mb-5">
              <span className="w-6 h-px bg-ash" />
              Каталог
            </div>
            <h2 className="font-sans text-[clamp(2rem,7vw,5rem)] leading-[0.95] tracking-tightest font-medium text-balance">
              Блюда, в которые
              <span className="font-serif italic font-normal"> влюбляются</span>
            </h2>
          </div>
          <div className="flex gap-2 overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0 sm:flex-wrap scrollbar-hide">
            {['Все', 'Канапе', 'Десерты', 'Премиум'].map((t, i) => (
              <button
                key={t}
                className={`px-4 py-2 rounded-full text-[13px] font-medium border transition whitespace-nowrap shrink-0 ${
                  i === 0 ? 'bg-graphite text-snow border-graphite' : 'bg-snow border-graphite/15 hover:border-graphite/40'
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        {menuSections.map((section) => (
          <div key={section.id} className="mb-12 sm:mb-14 last:mb-0">
            <div className="flex items-baseline gap-3 sm:gap-4 mb-5 sm:mb-6">
              <h3 className="font-sans text-xl sm:text-2xl lg:text-3xl xl:text-4xl tracking-tightest font-medium">
                {section.title}
              </h3>
              <span className="text-[11px] sm:text-[12px] text-ash">{section.items.length} {section.items.length === 1 ? 'позиция' : 'позиций'}</span>
              <span className="flex-1 h-px bg-graphite/10" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
              {section.items.map((item, i) => {
                if ('images' in item) {
                  return (
                    <KanapeMixCard
                      key={i}
                      images={item.images}
                      name={item.name}
                      portion={item.portion}
                      description={item.description}
                      badge={item.badge}
                    />
                  );
                }
                return (
                  <article key={i} className="bento-card group">
                    <div className="aspect-[4/3] overflow-hidden bg-stone relative">
                      <img src={item.img} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[1000ms] ease-out" />
                      <div className="absolute top-3 left-3">
                        <span className="bg-snow/90 backdrop-blur text-[11px] font-medium px-2.5 py-1 rounded-full">
                          {item.category}
                        </span>
                      </div>
                      <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-snow/90 backdrop-blur flex items-center justify-center sm:opacity-0 sm:group-hover:opacity-100 transition">
                        <Icon name="Plus" size={14} />
                      </div>
                    </div>
                    <div className="p-4 sm:p-5 flex items-start justify-between gap-3">
                      <h4 className="font-sans text-[15px] sm:text-[16px] tracking-tight font-medium leading-tight">{item.name}</h4>
                      <div className="text-[15px] font-semibold whitespace-nowrap">
                        {item.price} ₽
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        ))}

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