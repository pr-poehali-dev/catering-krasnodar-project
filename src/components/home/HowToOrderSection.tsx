import { useState } from 'react';
import Icon from '@/components/ui/icon';
import PreorderModal from '@/components/PreorderModal';
import { useReveal } from '@/hooks/use-reveal';

const STEPS = [
  {
    icon: 'ClipboardList',
    title: 'Выберите боксы',
    text: 'Посмотрите каталог или напишите Галине — подберём меню под ваш повод и бюджет.',
  },
  {
    icon: 'MessageCircleMore',
    title: 'Оставьте заявку',
    text: 'Заполните форму или напишите в WhatsApp/Telegram — укажите дату, число гостей и пожелания.',
  },
  {
    icon: 'CalendarCheck2',
    title: 'Согласуем детали',
    text: 'Галина свяжется за 15 минут, уточнит детали и посчитает точную стоимость без обязательств.',
  },
  {
    icon: 'Truck',
    title: 'Получите заказ',
    text: 'Приготовим и доставим свежие боксы точно к нужному времени — красиво и вовремя.',
  },
];

const HowToOrderSection = () => {
  const [preorderOpen, setPreorderOpen] = useState(false);
  const head = useReveal();

  return (
    <section id="how-to-order" className="py-16 sm:py-24 lg:py-28 border-t border-graphite/10 bg-stone/40">
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
              Как заказать
            </div>
            <h2 className="font-sans text-[clamp(2rem,7vw,4.5rem)] leading-[0.95] tracking-tightest font-medium text-balance">
              Заказать <span className="font-serif italic font-normal">просто</span>
            </h2>
            <p className="mt-4 sm:mt-5 text-graphite/70 max-w-lg text-[15px] leading-relaxed">
              От заявки до вкусного стола — четыре понятных шага, никакой бюрократии.
            </p>
          </div>
          <div className="hidden lg:block w-full max-w-[220px] shrink-0">
            <img
              src="https://cdn.poehali.dev/projects/a8ae25f0-9542-4f49-bc05-8b8f1da19cee/files/262c536e-2bf0-47fd-ab38-43e8b8be34be.jpg"
              alt="Иллюстрация оформления заказа"
              className="w-full h-auto rounded-3xl"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {STEPS.map((s, i) => (
            <div key={s.title} className="bento-card bg-snow p-5 sm:p-6 relative">
              <div className="flex items-center justify-between mb-4">
                <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-lime/25 flex items-center justify-center">
                  <Icon name={s.icon} size={20} className="text-graphite" />
                </div>
                <span className="font-serif italic text-3xl sm:text-4xl text-graphite/15 leading-none">
                  {String(i + 1).padStart(2, '0')}
                </span>
              </div>
              <h3 className="font-sans text-[16px] sm:text-[17px] font-medium tracking-tight mb-1.5">
                {s.title}
              </h3>
              <p className="text-[13px] sm:text-[14px] text-graphite/70 leading-relaxed">{s.text}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-center gap-3 text-center">
          <button
            type="button"
            onClick={() => setPreorderOpen(true)}
            className="w-full sm:w-auto bg-graphite text-snow px-6 py-3.5 rounded-full text-[15px] sm:text-[14px] font-semibold hover:bg-graphite/85 active:scale-[0.99] transition inline-flex items-center justify-center gap-2"
          >
            Оформить предзаказ
            <span className="w-5 h-5 rounded-full bg-lime flex items-center justify-center">
              <Icon name="ArrowRight" size={11} className="text-graphite" />
            </span>
          </button>
          <button
            type="button"
            onClick={() => setPreorderOpen(true)}
            className="w-full sm:w-auto px-6 py-3.5 rounded-full text-[15px] sm:text-[14px] font-medium border border-graphite/20 bg-snow text-graphite hover:bg-graphite hover:text-snow hover:border-graphite transition inline-flex items-center justify-center gap-2"
          >
            Задать вопрос
          </button>
        </div>

        <div className="mt-10 sm:mt-12 flex items-center justify-center gap-3">
          <img
            src="https://cdn.poehali.dev/projects/a8ae25f0-9542-4f49-bc05-8b8f1da19cee/bucket/617331e0-b90e-4775-ac89-e642cf275811.jpg"
            alt="Галина"
            className="w-11 h-11 rounded-full object-cover object-top ring-2 ring-lime/40"
          />
          <div>
            <div className="font-serif italic text-[15px] leading-tight">«Жду вашу заявку🤍»</div>
            <div className="text-[11px] text-ash mt-1 uppercase tracking-[0.15em]">Галина · фуршетный мастер</div>
          </div>
        </div>
      </div>

      <PreorderModal open={preorderOpen} onClose={() => setPreorderOpen(false)} />
    </section>
  );
};

export default HowToOrderSection;