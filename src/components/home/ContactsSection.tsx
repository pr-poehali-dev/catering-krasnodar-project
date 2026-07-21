import Icon from '@/components/ui/icon';
import Logo from '@/components/Logo';
import { useReveal } from '@/hooks/use-reveal';

const MAX_LINK = '#';
const INSTAGRAM_LINK = '#';

const ContactsSection = () => {
  const head = useReveal();

  return (
    <>
      {/* CONTACTS */}
      <section id="contacts" className="py-16 sm:py-24 lg:py-32 relative">
        <div className="container mx-auto">
          <div
            ref={head.ref as never}
            className={`grid grid-cols-12 gap-3 transition-all duration-[1000ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
              head.visible ? 'opacity-100 translate-y-0 blur-0' : 'opacity-0 translate-y-8 blur-[6px]'
            }`}
          >
            {/* Heading */}
            <div className="col-span-12 bento-card p-6 sm:p-8 lg:p-12 relative overflow-hidden">
              <div className="absolute -top-20 -right-20 w-64 h-64 bg-lime/40 rounded-full blur-[80px] animate-float-y" />
              <div className="relative">
                <div className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-ash mb-4 sm:mb-5">
                  <span className="w-6 h-px bg-ash" />
                  Свяжитесь со мной
                </div>
                <h2 className="font-sans text-[clamp(2rem,7vw,5rem)] leading-[0.95] tracking-tightest font-medium text-balance">
                  Обсудим
                  <span className="font-serif italic font-normal"> ваше торжество</span>
                </h2>

                <div className="mt-10 space-y-5">
                  <a href="tel:+78612000000" className="group flex items-center gap-4">
                    <div className="w-11 h-11 rounded-full bg-stone group-hover:bg-lime transition flex items-center justify-center">
                      <Icon name="Phone" size={16} />
                    </div>
                    <div>
                      <div className="text-[12px] text-ash">Телефон · 9:00 — 22:00</div>
                      <div className="font-sans text-xl tracking-tight font-medium">+7 (914) 482-15-55</div>
                    </div>
                  </a>
                  <a href={MAX_LINK} target="_blank" rel="noopener noreferrer" className="group flex items-center gap-4">
                    <div className="w-11 h-11 rounded-full bg-stone group-hover:bg-lime transition flex items-center justify-center">
                      <Icon name="MessageCircle" size={16} />
                    </div>
                    <div>
                      <div className="text-[12px] text-ash">Max</div>
                      <div className="font-sans text-xl tracking-tight font-medium">Написать в мессенджер</div>
                    </div>
                  </a>
                  <a href={INSTAGRAM_LINK} target="_blank" rel="noopener noreferrer" className="group flex items-center gap-4">
                    <div className="w-11 h-11 rounded-full bg-stone group-hover:bg-lime transition flex items-center justify-center">
                      <Icon name="Instagram" size={16} />
                    </div>
                    <div>
                      <div className="text-[12px] text-ash">Instagram</div>
                      <div className="font-sans text-xl tracking-tight font-medium">Смотреть профиль</div>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-graphite/10 py-10">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-5 text-[13px] text-ash">
            <Logo size="md" to="/" showTagline />
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
    </>
  );
};

export default ContactsSection;