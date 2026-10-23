import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import SiteIntro from "@/components/site-intro";
import ScrollProgress from "@/components/motion/scroll-progress";
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
import { GALLERY_ALBUM, ROOM_TYPES, roomAlbum } from "@/lib/constants";
import { getAllAlbums } from "@/lib/photos";
import { roomsWithContent } from "@/lib/content";
import { getSiteContent } from "@/lib/site-content";

export default async function HomePage() {
  const [albums, content] = await Promise.all([getAllAlbums(), getSiteContent()]);
  const coverPhotos = Object.fromEntries(
    ROOM_TYPES.map((room) => [room.slug, albums[roomAlbum(room.slug)]?.[0]]),
  );

  return (
    <>
      <SiteIntro />
      <ScrollProgress />
      <Navbar />
      <main>
        <Hero content={content.hero} />
        <RoomsTeaser content={content.roomsTeaser} rooms={roomsWithContent(content)} coverPhotos={coverPhotos} />
        <StatsStrip content={content.stats} />
        <About content={content.about} />
        <EventsMeeting content={content.events} />
        <Parking content={content.parking} />
        <Services content={content.services} />
        <Gallery photos={albums[GALLERY_ALBUM] ?? []} content={content.gallery} />
        <Testimonials content={content.testimonials} />
        <Location content={content.location} />
        <PaymentMethods content={content.payment} />
        <Faq content={content.faq} />
        <FinalCta content={content.finalCta} />
      </main>
      <Footer />
    </>
  );
}
