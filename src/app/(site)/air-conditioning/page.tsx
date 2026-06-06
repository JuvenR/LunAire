import GradientBanner from '@/components/shared/GradientBanner';
import HeroBanner from '@/components/shared/HeroBanner';
import ImageGallery from '@/components/shared/ImageGallery';
import ServiceBanner from '@/components/shared/ServiceBanner';
import StaffBanner from '@/components/shared/StaffBanner';
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
        startColor="#5da3db" 
        endColor="#0d416b"  
        repeatCount={10}   
      />
      
      <ServicesSection />

      <StaffBanner 
        imageUrl="/images/crew.png"
        title ="We make things happen"
        description='See our top-quality installations and reliable repairs that guarantee a cool, comfortable home.'
      />

      <ImageGallery images={galleryPhotos} />

      <ServiceBanner 
        imageSrc="/images/ac-service.png" 
        topTitle="Ready for service"
        mainTitle="We can stabilize your AC this week."
        buttonText="Schedule"
        buttonHref=''
      />
    </main>
  );
}