import Icon from '@/components/ui/icon';

const reviews = [
  { name: 'Анна К.', event: 'Свадьба · 80 гостей', text: 'Гости до сих пор спрашивают, где мы заказывали еду. Канапе исчезли за 15 минут.', avatar: 'А' },
  { name: 'Дмитрий М.', event: 'Корпоратив', text: 'Безупречная подача, вкус и сервис. Работали как часы — ни одной заминки за вечер.', avatar: 'Д' },
  { name: 'Елена С.', event: 'День рождения', text: 'Заказывали фуршет на 30 человек. Красиво, вкусно, всё точно в срок.', avatar: 'Е' },
];

const ReviewsSection = () => {
  return (
    <section id="reviews" className="py-24 lg:py-32 border-t border-graphite/10 bg-graphite text-snow relative overflow-hidden">
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-lime/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-accent2/20 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto relative">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-snow/50 mb-5">
              <span className="w-6 h-px bg-snow/30" />
              Отзывы
            </div>
            <h2 className="font-sans text-4xl lg:text-6xl xl:text-7xl tracking-tightest font-medium text-balance">
              Клиенты говорят
              <span className="font-serif italic font-normal text-lime"> искреннее</span>
            </h2>
          </div>
          <div className="flex items-center gap-3">
            <div className="font-sans text-5xl tracking-tightest font-medium">4.9</div>
            <div>
              <div className="flex gap-0.5 mb-1">
                {Array.from({ length: 5 }).map((_, j) => (
                  <Icon key={j} name="Star" size={12} className="fill-lime text-lime" />
                ))}
              </div>
              <div className="text-[12px] text-snow/60">320+ отзывов</div>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-3">
          {reviews.map((r, i) => (
            <div
              key={i}
              className={`rounded-3xl p-7 border hairline-light flex flex-col ${
                i === 1 ? 'bg-lime text-graphite border-lime md:scale-[1.02] md:-translate-y-2' : 'bg-snow/[0.04] backdrop-blur'
              }`}
            >
              <Icon name="Quote" size={20} className={i === 1 ? 'text-graphite/40' : 'text-snow/30'} />
              <p className={`text-[15px] leading-relaxed mt-4 flex-1 ${i === 1 ? '' : 'text-snow/90'}`}>
                {r.text}
              </p>
              <div className={`mt-6 pt-5 border-t flex items-center gap-3 ${i === 1 ? 'border-graphite/15' : 'border-snow/10'}`}>
                <div className={`w-9 h-9 rounded-full flex items-center justify-center text-[14px] font-semibold ${i === 1 ? 'bg-graphite text-lime' : 'bg-lime text-graphite'}`}>
                  {r.avatar}
                </div>
                <div>
                  <div className="font-medium text-[14px]">{r.name}</div>
                  <div className={`text-[12px] ${i === 1 ? 'text-graphite/60' : 'text-snow/50'}`}>{r.event}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ReviewsSection;
