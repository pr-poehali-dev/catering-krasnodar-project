import { useEffect, useState } from 'react';
import Icon from '@/components/ui/icon';

const HERO_IMG = 'https://cdn.poehali.dev/projects/a8ae25f0-9542-4f49-bc05-8b8f1da19cee/files/b2163239-4ec3-4791-b1b8-87e0712ecd1f.jpg';
const WEDDING_IMG = 'https://cdn.poehali.dev/projects/a8ae25f0-9542-4f49-bc05-8b8f1da19cee/files/a0c3eada-d236-47e1-ac30-78632794e646.jpg';
const CORP_IMG = 'https://cdn.poehali.dev/projects/a8ae25f0-9542-4f49-bc05-8b8f1da19cee/files/a23a2735-2a81-4111-9781-c5416847d3e8.jpg';

const events = [
  { id: 'wedding', title: 'Свадьбы', emoji: '💍', img: WEDDING_IMG, color: 'bg-coral' },
  { id: 'corporate', title: 'Корпоративы', emoji: '🥂', img: CORP_IMG, color: 'bg-mustard' },
  { id: 'fourchette', title: 'Фуршеты', emoji: '🍤', img: HERO_IMG, color: 'bg-ink' },
  { id: 'birthday', title: 'Дни рождения', emoji: '🎂', img: WEDDING_IMG, color: 'bg-coral-light' },
];

const menuItems = [
  { name: 'Канапе с лососем', price: '180₽', tag: 'Хит', img: HERO_IMG },
  { name: 'Тарталетки с икрой', price: '220₽', tag: 'Премиум', img: HERO_IMG },
  { name: 'Брускетта с пармой', price: '160₽', tag: 'Новинка', img: HERO_IMG },
  { name: 'Мини-десерты', price: '140₽', tag: 'Любимое', img: WEDDING_IMG },
  { name: 'Сырная тарелка', price: '380₽', tag: 'Хит', img: CORP_IMG },
  { name: 'Шеф-салат', price: '290₽', tag: 'Сезонное', img: CORP_IMG },
];

const reviews = [
  { name: 'Анна К.', event: 'Свадьба на 80 гостей', text: 'Гости до сих пор спрашивают, где мы заказывали еду! Канапе исчезли за 15 минут.', rating: 5 },
  { name: 'Дмитрий М.', event: 'Корпоратив Газпром', text: 'Безупречная подача, вкус и сервис. Работали как часы — ни одной заминки за вечер.', rating: 5 },
  { name: 'Елена С.', event: 'День рождения', text: 'Заказывали фуршет на 30 человек. Красиво, вкусно, всё точно в срок. Рекомендую!', rating: 5 },
];

