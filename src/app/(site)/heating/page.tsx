import GradientBanner from '@/components/shared/GradientBanner';
import HeroBanner from '@/components/shared/HeroBanner';
import ImageGallery from '@/components/shared/ImageGallery';
import ServiceBanner from '@/components/shared/ServiceBanner';
import WarningSection from '@/components/shared/WarningSection';
import ServicesSection from '@/sections/heating/ServiceSection';



export default function Page() {

  const galleryPhotos = [
    "/images/heating-installing.png",
    "/images/heating-installing.png",
    "/images/heating-installing.png",
    "/images/heating-installing.png",
    "/images/heating-installing.png",
    "/images/heating-installing.png",
    "/images/heating-installing.png",
    "/images/heating-installing.png",
    "/images/heating-installing.png",
    "/images/heating-installing.png",
  ];

  const warningCards: [string, string, string] = [
    "Your home takes too long to warm up",
    "Your heating bill is higher than usual",
    "Strange noises or smells when it turns on"
  ];

  const warningColors: [string, string, string] = [
    "#BE3043", 
    "#660606",
    "#330404"
  ];

  return (
    <main className="flex flex-col w-full">

      <HeroBanner
        imageUrl="/images/heating-hero.png"
        subtitle="HEATING SERVICE"
        title={
          <>
            Warmth <br /> & Safety
          </>
        }
        description="Heating solutions with technical control, safety, and stable performance through cold season."
        buttonText="Schedule Now"
        overlayColor="#ad2235"
      />

      <GradientBanner
        text="Heating"
        startColor="#C12E41"
        endColor="#841A28"
        repeatCount={10}
      />

      <ServicesSection />

      <ImageGallery
        images={galleryPhotos}
        title="We make things happen"
        subtitle="See our top-quality installations and reliable repairs that guarantee a warm, comfortable home."
        accentColor="#D0495A"
        bgFrom="#EDF5FF"
        bgTo="#EDF5FF"
      />

      <WarningSection
        title="Is your heater ready for when you need it most?"
        subtitle="Heating problems rarely show up on cold days, they build up over time."
        titleColor="#660606"    
        subtitleColor="#9A3240"   
        cardColors={warningColors}   
        cards={warningCards}       
        bgFrom="#EDF5FF"          
        bgTo="#DBA8B5"          
      />

      <ServiceBanner
        topTitle="Ready for service"
        mainTitle="Book your heating inspection before peak cold hits."
        buttonText="Schedule"
        buttonHref=''
        bgFrom='#DBA8B5'
        bgTo='#CF7383'
        textColor='#851B29'
      />
    </main>
  );
}
