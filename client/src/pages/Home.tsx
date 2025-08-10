
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ArrowRight, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";
import { toast } from "sonner";
import { useAuthenticatedFetch } from "@/hooks/useAuthenticatedFetch";

const Home = () => {
  const [moodText, setMoodText] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [sentiment, setSentiment] = useState<{
    score: number;
    label: string;
    confidence: number;
  } | null>(null);
  const navigate = useNavigate();
  const { isSignedIn, user } = useUser();
  const { authenticatedFetch } = useAuthenticatedFetch();

  // Handle pending username from signup
  useEffect(() => {
    const setPendingUsername = async () => {
      if (isSignedIn) {
        const pendingUsername = localStorage.getItem('pendingUsername');
        if (pendingUsername) {
          try {
            console.log('Setting pending username:', pendingUsername);
            const response = await authenticatedFetch('/api/user/set-username', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ username: pendingUsername })
            });
            
            if (!response.ok) {
              throw new Error('Failed to set username');
            }
            
            const result = await response.json();
            console.log('Username set result:', result);
            
            // Clear the pending username
            localStorage.removeItem('pendingUsername');
            toast.success('Profile setup completed!');
          } catch (error) {
            console.error('Error setting username:', error);
            toast.error('Failed to complete profile setup');
          }
        }
      }
    };

    setPendingUsername();
  }, [isSignedIn, authenticatedFetch]);

  const handleAnalyzeMood = async () => {
    if (!isSignedIn) {
      toast.error("Please sign in to analyze your mood");
      navigate("/auth");
      return;
    }

    if (!moodText.trim()) {
      toast.error("Please describe how you're feeling");
      return;
    }

    setIsAnalyzing(true);
    
    try {
      // Analyze mood sentiment
      const response = await authenticatedFetch('/api/mood/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: moodText })
      });

      if (!response.ok) {
        throw new Error('Failed to analyze mood');
      }

      const sentimentData = await response.json();
      setSentiment(sentimentData);
      
      // Log mood to database
      try {
        await authenticatedFetch('/api/mood/log', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ 
            text: moodText,
            sentiment_score: sentimentData.score,
            sentiment_label: sentimentData.label
          })
        });
      } catch (logError) {
        console.error('Error logging mood to database:', logError);
        // Don't show error to user as the analysis still worked
      }
      
      setIsAnalyzing(false);
      toast.success("Mood analyzed successfully!");
    } catch (error) {
      console.error('Error analyzing mood:', error);
      setIsAnalyzing(false);
      toast.error("Failed to analyze mood. Please try again.");
      
      // Fallback to mock data
      const mockSentiments = [
        { score: -0.7, label: "Low", confidence: 0.85 },
        { score: -0.3, label: "Calm", confidence: 0.78 },
        { score: 0.1, label: "Neutral", confidence: 0.82 },
        { score: 0.5, label: "Happy", confidence: 0.91 },
        { score: 0.8, label: "Excited", confidence: 0.87 }
      ];
      
      const randomSentiment = mockSentiments[Math.floor(Math.random() * mockSentiments.length)];
      setSentiment(randomSentiment);
    }
  };

  const handleGetRecommendations = () => {
    if (!isSignedIn) {
      toast.error("Please sign in to get recommendations");
      navigate("/auth");
      return;
    }
    
    if (sentiment) {
      navigate("/recommendations", { state: { sentiment, moodText } });
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-white dark:bg-gray-900">
      {/* Full background image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-15"
        style={{
          backgroundImage: 'url(/lovable-uploads/landingPageIcon.png)',
        }}
      ></div>
      
      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Hero Section */}
        <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            {/* Main Headline */}
            <div className="space-y-6">
              <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-gray-900 dark:text-white leading-tight">
                The{" "}
                <span className="text-sarang-deep-purple dark:text-sarang-accent-purple">
                  loud voice
                </span>
                <br />
                of your{" "}
                <span className="text-sarang-accent-purple dark:text-sarang-periwinkle">
                  mood
                </span>
              </h1>
              
              <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto font-medium">
                We will help you show your soul to more people for less money
              </p>
            </div>

            {/* CTA Button */}
            <div className="flex justify-center pt-4">
              <Button 
                size="lg"
                className="bg-gray-900 dark:bg-white text-white dark:text-gray-900 hover:bg-gray-800 dark:hover:bg-gray-100 px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 hover:shadow-lg transform hover:-translate-y-0.5"
                onClick={() => document.getElementById('mood-analysis')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Talk to Us
              </Button>
            </div>
          </div>
        </div>

        {/* Services Section */}
        <div className="py-16 sm:py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {/* Mood Analysis Card */}
                <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100 dark:border-gray-700">
                  <div className="w-16 h-16 bg-sarang-deep-purple rounded-2xl flex items-center justify-center mb-6">
                    <img src="/lovable-uploads/mind.png" alt="Mind Analysis" className="w-8 h-8 invert" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                    Mood Analysis
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    We focus on the data that is really important for advanced music therapy analysis and optimization process.
                  </p>
                  <Button
                    variant="ghost"
                    className="mt-6 p-0 h-auto font-semibold text-sarang-deep-purple hover:text-sarang-accent-purple dark:text-sarang-accent-purple dark:hover:text-sarang-periwinkle"
                  >
                    Learn more
                  </Button>
                </div>

                {/* Music Recommendations Card */}
                <div className="bg-sarang-deep-purple rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 text-white">
                  <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mb-6">
                    <img src="/lovable-uploads/musicMind.png" alt="Music Mind" className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold mb-4">
                    Music Therapy
                  </h3>
                  <p className="text-purple-100 leading-relaxed">
                    Our content experts will create a digital marketing strategy that will work to find potential customers.
                  </p>
                </div>

                {/* Personalized Experience Card */}
                <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100 dark:border-gray-700 lg:col-span-1 md:col-span-2 lg:col-span-1">
                  <div className="w-16 h-16 bg-gradient-to-br from-sarang-accent-purple to-sarang-periwinkle rounded-2xl flex items-center justify-center mb-6">
                    <img src="/lovable-uploads/persons.png" alt="Personalized" className="w-8 h-8 invert" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                    Personalized Experience
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    Experts work with your emotions to find potential healing pathways.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mood Analysis Section */}
        <div id="mood-analysis" className="py-16 sm:py-20 bg-gray-50 dark:bg-gray-800/50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-6">
                  How are you feeling today?
                </h2>
                <p className="text-lg text-gray-600 dark:text-gray-300">
                  Share your thoughts and let our AI analyze your emotional state to recommend the perfect music therapy session.
                </p>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-lg border border-gray-100 dark:border-gray-700">
                <Textarea
                  placeholder="Express your feelings, thoughts, or describe your current mood..."
                  value={moodText}
                  onChange={(e) => setMoodText(e.target.value)}
                  className="min-h-[120px] text-lg border-gray-200 dark:border-gray-600 rounded-2xl resize-none focus:ring-2 focus:ring-sarang-deep-purple dark:focus:ring-sarang-accent-purple focus:border-transparent"
                />
                
                <div className="flex justify-center mt-6">
                  <Button
                    onClick={handleAnalyzeMood}
                    disabled={!moodText.trim() || isAnalyzing}
                    className="bg-sarang-deep-purple hover:bg-sarang-deep-purple/90 dark:bg-sarang-accent-purple dark:hover:bg-sarang-accent-purple/90 text-white px-8 py-4 rounded-2xl font-semibold text-lg transition-all duration-300 hover:shadow-lg transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isAnalyzing ? (
                      <div className="flex items-center space-x-3">
                        <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                        <span>Analyzing your emotions...</span>
                      </div>
                    ) : (
                      <div className="flex items-center space-x-3">
                        <Sparkles className="w-5 h-5" />
                        <span>Analyze My Mood</span>
                      </div>
                    )}
                  </Button>
                </div>
              </div>

              {sentiment && (
                <div className="mt-8 bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-lg border border-gray-100 dark:border-gray-700">
                  <div className="text-center space-y-6">
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                      Your Emotional State
                    </h3>
                    
                    <div className="space-y-4">
                      <div className="text-4xl font-bold text-sarang-deep-purple dark:text-sarang-accent-purple">
                        {sentiment.label}
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
                          <span>Confidence</span>
                          <span>{Math.round(sentiment.confidence * 100)}%</span>
                        </div>
                        <Progress 
                          value={sentiment.confidence * 100} 
                          className="h-3 bg-gray-200 dark:bg-gray-700"
                        />
                      </div>
                    </div>

                    <Button
                      onClick={handleGetRecommendations}
                      className="bg-sarang-deep-purple hover:bg-sarang-deep-purple/90 dark:bg-sarang-accent-purple dark:hover:bg-sarang-accent-purple/90 text-white px-8 py-4 rounded-2xl font-semibold text-lg transition-all duration-300 hover:shadow-lg transform hover:-translate-y-0.5"
                    >
                      <div className="flex items-center space-x-3">
                        <span>Get Music Recommendations</span>
                        <ArrowRight className="w-5 h-5" />
                      </div>
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
