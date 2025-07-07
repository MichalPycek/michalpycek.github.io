import { useEffect, useRef } from "react";
import { Github, Linkedin, Mail, Globe } from "lucide-react";
import profileImage from "@/assets/profile-image.jpg";

const Index = () => {
  const heroRef = useRef<HTMLElement>(null);
  const aboutRef = useRef<HTMLElement>(null);
  const workRef = useRef<HTMLElement>(null);
  const contactRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-in");
          }
        });
      },
      { threshold: 0.1 }
    );

    const refs = [heroRef, aboutRef, workRef, contactRef];
    refs.forEach((ref) => {
      if (ref.current) {
        observer.observe(ref.current);
      }
    });

    return () => observer.disconnect();
  }, []);

  const focusAreas = [
    "Salesforce + AI",
    "Lead Scoring & Marketing Automation",
    "Personalized Sales Experiences",
    "Smart CRM Systems",
    "Minimalist UX with creative impact"
  ];

  const contactLinks = [
    {
      icon: Globe,
      label: "Website",
      href: "https://vemicon.com",
      value: "vemicon.com"
    },
    {
      icon: Mail,
      label: "Email",
      href: "mailto:contact@vemicon.com",
      value: "contact@vemicon.com"
    },
    {
      icon: Linkedin,
      label: "LinkedIn",
      href: "https://linkedin.com/in/michalpycek",
      value: "in/michalpycek"
    },
    {
      icon: Github,
      label: "GitHub", 
      href: "https://github.com/michalpycek",
      value: "michalpycek"
    }
  ];

  return (
    <div className="min-h-screen bg-background text-foreground dark">
      {/* Hero Section */}
      <section 
        ref={heroRef}
        className="h-screen flex items-center justify-center px-4 relative overflow-hidden"
      >
        {/* Subtle Background Grid */}
        <div className="absolute inset-0 opacity-[0.02]">
          <div className="h-full w-full" style={{
            backgroundImage: `linear-gradient(hsl(var(--border)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--border)) 1px, transparent 1px)`,
            backgroundSize: '32px 32px'
          }}></div>
        </div>
        
        {/* Minimal floating elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 right-1/4 w-2 h-2 bg-primary/30 rounded-full animate-pulse" style={{ animationDelay: "2s" }}></div>
          <div className="absolute bottom-1/3 left-1/4 w-1 h-1 bg-accent/40 rounded-full animate-pulse" style={{ animationDelay: "4s" }}></div>
        </div>
        
        <div className="container max-w-6xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Profile Image - Square format */}
            <div className="flex justify-center lg:justify-end order-2 lg:order-1">
              <div className="relative">
                <img
                  src={profileImage}
                  alt="Michał Pycek"
                  className="w-48 h-48 md:w-56 md:h-56 lg:w-64 lg:h-64 object-cover rounded-2xl shadow-2xl border border-border/20"
                />
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-background/20 to-transparent"></div>
              </div>
            </div>
            
            {/* Content */}
            <div className="text-center lg:text-left order-1 lg:order-2 space-y-8">
              <div className="space-y-4">
                <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold font-sans tracking-tight leading-tight">
                  <span className="text-foreground">Michał</span><br/>
                  <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Pycek</span>
                </h1>
                
                <div className="space-y-2">
                  <p className="text-xl md:text-2xl text-muted-foreground font-mono">
                    Founder of Vemicon
                  </p>
                  <p className="text-lg md:text-xl text-muted-foreground/80 leading-relaxed max-w-lg">
                    Future-facing tech. Human-centered design.
                  </p>
                </div>
              </div>
              
              {/* Connect Links - Clean Grid */}
              <div className="grid grid-cols-2 gap-3 max-w-sm mx-auto lg:mx-0">
                {contactLinks.map((link, index) => (
                  <a
                    key={index}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center justify-center space-x-2 bg-card/50 backdrop-blur-sm rounded-lg px-3 py-3 border border-border/30 
                               hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:bg-card/70 hover:-translate-y-0.5"
                  >
                    <link.icon className="w-4 h-4 text-primary group-hover:scale-110 transition-transform duration-300" />
                    <span className="text-xs font-mono text-muted-foreground group-hover:text-foreground transition-colors duration-300 truncate">
                      {link.value}
                    </span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;