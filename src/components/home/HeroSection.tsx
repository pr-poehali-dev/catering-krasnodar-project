import { useState } from 'react';
import Icon from '@/components/ui/icon';
import Logo from '@/components/Logo';
import PreorderModal from '@/components/PreorderModal';

const HeroSection = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [preorderOpen, setPreorderOpen] = useState(false);

  return (
    <>
      {/* NAV — mobile: app-style full-width bar / desktop: floating pill */}
      <nav className="fixed top-0 inset-x-0 z-50 md:top-3 md:left-1/2 md:-translate-x-1/2 md:inset-x-auto md:w-[calc(100%-1.5rem)] md:max-w-5xl">
        <div
          className="glass border-b md:border border-graphite/10 md:rounded-full pl-3 pr-2 py-1.5 md:pl-2 md:pr-2 flex items-center justify-between md:shadow-sm safe-top"
        >
          <div className="pl-1 md:pl-2">
            <Logo size="sm" to="/" />
          </div>
          <div className="hidden md:flex items-center gap-1 text-[13px]">
            {[
              { l: 'Меню', h: '/menu' },
              { l: 'События', h: '#events' },
              { l: 'Как заказать', h: '#how-to-order' },
              { l: 'Отзывы', h: '#reviews' },
              { l: 'Вопрос-ответ', h: '#faq' },
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
              className="hidden md:inline-flex btn-shadow-sm text-[13px] bg-graphite text-snow px-4 py-2 rounded-full hover:bg-graphite/85 transition items-center gap-1.5"
            >
              Заказать
              <Icon name="ArrowUpRight" size={13} />
            </button>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="tap-scale md:hidden w-9 h-9 rounded-full bg-graphite/5 flex items-center justify-center"
              aria-label="Меню"
            >
              <Icon name={menuOpen ? 'X' : 'Menu'} size={17} />
            </button>
          </div>
        </div>
        {menuOpen && (
          <div className="md:hidden bg-snow border-b border-graphite/10 shadow-lg p-3 animate-in fade-in slide-in-from-top-2 duration-200">
            {[
              { l: 'Меню', h: '/menu', icon: 'UtensilsCrossed' },
              { l: 'События', h: '#events', icon: 'PartyPopper' },
              { l: 'Как заказать', h: '#how-to-order', icon: 'ClipboardList' },
              { l: 'Отзывы', h: '#reviews', icon: 'Star' },
              { l: 'Вопрос-ответ', h: '#faq', icon: 'MessageCircleQuestion' },
            ].map((i) => (
              <a
                key={i.h}
                href={i.h}
                onClick={() => setMenuOpen(false)}
                className="tap-scale flex items-center gap-3 px-3 py-3.5 text-[15px] font-medium rounded-2xl hover:bg-graphite/5 transition"
              >
                <span className="w-9 h-9 rounded-full bg-stone flex items-center justify-center shrink-0">
                  <Icon name={i.icon} size={16} />
                </span>
                {i.l}
              </a>
            ))}
          </div>
        )}
      </nav>

      {/* HERO — единый блок, sticker-collage стиль */}
      <section className="relative sm:pt-28 sm:pb-8 lg:pt-20 lg:pb-10 overflow-hidden pt-[56px] pb-[65px]">
        <div className="absolute inset-0 gradient-mesh pointer-events-none" />

        <div className="container mx-auto relative">
          <div className="animate-scale-in opacity-0" style={{ animationDelay: '0.1s' }}>
            <div className="bento-card overflow-hidden bg-stone">
              <div className="grid lg:grid-cols-2">
                {/* Контент */}
                <div className="order-2 lg:order-1 p-4 sm:p-6 lg:p-8 xl:p-10 flex flex-col justify-center relative">
                  <div className="inline-flex w-fit items-center gap-1.5 text-[9px] uppercase tracking-[0.2em] text-ash mb-2 sm:mb-4 px-2 py-0.5 rounded-full bg-stone animate-reveal-blur opacity-0" style={{ animationDelay: '0.1s' }}>
                    <span className="w-1.5 h-1.5 rounded-full bg-accent2" />
                    Фуршетный мастер · Краснодар
                  </div>

                  <h1 className="font-sans text-[clamp(1.6rem,6vw,3.5rem)] leading-[0.95] tracking-tightest font-medium text-balance text-graphite">
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

                  <p className="mt-2 sm:mt-4 text-[16px] sm:text-[19px] lg:text-[21px] text-graphite/75 leading-relaxed max-w-md animate-reveal-blur opacity-0 font-serif italic" style={{ animationDelay: '0.7s' }}>
                    Меня зовут <span className="font-semibold text-graphite">Галина</span> — собираю авторские гастробоксы и выездные фуршеты. От мини-сета для двоих до банкета на 100+ гостей. Красиво, вкусно и точно в срок.
                  </p>

                  <div className="mt-3 sm:mt-6 flex flex-col sm:flex-row gap-2 sm:gap-3 animate-reveal-up opacity-0" style={{ animationDelay: '0.9s' }}>
                    <a
                      href="#menu"
                      className="tap-scale btn-shadow group bg-graphite text-snow px-4 sm:px-5 py-2.5 sm:py-3 rounded-full text-[13px] sm:text-[14px] font-medium inline-flex items-center justify-center gap-2 hover:bg-graphite/85 transition"
                    >
                      Смотреть боксы
                      <span className="w-5 h-5 rounded-full bg-lime flex items-center justify-center group-hover:rotate-45 transition">
                        <Icon name="ArrowRight" size={11} className="text-graphite" />
                      </span>
                    </a>
                    <button
                      type="button"
                      onClick={() => setPreorderOpen(true)}
                      className="tap-scale btn-shadow-sm px-4 sm:px-5 py-2.5 sm:py-3 rounded-full text-[13px] sm:text-[14px] font-medium border border-graphite/20 bg-snow text-graphite hover:bg-graphite hover:text-snow hover:border-graphite transition inline-flex items-center justify-center gap-2"
                    >Оформить предзаказ</button>
                  </div>
                </div>

                {/* Фото + sticker-бейджи */}
                <div className="order-1 lg:order-2 relative aspect-[4/3] sm:aspect-[4/3] lg:aspect-auto lg:min-h-[620px] overflow-hidden p-3 sm:p-4">
                  <div className="relative w-full h-full rounded-[1.6rem] overflow-hidden">
                    <img
                      src="https://cdn.poehali.dev/projects/a8ae25f0-9542-4f49-bc05-8b8f1da19cee/bucket/f7c242c7-3207-4c6a-9901-daa28201b26c.jpg"
                      alt="Галина — фуршетный мастер"
                      className="absolute inset-0 w-full h-full object-cover object-top"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-graphite/70 via-graphite/10 to-transparent lg:bg-gradient-to-r lg:from-transparent lg:via-transparent lg:to-stone/30" />
                  </div>

                  {/* sticker: рейтинг */}
                  <div className="btn-shadow absolute top-6 right-6 sm:top-8 sm:right-8 bg-snow rounded-2xl px-3 py-2 flex items-center gap-1.5 rotate-[-4deg]">
                    <Icon name="Star" size={14} className="fill-lime text-lime" />
                    <span className="text-[13px] font-semibold text-graphite">4.9</span>
                  </div>

                </div>
              </div>
            </div>
          </div>

          {/* sticker-collage: мини-карточки */}
          <div className="mt-2 sm:mt-3 grid grid-cols-2 lg:grid-cols-4 gap-1.5 sm:gap-3">
            {[
              { icon: 'Leaf', label: 'Всегда свежие продукты', bg: 'bg-lime/20', color: 'text-lime-700', rotate: '-rotate-1' },
              { icon: 'Truck', label: 'Доставка по Краснодару', bg: 'bg-accent2/15', color: 'text-accent2', rotate: 'rotate-1' },
              { icon: 'Clock', label: 'Ответ за 15 мин', bg: 'bg-lime/20', color: 'text-lime-700', rotate: 'rotate-1' },
              { icon: 'ShieldCheck', label: 'Договор + чеки', bg: 'bg-accent2/15', color: 'text-accent2', rotate: '-rotate-1' },
            ].map((t, i) => (
              <div key={i} className={`bento-card p-2.5 sm:p-5 flex items-center gap-2 sm:gap-3 transition-transform hover:rotate-0 hover:scale-[1.02] ${t.rotate}`}>
                <div className={`w-7 h-7 sm:w-9 sm:h-9 rounded-full ${t.bg} flex items-center justify-center shrink-0`}>
                  <Icon name={t.icon} size={12} className={t.color} />
                </div>
                <span className="text-[11px] sm:text-[14px] font-medium leading-tight">{t.label}</span>
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