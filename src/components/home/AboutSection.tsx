import Icon from '@/components/ui/icon';
import { useReveal } from '@/hooks/use-reveal';

const PRINCIPLES = [
  {
    icon: 'Heart',
    title: 'Личный подход',
    text: 'Галина лично составляет меню под каждое событие — без шаблонов и типовых наборов.',
  },
  {
    icon: 'FileCheck2',
    title: 'Прозрачно',
    text: 'Работаем по договору, выдаём чеки. Стоимость известна заранее — без скрытых доплат.',
  },
  {
    icon: 'Timer',
    title: 'Точно в срок',
    text: 'Собираем и доставляем боксы точно к назначенному часу — вы можете на нас положиться.',
  },
  {
    icon: 'Sparkles',
    title: 'Красивая подача',
    text: 'Сервировка и оформление продумываются так, чтобы стол смотрелся как на обложке журнала.',
  },
];

const STATS = [
  { value: '5+', label: 'лет на рынке' },
  { value: '300+', label: 'мероприятий' },
  { value: '100+', label: 'гостей на банкете' },
  { value: '4.9', label: 'средний рейтинг' },
];

const AboutSection = () => {
  const head = useReveal();
  const grid = useReveal();

  return (
    <section id="about" className="py-16 sm:py-24 lg:py-28 border-t border-graphite/10 scroll-mt-24">
      <div className="container mx-auto">
        <div
          ref={head.ref as never}
          className={`flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10 sm:mb-14 transition-all duration-[1000ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
            head.visible ? 'opacity-100 translate-y-0 blur-0' : 'opacity-0 translate-y-8 blur-[6px]'
          }`}
        >
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-ash mb-4 sm:mb-5">
              <span className="w-6 h-px bg-ash" />
              О компании
            </div>
            <h2 className="font-sans text-[clamp(2rem,7vw,4.5rem)] leading-[0.95] tracking-tightest font-medium text-balance">
              Как мы <span className="font-serif italic font-normal">работаем</span>
            </h2>
            <p className="mt-4 sm:mt-5 text-graphite/70 max-w-lg text-[15px] leading-relaxed">
              Furshet in Box — это не безликий кейтеринг, а команда во главе с Галиной, которая лично
              ведёт каждый заказ: от идеи меню до сервировки на площадке.
            </p>
          </div>

          <div className="flex gap-3 sm:gap-6 flex-wrap">
            {STATS.map((s) => (
              <div key={s.label} className="min-w-[72px] sm:min-w-[88px]">
                <div className="font-sans text-lg sm:text-3xl tracking-tightest font-medium leading-none">{s.value}</div>
                <div className="text-[9px] sm:text-[12px] text-ash mt-1 sm:mt-1.5 leading-tight">{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-2 sm:gap-4">
          <div className="lg:col-span-5 bento-card overflow-hidden relative min-h-[160px] sm:min-h-[320px] lg:min-h-0">
            <img
              src="https://cdn.poehali.dev/projects/a8ae25f0-9542-4f49-bc05-8b8f1da19cee/files/5881ded0-18cf-4899-ab9c-e36dacd85746.jpg"
              alt="Кейтеринг Furshet in Box"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-graphite/85 via-graphite/10 to-transparent" />
            <div className="absolute bottom-2.5 left-2.5 right-2.5 sm:bottom-6 sm:left-6 sm:right-6 text-snow">
              <div className="font-serif italic text-[13px] sm:text-xl leading-snug">
                «Каждый бокс собираю так, будто он для моих гостей»
              </div>
              <div className="text-[8px] sm:text-[12px] text-snow/70 mt-1 sm:mt-2 uppercase tracking-[0.15em]">
                Галина · основатель
              </div>
            </div>
          </div>

          <div
            ref={grid.ref as never}
            className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-2 gap-2 sm:gap-4"
          >
            {PRINCIPLES.map((p, i) => (
              <div
                key={p.title}
                className="bento-card bg-snow p-3 sm:p-6 transition-all duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)]"
                style={{
                  transitionDelay: `${i * 100}ms`,
                  opacity: grid.visible ? 1 : 0,
                  transform: grid.visible ? 'translateY(0)' : 'translateY(24px)',
                }}
              >
                <div className="w-8 h-8 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-lime/25 flex items-center justify-center mb-2 sm:mb-4">
                  <Icon name={p.icon} size={16} className="text-graphite sm:hidden" />
                  <Icon name={p.icon} size={20} className="hidden sm:block text-graphite" />
                </div>
                <h3 className="font-sans text-[12px] sm:text-[17px] font-medium tracking-tight mb-1 sm:mb-1.5">
                  {p.title}
                </h3>
                <p className="text-[10px] sm:text-[14px] text-graphite/70 leading-relaxed">{p.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;