import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import heroBackground from "@/assets/hero-background.png";

const HeroSection = () => {
  return (
    <section 
      className="relative min-h-screen flex items-center justify-center text-center bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${heroBackground})` }}
    >
      {/* Dark overlay for better text readability */}
      <div className="absolute inset-0 bg-hero/60"></div>
      
      <div className="relative z-10 container-max animate-fade-in">
        <h1 className="text-hero text-hero-foreground mb-6 max-w-4xl mx-auto">
          MENTAL
          <br />
          <span className="text-accent">HEALTH</span>
        </h1>
        
        <p className="text-subheading text-hero-foreground/90 mb-8 max-w-2xl mx-auto leading-relaxed">
          Empowering minds through innovative therapy solutions. 
          Experience personalized mental health support that adapts to your unique journey towards wellness.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button variant="accent" size="lg" className="gap-2">
            LEARN MORE
            <ArrowRight className="w-5 h-5" />
          </Button>
          
          <Button variant="outline" size="lg" className="border-hero-foreground/20 text-hero-foreground hover:bg-hero-foreground hover:text-hero">
            EXPLORE
          </Button>
        </div>

        {/* Floating elements */}
        <div className="absolute top-20 left-10 animate-float">
          <div className="w-8 h-8 bg-accent rounded-full opacity-60"></div>
        </div>
        <div className="absolute bottom-32 right-16 animate-float" style={{ animationDelay: '1s' }}>
          <div className="w-6 h-6 bg-hero-foreground rounded-full opacity-40"></div>
        </div>
        <div className="absolute top-40 right-20 animate-float" style={{ animationDelay: '2s' }}>
          <div className="w-4 h-4 bg-accent rounded-full opacity-50"></div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;