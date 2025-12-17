import { useEffect, useRef, useState, type CSSProperties } from "react";
import {
  ArrowUpRight,
  Linkedin,
  Mail,
  Globe,
  Github,
  MapPin,
  Clock3,
} from "lucide-react";
import profileImageWebp from "@/assets/profile-image.webp";
import profileImageWebp320 from "@/assets/profile-image-320.webp";
import profileImageWebp480 from "@/assets/profile-image-480.webp";
import profileImageWebp640 from "@/assets/profile-image-640.webp";
import profileImagePng from "@/assets/profile-image-800.png";
import ParticlesBackground from "@/components/ParticlesBackground";
import AspectRatio from "@/components/AspectRatio";

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
  const [localTime, setLocalTime] = useState("");

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

  useEffect(() => {
    const updateTime = () => {
      try {
        const formatted = new Intl.DateTimeFormat("en-GB", {
          hour: "2-digit",
          minute: "2-digit",
          timeZone: "Europe/Warsaw",
        }).format(new Date());
        setLocalTime(formatted);
      } catch (error) {
        if (import.meta.env.DEV) {
          console.warn("Failed to compute local time", error);
        }
      }
    };

    updateTime();
    const id = window.setInterval(updateTime, 30000);
    return () => {
      window.clearInterval(id);
    };
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#010314] text-foreground">
      <ParticlesBackground />
      <div
        className="liquid-glass-layer pointer-events-none absolute inset-0 opacity-95"
        style={{ "--lg-layer-depth": "0.05" } as CSSProperties}
      />
      <div
        className="liquid-glass-layer pointer-events-none absolute inset-0 mix-blend-screen opacity-90"
        style={{ "--lg-layer-depth": "0.18" } as CSSProperties}
      />
      <div
        className="liquid-glass-layer pointer-events-none absolute inset-0 opacity-[0.6]"
        style={{ "--lg-layer-depth": "0.32" } as CSSProperties}
      />

      <main className="relative z-10 pb-14">
        <section
          ref={heroRef}
          className="pt-16"
          style={{ "--lg-parallax-value": "0px" } as CSSProperties}
        >
          <div className="mx-auto flex max-w-6xl flex-col gap-12 px-6 sm:px-10 lg:px-12">
            <div
              ref={heroPanelRef}
              className="relative overflow-hidden rounded-[3.75rem] border border-white/12 bg-white/5 backdrop-blur"
            >
              <div className="relative grid gap-12 px-8 pb-14 pt-14 sm:px-12 lg:px-16 lg:grid-cols-[minmax(0,1.05fr),minmax(0,0.95fr)]">
                <div className="flex flex-col gap-10 text-center text-slate-100 lg:text-left">
                  <div className="space-y-5">
                    <p className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.35em] text-sky-100/90">
                      Salesforce Architect
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
                      className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-[#0a1f4d] transition hover:translate-y-[-1px]"
                    >
                      Schedule a call
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
                        <picture>
                          <source
                            srcSet={`${profileImageWebp320} 320w, ${profileImageWebp480} 480w, ${profileImageWebp640} 640w, ${profileImageWebp} 800w`}
                            type="image/webp"
                            sizes="(max-width: 640px) 224px, (max-width: 768px) 256px, (max-width: 1024px) 288px, (max-width: 1280px) 288px, 320px"
                          />
                          <img
                            src={profileImagePng}
                            srcSet={`${profileImagePng} 800w`}
                            alt="Michał Pycek, Salesforce Architect"
                            className="h-full w-full rounded-[3.25rem] object-cover object-[center_12%] opacity-95 [filter:saturate(1.05)_contrast(1.04)_brightness(1.02)]"
                            loading="eager"
                            decoding="async"
                            fetchpriority="high"
                            width={640}
                            height={800}
                            sizes="(max-width: 640px) 224px, (max-width: 768px) 256px, (max-width: 1024px) 288px, (max-width: 1280px) 288px, 320px"
                          />
                        </picture>
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
                      <div className="flex w-full flex-wrap items-center justify-center gap-1.5 rounded-[999px] border border-white/14 bg-white/10 px-3.5 py-2.5 text-xs text-white/80 shadow-[0_8px_30px_rgba(0,0,0,0.32)] backdrop-blur-md sm:gap-2 sm:px-4 sm:py-3 sm:text-[13px] md:flex-nowrap">
                        <span className="flex items-center gap-1 rounded-full bg-white/10 px-2.5 py-1.5 text-white/80 whitespace-nowrap sm:px-3">
                          <span className="flex h-[10px] w-[10px] items-center justify-center">
                            <span className="h-[6px] w-[6px] rounded-full bg-emerald-300/85 shadow-[0_0_0_6px_rgba(16,185,129,0.08)]" />
                          </span>
                          <MapPin className="h-[15px] w-[15px] text-white/80" aria-hidden="true" />
                          <span className="font-medium text-white">Warsaw</span>
                        </span>
                        <span className="flex items-center gap-1 rounded-full bg-white/10 px-2.5 py-1.5 text-white/80 whitespace-nowrap sm:px-3">
                          <Clock3 className="h-[14px] w-[14px] text-white/80" aria-hidden="true" />
                          <span className="font-medium text-white">CET/CEST</span>
                        </span>
                        <span className="flex items-center gap-1.5 rounded-full bg-white/10 px-2.5 py-1.5 text-white/80 whitespace-nowrap sm:px-3">
                          <span className="h-1.5 w-1.5 rounded-full bg-sky-300/90 shadow-[0_0_0_6px_rgba(125,211,252,0.08)]" />
                          <span className="font-semibold text-white">
                            Time: {localTime || "--:--"}
                          </span>
                        </span>
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
