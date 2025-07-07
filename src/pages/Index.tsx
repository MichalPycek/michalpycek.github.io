import { useEffect, useRef } from "react";
import { Github, Linkedin, Mail, Globe } from "lucide-react";
import profileImage from "@/assets/profile-image.jpg";

const Index = () => {
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    // Fade in animation on load
    if (heroRef.current) {
      heroRef.current.classList.add("animate-fade-in");
    }
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
            {/* Profile Image - Circular with elegant shadow */}
            <div className="flex justify-center lg:justify-end order-2 lg:order-1">
              <div className="relative">
                <img
                  src={profileImage}
                  alt="Michał Pycek, Founder of Vemicon - AI-powered Salesforce solutions expert"
                  className="w-40 h-40 md:w-48 md:h-48 lg:w-56 lg:h-56 object-cover object-center rounded-full shadow-2xl border-2 border-primary/20 hover:shadow-primary/20 transition-all duration-500"
                />
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary/10 to-transparent opacity-60"></div>
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
              
              {/* Connect Links - Clean Grid with hover effects */}
              <div className="grid grid-cols-2 gap-3 max-w-sm mx-auto lg:mx-0">
                {contactLinks.map((link, index) => (
                  <a
                    key={index}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link-hover group flex items-center justify-center space-x-2 bg-card/60 backdrop-blur-sm rounded-lg px-3 py-3 border border-border/40 
                               hover:border-primary/60 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 hover:bg-card/80 hover:-translate-y-0.5"
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