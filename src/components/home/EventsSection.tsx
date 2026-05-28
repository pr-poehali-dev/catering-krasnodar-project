import { Link } from 'react-router-dom';
import Icon from '@/components/ui/icon';
import { events } from '@/data/events';
import { useReveal } from '@/hooks/use-reveal';

const EventsSection = () => {
  const head = useReveal();
  const grid = useReveal();

  return (
    <section id="events" className="py-16 sm:py-24 lg:py-32 relative">
      <div className="container mx-auto">
        <div
          ref={head.ref as never}
          className={`flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10 sm:mb-12 transition-all duration-[1000ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
            head.visible ? 'opacity-100 translate-y-0 blur-0' : 'opacity-0 translate-y-8 blur-[6px]'
          }`}
        >
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-ash mb-4 sm:mb-5">
              <span className="w-6 h-px bg-ash" />
              События
            </div>
            <h2 className="text-display text-[clamp(2.2rem,7.5vw,5.5rem)] font-medium text-balance">
              Каждому празднику —
              <span className="italic font-normal gradient-text"> свой характер</span>
            </h2>
          </div>
          <p className="text-graphite/70 max-w-sm text-[15px] leading-relaxed">
            Свадьба, корпоратив, фуршет или семейный праздник — соберём меню под формат, бюджет и настроение гостей.
          </p>
        </div>

        <div ref={grid.ref as never} className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {events.map((e, i) => (
            <Link
              key={e.id}
              to={`/events/${e.id}`}
              className="group bento-card aspect-[4/3] relative transition-all duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)]"
              style={{
                transitionDelay: `${i * 100}ms`,
                opacity: grid.visible ? 1 : 0,
                transform: grid.visible ? 'translateY(0)' : 'translateY(40px)',
              }}
            >
              <img src={e.img} alt={e.title} className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-[1500ms] ease-out" />
              <div className="absolute inset-0 bg-gradient-to-t from-graphite/90 via-graphite/30 to-graphite/10" />
              <div className="absolute top-4 right-4">
                <span className="glass-dark text-snow text-[11px] uppercase tracking-wider px-2.5 py-1 rounded-full border hairline-light">
                  {e.badge}
                </span>
              </div>
              <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between text-snow">
                <div>
                  <div className="font-sans text-2xl lg:text-3xl tracking-tighter font-medium">{e.title}</div>
                  <div className="text-[13px] text-snow/80 mt-1">{e.price}</div>
                </div>
                <div className="w-10 h-10 rounded-full bg-lime text-graphite flex items-center justify-center sm:opacity-0 sm:group-hover:opacity-100 sm:translate-y-2 sm:group-hover:translate-y-0 transition-all">
                  <Icon name="ArrowUpRight" size={16} />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EventsSection;