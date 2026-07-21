import HeroSection from '@/components/home/HeroSection';
import EventsSection from '@/components/home/EventsSection';
import MenuSection from '@/components/home/MenuSection';
import HowToOrderSection from '@/components/home/HowToOrderSection';
import ReviewsSection from '@/components/home/ReviewsSection';
import ContactsSection from '@/components/home/ContactsSection';

const Index = () => {
  return (
    <div className="min-h-screen bg-snow text-graphite">
      <HeroSection />
      <EventsSection />
      <MenuSection />
      <HowToOrderSection />
      <ReviewsSection />
      <ContactsSection />
    </div>
  );
};

export default Index;