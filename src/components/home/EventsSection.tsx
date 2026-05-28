import Icon from '@/components/ui/icon';

const HERO_IMG = 'https://cdn.poehali.dev/projects/a8ae25f0-9542-4f49-bc05-8b8f1da19cee/files/b2163239-4ec3-4791-b1b8-87e0712ecd1f.jpg';
const WEDDING_IMG = 'https://cdn.poehali.dev/projects/a8ae25f0-9542-4f49-bc05-8b8f1da19cee/files/a0c3eada-d236-47e1-ac30-78632794e646.jpg';
const CORP_IMG = 'https://cdn.poehali.dev/projects/a8ae25f0-9542-4f49-bc05-8b8f1da19cee/files/a23a2735-2a81-4111-9781-c5416847d3e8.jpg';

const events = [
  { id: 'wedding', title: 'Свадьбы', img: WEDDING_IMG, badge: 'Премиум' },
  { id: 'corporate', title: 'Корпоративы', img: CORP_IMG, badge: 'B2B' },
  { id: 'fourchette', title: 'Фуршеты', img: HERO_IMG, badge: 'Light' },
  { id: 'birthday', title: 'Дни рождения', img: WEDDING_IMG, badge: 'Family' },
];

const EventsSection = () => {
  return (
    <section id="events" className="py-24 lg:py-32 relative">
      <div className="container mx-auto">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-ash mb-5">
              <span className="w-6 h-px bg-ash" />
              События
            </div>
            <h2 className="font-sans text-4xl lg:text-6xl xl:text-7xl tracking-tightest font-medium text-balance">
              Под каждый формат —
              <span className="font-serif italic font-normal"> своё меню</span>
            </h2>
          </div>
          <p className="text-ash max-w-sm text-[15px] leading-relaxed">
            Подбираем подачу под характер события и атмосферу гостей.
          </p>
        </div>

        <div className="grid grid-cols-12 gap-3">
          {events.map((e, i) => {
            const layouts = [
              'col-span-12 md:col-span-7 aspect-[16/10] md:aspect-[16/9]',
              'col-span-12 md:col-span-5 aspect-[16/10] md:aspect-[16/9]',
              'col-span-12 md:col-span-5 aspect-[16/10] md:aspect-[16/9]',
              'col-span-12 md:col-span-7 aspect-[16/10] md:aspect-[16/9]',
            ];
            return (
              <a key={e.id} href="#menu" className={`group bento-card ${layouts[i]} relative`}>
                <img src={e.img} alt={e.title} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-[1200ms] ease-out" />
                <div className="absolute inset-0 bg-gradient-to-t from-graphite/85 via-graphite/15 to-transparent" />
                <div className="absolute top-4 right-4">
                  <span className="glass-dark text-snow text-[11px] uppercase tracking-wider px-2.5 py-1 rounded-full border hairline-light">
                    {e.badge}
                  </span>
                </div>
                <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between text-snow">
                  <div>
                    <div className="font-sans text-2xl lg:text-3xl tracking-tighter font-medium">{e.title}</div>
                    <div className="text-[13px] text-snow/70 mt-1">Меню от 1 200 ₽/гость</div>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-lime text-graphite flex items-center justify-center opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all">
                    <Icon name="ArrowUpRight" size={16} />
                  </div>
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default EventsSection;
