import { useEffect, useRef, useState } from 'react';
import Icon from '@/components/ui/icon';

const HERO_IMG = 'https://cdn.poehali.dev/projects/a8ae25f0-9542-4f49-bc05-8b8f1da19cee/files/b2163239-4ec3-4791-b1b8-87e0712ecd1f.jpg';
const WEDDING_IMG = 'https://cdn.poehali.dev/projects/a8ae25f0-9542-4f49-bc05-8b8f1da19cee/files/a0c3eada-d236-47e1-ac30-78632794e646.jpg';
const CORP_IMG = 'https://cdn.poehali.dev/projects/a8ae25f0-9542-4f49-bc05-8b8f1da19cee/files/a23a2735-2a81-4111-9781-c5416847d3e8.jpg';

const events = [
  { id: 'wedding', title: 'Свадьбы', subtitle: 'Изысканные банкеты', img: WEDDING_IMG },
  { id: 'corporate', title: 'Корпоративы', subtitle: 'Деловые мероприятия', img: CORP_IMG },
  { id: 'fourchette', title: 'Фуршеты', subtitle: 'Лёгкая подача', img: HERO_IMG },
  { id: 'birthday', title: 'Дни рождения', subtitle: 'Личные праздники', img: WEDDING_IMG },
];

const menuItems = [
  { name: 'Канапе с лососем', price: 180, category: 'Холодные закуски', img: HERO_IMG },
  { name: 'Тарталетки с икрой', price: 220, category: 'Премиум', img: HERO_IMG },
  { name: 'Брускетта с пармой', price: 160, category: 'Холодные закуски', img: HERO_IMG },
  { name: 'Мини-десерты', price: 140, category: 'Десерты', img: WEDDING_IMG },
  { name: 'Сырная тарелка', price: 380, category: 'Холодные закуски', img: CORP_IMG },
  { name: 'Шеф-салат', price: 290, category: 'Салаты', img: CORP_IMG },
];

const reviews = [
  { name: 'Анна Кузнецова', event: 'Свадьба, 80 гостей', text: 'Гости до сих пор спрашивают, где мы заказывали еду. Канапе исчезли за 15 минут.' },
  { name: 'Дмитрий Морозов', event: 'Корпоратив Газпром', text: 'Безупречная подача, вкус и сервис. Работали как часы — ни одной заминки за вечер.' },
  { name: 'Елена Соколова', event: 'День рождения', text: 'Заказывали фуршет на 30 человек. Красиво, вкусно, всё точно в срок. Рекомендую.' },
];

