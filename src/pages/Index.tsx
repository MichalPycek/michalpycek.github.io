import { useEffect, useRef, type CSSProperties } from "react";
import { ArrowUpRight, Linkedin, Mail, Globe, Github } from "lucide-react";
import profileImage from "@/assets/profile-image.png";
import ParticlesBackground from "@/components/ParticlesBackground";
import { AspectRatio } from "@/components/ui/aspect-ratio";

const heroStats = [
  { value: "2014", label: "First Salesforce project" },
  { value: "+15", label: "Salesforce certifications" },
  { value: "2023", label: "First AI Agent on AppExchange" },
];

const contactLinks = [
  {
    icon: Globe,
    label: "Website",
    href: "https://vemicon.com",
  },
  {
    icon: Mail,
    label: "Email",
    href: "mailto:michalpycek@gmail.com",
  },
  {
    icon: Linkedin,
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/michalpycek/",
  },
  {
    icon: Github,
    label: "GitHub",
    href: "https://github.com/michalpycek",
  },
];

const Index = () => {
  const heroRef = useRef<HTMLElement>(null);
  const heroPanelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (heroRef.current) {
      heroRef.current.classList.add("animate-fade-in");
      heroRef.current.style.setProperty("--lg-parallax-value", "0px");
    }
  }, []);

  useEffect(() => {
    const panel = heroPanelRef.current;
    const host = heroRef.current;

    if (!panel || !host) {
      return;
    }

    try {
      const root = getComputedStyle(document.documentElement);
      const accent = root.getPropertyValue("--primary").trim();
      if (accent) {
        const accentColor = `hsl(${accent} / 0.45)`;
        const accentSoft = `hsl(${accent} / 0.2)`;
        host.style.setProperty("--lg-accent-color", accentColor);
        host.style.setProperty("--lg-accent-soft", accentSoft);
        panel.style.setProperty("--lg-accent-color", accentColor);
        panel.style.setProperty("--lg-accent-soft", accentSoft);
      }
    } catch (error) {
      if (import.meta.env.DEV) {
        console.warn("Failed to derive accent color for liquid glass", error);
      }
    }
  }, []);

  useEffect(() => {
    const host = heroRef.current;
    if (!host) {
      return;
    }

    let ticking = false;

    const updateParallax = () => {
      ticking = false;
      const depth = Math.min(window.scrollY, 600);
      host.style.setProperty("--lg-parallax-value", `${depth * -0.08}px`);
    };

    const handleScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(updateParallax);
      }
    };

    updateParallax();

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#030b1d] text-foreground">
      <ParticlesBackground />
      <div
        className="liquid-glass-layer pointer-events-none absolute inset-0 bg-[linear-gradient(122deg,#051329_0%,#092645_38%,#114262_68%,#0c2337_100%)] opacity-95"
        style={{ "--lg-layer-depth": "0.05" } as CSSProperties}
      />
      <div
        className="liquid-glass-layer pointer-events-none absolute inset-0 bg-[radial-gradient(105%_85%_at_14%_18%,rgba(122,214,255,0.42),transparent),radial-gradient(115%_90%_at_82%_20%,rgba(86,210,255,0.3),transparent),radial-gradient(160%_110%_at_58%_88%,rgba(58,120,255,0.28),transparent)] mix-blend-screen opacity-90"
        style={{ "--lg-layer-depth": "0.18" } as CSSProperties}
      />
      <div
        className="liquid-glass-layer pointer-events-none absolute inset-0 bg-[conic-gradient(from_210deg_at_72%_32%,rgba(255,255,255,0.28)_0deg,transparent_130deg,rgba(255,255,255,0.18)_240deg,transparent_360deg)] opacity-[0.6]"
        style={{ "--lg-layer-depth": "0.32" } as CSSProperties}
      />

      <main className="relative z-10 pb-28">
        <section
          ref={heroRef}
          className="pt-16"
          style={{ "--lg-parallax-value": "0px" } as CSSProperties}
        >
          <div className="mx-auto flex max-w-6xl flex-col gap-12 px-6 sm:px-10 lg:px-12">
            <div
              ref={heroPanelRef}
              className="liquid-glass-panel"
              style={
                {
                  "--lg-highlight-x": "50%",
                  "--lg-highlight-y": "50%",
                  "--lg-rotation-x": "0deg",
                  "--lg-rotation-y": "0deg",
                  "--lg-glow-opacity": "0.24",
                } as CSSProperties
              }
            >
              <div className="liquid-glass-panel__shimmer" aria-hidden="true" />
              <div className="liquid-glass-panel__rim" aria-hidden="true" />
              <div className="relative grid gap-12 px-8 pb-14 pt-14 sm:px-12 lg:px-16 lg:grid-cols-[minmax(0,1.05fr),minmax(0,0.95fr)]">
                <div className="flex flex-col gap-10 text-center text-slate-100 lg:text-left">
                  <div className="space-y-5">
                    <p className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.35em] text-sky-100/90">
                      Salesforce Architect · Trusted Advisor
                    </p>
                    <h1 className="text-4xl font-semibold leading-tight tracking-tight text-white md:text-[3rem]">
                      I lead Salesforce projects that scale smoothly and stay in
                      control.
                    </h1>
                    <p className="mx-auto max-w-2xl text-base text-slate-100/80 md:text-lg lg:mx-0">
                      I work with enterprise teams to align business strategy
                      with Salesforce delivery, leading AI programmes,
                      integration portfolios, and Lightning experience design so
                      teams move fast and innovate effectively.
                    </p>
                  </div>

                  <div className="flex flex-wrap justify-center gap-4 lg:justify-start">
                    <a
                      href="https://calendar.app.google/PnDkzsEt1s1MHmn2A"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-primary shadow-lg shadow-sky-500/40 transition hover:translate-y-[-1px]"
                    >
                      Start a discovery call
                    </a>
                    <a
                      href="https://trailblazer.me/id/mpycek"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-full border border-white/35 px-6 py-3 text-sm font-semibold text-white/85 transition hover:border-white/70 hover:bg-white/10"
                    >
                      View my Trailhead profile
                      <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                    </a>
                  </div>

                  <div className="liquid-glass-slab px-7 py-8">
                    <div
                      className="liquid-glass-slab__ambient"
                      aria-hidden="true"
                    />
                    <div className="relative grid gap-6 sm:grid-cols-3">
                      {heroStats.map((stat, index) => (
                        <div
                          key={index}
                          className="liquid-glass-stat flex min-w-0 flex-col items-center justify-start gap-1.5 px-3 py-2 text-center transition duration-200 sm:px-6"
                        >
                          <span className="text-3xl font-semibold leading-none tracking-tight text-white sm:text-[2.6rem]">
                            {stat.value}
                          </span>
                          <span className="text-[11px] uppercase tracking-[0.2em] text-white/65 leading-[1.4]">
                            {stat.label}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="relative flex justify-center">
                  <div className="relative flex w-full max-w-md flex-col items-center gap-7">
                    <div className="liquid-glass-orb" aria-hidden="true" />
                    <div
                      className="liquid-glass-orb liquid-glass-orb--top"
                      aria-hidden="true"
                    />
                    <div
                      className="liquid-glass-orb liquid-glass-orb--bottom"
                      aria-hidden="true"
                    />
                    <div className="liquid-glass-card">
                      <div
                        className="liquid-glass-card__highlight"
                        aria-hidden="true"
                      />
                      <div
                        className="liquid-glass-card__rim"
                        aria-hidden="true"
                      />
                      <div
                        className="liquid-glass-card__flare"
                        aria-hidden="true"
                      />
                      <AspectRatio ratio={4 / 5}>
                        <img
                          src={profileImage}
                          alt="Michał Pycek, Salesforce Architect"
                          className="h-full w-full rounded-[3.25rem] object-cover object-[center_12%] opacity-95 [filter:saturate(1.05)_contrast(1.04)_brightness(1.02)]"
                          loading="eager"
                          decoding="async"
                          sizes="(min-width: 1280px) 20rem, (min-width: 1024px) 18rem, (min-width: 768px) 16rem, 14rem"
                        />
                      </AspectRatio>
                    </div>
                    <div className="flex w-full flex-col items-center gap-3 text-center">
                      <p className="text-sm uppercase tracking-[0.25em] text-white/55">
                        Let's connect
                      </p>
                      <div className="liquid-glass-contact">
                        {contactLinks.map((link, index) => (
                          <a
                            key={index}
                            href={link.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            title={link.label}
                            aria-label={link.label}
                            className="liquid-icon-button"
                          >
                            <span className="liquid-icon">
                              <link.icon
                                className="h-5 w-5"
                                aria-hidden="true"
                              />
                            </span>
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Index;
