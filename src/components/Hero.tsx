import Button from "./Button";

interface HeroProps {
  title: string;
  subtitle: string;
  vertical: "india" | "global";
}

export default function Hero({ title, subtitle, vertical }: HeroProps) {
  const bgClass = vertical === "india" ? "bg-india-bg" : "bg-global-bg";
  const titleClass = vertical === "india" ? "text-india-primary" : "text-global-primary";
  const subtitleClass = vertical === "india" ? "text-india-secondary" : "text-global-secondary";

  return (
    <section className={`w-full py-20 px-6 flex items-center justify-center text-center ${bgClass}`}>
      <div className="max-w-3xl">
        <h1 className={`font-heading text-5xl md:text-6xl mb-4 ${titleClass}`}>{title}</h1>
        <p className={`font-accent text-2xl mb-8 ${subtitleClass}`}>{subtitle}</p>
        <Button vertical={vertical}>Explore Listings</Button>
      </div>
    </section>
  );
}
