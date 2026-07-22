import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Icon from '@/components/ui/icon';
import Logo from '@/components/Logo';
import PreorderModal from '@/components/PreorderModal';
import { getEventById, events } from '@/data/events';

const EventPage = () => {
  const { id } = useParams<{ id: string }>();
  const event = id ? getEventById(id) : undefined;
  const [preorderOpen, setPreorderOpen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!event) {
    return (
      <div className="min-h-screen bg-snow text-graphite flex flex-col items-center justify-center px-6 text-center">
        <h1 className="font-sans text-4xl lg:text-5xl tracking-tightest font-medium">Событие не найдено</h1>
        <Link to="/#events" className="btn-shadow-sm mt-6 inline-flex items-center gap-2 bg-graphite text-snow px-5 py-3 rounded-full text-[14px] font-medium">
          <Icon name="ArrowLeft" size={15} />
          Все события
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-snow text-graphite">
      {/* NAV */}
      <nav className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-2rem)] max-w-5xl">
        <div className="glass border border-graphite/10 rounded-full px-3 py-2 flex items-center justify-between shadow-sm">
          <div className="pl-3">
            <Logo size="sm" to="/" />
          </div>
          <Link to="/#events" className="hidden md:inline-flex text-[13px] text-graphite/80 hover:text-graphite transition items-center gap-1.5">
            <Icon name="ArrowLeft" size={13} />
            Все события
          </Link>
          <button
            type="button"
            onClick={() => setPreorderOpen(true)}
            className="btn-shadow-sm text-[13px] bg-graphite text-snow px-4 py-2 rounded-full hover:bg-graphite/85 transition inline-flex items-center gap-1.5"
          >
            Заказать
            <Icon name="ArrowUpRight" size={13} />
          </button>
        </div>
      </nav>

      {/* HERO */}
      <section className="pt-28 lg:pt-32 pb-8 relative">
        <div className="container mx-auto">
          <Link to="/#events" className="inline-flex items-center gap-2 text-[13px] text-ash hover:text-graphite transition mb-6">
            <Icon name="ArrowLeft" size={14} />
            События
          </Link>

          <div className="grid grid-cols-12 gap-3 lg:gap-5 items-end">
            <div className="col-span-12 lg:col-span-7">
              <div className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-ash mb-4">
                <span className="w-6 h-px bg-ash" />
                {event.badge}
              </div>
              <h1 className="font-sans text-5xl lg:text-7xl xl:text-8xl tracking-tightest font-medium leading-[0.95] text-balance">
                {event.title}
              </h1>
              <p className="mt-5 lg:mt-7 text-lg lg:text-xl text-graphite/70 max-w-xl leading-relaxed">
                {event.subtitle}
              </p>
            </div>

            <div className="col-span-12 lg:col-span-5 grid grid-cols-3 gap-2">
              <div className="bento-card p-4 lg:p-5 bg-stone">
                <div className="text-[10px] uppercase tracking-[0.18em] text-ash">Цена</div>
                <div className="font-sans text-lg lg:text-xl tracking-tight font-medium mt-2">{event.price}</div>
              </div>
              <div className="bento-card p-4 lg:p-5 bg-stone">
                <div className="text-[10px] uppercase tracking-[0.18em] text-ash">Гости</div>
                <div className="font-sans text-lg lg:text-xl tracking-tight font-medium mt-2">{event.guests}</div>
              </div>
              <div className="bento-card p-4 lg:p-5 bg-stone">
                <div className="text-[10px] uppercase tracking-[0.18em] text-ash">Сервис</div>
                <div className="font-sans text-lg lg:text-xl tracking-tight font-medium mt-2">{event.duration}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* IMAGE */}
      <section className="pb-12">
        <div className="container mx-auto">
          <div className="bento-card aspect-[16/8] overflow-hidden relative">
            <img src={event.img} alt={event.title} className="absolute inset-0 w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-graphite/40 to-transparent" />
          </div>
        </div>
      </section>

      {/* CONTENT */}
      <section className="pb-24 lg:pb-32">
        <div className="container mx-auto">
          <div className="grid grid-cols-12 gap-3 lg:gap-5">
            {/* About */}
            <div className="col-span-12 lg:col-span-7 bento-card p-7 lg:p-10 xl:p-12">
              <div className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-ash mb-5">
                <span className="w-6 h-px bg-ash" />
                О формате
              </div>
              <p className="font-sans text-xl lg:text-2xl tracking-tight font-medium leading-snug text-balance">
                {event.description}
              </p>

              <div className="mt-10 pt-8 border-t border-graphite/10">
                <h3 className="font-sans text-2xl lg:text-3xl tracking-tightest font-medium mb-6">
                  Что <span className="font-serif italic font-normal">включено</span>
                </h3>
                <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-3">
                  {event.includes.map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-[14px] lg:text-[15px] text-graphite/85 leading-relaxed">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-lime shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Menu */}
            <div className="col-span-12 lg:col-span-5 bento-card p-7 lg:p-10 text-snow relative overflow-hidden">
              <img
                src={event.gallery.find((g) => g !== event.img) || event.img}
                alt=""
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-graphite/75 via-graphite/90 to-graphite" />

              <div className="relative">
                <div className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-snow/50 mb-5">
                  <span className="w-6 h-px bg-snow/30" />
                  Пример меню
                </div>
                <h3 className="font-sans text-2xl lg:text-3xl tracking-tightest font-medium mb-6">
                  Меню <span className="font-serif italic font-normal text-lime">от шефа</span>
                </h3>
                <ul className="space-y-4">
                  {event.menu.map((item, i) => (
                    <li key={i} className="flex gap-4 pb-4 border-b border-snow/10 last:border-0 last:pb-0">
                      <span className="text-[12px] text-lime font-mono mt-1 shrink-0">0{i + 1}</span>
                      <span className="text-[14px] lg:text-[15px] text-snow/90 leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>

                <button
                  type="button"
                  onClick={() => setPreorderOpen(true)}
                  className="btn-shadow-lime mt-8 w-full bg-lime text-graphite py-4 rounded-2xl font-semibold text-[14px] hover:bg-lime/90 transition flex items-center justify-center gap-2 group"
                >
                  Заказать {event.title.toLowerCase()}
                  <span className="w-5 h-5 rounded-full bg-graphite text-lime flex items-center justify-center group-hover:translate-x-1 transition">
                    <Icon name="ArrowRight" size={11} />
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* GALLERY */}
      <section className="pb-24 lg:pb-32 border-t border-graphite/10 pt-16 lg:pt-24">
        <div className="container mx-auto">
          <div className="flex items-end justify-between gap-4 mb-10">
            <div>
              <div className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-ash mb-4">
                <span className="w-6 h-px bg-ash" />
                Галерея
              </div>
              <h2 className="font-sans text-3xl lg:text-5xl tracking-tightest font-medium">
                С прошлых <span className="font-serif italic font-normal">мероприятий</span>
              </h2>
            </div>
            <div className="text-[13px] text-ash hidden md:block">{event.gallery.length} фото</div>
          </div>

          <div className="grid grid-cols-12 gap-3">
            {event.gallery.map((src, i) => {
              const layouts = [
                'col-span-12 md:col-span-8 aspect-[16/10]',
                'col-span-6 md:col-span-4 aspect-square',
                'col-span-6 md:col-span-4 aspect-square',
                'col-span-12 md:col-span-4 aspect-[4/3] md:aspect-square',
                'col-span-6 md:col-span-4 aspect-square',
                'col-span-6 md:col-span-4 aspect-square',
              ];
              return (
                <div key={i} className={`bento-card group relative ${layouts[i % layouts.length]} overflow-hidden`}>
                  <img
                    src={src}
                    alt={`${event.title} — фото ${i + 1}`}
                    loading="lazy"
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-[1200ms] ease-out"
                  />
                  <div className="absolute inset-0 bg-graphite/0 group-hover:bg-graphite/10 transition" />
                  <div className="absolute top-3 left-3 glass-dark text-snow text-[10px] uppercase tracking-wider px-2 py-1 rounded-full border hairline-light">
                    {String(i + 1).padStart(2, '0')} / {String(event.gallery.length).padStart(2, '0')}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* OTHER EVENTS */}
      <section className="pb-24 lg:pb-32 border-t border-graphite/10 pt-16 lg:pt-24">
        <div className="container mx-auto">
          <div className="flex items-end justify-between gap-4 mb-10">
            <div>
              <div className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-ash mb-4">
                <span className="w-6 h-px bg-ash" />
                Другие форматы
              </div>
              <h2 className="font-sans text-3xl lg:text-5xl tracking-tightest font-medium">
                Посмотрите <span className="font-serif italic font-normal">остальное</span>
              </h2>
            </div>
            <Link to="/#events" className="text-[13px] text-graphite/70 hover:text-graphite transition hidden md:inline-flex items-center gap-1.5">
              Все события
              <Icon name="ArrowUpRight" size={13} />
            </Link>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
            {events.filter((e) => e.id !== event.id).map((e) => (
              <Link key={e.id} to={`/events/${e.id}`} className="group bento-card aspect-[4/3] relative">
                <img src={e.img} alt={e.title} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-[1200ms] ease-out" />
                <div className="absolute inset-0 bg-gradient-to-t from-graphite/85 via-graphite/15 to-transparent" />
                <div className="absolute top-4 right-4">
                  <span className="glass-dark text-snow text-[11px] uppercase tracking-wider px-2.5 py-1 rounded-full border hairline-light">
                    {e.badge}
                  </span>
                </div>
                <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between text-snow">
                  <div>
                    <div className="font-sans text-xl lg:text-2xl tracking-tighter font-medium">{e.title}</div>
                    <div className="text-[12px] text-snow/70 mt-1">{e.price}</div>
                  </div>
                  <div className="w-9 h-9 rounded-full bg-lime text-graphite flex items-center justify-center opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all">
                    <Icon name="ArrowUpRight" size={14} />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-graphite/10 py-10">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-5 text-[13px] text-ash">
            <Logo size="md" to="/" />
            <div>© 2026 Кейтеринг в Краснодаре</div>
            <div className="flex gap-2">
              <a href="#" className="w-9 h-9 rounded-full border border-graphite/15 flex items-center justify-center hover:bg-graphite hover:text-snow transition">
                <Icon name="Instagram" size={14} />
              </a>
              <a href="#" className="w-9 h-9 rounded-full border border-graphite/15 flex items-center justify-center hover:bg-graphite hover:text-snow transition">
                <Icon name="Send" size={14} />
              </a>
            </div>
          </div>
        </div>
      </footer>

      <PreorderModal open={preorderOpen} onClose={() => setPreorderOpen(false)} />
    </div>
  );
};

export default EventPage;