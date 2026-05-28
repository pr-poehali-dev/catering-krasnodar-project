import { useEffect, useState } from 'react';
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

const menuItems = [
  { name: 'Канапе с лососем', price: 180, category: 'Закуски', img: HERO_IMG },
  { name: 'Тарталетки с икрой', price: 220, category: 'Премиум', img: HERO_IMG },
  { name: 'Брускетта с пармой', price: 160, category: 'Закуски', img: HERO_IMG },
  { name: 'Мини-десерты', price: 140, category: 'Десерты', img: WEDDING_IMG },
  { name: 'Сырная тарелка', price: 380, category: 'Закуски', img: CORP_IMG },
  { name: 'Шеф-салат', price: 290, category: 'Салаты', img: CORP_IMG },
];

const reviews = [
  { name: 'Анна К.', event: 'Свадьба · 80 гостей', text: 'Гости до сих пор спрашивают, где мы заказывали еду. Канапе исчезли за 15 минут.', avatar: 'А' },
  { name: 'Дмитрий М.', event: 'Корпоратив', text: 'Безупречная подача, вкус и сервис. Работали как часы — ни одной заминки за вечер.', avatar: 'Д' },
  { name: 'Елена С.', event: 'День рождения', text: 'Заказывали фуршет на 30 человек. Красиво, вкусно, всё точно в срок.', avatar: 'Е' },
];

