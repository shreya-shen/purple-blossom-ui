import logo from "@/assets/logo.png";

const Footer = () => {
  return (
    <footer className="section-padding bg-hero text-hero-foreground">
      <div className="container-max">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          {/* Brand Column */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <img src={logo} alt="Sarang Logo" className="w-10 h-10" />
              <span className="text-xl font-bold">Sarang</span>
            </div>
            <p className="text-hero-foreground/80 leading-relaxed mb-6 max-w-md">
              Empowering mental wellness through innovative therapy solutions and compassionate care. 
              Your journey to better mental health starts here.
            </p>
          </div>

          {/* Solutions */}
          <div>
            <h3 className="font-semibold mb-4">Solutions</h3>
            <ul className="space-y-3 text-hero-foreground/80">
              <li><a href="#" className="hover:text-hero-foreground transition-colors">Music Therapy</a></li>
              <li><a href="#" className="hover:text-hero-foreground transition-colors">Community Support</a></li>
              <li><a href="#" className="hover:text-hero-foreground transition-colors">Personalized Care</a></li>
              <li><a href="#" className="hover:text-hero-foreground transition-colors">Group Sessions</a></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-semibold mb-4">Support</h3>
            <ul className="space-y-3 text-hero-foreground/80">
              <li><a href="#" className="hover:text-hero-foreground transition-colors">Documentation</a></li>
              <li><a href="#" className="hover:text-hero-foreground transition-colors">Pricing</a></li>
              <li><a href="#" className="hover:text-hero-foreground transition-colors">Help Center</a></li>
              <li><a href="#" className="hover:text-hero-foreground transition-colors">Contact</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-hero-foreground/20 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-hero-foreground/60">
            © 2024 Sarang. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-hero-foreground/60">
            <a href="#" className="hover:text-hero-foreground transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-hero-foreground transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-hero-foreground transition-colors">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;