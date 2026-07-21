import { useState } from 'react';
import Icon from '@/components/ui/icon';
import Logo from '@/components/Logo';
import PreorderModal from '@/components/PreorderModal';

const GALINA_IMG = 'https://cdn.poehali.dev/projects/a8ae25f0-9542-4f49-bc05-8b8f1da19cee/bucket/36795b0f-4957-461e-ae4a-b8d8c106b9ed.jpg';

const HeroSection = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [preorderOpen, setPreorderOpen] = useState(false);

  return (
    <>
      {/* NAV */}
      <nav className="fixed top-3 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-1.5rem)] max-w-5xl">
        <div className="glass border border-graphite/10 rounded-full pl-2 pr-2 py-2 flex items-center justify-between shadow-sm">
          <div className="pl-2">
            <Logo size="sm" to="/" />
          </div>
          <div className="hidden md:flex items-center gap-1 text-[13px]">
            {[
              { l: 'Полное меню', h: '/menu' },
              { l: 'События', h: '#events' },
              { l: 'Отзывы', h: '#reviews' },
              { l: 'Контакты', h: '#contacts' },
            ].map((i) => (
              <a key={i.h} href={i.h} className="px-3 py-1.5 rounded-full hover:bg-graphite/5 transition">
                {i.l}
              </a>
            ))}
          </div>
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => setPreorderOpen(true)}
              className="text-[12px] sm:text-[13px] bg-graphite text-snow px-3 sm:px-4 py-2 rounded-full hover:bg-graphite/85 transition inline-flex items-center gap-1.5"
            >
              Заказать
              <Icon name="ArrowUpRight" size={13} />
            </button>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden w-9 h-9 rounded-full border border-graphite/15 flex items-center justify-center"
              aria-label="Меню"
            >
              <Icon name={menuOpen ? 'X' : 'Menu'} size={16} />
            </button>
          </div>
        </div>
        {menuOpen && (
          <div className="md:hidden mt-2 glass border border-graphite/10 rounded-3xl p-3 shadow-sm">
            {[
              { l: 'Полное меню', h: '/menu' },
              { l: 'События', h: '#events' },
              { l: 'Отзывы', h: '#reviews' },
              { l: 'Контакты', h: '#contacts' },
            ].map((i) => (
              <a
                key={i.h}
                href={i.h}
                onClick={() => setMenuOpen(false)}
                className="block px-4 py-3 text-[14px] rounded-2xl hover:bg-graphite/5 transition"
              >
                {i.l}
              </a>
            ))}
          </div>
        )}
      </nav>

      {/* HERO — единый блок */}
      <section className="relative pt-24 pb-12 sm:pt-28 sm:pb-14 lg:pt-32 lg:pb-16 overflow-hidden">
        <div className="absolute inset-0 gradient-mesh pointer-events-none" />

        <div className="container mx-auto relative">
          <div className="bento-card overflow-hidden bg-stone animate-scale-in opacity-0" style={{ animationDelay: '0.1s' }}>
            <div className="grid lg:grid-cols-2">
              {/* Фото Галины */}
              <div className="relative aspect-[4/5] sm:aspect-[16/10] lg:aspect-auto lg:min-h-[560px] overflow-hidden">
                <img
                  src={GALINA_IMG}
                  alt="Галина — фуршетный мастер"
                  className="absolute inset-0 w-full h-full object-cover object-top"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-graphite/70 via-graphite/10 to-transparent lg:bg-gradient-to-r lg:from-transparent lg:via-transparent lg:to-stone/30" />

                {/* Бейдж на фото */}
                <div className="absolute top-4 right-4 flex items-start justify-end">
                  <span className="glass-dark text-snow px-3 py-1.5 rounded-full text-[11px] border hairline-light flex items-center gap-1.5"></span>
                </div>
              </div>

              {/* Контент */}
              <div className="p-6 sm:p-8 lg:p-10 xl:p-14 flex flex-col justify-center">
                <div className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-ash mb-4 sm:mb-5 animate-reveal-blur opacity-0" style={{ animationDelay: '0.1s' }}>
                  <span className="w-6 h-px bg-ash" />
                  Фуршетный мастер · Краснодар
                </div>

                <h1 className="font-sans text-[clamp(2rem,8vw,5rem)] leading-[0.95] tracking-tightest font-medium text-balance text-graphite">
                  <span className="inline-block overflow-hidden align-bottom">
                    <span className="inline-block animate-reveal-up opacity-0" style={{ animationDelay: '0.2s' }}>
                      Гастробоксы,
                    </span>
                  </span>
                  <br />
                  <span className="inline-block overflow-hidden align-bottom">
                    <span className="inline-block animate-reveal-up opacity-0" style={{ animationDelay: '0.35s' }}>
                      в которые&nbsp;
                    </span>
                  </span>
                  <span className="inline-block overflow-hidden align-bottom">
                    <span className="inline-block font-serif italic font-normal animate-reveal-up opacity-0" style={{ animationDelay: '0.5s' }}>
                      влюбляются
                    </span>
                  </span>
                  <span className="inline-block ml-2 align-middle w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-accent2 animate-pulse-glow" />
                </h1>

                <p className="mt-5 sm:mt-6 text-[15px] sm:text-base lg:text-lg text-graphite/75 leading-relaxed max-w-md animate-reveal-blur opacity-0" style={{ animationDelay: '0.7s' }}>
                  Меня зовут <span className="font-semibold text-graphite">Галина</span> — собираю авторские гастробоксы и выездные фуршеты. От мини-сета для двоих до банкета на 100+ гостей. Красиво, вкусно и точно в срок.
                </p>

                <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row gap-2.5 sm:gap-3 animate-reveal-up opacity-0" style={{ animationDelay: '0.9s' }}>
                  <a
                    href="#menu"
                    className="group bg-graphite text-snow px-5 sm:px-6 py-3.5 rounded-full text-[14px] font-medium inline-flex items-center justify-center gap-2 hover:bg-graphite/85 transition"
                  >
                    Смотреть боксы
                    <span className="w-5 h-5 rounded-full bg-lime flex items-center justify-center group-hover:rotate-45 transition">
                      <Icon name="ArrowRight" size={11} className="text-graphite" />
                    </span>
                  </a>
                  <button
                    type="button"
                    onClick={() => setPreorderOpen(true)}
                    className="px-5 sm:px-6 py-3.5 rounded-full text-[14px] font-medium border border-graphite/20 bg-snow text-graphite hover:bg-graphite hover:text-snow hover:border-graphite transition inline-flex items-center justify-center gap-2"
                  >Оформить предзаказ</button>
                </div>

                {/* Mini-stats */}
                <div className="mt-7 sm:mt-9 pt-6 border-t border-graphite/10 grid grid-cols-3 gap-3 sm:gap-4 animate-reveal-up opacity-0" style={{ animationDelay: '1.1s' }}>
                  <div>
                    <div className="font-sans text-xl sm:text-2xl tracking-tighter font-medium">100+</div>
                    <div className="text-[11px] sm:text-[12px] text-ash mt-0.5">довольных гостей</div>
                  </div>
                  <div>
                    <div className="font-sans text-xl sm:text-2xl tracking-tighter font-medium">4.9 ★</div>
                    <div className="text-[11px] sm:text-[12px] text-ash mt-0.5">320+ отзывов</div>
                  </div>
                  <div>
                    <div className="font-sans text-xl sm:text-2xl tracking-tighter font-medium">15 мин</div>
                    <div className="text-[11px] sm:text-[12px] text-ash mt-0.5">отвечу лично</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* trust strip */}
          <div className="mt-3 grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3">
            {[
              { icon: 'Leaf', label: 'Всегда свежие продукты', bg: 'bg-lime/20', color: 'text-lime-700' },
              { icon: 'Truck', label: 'Доставка по краю', bg: 'bg-stone', color: 'text-graphite' },
              { icon: 'Clock', label: 'Ответ за 15 мин', bg: 'bg-stone', color: 'text-graphite' },
              { icon: 'ShieldCheck', label: 'Договор + чеки', bg: 'bg-stone', color: 'text-graphite' },
            ].map((t, i) => (
              <div key={i} className="bento-card p-4 sm:p-5 flex items-center gap-3">
                <div className={`w-8 h-8 sm:w-9 sm:h-9 rounded-full ${t.bg} flex items-center justify-center shrink-0`}>
                  <Icon name={t.icon} size={14} className={t.color} />
                </div>
                <span className="text-[13px] sm:text-[14px] font-medium leading-tight">{t.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MARQUEE */}
      <section className="py-6 sm:py-8 border-y border-graphite/10 bg-snow overflow-hidden">
        <div className="flex animate-marquee whitespace-nowrap">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="flex items-center gap-8 sm:gap-12 px-4 sm:px-6 text-xl sm:text-2xl lg:text-3xl font-medium tracking-tighter">
              <span>Свадьбы</span>
              <span className="text-lime">●</span>
              <span className="font-serif italic text-ash">Корпоративы</span>
              <span className="text-accent2">●</span>
              <span>Фуршеты</span>
              <span className="text-lime">●</span>
              <span className="font-serif italic text-ash">Кофе-брейки</span>
              <span className="text-accent2">●</span>
              <span>Банкеты</span>
              <span className="text-lime">●</span>
              <span className="font-serif italic text-ash">Дни рождения</span>
              <span className="text-accent2">●</span>
            </div>
          ))}
        </div>
      </section>

      <PreorderModal open={preorderOpen} onClose={() => setPreorderOpen(false)} />
    </>
  );
};

export default HeroSection;