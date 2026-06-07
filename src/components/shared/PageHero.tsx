type PageHeroProps = {
  eyebrow: string;
  title: string;
  subtitle: string;
};

export function PageHero({ eyebrow, title, subtitle }: PageHeroProps) {
  return (
    <section className="bg-[linear-gradient(115deg,#003d69_0%,#00558e_55%,#0a6fa4_100%)] text-white">
      <div className="mx-auto w-full max-w-[1250px] px-6 py-16 lg:px-8 xl:px-0">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#8fc0e6]">
          {eyebrow}
        </p>
        <h1 className="mt-4 text-4xl font-extrabold leading-tight md:text-5xl">
          {title}
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/80 md:text-lg">
          {subtitle}
        </p>
      </div>
    </section>
  );
}
