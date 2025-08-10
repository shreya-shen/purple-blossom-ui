import { Button } from "@/components/ui/button";
import logo from "@/assets/logo.png";

const Header = () => {
  return (
    <header className="relative z-10 flex items-center justify-between container-max py-6">
      <div className="flex items-center gap-3">
        <img src={logo} alt="Sarang Logo" className="w-10 h-10" />
        <span className="text-xl font-bold text-hero-foreground">Sarang</span>
      </div>
      
      <nav className="hidden md:flex items-center gap-8">
        <a href="#services" className="text-hero-foreground/80 hover:text-hero-foreground transition-colors font-medium">
          Services
        </a>
        <a href="#results" className="text-hero-foreground/80 hover:text-hero-foreground transition-colors font-medium">
          Results
        </a>
        <a href="#about" className="text-hero-foreground/80 hover:text-hero-foreground transition-colors font-medium">
          About Us
        </a>
        <a href="#blog" className="text-hero-foreground/80 hover:text-hero-foreground transition-colors font-medium">
          Blog
        </a>
      </nav>

      <Button variant="outline" className="border-hero-foreground/20 text-hero-foreground hover:bg-hero-foreground hover:text-hero">
        Talk To Us
      </Button>
    </header>
  );
};

export default Header;