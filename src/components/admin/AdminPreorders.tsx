import Icon from '@/components/ui/icon';
import { Preorder } from '@/lib/api';

const CONTACT_LABELS: Record<string, { l: string; icon: string }> = {
  phone: { l: 'Звонок', icon: 'Phone' },
  max: { l: 'Max', icon: 'MessageCircle' },
  telegram: { l: 'Telegram', icon: 'Send' },
  whatsapp: { l: 'WhatsApp', icon: 'MessageSquare' },
};

type Props = {
  preorders: Preorder[];
  newPreordersCount: number;
  loadPreorders: () => void;
  onChangeStatus: (id: number, status: string) => void;
  onDeletePreorder: (id: number) => void;
};

const AdminPreorders = ({
  preorders,
  newPreordersCount,
  loadPreorders,
  onChangeStatus,
  onDeletePreorder,
}: Props) => {
  return (
    <main className="container mx-auto py-5 sm:py-8 space-y-3">
      <div className="flex items-center justify-between gap-3 mb-4">
        <div className="min-w-0">
          <h1 className="font-sans text-2xl sm:text-3xl tracking-tightest font-medium">Заявки</h1>
          <p className="text-[12px] sm:text-[13px] text-ash mt-1">
            Всего: {preorders.length}{' '}
            {newPreordersCount > 0 && (
              <span className="text-accent2 font-medium">· новых: {newPreordersCount}</span>
            )}
          </p>
        </div>
        <button
          onClick={loadPreorders}
          className="shrink-0 w-9 h-9 sm:w-auto sm:h-auto sm:px-4 sm:py-2 rounded-full border border-graphite/15 hover:bg-graphite/5 transition inline-flex items-center justify-center gap-1.5 text-[13px]"
        >
          <Icon name="RefreshCw" size={13} /> <span className="hidden sm:inline">Обновить</span>
        </button>
      </div>

      {preorders.length === 0 ? (
        <div className="bento-card bg-snow p-12 text-center text-ash">
          <Icon name="Inbox" size={32} className="mx-auto mb-3 opacity-50" />
          Заявок пока нет
        </div>
      ) : (
        <div className="grid gap-3">
          {preorders.map((p) => (
            <div key={p.id} className={`bento-card bg-snow p-4 sm:p-6 ${p.status === 'new' ? 'ring-2 ring-lime/60' : ''}`}>
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 sm:gap-3 mb-3">
                <div className="min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="font-sans text-lg sm:text-xl tracking-tight font-medium break-words">{p.name}</h3>
                    {p.status === 'new' && (
                      <span className="text-[10px] uppercase tracking-wider bg-lime text-graphite px-2 py-0.5 rounded-full font-bold">
                        Новая
                      </span>
                    )}
                    {p.status === 'done' && (
                      <span className="text-[10px] uppercase tracking-wider bg-stone text-ash px-2 py-0.5 rounded-full">
                        Обработана
                      </span>
                    )}
                  </div>
                  <a href={`tel:${p.phone}`} className="text-[15px] sm:text-[14px] text-graphite/80 hover:text-graphite inline-flex items-center gap-1.5 mt-1">
                    <Icon name="Phone" size={12} /> {p.phone}
                  </a>
                  {p.contact_method && p.contact_method !== 'phone' && (
                    <span className="flex items-center gap-1 text-[11px] text-ash mt-1">
                      <Icon name={CONTACT_LABELS[p.contact_method]?.icon || 'MessageCircle'} size={11} />
                      предпочитает {CONTACT_LABELS[p.contact_method]?.l || p.contact_method}
                    </span>
                  )}
                </div>
                <div className="text-[11px] text-ash sm:text-right shrink-0">
                  {new Date(p.created_at).toLocaleString('ru-RU', { dateStyle: 'short', timeStyle: 'short' })}
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3 text-[13px] mb-3">
                {p.event_type && (
                  <div>
                    <div className="text-[11px] text-ash uppercase tracking-wider">Событие</div>
                    <div className="font-medium">{p.event_type}</div>
                  </div>
                )}
                {p.event_date && (
                  <div>
                    <div className="text-[11px] text-ash uppercase tracking-wider">Дата</div>
                    <div className="font-medium">{new Date(p.event_date).toLocaleDateString('ru-RU')}</div>
                  </div>
                )}
                {p.guests_count && (
                  <div>
                    <div className="text-[11px] text-ash uppercase tracking-wider">Гостей</div>
                    <div className="font-medium">{p.guests_count}</div>
                  </div>
                )}
                {p.budget && (
                  <div>
                    <div className="text-[11px] text-ash uppercase tracking-wider">Бюджет</div>
                    <div className="font-medium">{p.budget}</div>
                  </div>
                )}
              </div>

              {p.details && (
                <div className="text-[13px] text-graphite/80 bg-stone rounded-2xl p-3 mb-3 whitespace-pre-line">
                  {p.details}
                </div>
              )}

              <div className="flex flex-wrap gap-2 pt-2 border-t border-graphite/5">
                {p.status !== 'done' ? (
                  <button
                    onClick={() => onChangeStatus(p.id, 'done')}
                    className="px-3 py-2 sm:py-1.5 rounded-full text-[12px] bg-graphite text-snow hover:bg-graphite/85 transition inline-flex items-center gap-1.5"
                  >
                    <Icon name="Check" size={12} /> Обработана
                  </button>
                ) : (
                  <button
                    onClick={() => onChangeStatus(p.id, 'new')}
                    className="px-3 py-2 sm:py-1.5 rounded-full text-[12px] border border-graphite/15 hover:bg-graphite/5 transition inline-flex items-center gap-1.5"
                  >
                    <Icon name="RotateCcw" size={12} /> Вернуть в новые
                  </button>
                )}
                <a
                  href={`tel:${p.phone}`}
                  className="px-3 py-2 sm:py-1.5 rounded-full text-[12px] border border-graphite/15 hover:bg-graphite/5 transition inline-flex items-center gap-1.5"
                >
                  <Icon name="Phone" size={12} /> Позвонить
                </a>
                <button
                  onClick={() => onDeletePreorder(p.id)}
                  className="ml-auto w-9 h-9 sm:w-auto sm:h-auto sm:px-3 sm:py-1.5 rounded-full text-[12px] text-ash hover:text-accent2 transition inline-flex items-center justify-center gap-1.5"
                >
                  <Icon name="Trash2" size={13} /> <span className="hidden sm:inline">Удалить</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
};

export default AdminPreorders;