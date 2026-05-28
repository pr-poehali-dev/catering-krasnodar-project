import { useState } from 'react';
import Icon from '@/components/ui/icon';
import Logo from '@/components/Logo';
import { useReveal } from '@/hooks/use-reveal';

const MAX_PHONE = '79144821555';
const MAX_LINK = 'https://max.ru/join/IXMk3u0BPhokEDCdyrtOZn591m-jXLVNcrU02S-hkxo';
const VK_LINK = 'https://vk.com/write/galina.cherepanova';

const ContactsSection = () => {
  const head = useReveal();
  const [form, setForm] = useState({ name: '', phone: '', type: '', details: '' });

  const buildText = () =>
    [
      'Здравствуйте, Галина! Заявка с сайта:',
      form.name && `Имя: ${form.name}`,
      form.phone && `Телефон: ${form.phone}`,
      form.type && `Событие: ${form.type}`,
      form.details && `Детали: ${form.details}`,
    ]
      .filter(Boolean)
      .join('\n');

  const copyText = async () => {
    try {
      await navigator.clipboard.writeText(buildText());
    } catch {
      /* пользователь сможет вписать вручную */
    }
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await copyText();
    window.open(MAX_LINK, '_blank', 'noopener,noreferrer');
  };

  const onSendVK = async () => {
    await copyText();
    window.open(VK_LINK, '_blank', 'noopener,noreferrer');
  };

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
            <div className="col-span-12 lg:col-span-7 bento-card p-6 sm:p-8 lg:p-12 relative overflow-hidden">
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
                  <a
                    href={MAX_LINK}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 rounded-full bg-graphite text-snow border border-graphite text-[13px] hover:bg-lime hover:text-graphite hover:border-lime transition inline-flex items-center gap-1.5"
                  >
                    <span className="w-4 h-4 rounded-sm bg-lime text-graphite text-[9px] font-bold flex items-center justify-center">M</span>
                    MAX
                  </a>
                  <a href={`https://wa.me/${MAX_PHONE}`} target="_blank" rel="noopener noreferrer" className="px-4 py-2 rounded-full border border-graphite/15 text-[13px] hover:bg-graphite hover:text-snow hover:border-graphite transition">
                    WhatsApp
                  </a>
                  <a href="https://t.me/+79144821555" target="_blank" rel="noopener noreferrer" className="px-4 py-2 rounded-full border border-graphite/15 text-[13px] hover:bg-graphite hover:text-snow hover:border-graphite transition">
                    Telegram
                  </a>
                  <a href="https://vk.com/foodinboxvrn" target="_blank" rel="noopener noreferrer" className="px-4 py-2 rounded-full border border-graphite/15 text-[13px] hover:bg-graphite hover:text-snow hover:border-graphite transition">
                    ВКонтакте
                  </a>
                </div>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={onSubmit} className="col-span-12 lg:col-span-5 bento-card p-8 lg:p-10 bg-graphite text-snow relative overflow-hidden">
              <img
                src="https://cdn.poehali.dev/projects/a8ae25f0-9542-4f49-bc05-8b8f1da19cee/bucket/8023e15d-f418-4b05-9642-8982b7773886.jpg"
                alt="Фуршет"
                className="absolute inset-0 w-full h-full object-cover opacity-50"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-graphite/60 via-graphite/85 to-graphite" />

              <div className="relative">
                <h3 className="font-sans text-2xl tracking-tight font-medium">Расскажите о празднике</h3>
                <p className="text-snow/70 text-[13px] mt-1 mb-7 sm:mb-8 leading-relaxed">Галина свяжется за 15 минут — подберём меню и предложим стоимость без обязательств</p>

                <div className="space-y-3">
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="Ваше имя"
                    className="w-full px-4 py-3.5 rounded-2xl bg-snow/10 backdrop-blur border border-snow/15 focus:border-lime outline-none transition text-[14px] placeholder:text-snow/50"
                  />
                  <input
                    type="tel"
                    required
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    placeholder="+7 (___) ___-__-__"
                    className="w-full px-4 py-3.5 rounded-2xl bg-snow/10 backdrop-blur border border-snow/15 focus:border-lime outline-none transition text-[14px] placeholder:text-snow/50"
                  />
                  <select
                    value={form.type}
                    onChange={(e) => setForm({ ...form, type: e.target.value })}
                    className="w-full px-4 py-3.5 rounded-2xl bg-snow/10 backdrop-blur border border-snow/15 focus:border-lime outline-none transition text-[14px] text-snow/70"
                  >
                    <option className="bg-graphite" value="">Тип события</option>
                    <option className="bg-graphite">Свадьба</option>
                    <option className="bg-graphite">Корпоратив</option>
                    <option className="bg-graphite">День рождения</option>
                    <option className="bg-graphite">Фуршет</option>
                  </select>
                  <textarea
                    rows={3}
                    value={form.details}
                    onChange={(e) => setForm({ ...form, details: e.target.value })}
                    placeholder="Дата, количество гостей, пожелания"
                    className="w-full px-4 py-3.5 rounded-2xl bg-snow/10 backdrop-blur border border-snow/15 focus:border-lime outline-none transition text-[14px] placeholder:text-snow/50 resize-none"
                  />
                  <div className="grid grid-cols-2 gap-1.5 rounded-none py-1 my-1 mx-[11px] px-32">
                    <button
                      type="submit"
                      className="bg-lime text-graphite py-2 rounded-xl font-semibold text-[11px] hover:bg-lime/90 transition flex items-center justify-center gap-1 group"
                    >
                      <span className="w-3 h-3 rounded-sm bg-graphite text-lime text-[8px] font-bold flex items-center justify-center">M</span>
                      <span className="hidden sm:inline">Отправить в</span> MAX
                      <span className="w-3 h-3 rounded-full bg-graphite text-lime flex items-center justify-center group-hover:translate-x-0.5 transition">
                        <Icon name="ArrowRight" size={7} />
                      </span>
                    </button>
                    <button
                      type="button"
                      onClick={onSendVK}
                      className="bg-[#0077FF] text-snow py-2 rounded-xl font-semibold text-[11px] hover:bg-[#0077FF]/90 transition flex items-center justify-center gap-1 group"
                    >
                      <Icon name="Send" size={9} />
                      <span className="hidden sm:inline">Написать во</span> ВКонтакте
                      <span className="w-3 h-3 rounded-full bg-snow text-[#0077FF] flex items-center justify-center group-hover:translate-x-0.5 transition">
                        <Icon name="ArrowRight" size={7} />
                      </span>
                    </button>
                  </div>
                  <p className="text-[11px] text-snow/50 text-center pt-2">
                    Откроется чат в MAX или ВК. Текст заявки скопирован — просто вставьте его в сообщение
                  </p>
                </div>

                <div className="mt-7 pt-6 border-t border-snow/10 flex items-center gap-3">
                  <img
                    src="https://cdn.poehali.dev/projects/a8ae25f0-9542-4f49-bc05-8b8f1da19cee/bucket/617331e0-b90e-4775-ac89-e642cf275811.jpg"
                    alt="Галина"
                    className="w-11 h-11 rounded-full object-cover object-top ring-2 ring-lime/40"
                  />
                  <div className="flex-1">
                    <div className="font-serif italic text-[15px] leading-tight">«Жду вашу заявку 🤍»</div>
                    <div className="text-[11px] text-snow/60 mt-1 uppercase tracking-[0.15em]">Галина · фуршетный мастер</div>
                  </div>
                </div>
              </div>
            </form>
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