type PageHeroProps = {
  eyebrow: string;
  title: string;
  subtitle: string;
};

export function PageHero({ eyebrow, title, subtitle }: PageHeroProps) {
  return (
    <section className="bg-[linear-gradient(115deg,#003d69_0%,#00558e_55%,#0a6fa4_100%)] text-white">
      <div className="mx-auto w-full max-w-[1250px] px-6 py-14 lg:px-8 xl:px-0">
        <p className="text-base font-extrabold uppercase tracking-[0.18em] text-white/90">
          {eyebrow}
        </p>
        <h1 className="mt-4 text-5xl font-extrabold leading-tight md:text-6xl">
          {title}
        </h1>
        <p className="mt-4 max-w-4xl text-lg leading-relaxed text-white/85 md:text-xl">
          {subtitle}
        </p>
      </div>
    </section>
  );
}
