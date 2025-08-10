import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import musicMind from "@/assets/music-mind.png";
import community from "@/assets/community.png";

const ServicesSection = () => {
  return (
    <section className="section-padding bg-background">
      <div className="container-max">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left Column - Services Header */}
          <div className="animate-fade-in">
            <h2 className="text-display text-foreground mb-6">
              Our
              <br />
              <span className="text-primary">services</span>
            </h2>
            
            <p className="text-muted-foreground mb-8 leading-relaxed">
              We focus on the data that is really important for mental health outcomes. 
              By understanding individual needs, we create personalized therapy plans 
              that optimize healing and enhance your well-being journey.
            </p>
            
            <Button variant="default" size="lg">
              Learn more
            </Button>
          </div>

          {/* Right Column - Service Cards */}
          <div className="grid gap-6">
            {/* Music Therapy Card */}
            <Card className="p-8 bg-muted border-none shadow-card hover:shadow-lg transition-all duration-300 group">
              <div className="flex items-start gap-6">
                <div className="w-16 h-16 bg-accent/10 rounded-lg flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                  <img src={musicMind} alt="Music Therapy" className="w-10 h-10" />
                </div>
                <div className="flex-1">
                  <h3 className="text-headline font-semibold text-foreground mb-3">
                    Music Therapy
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Harness the healing power of music to unlock emotional expression, 
                    reduce anxiety, and build resilience through personalized musical interventions.
                  </p>
                </div>
              </div>
            </Card>

            {/* Community Support Card */}
            <Card className="p-8 bg-primary text-primary-foreground border-none shadow-card hover:shadow-lg transition-all duration-300 group">
              <div className="flex items-start gap-6">
                <div className="w-16 h-16 bg-primary-foreground/10 rounded-lg flex items-center justify-center group-hover:bg-primary-foreground/20 transition-colors">
                  <img src={community} alt="Community Support" className="w-10 h-10" />
                </div>
                <div className="flex-1">
                  <h3 className="text-headline font-semibold mb-3">
                    Community Support
                  </h3>
                  <p className="text-primary-foreground/90 leading-relaxed">
                    Connect with others on similar journeys through our supportive community programs 
                    designed to foster healing, understanding, and shared growth.
                  </p>
                </div>
              </div>
            </Card>

            {/* Personalized Care Card */}
            <Card className="p-8 bg-muted border-none shadow-card hover:shadow-lg transition-all duration-300 group">
              <div className="flex items-start gap-6">
                <div className="w-16 h-16 bg-accent/10 rounded-lg flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                  <div className="w-8 h-8 bg-accent rounded-full"></div>
                </div>
                <div className="flex-1">
                  <h3 className="text-headline font-semibold text-foreground mb-3">
                    Personalized Care
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Experience tailored mental health solutions that adapt to your unique needs, 
                    preferences, and goals for comprehensive well-being support.
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;