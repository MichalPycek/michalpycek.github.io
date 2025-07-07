import { useEffect, useRef } from "react";
import { Github, Linkedin, Mail, Globe } from "lucide-react";
import profileImage from "@/assets/profile-image.jpg";

const Index = () => {
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (heroRef.current) {
      heroRef.current.classList.add("animate-fade-in");
    }
  }, []);

  const contactLinks = [
    {
      icon: Globe,
      label: "Website",
      href: "https://vemicon.com",
      value: "vemicon.com",
    },
    {
      icon: Mail,
      label: "Email",
      href: "mailto:contact@vemicon.com",
      value: "contact@vemicon.com",
    },
    {
      icon: Linkedin,
      label: "LinkedIn",
      href: "https://linkedin.com/in/michalpycek",
      value: "in/michalpycek",
    },
    {
      icon: Github,
      label: "GitHub",
      href: "https://github.com/michalpycek",
      value: "michalpycek",
    },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground dark flex items-center justify-center px-4">
      <section ref={heroRef} className="container mx-auto py-12">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr,auto] items-center gap-8 max-w-3xl mx-auto px-8">
          {/* Profile Image */}
          <div className="flex justify-center lg:justify-center lg:order-2 w-fit mx-auto">
            <img
              src={profileImage}
              alt="Michał Pycek, Founder of Vemicon - AI-powered Salesforce solutions expert"
              className="max-w-[200px] object-contain shadow-lg rounded-md"
            />
          </div>

          {/* Content */}
          <div className="text-center lg:text-left space-y-6 lg:order-first">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight">
              Michał <span className="text-primary">Pycek</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground">
              Salesforce Architect
            </p>
            <p className="text-base md:text-lg text-muted-foreground/80">
              Crafting scalable systems that empower businesses.
            </p>

            {/* Contact Links */}
            <div className="contact-buttons flex lg:justify-start justify-center gap-3 mt-6">
              {contactLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={link.label}
                  aria-label={link.label}
                  className="bg-card rounded-lg p-3 border border-border hover:border-primary transition-all duration-300"
                >
                  <link.icon className="w-5 h-5 text-primary" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
