import { useEffect, useState } from 'react';
import Icon from '@/components/ui/icon';

const WEDDING_IMG = 'https://cdn.poehali.dev/projects/a8ae25f0-9542-4f49-bc05-8b8f1da19cee/files/a0c3eada-d236-47e1-ac30-78632794e646.jpg';

const HeroSection = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      {/* NAV */}
      <nav className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-2rem)] max-w-5xl">
        <div className="glass border border-graphite/10 rounded-full px-3 py-2 flex items-center justify-between shadow-sm">
          <a href="#" className="flex items-center gap-2 pl-3">
            <span className="w-7 h-7 rounded-full bg-graphite flex items-center justify-center">
              <Icon name="Package" size={14} className="text-lime" />
            </span>
            <span className="font-semibold tracking-[0.08em] text-[12px] lg:text-[13px] uppercase">Furshet in Box</span>
          </a>
          <div className="hidden md:flex items-center gap-1 text-[13px]">
            {[
              { l: 'Меню', h: '#menu' },
              { l: 'События', h: '#events' },
              { l: 'Отзывы', h: '#reviews' },
              { l: 'Контакты', h: '#contacts' },
            ].map((i) => (
              <a key={i.h} href={i.h} className="px-3 py-1.5 rounded-full hover:bg-graphite/5 transition">
                {i.l}
              </a>
            ))}
          </div>
          <a href="#contacts" className="text-[13px] bg-graphite text-snow px-4 py-2 rounded-full hover:bg-graphite/85 transition inline-flex items-center gap-1.5">
            Заказать
            <Icon name="ArrowUpRight" size={13} />
          </a>
        </div>
      </nav>

      {/* HERO */}
      <section className="relative pt-32 pb-12 lg:pt-40 overflow-hidden">
        <div className="absolute inset-0 gradient-mesh pointer-events-none" />
        <div className="absolute inset-0 grid-lines opacity-60 pointer-events-none" />

        <div className="container mx-auto relative">
          {/* BENTO GRID */}
          <div className="grid grid-cols-12 gap-3 animate-scale-in opacity-0" style={{ animationDelay: '0.2s' }}>
            {/* Big hero card */}
            <div className="col-span-12 lg:col-span-7 bento-card aspect-[16/10] lg:aspect-auto lg:row-span-2 group bg-stone relative">
              <div className="absolute inset-0 gradient-mesh" />
              <div
                className="absolute -top-20 -right-20 w-96 h-96 bg-lime/40 rounded-full blur-[100px]"
                style={{ transform: `translateY(${scrollY * 0.05}px)` }}
              />
              <div
                className="absolute -bottom-20 -left-20 w-80 h-80 bg-accent2/30 rounded-full blur-[100px]"
                style={{ transform: `translateY(${scrollY * -0.03}px)` }}
              />
              <div className="absolute inset-0 dotted-bg opacity-40" />

              <div className="absolute top-5 left-5 right-5 flex items-start justify-between">
                <div className="glass text-graphite px-3 py-1.5 rounded-full text-[12px] font-medium border border-graphite/10 inline-flex items-center gap-2">
                  <span className="relative flex w-2 h-2">
                    <span className="absolute inset-0 rounded-full bg-lime animate-ping opacity-75" />
                    <span className="relative w-2 h-2 rounded-full bg-lime" />
                  </span>
                  Принимаем заказы на лето 2026
                </div>
                <div className="glass text-graphite pl-1 pr-3 py-1 rounded-full text-[12px] border border-graphite/10 flex items-center gap-2">
                  <img
                    src="https://cdn.poehali.dev/projects/a8ae25f0-9542-4f49-bc05-8b8f1da19cee/bucket/36795b0f-4957-461e-ae4a-b8d8c106b9ed.jpg"
                    alt="Мастер Галина"
                    className="w-6 h-6 rounded-full object-cover ring-2 ring-snow"
                  />
                  Мастер Галина
                </div>
              </div>

              <div className="relative h-full flex flex-col justify-center items-center text-center px-6 lg:px-10 py-24 lg:py-32 xl:py-40">
                <h2 className="font-sans text-[clamp(2.25rem,7vw,8rem)] leading-[0.92] tracking-tightest font-medium text-balance text-graphite">
                  Гастробоксы,
                  <br />
                  которые <span className="font-serif italic font-normal">влюбляют</span>
                  <span className="inline-block ml-2 align-middle w-3 h-3 lg:w-4 lg:h-4 rounded-full bg-accent2 animate-pulse-glow" />
                </h2>

                <p className="mt-6 lg:mt-8 text-base lg:text-xl xl:text-2xl text-graphite/70 max-w-2xl leading-relaxed">
                  От мини-бокса для двоих до выездного фуршета на сотню персон. Красиво, вкусно, с заботой о каждой детали.
                </p>

                <div className="mt-8 lg:mt-10 flex flex-wrap items-center justify-center gap-3">
                  <a href="#menu" className="group bg-graphite text-snow px-6 lg:px-7 py-3.5 lg:py-4 rounded-full text-[14px] lg:text-[15px] font-medium inline-flex items-center gap-2 hover:bg-graphite/85 transition">
                    Смотреть боксы
                    <span className="w-5 h-5 rounded-full bg-lime flex items-center justify-center group-hover:rotate-45 transition">
                      <Icon name="ArrowRight" size={11} className="text-graphite" />
                    </span>
                  </a>
                  <a href="#contacts" className="px-6 lg:px-7 py-3.5 lg:py-4 rounded-full text-[14px] lg:text-[15px] font-medium border border-graphite/15 bg-snow/80 backdrop-blur hover:bg-graphite hover:text-snow hover:border-graphite transition">
                    Заказать фуршет
                  </a>
                </div>
              </div>
            </div>

            {/* Chef card */}
            <div className="col-span-12 lg:col-span-5 bento-card group relative overflow-hidden min-h-[280px] lg:min-h-0 bg-stone">
              <img
                src="https://cdn.poehali.dev/projects/a8ae25f0-9542-4f49-bc05-8b8f1da19cee/bucket/36795b0f-4957-461e-ae4a-b8d8c106b9ed.jpg"
                alt="Галина — фуршетный мастер"
                className="absolute inset-0 w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-[1200ms]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-graphite/90 via-graphite/20 to-transparent" />
              <div className="absolute inset-0 p-7 lg:p-9 xl:p-10 flex flex-col justify-between text-snow">
                <div className="flex items-start justify-between">
                  <span className="glass-dark px-3 py-1.5 rounded-full text-[11px] uppercase tracking-wider border hairline-light">
                    Фуршетный мастер
                  </span>
                  <span className="glass-dark px-3 py-1.5 rounded-full text-[11px] border hairline-light flex items-center gap-1.5">
                    <Icon name="Heart" size={12} className="text-lime fill-lime" />
                    Гастробоксы
                  </span>
                </div>
                <div>
                  <div className="font-sans text-3xl lg:text-4xl xl:text-5xl tracking-tightest font-medium leading-[1.05]">
                    Меня зовут<br />
                    <span className="font-serif italic font-normal text-lime">Галина</span>
                  </div>
                  <p className="text-[14px] lg:text-[15px] text-snow/85 mt-4 max-w-sm leading-relaxed">
                    Делаю красивые и вкусные гастробоксы на заказ — от мини-бокса для двоих до выездного фуршета на сотню персон.
                  </p>
                </div>
              </div>
            </div>

            {/* Menu preview card */}
            <a href="#menu" className="col-span-12 lg:col-span-5 bento-card group relative aspect-[16/9] lg:aspect-auto overflow-hidden min-h-[280px] lg:min-h-0">
              <img src={WEDDING_IMG} alt="Меню" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-[1200ms]" />
              <div className="absolute inset-0 bg-gradient-to-tr from-graphite/90 via-graphite/40 to-transparent" />
              <div className="absolute inset-0 p-7 lg:p-9 xl:p-10 flex flex-col justify-between text-snow">
                <div className="flex items-center justify-between">
                  <span className="glass-dark px-3 py-1.5 rounded-full text-[11px] uppercase tracking-wider border hairline-light">
                    Каталог
                  </span>
                  <span className="w-9 h-9 rounded-full bg-lime text-graphite flex items-center justify-center group-hover:rotate-45 transition">
                    <Icon name="ArrowUpRight" size={15} />
                  </span>
                </div>
                <div>
                  <div className="font-sans text-3xl lg:text-4xl xl:text-5xl tracking-tightest font-medium leading-[1.05]">
                    120+ блюд<br />
                    <span className="font-serif italic font-normal text-lime">от шефа</span>
                  </div>
                  <div className="text-[14px] text-snow/70 mt-3">Канапе · Тарталетки · Десерты · Горячее</div>
                </div>
              </div>
            </a>
          </div>

          {/* trust strip */}
          <div className="mt-3 grid grid-cols-2 lg:grid-cols-4 gap-3">
            {[
              { icon: 'Leaf', label: 'Локальные фермеры' },
              { icon: 'Truck', label: 'Доставка по краю' },
              { icon: 'Clock', label: 'Ответ за 15 мин' },
              { icon: 'ShieldCheck', label: 'Договор + чеки' },
            ].map((t, i) => (
              <div key={i} className="bento-card p-5 flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-stone flex items-center justify-center">
                  <Icon name={t.icon} size={16} />
                </div>
                <span className="text-[14px] font-medium">{t.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MARQUEE */}
      <section className="py-8 border-y border-graphite/10 bg-snow overflow-hidden">
        <div className="flex animate-marquee whitespace-nowrap">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="flex items-center gap-12 px-6 text-2xl lg:text-3xl font-medium tracking-tighter">
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
    </>
  );
};

export default HeroSection;