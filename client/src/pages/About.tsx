
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { HeadphonesIcon, Music, ArrowUp, ArrowRight } from "lucide-react";

const About = () => {
  return (
    <div className="min-h-screen hero-gradient relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-sarang-accent-purple/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-sarang-periwinkle/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>
      
    <div className="max-w-5xl mx-auto space-y-8 sm:space-y-10 animate-fade-in px-4 sm:px-6 relative z-10 py-8 sm:py-12">
      {/* Header */}
      <div className="text-center space-y-6">
        <div className="flex justify-center">
          <div className="p-6 sm:p-8 bg-gradient-to-r from-sarang-deep-purple via-sarang-accent-purple to-sarang-periwinkle rounded-3xl shadow-2xl transform hover:scale-105 transition-all duration-500">
            <HeadphonesIcon className="h-16 w-16 sm:h-20 sm:w-20 text-white drop-shadow-lg" />
          </div>
        </div>
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-black bg-gradient-to-r from-sarang-deep-purple via-sarang-accent-purple to-sarang-periwinkle bg-clip-text text-transparent">
          About Sarang
        </h1>
        <p className="text-xl sm:text-2xl text-gray-700 dark:text-gray-200 max-w-3xl mx-auto px-4 transition-colors duration-300 font-medium leading-relaxed">
          Discover the science and heart behind our mood-based music therapy platform
        </p>
      </div>

      {/* Mission */}
      <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-sarang-lavender/30 dark:border-gray-600 rounded-xl p-4 sm:p-6 shadow-lg hover:shadow-xl transition-all duration-300">
        <CardHeader className="px-0 sm:px-6">
          <CardTitle className="text-xl sm:text-2xl text-sarang-purple dark:text-sarang-periwinkle transition-colors duration-300">Our Mission</CardTitle>
        </CardHeader>
        <CardContent className="px-0 sm:px-6">
          <p className="text-base sm:text-lg text-gray-700 dark:text-gray-300 leading-relaxed transition-colors duration-300">
            Sarang, meaning "love" in Korean, represents our commitment to providing compassionate, 
            AI-powered music therapy. We believe that music has the power to heal, uplift, and 
            transform emotional states. Our platform combines cutting-edge sentiment analysis with 
            proven music therapy principles to create personalized healing experiences.
          </p>
        </CardContent>
      </Card>

      {/* How It Works */}
      <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-sarang-lavender/30 dark:border-gray-600 rounded-xl p-4 sm:p-6 shadow-lg hover:shadow-xl transition-all duration-300">
        <CardHeader className="px-0 sm:px-6">
          <CardTitle className="flex items-center space-x-2 text-gray-900 dark:text-white transition-colors duration-300">
            <Music className="w-5 h-5 sm:w-6 sm:h-6 text-sarang-purple dark:text-sarang-periwinkle" />
            <span>The Science Behind Sarang</span>
          </CardTitle>
          <CardDescription className="text-gray-600 dark:text-gray-400 transition-colors duration-300">
            Understanding the technology and methodology that powers your therapeutic journey
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6 px-0 sm:px-6">
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center space-y-3">
              <div className="w-16 h-16 bg-sarang-lavender rounded-full flex items-center justify-center mx-auto">
                <span className="text-2xl">🧠</span>
              </div>
              <h3 className="font-semibold text-sarang-purple">Sentiment Analysis</h3>
              <p className="text-sm text-gray-600">
                Advanced AI analyzes your written emotions using natural language processing to understand your current mood state
              </p>
            </div>

            <div className="text-center space-y-3">
              <div className="w-16 h-16 bg-sarang-periwinkle rounded-full flex items-center justify-center mx-auto">
                <span className="text-2xl">🎵</span>
              </div>
              <h3 className="font-semibold text-sarang-purple">ISO Principle</h3>
              <p className="text-sm text-gray-600">
                We use the Iso-Moodia principle, matching your current mood first, then gradually introducing more uplifting music
              </p>
            </div>

            <div className="text-center space-y-3">
              <div className="w-16 h-16 bg-sarang-purple rounded-full flex items-center justify-center mx-auto">
                <span className="text-2xl">📈</span>
              </div>
              <h3 className="font-semibold text-sarang-purple">Gradual Uplift</h3>
              <p className="text-sm text-gray-600">
                Playlists are carefully crafted to slowly increase valence and energy, leading you to a more positive state
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Music Therapy Benefits */}
      <Card className="mood-card">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <ArrowUp className="w-6 h-6 text-sarang-purple" />
            <span>Benefits of Music Therapy</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="font-semibold text-gray-800">Emotional Benefits</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <span>Reduces stress and anxiety levels</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                  <span>Improves mood and emotional regulation</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                  <span>Enhances emotional expression and processing</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-pink-400 rounded-full"></div>
                  <span>Promotes relaxation and mindfulness</span>
                </li>
              </ul>
            </div>

            <div className="space-y-4">
              <h4 className="font-semibold text-gray-800">Physical Benefits</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
                  <span>Lowers heart rate and blood pressure</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-teal-400 rounded-full"></div>
                  <span>Releases endorphins and dopamine</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-indigo-400 rounded-full"></div>
                  <span>Improves sleep quality</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                  <span>Boosts immune system function</span>
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Research & Evidence */}
      <Card className="mood-card">
        <CardHeader>
          <CardTitle>Research & Evidence</CardTitle>
          <CardDescription>
            Scientific foundations supporting music therapy effectiveness
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h4 className="font-semibold text-blue-900 mb-2">Clinical Studies</h4>
            <p className="text-sm text-blue-800">
              Multiple peer-reviewed studies have demonstrated that structured music therapy can reduce 
              symptoms of depression by up to 25% and anxiety by up to 30% in participants over an 8-week period.
            </p>
          </div>

          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <h4 className="font-semibold text-green-900 mb-2">Neurological Impact</h4>
            <p className="text-sm text-green-800">
              Brain imaging studies show that music therapy activates the release of neurotransmitters 
              like serotonin and dopamine, which are crucial for mood regulation and emotional well-being.
            </p>
          </div>

          <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
            <h4 className="font-semibold text-purple-900 mb-2">Professional Recognition</h4>
            <p className="text-sm text-purple-800">
              Music therapy is recognized by healthcare professionals worldwide and is used in hospitals, 
              mental health facilities, and wellness centers as a complementary treatment approach.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* External Resources */}
      <Card className="mood-card">
        <CardHeader>
          <CardTitle>Learn More</CardTitle>
          <CardDescription>
            Explore additional resources about music therapy and mental wellness
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            <Button 
              variant="outline" 
              className="border-sarang-lavender text-sarang-purple hover:bg-sarang-lavender/20"
              onClick={() => window.open('https://www.musictherapy.org/', '_blank')}
            >
              American Music Therapy Association
            </Button>
            <Button 
              variant="outline" 
              className="border-sarang-lavender text-sarang-purple hover:bg-sarang-lavender/20"
              onClick={() => window.open('https://www.nimh.nih.gov/health/topics/mental-health-information', '_blank')}
            >
              Mental Health Resources
            </Button>
            <Button 
              variant="outline" 
              className="border-sarang-lavender text-sarang-purple hover:bg-sarang-lavender/20"
              onClick={() => window.open('https://www.who.int/news-room/fact-sheets/detail/mental-disorders', '_blank')}
            >
              WHO Mental Health Facts
            </Button>
            <Button 
              variant="outline" 
              className="border-sarang-lavender text-sarang-purple hover:bg-sarang-lavender/20"
              onClick={() => window.open('https://www.ncbi.nlm.nih.gov/pmc/articles/PMC4961957/', '_blank')}
            >
              Music Therapy Research
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Call to Action */}
      <Card className="glass-effect border-2 border-sarang-lavender/40 dark:border-sarang-accent-purple/30 shadow-2xl rounded-3xl p-6 sm:p-8 bg-gradient-to-r from-sarang-cream/80 to-sarang-lavender/60 dark:from-sarang-dark-purple/60 dark:to-sarang-deep-purple/40 transition-all duration-300 transform hover:-translate-y-1">
        <CardContent className="pt-6 text-center space-y-6">
          <div className="flex justify-center">
            <div className="p-3 bg-gradient-to-r from-sarang-deep-purple to-sarang-accent-purple rounded-2xl">
              <ArrowRight className="h-8 w-8 text-white" />
            </div>
          </div>
          <h3 className="text-3xl sm:text-4xl font-black bg-gradient-to-r from-sarang-deep-purple to-sarang-accent-purple bg-clip-text text-transparent">
            Ready to Start Your Healing Journey?
          </h3>
          <p className="text-lg sm:text-xl text-gray-700 dark:text-gray-200 max-w-3xl mx-auto font-medium leading-relaxed">
            Experience the power of personalized music therapy. Share your feelings, 
            discover your perfect playlist, and take the first step towards emotional wellness.
          </p>
          <Button 
            size="lg" 
            className="bg-gradient-to-r from-sarang-deep-purple to-sarang-accent-purple hover:from-sarang-deep-purple/90 hover:to-sarang-accent-purple/90 text-white px-8 py-4 rounded-2xl font-bold text-lg transition-all duration-300 hover:shadow-2xl hover:shadow-sarang-purple/40 transform hover:-translate-y-1"
            onClick={() => window.location.href = '/'}
          >
            Start Your Session
          </Button>
        </CardContent>
      </Card>
    </div>
    </div>
  );
};

export default About;
