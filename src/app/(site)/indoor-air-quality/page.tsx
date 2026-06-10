import GradientBanner from '@/components/shared/GradientBanner';
import HeroBanner from '@/components/shared/HeroBanner';
import ImageGallery from '@/components/shared/ImageGallery';
import ServiceBanner from '@/components/shared/ServiceBanner';
import WarningSection from '@/components/shared/WarningSection';
import ServicesSection from '@/sections/indoor-air-quality/ServiceSection';



export default function Page() {

  const galleryPhotos = [
    "/images/airquality-installing.png",
    "/images/airquality-installing.png",
    "/images/airquality-installing.png",
    "/images/airquality-installing.png",
    "/images/airquality-installing.png",
    "/images/airquality-installing.png",
    "/images/airquality-installing.png",
    "/images/airquality-installing.png",
    "/images/airquality-installing.png",
    "/images/airquality-installing.png",
  ];

  const warningCards: [string, string, string] = [
    "Dust builds up faster than it should",
    "The air feels stuffy or humid indoors",
    "Persistent odors coming from the vents"
  ];

  const warningColors: [string, string, string] = [
    "#94D15A", 
    "#066635",
    "#04331B"
  ];

  return (
    <main className="flex flex-col w-full">

      <HeroBanner
        imageUrl="/images/airquality-hero.png"
        subtitle="Indoor Air Quality"
        title={
          <>
            Breathe  <br /> Cleaner Air
          </>
        }
        description="Purification and humidity control for a healthier and more comfortable home."
        buttonText="Schedule Now"
        overlayColor="#4D7C2C"
      />

      <GradientBanner
        text="Indoor Air Quality"
        startColor="#97D55C"
        endColor="#4D7C2C"
        repeatCount={10}
      />

      <ServicesSection />

      <ImageGallery
        images={galleryPhotos}
        title="We make things happen"
        subtitle="See our top-quality installations and reliable repairs that guarantee a healthy, comfortable home."
        accentColor="#4D7C2C"
        bgFrom="#EDF5FF"
        bgTo="#EDF5FF"
      />

      <WarningSection
        title=" Your AC runs, but is the air actually clean?"
        subtitle="Temperature is only part of the equation. Poor air quality can affect your health without you realizing it."
        titleColor="#066635"    
        subtitleColor="#2F664A"   
        cardColors={warningColors}   
        cards={warningCards}       
        bgFrom="#EDF5FF"          
        bgTo="#BAD3B3"          
      />

      <ServiceBanner
        topTitle="Ready for service"
        mainTitle="Improve your indoor air this week."
        buttonText="Schedule"
        buttonHref=''
        bgFrom='#BAD3B3'
        bgTo='#A9C89B'
        textColor='#4D7C2C'
      />
    </main>
  );
}