const Index = () => {
  const [activeEvent, setActiveEvent] = useState('wedding');
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className="min-h-screen bg-cream text-ink overflow-x-hidden noise">
      {/* NAV */}
      <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-cream/70 border-b border-ink/10">
        <div className="container mx-auto flex items-center justify-between py-4">
          <a href="#" className="flex items-center gap-2 font-display font-black text-xl tracking-tight">
            <span className="w-9 h-9 rounded-full bg-coral text-cream flex items-center justify-center text-lg">●</span>
            ВКУС&Co
          </a>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium">
            <a href="#menu" className="hover:text-coral transition">Меню</a>
            <a href="#events" className="hover:text-coral transition">События</a>
            <a href="#reviews" className="hover:text-coral transition">Отзывы</a>
            <a href="#contacts" className="hover:text-coral transition">Контакты</a>
          </div>
          <a href="#contacts" className="bg-ink text-cream px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-coral transition-all hover:scale-105">
            Заказать
          </a>
        </div>
      </nav>

      {/* HERO */}
      <section className="relative pt-32 pb-20 min-h-screen flex items-center grid-bg overflow-hidden">
        {/* floating blobs */}
        <div className="absolute top-32 right-10 w-80 h-80 bg-coral/20 animate-blob animate-float-slow blur-2xl" />
        <div className="absolute bottom-20 left-10 w-64 h-64 bg-mustard/30 animate-blob animate-float blur-2xl" style={{ animationDelay: '2s' }} />

        <div className="container mx-auto relative z-10">
          <div className="grid lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-8">
              <div className="inline-flex items-center gap-2 bg-ink/5 border border-ink/10 px-4 py-2 rounded-full text-sm font-medium animate-fade-up">
                <span className="w-2 h-2 rounded-full bg-coral animate-pulse" />
                Кейтеринг №1 в Краснодаре
              </div>

              <h1 className="font-display font-black text-[12vw] lg:text-[7.5rem] leading-[0.9] tracking-tight animate-fade-up" style={{ animationDelay: '0.1s', opacity: 0 }}>
                Еда, которая
                <br />
                <span className="text-coral italic font-handwriting font-bold text-[14vw] lg:text-[9rem]">влюбляет</span>
                <br />
                с первой ложки
              </h1>

              <p className="text-lg lg:text-xl text-ink/70 max-w-xl leading-relaxed animate-fade-up" style={{ animationDelay: '0.3s', opacity: 0 }}>
                Свадьбы, корпоративы, фуршеты. Готовим, сервируем и заботимся
                о ваших гостях так, будто это наш собственный праздник.
              </p>

              <div className="flex flex-wrap gap-4 animate-fade-up" style={{ animationDelay: '0.5s', opacity: 0 }}>
                <a href="#menu" className="group bg-coral text-cream px-7 py-4 rounded-full font-semibold inline-flex items-center gap-2 hover:bg-ink transition-all hover:scale-105">
                  Посмотреть меню
                  <Icon name="ArrowRight" size={18} className="group-hover:translate-x-1 transition" />
                </a>
                <a href="#contacts" className="border-2 border-ink text-ink px-7 py-4 rounded-full font-semibold inline-flex items-center gap-2 hover:bg-ink hover:text-cream transition">
                  Рассчитать стоимость
                </a>
              </div>

              <div className="flex flex-wrap gap-8 pt-6 animate-fade-up" style={{ animationDelay: '0.7s', opacity: 0 }}>
                <div>
                  <div className="font-display font-black text-3xl">500+</div>
                  <div className="text-sm text-ink/60">мероприятий</div>
                </div>
                <div className="w-px bg-ink/20" />
                <div>
                  <div className="font-display font-black text-3xl">8 лет</div>
                  <div className="text-sm text-ink/60">на рынке</div>
                </div>
                <div className="w-px bg-ink/20" />
                <div>
                  <div className="font-display font-black text-3xl">4.9★</div>
                  <div className="text-sm text-ink/60">средний рейтинг</div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 relative animate-scale-in" style={{ animationDelay: '0.4s', opacity: 0 }}>
              <div
                className="relative aspect-[4/5] rounded-[3rem] overflow-hidden shadow-2xl"
                style={{ transform: `translateY(${scrollY * -0.1}px) rotate(${2 - scrollY * 0.01}deg)` }}
              >
                <img src={HERO_IMG} alt="Кейтеринг" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/40 to-transparent" />
              </div>

              {/* floating cards */}
              <div className="absolute -top-6 -left-6 bg-cream border-2 border-ink rounded-2xl px-4 py-3 shadow-xl animate-float">
                <div className="text-xs text-ink/60">сегодня заказали</div>
                <div className="font-display font-bold text-lg">+24 банкета</div>
              </div>

              <div className="absolute -bottom-8 -right-4 bg-mustard rounded-2xl p-4 shadow-xl animate-float-slow rotate-6">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">⭐</span>
                  <div>
                    <div className="font-display font-bold">4.9 / 5</div>
                    <div className="text-xs">320+ отзывов</div>
                  </div>
                </div>
              </div>

              <div className="absolute top-1/2 -right-8 w-16 h-16 bg-coral rounded-full flex items-center justify-center animate-spin-slow">
                <span className="font-handwriting text-cream text-xl rotate-12">new</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MARQUEE */}
      <section className="bg-ink text-cream py-6 overflow-hidden border-y border-ink">
        <div className="flex animate-marquee whitespace-nowrap">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="flex items-center gap-12 px-6 font-display font-bold text-2xl">
              <span>СВАДЬБЫ</span><span className="text-coral">✦</span>
              <span>КОРПОРАТИВЫ</span><span className="text-coral">✦</span>
              <span>ФУРШЕТЫ</span><span className="text-coral">✦</span>
              <span>ДНИ РОЖДЕНИЯ</span><span className="text-coral">✦</span>
              <span>ВЫЕЗДНЫЕ БАНКЕТЫ</span><span className="text-coral">✦</span>
              <span>КОФЕ-БРЕЙКИ</span><span className="text-coral">✦</span>
            </div>
          ))}
        </div>
      </section>

      {/* EVENTS */}
      <section id="events" className="py-24 bg-cream-dark relative">
        <div className="container mx-auto">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-16">
            <div>
              <div className="font-handwriting text-coral text-3xl mb-2">меню под событие</div>
              <h2 className="font-display font-black text-5xl lg:text-7xl tracking-tight max-w-2xl">
                Каждый праздник — особенный
              </h2>
            </div>
            <p className="text-ink/70 max-w-md text-lg">
              Подбираем меню под формат события, количество гостей и ваш бюджет.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {events.map((e, i) => (
              <button
                key={e.id}
                onClick={() => setActiveEvent(e.id)}
                className={`group relative aspect-[3/4] rounded-3xl overflow-hidden text-left transition-all duration-500 ${
                  activeEvent === e.id ? 'scale-105 shadow-2xl' : 'hover:scale-[1.02]'
                }`}
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <img src={e.img} alt={e.title} className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className={`absolute inset-0 ${e.color} mix-blend-multiply opacity-80 group-hover:opacity-60 transition`} />
                <div className="absolute inset-0 p-6 flex flex-col justify-between text-cream">
                  <div className="text-5xl">{e.emoji}</div>
                  <div>
                    <div className="font-display font-black text-2xl">{e.title}</div>
                    <div className="flex items-center gap-1 mt-2 text-sm opacity-90">
                      Смотреть меню <Icon name="ArrowRight" size={14} />
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* MENU */}
      <section id="menu" className="py-24 relative">
        <div className="absolute top-20 right-0 w-72 h-72 bg-coral/10 rounded-full blur-3xl" />
        <div className="container mx-auto relative">
          <div className="text-center mb-16">
            <div className="font-handwriting text-coral text-3xl mb-2">наша гордость</div>
            <h2 className="font-display font-black text-5xl lg:text-7xl tracking-tight">
              Каталог <span className="italic text-coral">блюд</span>
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {menuItems.map((item, i) => (
              <article key={i} className="group bg-card rounded-3xl overflow-hidden border border-ink/10 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
                <div className="aspect-[4/3] overflow-hidden bg-cream-dark relative">
                  <img src={item.img} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute top-4 left-4 bg-cream text-ink text-xs font-semibold px-3 py-1.5 rounded-full">
                    {item.tag}
                  </div>
                </div>
                <div className="p-6 flex items-center justify-between">
                  <div>
                    <h3 className="font-display font-bold text-lg leading-tight">{item.name}</h3>
                    <p className="text-sm text-ink/60 mt-1">за порцию</p>
                  </div>
                  <div className="text-right">
                    <div className="font-display font-black text-2xl text-coral">{item.price}</div>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="text-center mt-12">
            <a href="#contacts" className="inline-flex items-center gap-2 bg-ink text-cream px-7 py-4 rounded-full font-semibold hover:bg-coral transition-all hover:scale-105">
              Заказать дегустацию <Icon name="Sparkles" size={18} />
            </a>
          </div>
        </div>
      </section>

      {/* REVIEWS */}
      <section id="reviews" className="py-24 bg-ink text-cream relative overflow-hidden">
        <div className="absolute -top-20 -left-20 w-96 h-96 bg-coral/20 rounded-full blur-3xl animate-float-slow" />
        <div className="container mx-auto relative">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-16">
            <div>
              <div className="font-handwriting text-mustard text-3xl mb-2">что говорят клиенты</div>
              <h2 className="font-display font-black text-5xl lg:text-7xl tracking-tight">
                Отзывы, которым
                <br />
                <span className="text-coral italic">мы верим</span>
              </h2>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {reviews.map((r, i) => (
              <div key={i} className="bg-cream/5 backdrop-blur border border-cream/10 rounded-3xl p-7 hover:bg-cream/10 transition-all hover:-translate-y-2">
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: r.rating }).map((_, j) => (
                    <span key={j} className="text-mustard text-xl">★</span>
                  ))}
                </div>
                <p className="text-lg leading-relaxed mb-6">«{r.text}»</p>
                <div className="flex items-center gap-3 pt-4 border-t border-cream/10">
                  <div className="w-11 h-11 rounded-full bg-coral flex items-center justify-center font-display font-bold">
                    {r.name[0]}
                  </div>
                  <div>
                    <div className="font-semibold">{r.name}</div>
                    <div className="text-sm text-cream/60">{r.event}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACTS */}
      <section id="contacts" className="py-24 bg-coral text-cream relative overflow-hidden">
        <div className="absolute top-10 right-10 w-40 h-40 border-4 border-cream/30 rounded-full animate-spin-slow" />
        <div className="absolute bottom-10 left-10 text-9xl animate-float-slow opacity-20">🍽️</div>

        <div className="container mx-auto relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="font-handwriting text-cream/80 text-3xl mb-2">давайте знакомиться</div>
              <h2 className="font-display font-black text-5xl lg:text-7xl tracking-tight mb-8">
                Готовы устроить
                <br />
                <span className="italic">праздник?</span>
              </h2>

              <div className="space-y-5 text-lg">
                <a href="tel:+78612000000" className="flex items-center gap-4 group">
                  <span className="w-12 h-12 rounded-full bg-cream/20 flex items-center justify-center group-hover:bg-cream group-hover:text-coral transition">
                    <Icon name="Phone" size={20} />
                  </span>
                  <div>
                    <div className="text-cream/70 text-sm">Звоните каждый день 9:00–22:00</div>
                    <div className="font-display font-bold text-2xl">+7 (861) 200-00-00</div>
                  </div>
                </a>

                <a href="mailto:hi@vkus-co.ru" className="flex items-center gap-4 group">
                  <span className="w-12 h-12 rounded-full bg-cream/20 flex items-center justify-center group-hover:bg-cream group-hover:text-coral transition">
                    <Icon name="Mail" size={20} />
                  </span>
                  <div>
                    <div className="text-cream/70 text-sm">Пишите письма с ТЗ и пожеланиями</div>
                    <div className="font-display font-bold text-xl">hi@vkus-co.ru</div>
                  </div>
                </a>

                <div className="flex items-center gap-4">
                  <span className="w-12 h-12 rounded-full bg-cream/20 flex items-center justify-center">
                    <Icon name="MapPin" size={20} />
                  </span>
                  <div>
                    <div className="text-cream/70 text-sm">Производство и офис</div>
                    <div className="font-display font-bold text-xl">Краснодар, ул. Красная, 100</div>
                  </div>
                </div>
              </div>
            </div>

            <form className="bg-cream text-ink rounded-3xl p-8 lg:p-10 shadow-2xl">
              <h3 className="font-display font-black text-3xl mb-2">Оставить заявку</h3>
              <p className="text-ink/60 mb-6">Перезвоним за 15 минут и рассчитаем смету.</p>

              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Ваше имя"
                  className="w-full px-5 py-4 rounded-2xl bg-cream-dark border-2 border-transparent focus:border-coral outline-none transition font-medium"
                />
                <input
                  type="tel"
                  placeholder="+7 (___) ___-__-__"
                  className="w-full px-5 py-4 rounded-2xl bg-cream-dark border-2 border-transparent focus:border-coral outline-none transition font-medium"
                />
                <select className="w-full px-5 py-4 rounded-2xl bg-cream-dark border-2 border-transparent focus:border-coral outline-none transition font-medium">
                  <option>Тип события</option>
                  <option>Свадьба</option>
                  <option>Корпоратив</option>
                  <option>День рождения</option>
                  <option>Фуршет</option>
                </select>
                <textarea
                  rows={3}
                  placeholder="Дата, количество гостей, пожелания..."
                  className="w-full px-5 py-4 rounded-2xl bg-cream-dark border-2 border-transparent focus:border-coral outline-none transition font-medium resize-none"
                />
                <button
                  type="submit"
                  className="w-full bg-ink text-cream py-4 rounded-2xl font-display font-bold text-lg hover:bg-coral transition-all hover:scale-[1.02] flex items-center justify-center gap-2"
                >
                  Отправить заявку
                  <Icon name="Send" size={18} />
                </button>
                <p className="text-xs text-ink/50 text-center">
                  Нажимая кнопку, вы соглашаетесь с обработкой персональных данных
                </p>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-ink text-cream/70 py-10">
        <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-sm">
          <div className="flex items-center gap-2 font-display font-black text-cream text-lg">
            <span className="w-7 h-7 rounded-full bg-coral flex items-center justify-center text-xs">●</span>
            ВКУС&Co
          </div>
          <div>© 2026 Кейтеринг в Краснодаре. Все права защищены.</div>
          <div className="flex gap-4">
            <a href="#" className="hover:text-coral transition"><Icon name="Instagram" size={20} /></a>
            <a href="#" className="hover:text-coral transition"><Icon name="Send" size={20} /></a>
            <a href="#" className="hover:text-coral transition"><Icon name="MessageCircle" size={20} /></a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
