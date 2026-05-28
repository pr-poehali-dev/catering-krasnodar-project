import Icon from '@/components/ui/icon';

const ContactsSection = () => {
  return (
    <>
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
                <h2 className="font-sans text-4xl lg:text-6xl xl:text-7xl tracking-tightest font-medium text-balance">
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
                  {['Telegram', 'WhatsApp', 'Instagram'].map((s) => (
                    <a key={s} href="#" className="px-4 py-2 rounded-full border border-graphite/15 text-[13px] hover:bg-graphite hover:text-snow hover:border-graphite transition">
                      {s}
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Form */}
            <form className="col-span-12 lg:col-span-5 bento-card p-8 lg:p-10 bg-graphite text-snow relative overflow-hidden">
              <img
                src="https://cdn.poehali.dev/projects/a8ae25f0-9542-4f49-bc05-8b8f1da19cee/bucket/617331e0-b90e-4775-ac89-e642cf275811.jpg"
                alt="Галина"
                className="absolute inset-0 w-full h-full object-cover object-top opacity-40"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-graphite/40 via-graphite/80 to-graphite" />

              <div className="relative">
                <h3 className="font-sans text-2xl tracking-tight font-medium">Оставить заявку</h3>
                <p className="text-snow/70 text-[13px] mt-1 mb-8">Галина перезвонит за 15 минут и составит смету</p>

                <div className="space-y-3">
                  <input
                    type="text"
                    placeholder="Ваше имя"
                    className="w-full px-4 py-3.5 rounded-2xl bg-snow/10 backdrop-blur border border-snow/15 focus:border-lime outline-none transition text-[14px] placeholder:text-snow/50"
                  />
                  <input
                    type="tel"
                    placeholder="+7 (___) ___-__-__"
                    className="w-full px-4 py-3.5 rounded-2xl bg-snow/10 backdrop-blur border border-snow/15 focus:border-lime outline-none transition text-[14px] placeholder:text-snow/50"
                  />
                  <select className="w-full px-4 py-3.5 rounded-2xl bg-snow/10 backdrop-blur border border-snow/15 focus:border-lime outline-none transition text-[14px] text-snow/70">
                    <option className="bg-graphite">Тип события</option>
                    <option className="bg-graphite">Свадьба</option>
                    <option className="bg-graphite">Корпоратив</option>
                    <option className="bg-graphite">День рождения</option>
                    <option className="bg-graphite">Фуршет</option>
                  </select>
                  <textarea
                    rows={3}
                    placeholder="Дата, количество гостей, пожелания"
                    className="w-full px-4 py-3.5 rounded-2xl bg-snow/10 backdrop-blur border border-snow/15 focus:border-lime outline-none transition text-[14px] placeholder:text-snow/50 resize-none"
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
                  <p className="text-[11px] text-snow/50 text-center pt-2">
                    Соглашаюсь с обработкой персональных данных
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
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-graphite flex items-center justify-center">
                <Icon name="Package" size={12} className="text-lime" />
              </span>
              <span className="font-semibold text-graphite tracking-[0.08em] uppercase text-[12px]">Furshet in Box</span>
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
    </>
  );
};

export default ContactsSection;