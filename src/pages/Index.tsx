import HeroSection from '@/components/home/HeroSection';
import EventsSection from '@/components/home/EventsSection';
import MenuGridSection from '@/components/home/MenuGridSection';
import AboutSection from '@/components/home/AboutSection';
import HowToOrderSection from '@/components/home/HowToOrderSection';
import ReviewsSection from '@/components/home/ReviewsSection';
import FaqSection from '@/components/home/FaqSection';
import ContactsSection from '@/components/home/ContactsSection';

const Index = () => {
  return (
    <div className="min-h-screen bg-snow text-graphite">
      <HeroSection />
      <AboutSection />
      <MenuGridSection />
      <EventsSection />
      <HowToOrderSection />
      <ReviewsSection />
      <FaqSection />
      <ContactsSection />
    </div>
  );
};

export default Index;