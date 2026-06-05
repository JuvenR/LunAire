import { StarIcon } from "@phosphor-icons/react/dist/ssr";
import { ReviewsCarousel } from "@/sections/home/ReviewsCarousel";

export function ReviewsSection() {
  return (
    <section className="border-t-[12px] border-[#075A86] bg-[linear-gradient(90deg,#C9DAE8_0%,#EDF5FA_45%,#FFFFFF_100%)]">
      <div className="mx-auto grid min-h-[650px] max-w-[1250px] items-center gap-14 px-6 py-16 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1fr)] lg:px-8 xl:px-0">
        <div className="mx-auto w-full max-w-[480px] lg:mx-0">
          <ReviewsCarousel />
        </div>

        <div className="flex flex-col items-center text-center">
          <h2 className="max-w-[620px] text-5xl font-extrabold leading-[1.12] text-black md:text-6xl">
            Reviews from the people who let us in their homes
          </h2>

          <div className="mt-[4.5rem] flex items-center gap-4 text-[#F5C400]">
            {Array.from({ length: 5 }).map((_, index) => (
              <StarIcon key={index} size={44} weight="fill" />
            ))}
          </div>

          <div className="mt-12 flex min-h-[110px] items-center gap-7 rounded-lg bg-white px-10 py-7 shadow-[0_10px_24px_rgba(28,62,88,0.18)]">
            <span className="text-4xl font-extrabold text-[#FF5A52]">
              Angi
            </span>
            <span className="h-16 w-px bg-slate-300" aria-hidden />
            <span className="text-4xl font-semibold">
              <span className="text-[#4285F4]">G</span>
              <span className="text-[#EA4335]">o</span>
              <span className="text-[#FBBC05]">o</span>
              <span className="text-[#4285F4]">g</span>
              <span className="text-[#34A853]">l</span>
              <span className="text-[#EA4335]">e</span>
            </span>
          </div>

          <a
            href="/contact-us"
            className="mt-16 text-3xl font-extrabold text-[#064A70] transition hover:text-[#0A85C8] md:text-4xl"
          >
            Check our testimonials
          </a>
        </div>
      </div>
    </section>
  );
}
