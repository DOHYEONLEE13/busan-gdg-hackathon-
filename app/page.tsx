import { ContactCTA } from "@/components/landing/ContactCTA";
import { Footer } from "@/components/landing/Footer";
import { Hero } from "@/components/landing/Hero";
import { Navbar } from "@/components/landing/Navbar";
import { Pricing } from "@/components/landing/Pricing";
import { Reviews } from "@/components/landing/Reviews";
import { Services } from "@/components/landing/Services";
import { BACKGROUND_VIDEO_SRC } from "@/lib/constants";

export default function HomePage() {
  return (
    <div className="bg-[#0a0a0a]">
      <section className="relative min-h-screen w-full overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          className="absolute inset-0 h-full w-full object-cover"
          aria-hidden="true"
        >
          <source src={BACKGROUND_VIDEO_SRC} type="video/mp4" />
        </video>

        <Navbar />
        <Hero />
      </section>

      <Services />
      <Pricing />
      <Reviews />
      <ContactCTA />
      <Footer />
    </div>
  );
}