const Index = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className="min-h-screen bg-snow text-graphite">
      {/* NAV */}
      <nav className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-2rem)] max-w-5xl">
        <div className="glass border border-graphite/10 rounded-full px-3 py-2 flex items-center justify-between shadow-sm">
          <a href="#" className="flex items-center gap-2 pl-3">
            <span className="w-7 h-7 rounded-full bg-graphite flex items-center justify-center">
              <span className="w-2 h-2 rounded-full bg-lime" />
            </span>
            <span className="font-semibold tracking-tight text-[15px]">vkus.co</span>
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
          <div className="max-w-5xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 text-[12px] font-medium bg-snow border border-graphite/10 px-3 py-1.5 rounded-full mb-8 animate-fade-in soft-shadow">
              <span className="relative flex w-2 h-2">
                <span className="absolute inset-0 rounded-full bg-lime animate-ping opacity-75" />
                <span className="relative w-2 h-2 rounded-full bg-lime" />
              </span>
              Принимаем заказы на лето 2026
              <Icon name="ArrowRight" size={12} />
            </div>

            <h1 className="font-sans text-[clamp(2.75rem,8.5vw,7rem)] leading-[0.95] tracking-tightest font-medium text-balance animate-fade-up opacity-0">
              Кейтеринг,
              <br />
              который <span className="font-serif italic font-normal">помнят</span>
              <span className="inline-block ml-2 align-middle w-3 h-3 rounded-full bg-accent2 animate-pulse-glow" />
            </h1>

            <p className="mt-6 text-base lg:text-lg text-ash max-w-xl mx-auto leading-relaxed animate-fade-up opacity-0" style={{ animationDelay: '0.15s' }}>
              Готовим и сервируем для свадеб, корпоративов и фуршетов в Краснодаре. Закрытый цикл — от меню до уборки.
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-2 animate-fade-up opacity-0" style={{ animationDelay: '0.3s' }}>
              <a href="#menu" className="group bg-graphite text-snow px-5 py-3 rounded-full text-[14px] font-medium inline-flex items-center gap-2 hover:bg-graphite/85 transition">
                Смотреть меню
                <span className="w-5 h-5 rounded-full bg-lime flex items-center justify-center group-hover:rotate-45 transition">
                  <Icon name="ArrowRight" size={11} className="text-graphite" />
                </span>
              </a>
              <a href="#contacts" className="px-5 py-3 rounded-full text-[14px] font-medium border border-graphite/15 bg-snow hover:bg-graphite hover:text-snow hover:border-graphite transition">
                Получить расчёт
              </a>
            </div>
          </div>

          {/* BENTO GRID */}
          <div className="mt-20 lg:mt-28 grid grid-cols-12 gap-3 animate-scale-in opacity-0" style={{ animationDelay: '0.4s' }}>
            {/* Big hero card */}
            <div className="col-span-12 lg:col-span-8 bento-card aspect-[16/10] lg:aspect-auto lg:row-span-2 group bg-stone relative">
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
                <div className="glass text-graphite px-3 py-1.5 rounded-full text-[12px] font-medium border border-graphite/10">Принимаем заказы на лето 2026</div>
                <div className="glass text-graphite px-3 py-1.5 rounded-full text-[12px] border border-graphite/10 flex items-center gap-1.5">
                  <Icon name="Sparkles" size={12} className="text-accent2" />
                  Шеф Иван Петров
                </div>
              </div>
            </div>

            {/* Stats card */}
            <div className="col-span-6 lg:col-span-4 bento-card p-6 lg:p-7 bg-graphite text-snow">
              <div className="flex items-center justify-between mb-4">
                <span className="text-[11px] uppercase tracking-[0.2em] text-snow/50">Опыт</span>
                <Icon name="TrendingUp" size={16} className="text-lime" />
              </div>
              <div className="font-sans text-5xl lg:text-6xl tracking-tighter font-medium">
                500<span className="text-lime">+</span>
              </div>
              <div className="text-snow/60 text-[14px] mt-2">мероприятий в Краснодаре</div>
              <div className="mt-6 pt-6 border-t border-snow/10 flex items-center gap-4">
                <div className="flex -space-x-2">
                  {['А', 'Д', 'Е', 'М'].map((l, i) => (
                    <div key={i} className="w-7 h-7 rounded-full bg-snow text-graphite text-[11px] font-semibold flex items-center justify-center border-2 border-graphite">
                      {l}
                    </div>
                  ))}
                </div>
                <div className="text-[12px] text-snow/60">320+ отзывов · 4.9 ★</div>
              </div>
            </div>

            {/* Lime CTA card */}
            <div className="col-span-6 lg:col-span-4 bento-card p-6 lg:p-7 bg-lime text-graphite group cursor-pointer relative">
              <div className="text-[11px] uppercase tracking-[0.2em] mb-3 text-graphite/60">Бесплатно</div>
              <div className="font-sans text-2xl lg:text-3xl tracking-tighter font-medium leading-tight">
                Дегустация для пары<br />перед свадьбой
              </div>
              <div className="mt-6 inline-flex items-center gap-2 text-[13px] font-medium">
                Записаться
                <span className="w-7 h-7 rounded-full bg-graphite text-lime flex items-center justify-center group-hover:translate-x-1 transition">
                  <Icon name="ArrowRight" size={13} />
                </span>
              </div>
              <Icon name="Wine" size={64} className="absolute -right-2 -bottom-2 text-graphite/10" />
            </div>
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

      {/* EVENTS */}
      <section id="events" className="py-24 lg:py-32 relative">
        <div className="container mx-auto">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-ash mb-5">
                <span className="w-6 h-px bg-ash" />
                События
              </div>
              <h2 className="font-sans text-4xl lg:text-6xl tracking-tightest font-medium text-balance">
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

      {/* MENU */}
      <section id="menu" className="py-24 lg:py-32 border-t border-graphite/10 relative">
        <div className="absolute inset-0 dotted-bg opacity-50 pointer-events-none" />
        <div className="container mx-auto relative">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-ash mb-5">
                <span className="w-6 h-px bg-ash" />
                Каталог
              </div>
              <h2 className="font-sans text-4xl lg:text-6xl tracking-tightest font-medium text-balance">
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

      {/* REVIEWS */}
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
              <h2 className="font-sans text-4xl lg:text-6xl tracking-tightest font-medium text-balance">
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

      {/* CONTACTS */}
      <section id="contacts" className="py-24 lg:py-32 relative">
        <div className="container mx-auto">
          <div className="grid grid-cols-12 gap-3">
            {/* Heading */}
            <div className="col-span-12 lg:col-span-7 bento-card p-8 lg:p-12 relative overflow-hidden">
              <div className="absolute -top-20 -right-20 w-64 h-64 bg-lime/40 rounded-full blur-[80px]" />
              <div className="relative">
                <div className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-ash mb-5">
                  <span className="w-6 h-px bg-ash" />
                  Контакты
                </div>
                <h2 className="font-sans text-4xl lg:text-6xl tracking-tightest font-medium text-balance">
                  Обсудим
                  <span className="font-serif italic font-normal"> ваш праздник</span>
                </h2>

                <div className="mt-10 space-y-5">
                  <a href="tel:+78612000000" className="group flex items-center gap-4">
                    <div className="w-11 h-11 rounded-full bg-stone group-hover:bg-lime transition flex items-center justify-center">
                      <Icon name="Phone" size={16} />
                    </div>
                    <div>
                      <div className="text-[12px] text-ash">Телефон · 9:00 — 22:00</div>
                      <div className="font-sans text-xl tracking-tight font-medium">+7 (861) 200-00-00</div>
                    </div>
                  </a>
                  <a href="mailto:hi@vkus-co.ru" className="group flex items-center gap-4">
                    <div className="w-11 h-11 rounded-full bg-stone group-hover:bg-lime transition flex items-center justify-center">
                      <Icon name="Mail" size={16} />
                    </div>
                    <div>
                      <div className="text-[12px] text-ash">Почта</div>
                      <div className="font-sans text-xl tracking-tight font-medium">hi@vkus-co.ru</div>
                    </div>
                  </a>
                  <div className="flex items-center gap-4">
                    <div className="w-11 h-11 rounded-full bg-stone flex items-center justify-center">
                      <Icon name="MapPin" size={16} />
                    </div>
                    <div>
                      <div className="text-[12px] text-ash">Офис и производство</div>
                      <div className="font-sans text-xl tracking-tight font-medium">Краснодар, ул. Красная, 100</div>
                    </div>
                  </div>
                </div>

                <div className="mt-10 flex flex-wrap gap-2">
                  {['Telegram', 'WhatsApp', 'Instagram'].map((s) => (
                    <a key={s} href="#" className="px-4 py-2 rounded-full border border-graphite/15 text-[13px] hover:bg-graphite hover:text-snow hover:border-graphite transition">
                      {s}
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Form */}
            <form className="col-span-12 lg:col-span-5 bento-card p-8 lg:p-10 bg-graphite text-snow">
              <h3 className="font-sans text-2xl tracking-tight font-medium">Оставить заявку</h3>
              <p className="text-snow/60 text-[13px] mt-1 mb-8">Перезвоним за 15 минут и составим смету</p>

              <div className="space-y-3">
                <input
                  type="text"
                  placeholder="Ваше имя"
                  className="w-full px-4 py-3.5 rounded-2xl bg-snow/5 border border-snow/10 focus:border-lime outline-none transition text-[14px] placeholder:text-snow/40"
                />
                <input
                  type="tel"
                  placeholder="+7 (___) ___-__-__"
                  className="w-full px-4 py-3.5 rounded-2xl bg-snow/5 border border-snow/10 focus:border-lime outline-none transition text-[14px] placeholder:text-snow/40"
                />
                <select className="w-full px-4 py-3.5 rounded-2xl bg-snow/5 border border-snow/10 focus:border-lime outline-none transition text-[14px] text-snow/60">
                  <option className="bg-graphite">Тип события</option>
                  <option className="bg-graphite">Свадьба</option>
                  <option className="bg-graphite">Корпоратив</option>
                  <option className="bg-graphite">День рождения</option>
                  <option className="bg-graphite">Фуршет</option>
                </select>
                <textarea
                  rows={3}
                  placeholder="Дата, количество гостей, пожелания"
                  className="w-full px-4 py-3.5 rounded-2xl bg-snow/5 border border-snow/10 focus:border-lime outline-none transition text-[14px] placeholder:text-snow/40 resize-none"
                />
                <button
                  type="submit"
                  className="w-full bg-lime text-graphite py-4 rounded-2xl font-semibold text-[14px] hover:bg-lime/90 transition flex items-center justify-center gap-2 group"
                >
                  Отправить заявку
                  <span className="w-5 h-5 rounded-full bg-graphite text-lime flex items-center justify-center group-hover:translate-x-1 transition">
                    <Icon name="ArrowRight" size={11} />
                  </span>
                </button>
                <p className="text-[11px] text-snow/40 text-center pt-2">
                  Соглашаюсь с обработкой персональных данных
                </p>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-graphite/10 py-10">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-5 text-[13px] text-ash">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-graphite flex items-center justify-center">
                <span className="w-1.5 h-1.5 rounded-full bg-lime" />
              </span>
              <span className="font-semibold text-graphite">vkus.co</span>
            </div>
            <div>© 2026 Кейтеринг в Краснодаре</div>
            <div className="flex gap-2">
              <a href="#" className="w-9 h-9 rounded-full border border-graphite/15 flex items-center justify-center hover:bg-graphite hover:text-snow transition">
                <Icon name="Instagram" size={14} />
              </a>
              <a href="#" className="w-9 h-9 rounded-full border border-graphite/15 flex items-center justify-center hover:bg-graphite hover:text-snow transition">
                <Icon name="Send" size={14} />
              </a>
              <a href="#" className="w-9 h-9 rounded-full border border-graphite/15 flex items-center justify-center hover:bg-graphite hover:text-snow transition">
                <Icon name="MessageCircle" size={14} />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;