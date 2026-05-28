import HeroSection from '@/components/home/HeroSection';
import EventsSection from '@/components/home/EventsSection';
import MenuSection from '@/components/home/MenuSection';
import ReviewsSection from '@/components/home/ReviewsSection';
import ContactsSection from '@/components/home/ContactsSection';
import useReveal from '@/hooks/useReveal';

const Index = () => {
  useReveal();
  return (
    <div className="relative min-h-screen bg-snow text-graphite overflow-x-hidden">
      {/* Глобальные цветные пятна на фоне (glassmorphism подложка) */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="blob blob-lime w-[520px] h-[520px] -top-32 -left-32" />
        <div className="blob blob-orange w-[480px] h-[480px] top-[30%] -right-40" style={{ animationDelay: '4s' }} />
        <div className="blob blob-violet w-[600px] h-[600px] bottom-[10%] left-[20%]" style={{ animationDelay: '8s' }} />
      </div>
      <HeroSection />
      <EventsSection />
      <MenuSection />
      <ReviewsSection />
      <ContactsSection />
    </div>
  );
};

export default Index;