import Icon from '@/components/ui/icon';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { useReveal } from '@/hooks/use-reveal';

const FAQ = [
  {
    q: 'За сколько дней нужно оформить заказ?',
    a: 'Оптимально — за 2-3 дня до мероприятия. Но для небольших боксов Галина часто успевает и в течение суток — просто уточните на этапе заявки.',
  },
  {
    q: 'Можно ли заказать на 1-2 персоны?',
    a: 'Да, есть мини-боксы для небольшой компании. Для банкетов на 100+ гостей меню собирается индивидуально.',
  },
  {
    q: 'Как происходит доставка?',
    a: 'Доставляем по Краснодару и краю точно к назначенному времени. Адрес и удобное время уточняются при оформлении заявки.',
  },
  {
    q: 'Можно ли изменить состав меню?',
    a: 'Конечно. Галина подберёт блюда под ваши пожелания, бюджет и особенности гостей (аллергии, вегетарианское меню и т.д.).',
  },
  {
    q: 'Как оплатить заказ?',
    a: 'Оплата картой или переводом после согласования финального меню и стоимости — никакой предоплаты вслепую.',
  },
];

const FaqSection = () => {
  const head = useReveal();

  return (
    <section id="faq" className="py-16 sm:py-24 lg:py-28 border-t border-graphite/10">
      <div className="container mx-auto">
        <div
          ref={head.ref as never}
          className={`max-w-2xl mb-10 sm:mb-14 transition-all duration-[1000ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
            head.visible ? 'opacity-100 translate-y-0 blur-0' : 'opacity-0 translate-y-8 blur-[6px]'
          }`}
        >
          <div className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-ash mb-4 sm:mb-5">
            <span className="w-6 h-px bg-ash" />
            Вопрос-ответ
          </div>
          <h2 className="font-sans text-[clamp(2rem,7vw,4.5rem)] leading-[0.95] tracking-tightest font-medium text-balance">
            Отвечаем на <span className="font-serif italic font-normal">частые</span> вопросы
          </h2>
        </div>

        <div className="max-w-3xl bento-card bg-snow p-4 sm:p-6">
          <Accordion type="single" collapsible className="w-full">
            {FAQ.map((item, i) => (
              <AccordionItem key={i} value={`item-${i}`} className="border-graphite/10">
                <AccordionTrigger className="text-left text-[15px] sm:text-[16px] font-medium hover:no-underline py-4 sm:py-5">
                  {item.q}
                </AccordionTrigger>
                <AccordionContent className="text-[14px] text-graphite/70 leading-relaxed">
                  {item.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        <div className="mt-6 flex items-center gap-2 text-[13px] text-ash">
          <Icon name="MessageCircleQuestion" size={15} />
          Не нашли ответ? Напишите Галине — она ответит за 15 минут.
        </div>
      </div>
    </section>
  );
};

export default FaqSection;
