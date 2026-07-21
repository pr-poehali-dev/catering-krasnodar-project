import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import Icon from '@/components/ui/icon';
import { createPreorder } from '@/lib/api';

type Props = {
  open: boolean;
  onClose: () => void;
};

const EVENT_TYPES = ['Свадьба', 'День рождения', 'Корпоратив', 'Фуршет', 'Романтический ужин', 'Другое'];
const BUDGETS = ['до 20 тыс ₽', '20–50 тыс ₽', '50–100 тыс ₽', '100+ тыс ₽', 'Подскажите'];
const CONTACT_METHODS = [
  { v: 'phone', l: 'Звонок', icon: 'Phone' },
  { v: 'max', l: 'Max', icon: 'MessageCircle' },
  { v: 'telegram', l: 'Telegram', icon: 'Send' },
  { v: 'whatsapp', l: 'WhatsApp', icon: 'MessageSquare' },
];

const initialForm = {
  name: '',
  phone: '',
  event_type: '',
  event_date: '',
  guests_count: '',
  budget: '',
  details: '',
  contact_method: 'phone',
};

const PreorderModal = ({ open, onClose }: Props) => {
  const [form, setForm] = useState(initialForm);
  const [sending, setSending] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [open, onClose]);

  useEffect(() => {
    if (!open) {
      setTimeout(() => {
        setForm(initialForm);
        setDone(false);
      }, 300);
    }
  }, [open]);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.phone.trim()) {
      toast.error('Укажите имя и телефон');
      return;
    }
    setSending(true);
    try {
      await createPreorder({
        ...form,
        guests_count: form.guests_count ? Number(form.guests_count) : undefined,
      });
      setDone(true);
      toast.success('Заявка отправлена!');
    } catch (err) {
      toast.error((err as Error).message);
    } finally {
      setSending(false);
    }
  };

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-0 sm:p-4 animate-fade-in"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-graphite/70 backdrop-blur-md" />
      <div
        className="relative w-full max-w-2xl bg-snow rounded-t-3xl sm:rounded-3xl shadow-2xl max-h-[92vh] overflow-y-auto animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="sticky top-3 ml-auto mr-3 z-10 w-9 h-9 rounded-full bg-graphite/5 hover:bg-graphite/10 flex items-center justify-center transition float-right"
          aria-label="Закрыть"
        >
          <Icon name="X" size={16} />
        </button>

        {done ? (
          <div className="p-8 sm:p-12 text-center">
            <div className="w-16 h-16 rounded-full bg-lime mx-auto flex items-center justify-center mb-5">
              <Icon name="Check" size={28} className="text-graphite" />
            </div>
            <h3 className="font-sans text-2xl sm:text-3xl tracking-tightest font-medium mb-3">
              Заявка принята
            </h3>
            <p className="text-graphite/70 max-w-sm mx-auto leading-relaxed">
              Галина свяжется с вами в течение 15 минут, подберёт меню и рассчитает стоимость без обязательств.
            </p>
            <button
              onClick={onClose}
              className="mt-7 bg-graphite text-snow px-6 py-3 rounded-full text-[14px] font-medium hover:bg-graphite/90 transition"
            >
              Хорошо
            </button>
          </div>
        ) : (
          <form onSubmit={onSubmit} className="p-6 sm:p-10 pt-2 sm:pt-4">
            <div className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-ash mb-3">
              <span className="w-6 h-px bg-ash" />
              Предзаказ
            </div>
            <h2 className="font-sans text-3xl sm:text-4xl tracking-tightest font-medium leading-[1.05] mb-2">
              Расскажите о <span className="font-serif italic font-normal">торжестве</span>
            </h2>
            <p className="text-graphite/70 text-[14px] mb-6 sm:mb-7">
              Заполните форму — Галина свяжется за 15 минут и подберёт меню под бюджет.
            </p>

            {/* Блок: контакты */}
            <div className="rounded-3xl bg-stone/60 p-4 sm:p-5">
              <div className="text-[11px] uppercase tracking-[0.15em] text-ash font-medium mb-3 flex items-center gap-1.5">
                <Icon name="User" size={13} /> Ваши контакты
              </div>
              <div className="grid sm:grid-cols-2 gap-3">
                <div className="relative">
                  <Icon name="User" size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-ash" />
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="Ваше имя *"
                    className="w-full pl-11 pr-4 py-3.5 rounded-2xl bg-snow border border-graphite/10 focus:border-graphite focus:ring-2 focus:ring-graphite/5 outline-none text-[14px] transition"
                  />
                </div>
                <div className="relative">
                  <Icon name="Phone" size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-ash" />
                  <input
                    type="tel"
                    required
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    placeholder="+7 (___) ___-__-__ *"
                    className="w-full pl-11 pr-4 py-3.5 rounded-2xl bg-snow border border-graphite/10 focus:border-graphite focus:ring-2 focus:ring-graphite/5 outline-none text-[14px] transition"
                  />
                </div>
              </div>

              <div className="mt-4">
                <div className="text-[12px] text-graphite/70 mb-2">Как удобнее связаться</div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {CONTACT_METHODS.map((m) => (
                    <button
                      type="button"
                      key={m.v}
                      onClick={() => setForm({ ...form, contact_method: m.v })}
                      className={`px-3 py-2.5 rounded-xl text-[13px] border transition inline-flex items-center justify-center gap-1.5 ${
                        form.contact_method === m.v
                          ? 'bg-graphite text-snow border-graphite'
                          : 'bg-snow border-graphite/10 hover:border-graphite/30'
                      }`}
                    >
                      <Icon name={m.icon} size={13} />
                      {m.l}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Блок: событие */}
            <div className="rounded-3xl bg-stone/60 p-4 sm:p-5 mt-3">
              <div className="text-[11px] uppercase tracking-[0.15em] text-ash font-medium mb-3 flex items-center gap-1.5">
                <Icon name="PartyPopper" size={13} /> О торжестве
              </div>

              <div className="text-[12px] text-graphite/70 mb-2">Тип события</div>
              <div className="flex flex-wrap gap-2">
                {EVENT_TYPES.map((t) => (
                  <button
                    type="button"
                    key={t}
                    onClick={() => setForm({ ...form, event_type: t })}
                    className={`px-4 py-2 rounded-full text-[13px] border transition ${
                      form.event_type === t
                        ? 'bg-graphite text-snow border-graphite'
                        : 'bg-snow border-graphite/10 hover:border-graphite/30'
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>

              <div className="grid sm:grid-cols-2 gap-3 mt-4">
                <div className="relative">
                  <Icon name="Calendar" size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-ash pointer-events-none" />
                  <input
                    type="date"
                    value={form.event_date}
                    onChange={(e) => setForm({ ...form, event_date: e.target.value })}
                    className="w-full pl-11 pr-4 py-3.5 rounded-2xl bg-snow border border-graphite/10 focus:border-graphite focus:ring-2 focus:ring-graphite/5 outline-none text-[14px] transition"
                  />
                </div>
                <div className="relative">
                  <Icon name="Users" size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-ash" />
                  <input
                    type="number"
                    min={1}
                    value={form.guests_count}
                    onChange={(e) => setForm({ ...form, guests_count: e.target.value })}
                    placeholder="Количество гостей"
                    className="w-full pl-11 pr-4 py-3.5 rounded-2xl bg-snow border border-graphite/10 focus:border-graphite focus:ring-2 focus:ring-graphite/5 outline-none text-[14px] transition"
                  />
                </div>
              </div>

              <div className="mt-4">
                <div className="text-[12px] text-graphite/70 mb-2">Ориентировочный бюджет</div>
                <div className="flex flex-wrap gap-2">
                  {BUDGETS.map((b) => (
                    <button
                      type="button"
                      key={b}
                      onClick={() => setForm({ ...form, budget: b })}
                      className={`px-4 py-2 rounded-full text-[13px] border transition ${
                        form.budget === b
                          ? 'bg-lime text-graphite border-lime'
                          : 'bg-snow border-graphite/10 hover:border-graphite/30'
                      }`}
                    >
                      {b}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Блок: детали */}
            <div className="mt-3">
              <div className="relative">
                <Icon name="MessageSquareText" size={16} className="absolute left-4 top-4 text-ash" />
                <textarea
                  rows={3}
                  value={form.details}
                  onChange={(e) => setForm({ ...form, details: e.target.value })}
                  placeholder="Формат, локация, особые пожелания по меню…"
                  className="w-full pl-11 pr-4 py-3.5 rounded-2xl bg-stone/60 border border-transparent focus:border-graphite focus:bg-snow focus:ring-2 focus:ring-graphite/5 outline-none text-[14px] resize-none transition"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={sending}
              className="mt-5 w-full bg-graphite text-snow py-4 rounded-2xl font-semibold text-[14px] hover:bg-graphite/90 active:scale-[0.99] transition flex items-center justify-center gap-2 disabled:opacity-60"
            >
              {sending ? (
                <>
                  <Icon name="Loader" size={16} className="animate-spin" /> Отправляем…
                </>
              ) : (
                <>
                  Отправить заявку
                  <span className="w-5 h-5 rounded-full bg-lime text-graphite flex items-center justify-center">
                    <Icon name="ArrowRight" size={11} />
                  </span>
                </>
              )}
            </button>
            <p className="text-[11px] text-ash text-center mt-3">
              Нажимая кнопку, вы соглашаетесь с обработкой персональных данных.
            </p>
          </form>
        )}
      </div>
    </div>
  );
};

export default PreorderModal;