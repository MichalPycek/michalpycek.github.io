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
        className="min-h-screen flex items-center justify-center px-6 py-20 relative overflow-hidden"
        style={{
          background: "hsl(var(--gradient-surface))"
        }}
      >
        {/* Creative Background Elements */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-glow"></div>
          <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-accent/10 rounded-full blur-3xl animate-glow" style={{ animationDelay: "1s" }}></div>
          <div className="absolute top-1/2 left-1/2 w-72 h-72 bg-primary/5 rounded-full blur-2xl animate-glow" style={{ animationDelay: "2s" }}></div>
        </div>
        
        {/* Geometric Grid Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="h-full w-full" style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, hsl(var(--primary)) 1px, transparent 0)`,
            backgroundSize: '40px 40px'
          }}></div>
        </div>
        
        {/* Floating Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-20 w-4 h-4 bg-primary/20 rounded-full animate-pulse" style={{ animationDelay: "0.5s" }}></div>
          <div className="absolute top-40 right-32 w-3 h-3 bg-accent/30 rounded-full animate-pulse" style={{ animationDelay: "1.5s" }}></div>
          <div className="absolute bottom-32 left-40 w-2 h-2 bg-primary/25 rounded-full animate-pulse" style={{ animationDelay: "2.5s" }}></div>
          <div className="absolute bottom-20 right-20 w-5 h-5 bg-accent/15 rounded-full animate-pulse" style={{ animationDelay: "3s" }}></div>
        </div>
        
        <div className="container max-w-4xl mx-auto relative z-10">
          <div className="flex flex-col md:flex-row items-center md:items-start md:text-left text-center space-y-8 md:space-y-0 md:space-x-12">
            {/* Profile Image - Left aligned */}
            <div className="flex-shrink-0">
              <div className="relative">
                <img
                  src={profileImage}
                  alt="Michał Pycek"
                  className="w-32 h-32 md:w-48 md:h-48 rounded-full object-contain border-4 border-primary/20 shadow-2xl"
                  style={{
                    boxShadow: "hsl(var(--shadow-glow))"
                  }}
                />
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary/10 to-accent/10 animate-pulse"></div>
              </div>
            </div>
            
            {/* Content */}
            <div className="flex-1 space-y-6">
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold font-sans tracking-tight">
                <span className="bg-gradient-to-r from-foreground via-primary to-accent bg-clip-text text-transparent">
                  Michał Pycek
                </span>
              </h1>
              
              <p className="text-xl md:text-2xl text-muted-foreground font-mono font-light">
                Founder of Vemicon
              </p>
              
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl">
                Future-facing tech. Human-centered design.
              </p>
              
              {/* Connect Links - Minimalist */}
              <div className="flex flex-wrap gap-4 pt-6">
                {contactLinks.map((link, index) => (
                  <a
                    key={index}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center space-x-2 bg-card/30 backdrop-blur-sm rounded-lg px-4 py-2 border border-border/30 
                               hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:bg-card/50"
                  >
                    <link.icon className="w-4 h-4 text-primary group-hover:scale-110 transition-transform duration-300" />
                    <span className="text-sm font-mono text-muted-foreground group-hover:text-foreground transition-colors duration-300">
                      {link.value}
                    </span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-border/20">
        <div className="container max-w-4xl mx-auto text-center">
          <p className="text-muted-foreground font-mono text-sm">
            © 2025 Michał Pycek. Future-facing tech. Human-centered design.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;