import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const CTASection = () => {
  return (
    <section className="section-padding bg-primary">
      <div className="container-max text-center">
        <div className="max-w-3xl mx-auto animate-fade-in">
          <h2 className="text-display text-primary-foreground mb-6">
            Ready to start your
            <br />
            <span className="text-accent">wellness journey?</span>
          </h2>
          
          <p className="text-lg text-primary-foreground/90 mb-8 leading-relaxed">
            Join thousands who have transformed their mental health with our personalized approach. 
            Take the first step towards a healthier, happier you.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button variant="accent" size="xl" className="gap-2">
              Get Started Today
              <ArrowRight className="w-5 h-5" />
            </Button>
            
            <Button 
              variant="outline" 
              size="xl" 
              className="border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground hover:text-primary"
            >
              Learn More
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;