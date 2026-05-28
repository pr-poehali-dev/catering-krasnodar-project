import Icon from '@/components/ui/icon';
import { useReveal } from '@/hooks/use-reveal';

const reviews = [
  {
    name: 'Анна К.',
    event: 'Свадьба · 80 гостей',
    text: 'Гости до сих пор пишут и спрашивают, где мы заказывали еду. Канапе разлетелись за 15 минут — пришлось докладывать. Галина — волшебница.',
    avatar: 'А',
  },
  {
    name: 'Дмитрий М.',
    event: 'Корпоратив · 150 человек',
    text: 'Идеальная подача, вкус и сервис. Работали как часы — ни одной заминки за вечер. Уже бронируем на следующий год.',
    avatar: 'Д',
  },
  {
    name: 'Елена С.',
    event: 'День рождения · 30 гостей',
    text: 'Фуршет получился стильным и невероятно вкусным. Всё привезли вовремя, разложили, забрали — нам осталось только наслаждаться вечером.',
    avatar: 'Е',
  },
];

const ReviewsSection = () => {
  const head = useReveal();
  const grid = useReveal();

  return (
    <section id="reviews" className="py-16 sm:py-24 lg:py-32 border-t border-graphite/10 bg-graphite text-snow relative overflow-hidden">
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-lime/20 rounded-full blur-[120px] pointer-events-none animate-float-y" />
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-accent2/20 rounded-full blur-[120px] pointer-events-none animate-float-y" style={{ animationDelay: '2s' }} />

      <div className="container mx-auto relative">
        <div
          ref={head.ref as never}
          className={`flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10 sm:mb-12 transition-all duration-[1000ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
            head.visible ? 'opacity-100 translate-y-0 blur-0' : 'opacity-0 translate-y-8 blur-[6px]'
          }`}
        >
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-snow/50 mb-4 sm:mb-5">
              <span className="w-6 h-px bg-snow/30" />
              Отзывы клиентов
            </div>
            <h2 className="font-sans text-[clamp(2rem,7vw,5rem)] leading-[0.95] tracking-tightest font-medium text-balance">
              Слова, которые
              <span className="font-serif italic font-normal text-lime"> греют сердце</span>
            </h2>
          </div>
          <div className="flex items-center gap-3 sm:gap-4 bg-snow/5 border hairline-light rounded-2xl px-5 py-3.5 backdrop-blur">
            <div className="font-sans text-4xl sm:text-5xl tracking-tightest font-medium leading-none">4.9</div>
            <div>
              <div className="flex gap-0.5 mb-1">
                {Array.from({ length: 5 }).map((_, j) => (
                  <Icon key={j} name="Star" size={12} className="fill-lime text-lime" />
                ))}
              </div>
              <div className="text-[12px] text-snow/60">320+ отзывов на Яндексе</div>
            </div>
          </div>
        </div>

        <div ref={grid.ref as never} className="grid md:grid-cols-3 gap-3">
          {reviews.map((r, i) => (
            <div
              key={i}
              className={`rounded-3xl p-6 sm:p-7 border hairline-light flex flex-col transition-all duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
                i === 1 ? 'bg-lime text-graphite border-lime md:scale-[1.03] md:-translate-y-3 shadow-2xl shadow-lime/20' : 'bg-snow/[0.04] backdrop-blur hover:bg-snow/[0.07]'
              }`}
              style={{
                transitionDelay: `${i * 150}ms`,
                opacity: grid.visible ? 1 : 0,
                transform: grid.visible
                  ? i === 1 ? 'translateY(-12px) scale(1.03)' : 'translateY(0)'
                  : 'translateY(40px)',
              }}
            >
              <Icon name="Quote" size={22} className={i === 1 ? 'text-graphite/40' : 'text-snow/30'} />
              <p className={`text-[15px] leading-relaxed mt-4 flex-1 ${i === 1 ? '' : 'text-snow/90'}`}>
                «{r.text}»
              </p>
              <div className={`mt-6 pt-5 border-t flex items-center gap-3 ${i === 1 ? 'border-graphite/15' : 'border-snow/10'}`}>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-[14px] font-semibold ${i === 1 ? 'bg-graphite text-lime' : 'bg-lime text-graphite'}`}>
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
