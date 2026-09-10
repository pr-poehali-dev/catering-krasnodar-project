import Icon from '@/components/ui/icon';
import Logo from '@/components/Logo';

const ContactsSection = () => {
  return (
    <>
      {/* FOOTER */}
      <footer id="contacts" className="border-t border-graphite/10 py-10 scroll-mt-24">
        <div className="container mx-auto">
          <div className="sm:hidden flex items-center justify-center gap-3 mb-6 pb-6 border-b border-graphite/10">
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
          <div className="flex flex-col md:flex-row items-center justify-between gap-5 text-[13px] text-ash">
            <Logo size="md" to="/" showTagline />
            <div></div>
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