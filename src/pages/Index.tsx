import HeroSection from '@/components/home/HeroSection';
import EventsSection from '@/components/home/EventsSection';
import MenuSection from '@/components/home/MenuSection';
import HowToOrderSection from '@/components/home/HowToOrderSection';
import ReviewsSection from '@/components/home/ReviewsSection';
import FaqSection from '@/components/home/FaqSection';
import ContactsSection from '@/components/home/ContactsSection';

const Index = () => {
  return (
    <div className="min-h-screen bg-snow text-graphite">
      <HeroSection />
      <EventsSection />
      <MenuSection />
      <HowToOrderSection />
      <ReviewsSection />
      <FaqSection />
      <ContactsSection />
    </div>
  );
};

export default Index;