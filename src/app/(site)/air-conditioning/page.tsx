import GradientBanner from '@/components/shared/GradientBanner';
import HeroBanner from '@/components/shared/HeroBanner';
import ImageGallery from '@/components/shared/ImageGallery';
import ServiceBanner from '@/components/shared/ServiceBanner';
import StaffBanner from '@/components/shared/StaffBanner';
import WarningSection from '@/components/shared/WarningSection';
import ServicesSection from '@/sections/air-conditioning/ServiceSection';



export default function Page() {

  const galleryPhotos = [
    "/images/ac-installing.png",
    "/images/ac-installing.png",
    "/images/ac-installing.png",
    "/images/ac-installing.png",
    "/images/ac-installing.png",
    "/images/ac-installing.png",
    "/images/ac-installing.png",
    "/images/ac-installing.png",
    "/images/ac-installing.png",
    "/images/ac-installing.png",
  ];

  const warningCards: [string, string, string] = [
    "Your home won't cool down properly",
    "Your electricity bill went up for no reason",
    "Excess humidity inside the house even with the AC on"
  ];

  const warningColors: [string, string, string] = [
    "#0974B9", 
    "#064066",
    "#041F33"
  ];

  return (
    <main className="flex flex-col w-full">
      <HeroBanner

        imageUrl="/images/air-conditioning-hero.png"
        subtitle="AIR CONDITIONING SERVICE"
        title={
          <>
            Master Your <br /> Atmosphere
          </>
        }
        description="AC installation, repair, and optimization with technical precision and stable results."
        buttonText="Schedule Now"
        overlayColor="rgba(21, 82, 136, 0.95)"
      />

      <GradientBanner
        text="Air Conditioning"
        startColor="#56BCFF"
        endColor="#004273"
        repeatCount={10}
      />

      <ServicesSection />

      <ImageGallery
        images={galleryPhotos}
        title="We make things happen"
        subtitle="See our top-quality installations and reliable repairs that guarantee a cool, comfortable home."
        accentColor="#0975BB"
        bgFrom="#EDF5FF"
        bgTo="#EDF5FF"
      />

      <WarningSection
        title="Is your AC trying to tell you something?"
        subtitle="Most AC problems give you warning signs before they become expensive repairs."
        titleColor="#0F4C81"    
        subtitleColor="#064066"   
        cardColors={warningColors}   
        cards={warningCards}       
        bgFrom="#EDF5FF"          
        bgTo="#6AACD8"          
      />

      <ServiceBanner
        topTitle="Ready for service"
        mainTitle="We can stabilize your AC this week."
        buttonText="Schedule"
        buttonHref=''
        bgFrom='#6AACD8'
        bgTo='#3990C9'
        textColor='#1E82C2'
      />
    </main>
  );
}