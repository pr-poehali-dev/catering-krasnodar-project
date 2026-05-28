import HeroSection from '@/components/home/HeroSection';
import EventsSection from '@/components/home/EventsSection';
import MenuSection from '@/components/home/MenuSection';
import ReviewsSection from '@/components/home/ReviewsSection';
import ContactsSection from '@/components/home/ContactsSection';

const Index = () => {
  return (
    <div className="min-h-screen bg-snow text-graphite">
      <HeroSection />
      <EventsSection />
      <MenuSection />
      <ReviewsSection />
      <ContactsSection />
    </div>
  );
};

export default Index;
