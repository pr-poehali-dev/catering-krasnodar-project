import Icon from '@/components/ui/icon';
import { Preorder } from '@/lib/api';

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
    <main className="container mx-auto py-8 space-y-3">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 className="font-sans text-3xl tracking-tightest font-medium">Заявки на предзаказ</h1>
          <p className="text-[13px] text-ash mt-1">
            Всего: {preorders.length}{' '}
            {newPreordersCount > 0 && (
              <span className="text-accent2 font-medium">· новых: {newPreordersCount}</span>
            )}
          </p>
        </div>
        <button
          onClick={loadPreorders}
          className="px-4 py-2 rounded-full text-[13px] border border-graphite/15 hover:bg-graphite/5 transition inline-flex items-center gap-1.5"
        >
          <Icon name="RefreshCw" size={13} /> Обновить
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
            <div key={p.id} className={`bento-card bg-snow p-5 sm:p-6 ${p.status === 'new' ? 'ring-2 ring-lime/60' : ''}`}>
              <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="font-sans text-xl tracking-tight font-medium">{p.name}</h3>
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
                  <a href={`tel:${p.phone}`} className="text-[14px] text-graphite/80 hover:text-graphite inline-flex items-center gap-1.5 mt-1">
                    <Icon name="Phone" size={12} /> {p.phone}
                  </a>
                </div>
                <div className="text-[11px] text-ash text-right">
                  {new Date(p.created_at).toLocaleString('ru-RU', { dateStyle: 'short', timeStyle: 'short' })}
                </div>
              </div>

              <div className="grid sm:grid-cols-4 gap-3 text-[13px] mb-3">
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
                    className="px-3 py-1.5 rounded-full text-[12px] bg-graphite text-snow hover:bg-graphite/85 transition inline-flex items-center gap-1.5"
                  >
                    <Icon name="Check" size={12} /> Обработана
                  </button>
                ) : (
                  <button
                    onClick={() => onChangeStatus(p.id, 'new')}
                    className="px-3 py-1.5 rounded-full text-[12px] border border-graphite/15 hover:bg-graphite/5 transition inline-flex items-center gap-1.5"
                  >
                    <Icon name="RotateCcw" size={12} /> Вернуть в новые
                  </button>
                )}
                <a
                  href={`tel:${p.phone}`}
                  className="px-3 py-1.5 rounded-full text-[12px] border border-graphite/15 hover:bg-graphite/5 transition inline-flex items-center gap-1.5"
                >
                  <Icon name="Phone" size={12} /> Позвонить
                </a>
                <button
                  onClick={() => onDeletePreorder(p.id)}
                  className="ml-auto px-3 py-1.5 rounded-full text-[12px] text-ash hover:text-accent2 transition inline-flex items-center gap-1.5"
                >
                  <Icon name="Trash2" size={12} /> Удалить
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