const Index = () => {
  const [scrollY, setScrollY] = useState(0);
  const heroImgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className="min-h-screen bg-snow text-graphite">
      {/* NAV */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass border-b hairline">
        <div className="container mx-auto flex items-center justify-between h-14">
          <a href="#" className="font-display text-xl tracking-tighter font-medium">
            ВКУС<span className="text-accent2">&</span>Co
          </a>
          <div className="hidden md:flex items-center gap-8 text-[13px] text-graphite/80">
            <a href="#menu" className="hover:text-graphite transition">Меню</a>
            <a href="#events" className="hover:text-graphite transition">События</a>
            <a href="#reviews" className="hover:text-graphite transition">Отзывы</a>
            <a href="#contacts" className="hover:text-graphite transition">Контакты</a>
          </div>
          <a href="#contacts" className="text-[13px] bg-graphite text-snow px-4 py-1.5 rounded-full hover:bg-graphite/90 transition">
            Заказать
          </a>
        </div>
      </nav>

      {/* HERO */}
      <section className="pt-32 pb-24 lg:pt-40 lg:pb-32">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 text-[13px] text-ash mb-8 animate-fade-in">
              <span className="w-1.5 h-1.5 rounded-full bg-accent2" />
              Кейтеринг в Краснодаре · с 2018 года
            </div>

            <h1 className="font-display text-[clamp(3rem,9vw,7.5rem)] leading-[0.95] tracking-tightest font-light text-balance animate-fade-up opacity-0">
              Гастрономия,
              <br />
              <span className="italic font-normal text-accent2">созданная</span>
              <br />
              для впечатлений.
            </h1>

            <p className="mt-8 text-lg lg:text-xl text-ash max-w-2xl mx-auto leading-relaxed animate-fade-up opacity-0" style={{ animationDelay: '0.15s' }}>
              Полный цикл выездного обслуживания: от продуманного меню
              до сервировки, которой восхищаются гости.
            </p>

            <div className="mt-10 flex flex-wrap items-center justify-center gap-3 animate-fade-up opacity-0" style={{ animationDelay: '0.3s' }}>
              <a href="#menu" className="group bg-graphite text-snow px-6 py-3 rounded-full text-[14px] font-medium inline-flex items-center gap-2 hover:bg-graphite/90 transition">
                Посмотреть меню
                <Icon name="ArrowRight" size={15} className="group-hover:translate-x-0.5 transition" />
              </a>
              <a href="#contacts" className="px-6 py-3 rounded-full text-[14px] font-medium text-graphite border hairline hover:bg-graphite hover:text-snow transition">
                Рассчитать стоимость
              </a>
            </div>
          </div>

          {/* hero image with parallax */}
          <div
            ref={heroImgRef}
            className="mt-20 lg:mt-28 relative max-w-6xl mx-auto animate-scale-in opacity-0"
            style={{ animationDelay: '0.4s' }}
          >
            <div className="relative aspect-[16/9] overflow-hidden rounded-[2rem] soft-shadow bg-stone">
              <img
                src={HERO_IMG}
                alt="Кейтеринг"
                className="absolute inset-0 w-full h-full object-cover"
                style={{ transform: `translateY(${scrollY * 0.08}px) scale(1.1)` }}
              />
            </div>

            {/* stats overlay */}
            <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 glass soft-shadow rounded-2xl px-6 py-4 hidden md:flex items-center gap-8 border hairline">
              <div className="text-center">
                <div className="font-display text-2xl tracking-tighter">500+</div>
                <div className="text-[11px] text-ash uppercase tracking-wider">мероприятий</div>
              </div>
              <div className="w-px h-8 bg-graphite/10" />
              <div className="text-center">
                <div className="font-display text-2xl tracking-tighter">4.9</div>
                <div className="text-[11px] text-ash uppercase tracking-wider">средний рейтинг</div>
              </div>
              <div className="w-px h-8 bg-graphite/10" />
              <div className="text-center">
                <div className="font-display text-2xl tracking-tighter">8 лет</div>
                <div className="text-[11px] text-ash uppercase tracking-wider">опыта</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PRINCIPLES */}
      <section className="py-24 lg:py-32 border-t hairline">
        <div className="container mx-auto">
          <div className="max-w-3xl mx-auto text-center mb-20">
            <div className="text-[12px] uppercase tracking-[0.2em] text-ash mb-4">Принципы</div>
            <h2 className="font-display text-5xl lg:text-6xl tracking-tighter font-light text-balance">
              Качество, которое
              <span className="italic text-accent2"> чувствуется</span>.
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-px bg-graphite/10 rounded-3xl overflow-hidden">
            {[
              { icon: 'Leaf', title: 'Свежие продукты', desc: 'Закупка в день мероприятия у локальных краснодарских фермеров.' },
              { icon: 'ChefHat', title: 'Шеф с 15-летним опытом', desc: 'Авторские блюда, отточенные в ресторанах высокой кухни.' },
              { icon: 'Sparkles', title: 'Премиальная сервировка', desc: 'Фарфор, лён, авторские композиции. Эстетика в каждой детали.' },
            ].map((f, i) => (
              <div key={i} className="bg-snow p-10 lg:p-12">
                <div className="w-10 h-10 rounded-full border hairline flex items-center justify-center mb-6">
                  <Icon name={f.icon} size={18} />
                </div>
                <h3 className="font-display text-2xl tracking-tighter mb-3">{f.title}</h3>
                <p className="text-ash leading-relaxed text-[15px]">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* EVENTS */}
      <section id="events" className="py-24 lg:py-32 border-t hairline">
        <div className="container mx-auto">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-16">
            <div>
              <div className="text-[12px] uppercase tracking-[0.2em] text-ash mb-4">События</div>
              <h2 className="font-display text-5xl lg:text-6xl tracking-tighter font-light text-balance max-w-2xl">
                Каждый формат —
                <span className="italic"> своё меню</span>.
              </h2>
            </div>
            <p className="text-ash max-w-sm text-[15px] leading-relaxed">
              Подбираем подачу под характер события, состав гостей и атмосферу.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {events.map((e) => (
              <a
                key={e.id}
                href="#menu"
                className="group block relative aspect-[3/4] rounded-2xl overflow-hidden bg-stone"
              >
                <img src={e.img} alt={e.title} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-[1200ms] ease-out" />
                <div className="absolute inset-0 bg-gradient-to-t from-graphite/80 via-graphite/10 to-transparent" />
                <div className="absolute inset-0 p-6 flex flex-col justify-end text-snow">
                  <div className="text-[12px] uppercase tracking-[0.2em] opacity-80 mb-1">{e.subtitle}</div>
                  <div className="font-display text-2xl tracking-tighter">{e.title}</div>
                  <div className="mt-3 inline-flex items-center gap-1.5 text-[13px] opacity-0 group-hover:opacity-100 -translate-y-1 group-hover:translate-y-0 transition-all duration-300">
                    Смотреть меню <Icon name="ArrowRight" size={13} />
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* MENU */}
      <section id="menu" className="py-24 lg:py-32 border-t hairline">
        <div className="container mx-auto">
          <div className="max-w-3xl mb-16">
            <div className="text-[12px] uppercase tracking-[0.2em] text-ash mb-4">Каталог</div>
            <h2 className="font-display text-5xl lg:text-6xl tracking-tighter font-light text-balance">
              Меню
              <span className="italic text-accent2"> от шефа</span>.
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {menuItems.map((item, i) => (
              <article key={i} className="group">
                <div className="aspect-[4/3] overflow-hidden rounded-2xl bg-stone mb-4 relative">
                  <img src={item.img} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[1000ms] ease-out" />
                </div>
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="text-[11px] uppercase tracking-[0.15em] text-ash mb-1">{item.category}</div>
                    <h3 className="font-display text-xl tracking-tighter leading-tight">{item.name}</h3>
                  </div>
                  <div className="font-display text-lg tracking-tighter whitespace-nowrap">
                    {item.price} ₽
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="text-center mt-16">
            <a href="#contacts" className="inline-flex items-center gap-2 text-[14px] font-medium border-b border-graphite/30 pb-1 hover:border-graphite transition">
              Открыть полное меню <Icon name="ArrowUpRight" size={15} />
            </a>
          </div>
        </div>
      </section>

      {/* REVIEWS */}
      <section id="reviews" className="py-24 lg:py-32 border-t hairline bg-stone">
        <div className="container mx-auto">
          <div className="max-w-3xl mb-16">
            <div className="text-[12px] uppercase tracking-[0.2em] text-ash mb-4">Отзывы</div>
            <h2 className="font-display text-5xl lg:text-6xl tracking-tighter font-light text-balance">
              Клиенты говорят
              <span className="italic"> искреннее</span>.
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-5">
            {reviews.map((r, i) => (
              <div key={i} className="bg-snow rounded-2xl p-8 soft-shadow flex flex-col">
                <div className="flex gap-0.5 mb-6">
                  {Array.from({ length: 5 }).map((_, j) => (
                    <Icon key={j} name="Star" size={14} className="fill-accent2 text-accent2" />
                  ))}
                </div>
                <p className="text-[15px] leading-relaxed text-graphite/90 flex-1">«{r.text}»</p>
                <div className="mt-6 pt-6 border-t hairline">
                  <div className="font-medium text-[15px]">{r.name}</div>
                  <div className="text-[13px] text-ash mt-0.5">{r.event}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACTS */}
      <section id="contacts" className="py-24 lg:py-32 border-t hairline">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">
            <div>
              <div className="text-[12px] uppercase tracking-[0.2em] text-ash mb-4">Контакты</div>
              <h2 className="font-display text-5xl lg:text-6xl tracking-tighter font-light text-balance mb-10">
                Давайте обсудим
                <span className="italic text-accent2"> ваш праздник</span>.
              </h2>

              <div className="space-y-8">
                <a href="tel:+78612000000" className="block group">
                  <div className="text-[12px] uppercase tracking-[0.2em] text-ash mb-2">Телефон</div>
                  <div className="font-display text-3xl tracking-tighter group-hover:text-accent2 transition">
                    +7 (861) 200-00-00
                  </div>
                </a>

                <a href="mailto:hi@vkus-co.ru" className="block group">
                  <div className="text-[12px] uppercase tracking-[0.2em] text-ash mb-2">Почта</div>
                  <div className="font-display text-3xl tracking-tighter group-hover:text-accent2 transition">
                    hi@vkus-co.ru
                  </div>
                </a>

                <div className="block">
                  <div className="text-[12px] uppercase tracking-[0.2em] text-ash mb-2">Адрес</div>
                  <div className="font-display text-2xl tracking-tighter">
                    Краснодар, ул. Красная, 100
                  </div>
                  <div className="text-[14px] text-ash mt-1">Каждый день 9:00 — 22:00</div>
                </div>
              </div>
            </div>

            <form className="bg-stone rounded-3xl p-8 lg:p-10">
              <h3 className="font-display text-3xl tracking-tighter mb-2">Заявка</h3>
              <p className="text-ash text-[14px] mb-8">Перезвоним за 15 минут и составим смету.</p>

              <div className="space-y-3">
                <input
                  type="text"
                  placeholder="Имя"
                  className="w-full px-5 py-4 rounded-xl bg-snow border hairline focus:border-graphite outline-none transition text-[15px]"
                />
                <input
                  type="tel"
                  placeholder="+7 (___) ___-__-__"
                  className="w-full px-5 py-4 rounded-xl bg-snow border hairline focus:border-graphite outline-none transition text-[15px]"
                />
                <select className="w-full px-5 py-4 rounded-xl bg-snow border hairline focus:border-graphite outline-none transition text-[15px] text-graphite/70">
                  <option>Тип события</option>
                  <option>Свадьба</option>
                  <option>Корпоратив</option>
                  <option>День рождения</option>
                  <option>Фуршет</option>
                </select>
                <textarea
                  rows={3}
                  placeholder="Дата, количество гостей, пожелания"
                  className="w-full px-5 py-4 rounded-xl bg-snow border hairline focus:border-graphite outline-none transition text-[15px] resize-none"
                />
                <button
                  type="submit"
                  className="w-full bg-graphite text-snow py-4 rounded-xl font-medium text-[15px] hover:bg-graphite/90 transition flex items-center justify-center gap-2"
                >
                  Отправить
                  <Icon name="ArrowRight" size={15} />
                </button>
                <p className="text-[11px] text-ash text-center pt-2">
                  Нажимая кнопку, вы соглашаетесь с обработкой персональных данных
                </p>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t hairline py-12">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-[13px] text-ash">
            <div className="font-display text-lg tracking-tighter text-graphite">
              ВКУС<span className="text-accent2">&</span>Co
            </div>
            <div>© 2026 Кейтеринг в Краснодаре</div>
            <div className="flex gap-5">
              <a href="#" className="hover:text-graphite transition"><Icon name="Instagram" size={16} /></a>
              <a href="#" className="hover:text-graphite transition"><Icon name="Send" size={16} /></a>
              <a href="#" className="hover:text-graphite transition"><Icon name="MessageCircle" size={16} /></a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
