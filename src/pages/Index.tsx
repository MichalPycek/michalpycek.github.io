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
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-glow"></div>
          <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-accent/10 rounded-full blur-3xl animate-glow" style={{ animationDelay: "1s" }}></div>
        </div>
        
        <div className="container max-w-4xl mx-auto text-center relative z-10">
          <div className="mb-8 flex justify-center">
            <div className="relative">
              <img
                src={profileImage}
                alt="Michał Pycek"
                className="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover border-2 border-primary/20 shadow-2xl transform scale-75 origin-center"
                style={{
                  boxShadow: "hsl(var(--shadow-glow))"
                }}
              />
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary/20 to-accent/20 animate-pulse"></div>
            </div>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-4 font-sans tracking-tight">
            <span className="bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
              Michał Pycek
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground mb-6 font-mono font-light">
            Founder of Vemicon
          </p>
          
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Future-facing tech. Human-centered design.
          </p>
        </div>
      </section>

      {/* About Section */}
      <section ref={aboutRef} className="py-20 px-6">
        <div className="container max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center font-mono">
            About Me
          </h2>
          
          <div className="bg-card rounded-2xl p-8 md:p-12 border border-border/50 shadow-lg"
               style={{ boxShadow: "hsl(var(--shadow-card))" }}>
            <p className="text-lg leading-relaxed text-muted-foreground">
              I design AI-powered Salesforce solutions that help businesses move faster and grow smarter. 
              Passionate about automation, creative design, and impactful strategy, I focus on creating 
              systems that bridge the gap between cutting-edge technology and meaningful human experiences.
            </p>
          </div>
        </div>
      </section>

      {/* What I Do Section */}
      <section ref={workRef} className="py-20 px-6 bg-card/20">
        <div className="container max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center font-mono">
            What I Do
          </h2>
          
          <div className="grid gap-6 md:gap-8">
            {focusAreas.map((area, index) => (
              <div
                key={index}
                className="group bg-card/50 backdrop-blur-sm rounded-xl p-6 border border-border/30 
                           hover:border-primary/30 transition-all duration-300 hover:shadow-lg
                           hover:bg-card/70 cursor-default"
                style={{
                  animationDelay: `${index * 0.1}s`
                }}
              >
                <div className="flex items-center space-x-4">
                  <div className="w-2 h-2 bg-primary rounded-full group-hover:scale-150 transition-transform duration-300"></div>
                  <p className="text-lg font-medium text-foreground group-hover:text-primary transition-colors duration-300">
                    {area}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Connect Section */}
      <section ref={contactRef} className="py-20 px-6">
        <div className="container max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center font-mono">
            Connect
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {contactLinks.map((link, index) => (
              <a
                key={index}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-card rounded-xl p-6 border border-border/50 
                           hover:border-primary/50 transition-all duration-300 hover:shadow-lg
                           hover:bg-card/80 hover:-translate-y-1"
                style={{
                  animationDelay: `${index * 0.1}s`
                }}
              >
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center
                                  group-hover:bg-primary/20 transition-colors duration-300">
                    <link.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground group-hover:text-primary transition-colors duration-300">
                      {link.label}
                    </p>
                    <p className="text-sm text-muted-foreground font-mono">
                      {link.value}
                    </p>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-border/30">
        <div className="container max-w-4xl mx-auto text-center">
          <p className="text-muted-foreground font-mono text-sm">
            © 2024 Michał Pycek. Future-facing tech. Human-centered design.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;