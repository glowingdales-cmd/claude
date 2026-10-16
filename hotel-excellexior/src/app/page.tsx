import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import SiteIntro from "@/components/site-intro";
import Hero from "@/components/sections/hero";
import StatsStrip from "@/components/sections/stats-strip";
import About from "@/components/sections/about";
import RoomsTeaser from "@/components/sections/rooms-teaser";
import EventsMeeting from "@/components/sections/events-meeting";
import Parking from "@/components/sections/parking";
import Services from "@/components/sections/services";
import Gallery from "@/components/sections/gallery";
import Testimonials from "@/components/sections/testimonials";
import Location from "@/components/sections/location";
import PaymentMethods from "@/components/sections/payment-methods";
import Faq from "@/components/sections/faq";
import FinalCta from "@/components/sections/final-cta";

export default function HomePage() {
  return (
    <>
      <SiteIntro />
      <Navbar />
      <main>
        <Hero />
        <StatsStrip />
        <About />
        <RoomsTeaser />
        <EventsMeeting />
        <Parking />
        <Services />
        <Gallery />
        <Testimonials />
        <Location />
        <PaymentMethods />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
    </>
  );
}
