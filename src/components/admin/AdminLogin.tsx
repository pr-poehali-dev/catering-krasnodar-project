type Props = {
  password: string;
  setPassword: (v: string) => void;
  loading: boolean;
  onLogin: (e: React.FormEvent) => void;
};

const AdminLogin = ({ password, setPassword, loading, onLogin }: Props) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-stone p-6">
      <form onSubmit={onLogin} className="w-full max-w-sm bento-card p-8 bg-snow">
        <div className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-ash mb-4">
          <span className="w-6 h-px bg-ash" /> Админка
        </div>
        <h1 className="font-sans text-3xl tracking-tightest font-medium mb-6">Вход</h1>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Пароль"
          className="w-full px-4 py-3.5 rounded-2xl bg-stone border border-graphite/10 focus:border-graphite outline-none text-[14px]"
          autoFocus
        />
        <button
          type="submit"
          disabled={loading}
          className="mt-3 w-full bg-graphite text-snow py-3.5 rounded-2xl text-[14px] font-medium hover:bg-graphite/85 transition disabled:opacity-50"
        >
          {loading ? 'Вход…' : 'Войти'}
        </button>
      </form>
    </div>
  );
};

export default AdminLogin;
