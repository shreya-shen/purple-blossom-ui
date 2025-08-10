import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Music, Mail, ArrowRight } from "lucide-react";
import { useSignIn, useSignUp } from '@clerk/clerk-react';
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const Auth = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [pendingVerification, setPendingVerification] = useState(false);
  const navigate = useNavigate();
  
  const { signIn, setActive } = useSignIn();
  const { signUp, setActive: setActiveSignUp } = useSignUp();

  const handleToggleMode = () => {
    setIsSignUp(!isSignUp);
    setEmail("");
    setPassword("");
    setUsername("");
    setVerificationCode("");
    setPendingVerification(false);
  };

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Please fill in all fields");
      return;
    }

    if (isSignUp && !username.trim()) {
      toast.error("Please enter a username");
      return;
    }

    try {
      setLoading(true);
      if (isSignUp) {
        // Sign up flow - create account first, then set username in our database
        const result = await signUp?.create({
          emailAddress: email,
          password,
        });

        if (result?.status === "complete") {
          await setActiveSignUp({ session: result.createdSessionId });
          
          // Store the username for profile creation
          localStorage.setItem('pendingUsername', username);
          
          toast.success("Account created successfully!");
          navigate("/");
        } else if (result?.status === "missing_requirements") {
          await signUp?.prepareEmailAddressVerification({ strategy: "email_code" });
          
          // Store the username for later use
          localStorage.setItem('pendingUsername', username);
          
          setPendingVerification(true);
          toast.success("Check your email for verification code");
        }
      } else {
        // Sign in flow
        const result = await signIn?.create({
          identifier: email,
          password,
        });

        if (result?.status === "complete") {
          await setActive({ session: result.createdSessionId });
          toast.success("Signed in successfully!");
          navigate("/");
        }
      }
    } catch (error: any) {
      toast.error(error.errors?.[0]?.message || "Authentication failed");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!verificationCode) {
      toast.error("Please enter the verification code");
      return;
    }

    try {
      setLoading(true);
      const result = await signUp?.attemptEmailAddressVerification({
        code: verificationCode,
      });

      if (result?.status === "complete") {
        await setActiveSignUp({ session: result.createdSessionId });
        
        // Store the username for profile creation
        localStorage.setItem('pendingUsername', username);
        
        toast.success("Email verified successfully!");
        navigate("/");
      }
    } catch (error: any) {
      toast.error(error.errors?.[0]?.message || "Verification failed");
    } finally {
      setLoading(false);
    }
  };

  const handleSpotifyAuth = async () => {
    try {
      setLoading(true);
      if (isSignUp) {
        await signUp?.authenticateWithRedirect({
          strategy: "oauth_spotify",
          redirectUrl: "/sso-callback",
          redirectUrlComplete: "/",
        });
      } else {
        await signIn?.authenticateWithRedirect({
          strategy: "oauth_spotify",
          redirectUrl: "/sso-callback", 
          redirectUrlComplete: "/",
        });
      }
    } catch (error: any) {
      toast.error("Spotify authentication failed");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen hero-gradient flex relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-sarang-accent-purple/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-sarang-periwinkle/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/4 w-60 h-60 bg-sarang-deep-purple/10 rounded-full blur-2xl animate-pulse delay-500"></div>
      </div>
      
      {/* Left Side - Decorative Elements */}
      <div className="hidden lg:flex lg:w-1/2 p-8 xl:p-12 flex-col justify-center items-center relative z-10">        
        {/* Audio Device Grid - Enhanced with new color scheme */}
        <div className="grid grid-cols-3 gap-4 xl:gap-6 mb-8 xl:mb-12">
          <div className="bg-gradient-to-br from-sarang-deep-purple to-sarang-accent-purple rounded-2xl h-20 xl:h-24 w-10 xl:w-12 flex items-center justify-center shadow-lg transform hover:scale-105 transition-all duration-300">
            <div className="bg-white rounded-full h-12 xl:h-16 w-3 xl:w-4"></div>
          </div>
          <div className="bg-gradient-to-br from-sarang-accent-purple to-sarang-periwinkle rounded-3xl h-20 xl:h-24 w-10 xl:w-12 flex items-center justify-center shadow-lg transform hover:scale-105 transition-all duration-300">
            <div className="bg-white rounded-full h-5 xl:h-6 w-5 xl:w-6"></div>
          </div>
          <div className="bg-gradient-to-br from-yellow-400 to-orange-500 rounded-3xl h-20 xl:h-24 w-10 xl:w-12 flex items-center justify-center shadow-lg transform hover:scale-105 transition-all duration-300">
            <div className="h-12 xl:h-16 w-1 bg-white rounded-full"></div>
          </div>
          
          <div className="bg-white border-3 border-sarang-deep-purple rounded-full h-20 xl:h-24 w-10 xl:w-12 flex items-center justify-center shadow-lg transform hover:scale-105 transition-all duration-300">
            <div className="bg-sarang-deep-purple rounded-full h-6 xl:h-8 w-6 xl:w-8"></div>
          </div>
          <div className="bg-gradient-to-br from-pink-400 to-purple-500 rounded-3xl h-20 xl:h-24 w-10 xl:w-12 flex flex-col items-center justify-center space-y-1 shadow-lg transform hover:scale-105 transition-all duration-300">
            {Array.from({length: 8}).map((_, i) => (
              <div key={i} className="bg-white h-0.5 w-4 xl:w-6 rounded-full"></div>
            ))}
          </div>
          <div className="bg-white border-2 border-sarang-lavender rounded-3xl h-20 xl:h-24 w-10 xl:w-12 flex items-center justify-center shadow-lg transform hover:scale-105 transition-all duration-300">
            <div className="space-y-2">
              <div className="bg-sarang-deep-purple rounded-full h-3 w-3"></div>
              <div className="bg-sarang-accent-purple rounded-full h-3 w-3"></div>
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-sarang-periwinkle to-sarang-lavender rounded-3xl h-20 xl:h-24 w-10 xl:w-12 flex items-center justify-center shadow-lg transform hover:scale-105 transition-all duration-300">
            <div className="bg-white rounded-sm h-5 xl:h-6 w-5 xl:w-6"></div>
          </div>
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 dark:from-gray-700 dark:to-gray-800 rounded-3xl h-20 xl:h-24 w-10 xl:w-12 flex flex-col items-center justify-center space-y-1 shadow-lg transform hover:scale-105 transition-all duration-300">
            {Array.from({length: 6}).map((_, i) => (
              <div key={i} className="bg-white h-0.5 w-4 xl:w-6 rounded-full"></div>
            ))}
          </div>
        </div>

        <div className="text-center max-w-lg glass-effect p-8 rounded-3xl">
          <div className="flex justify-center mb-6">
            <img 
              src="/lovable-uploads/landingPageIcon.png" 
              alt="Music Mind" 
              className="h-20 w-20 drop-shadow-lg" 
            />
          </div>
          <h1 className="text-4xl xl:text-5xl font-black text-gray-900 dark:text-white mb-6 leading-tight">
            Unleash Your{" "}
            <span className="bg-gradient-to-r from-sarang-deep-purple to-sarang-accent-purple bg-clip-text text-transparent">
              Emotions
            </span>,<br />
            Ignite Your{" "}
            <span className="bg-gradient-to-r from-sarang-periwinkle to-sarang-accent-purple bg-clip-text text-transparent">
              Mind!
            </span>
          </h1>
          <p className="text-xl text-gray-700 dark:text-gray-200 font-medium leading-relaxed">
            Introducing Sarang, the revolutionary music therapy app that redefines the way you experience emotional healing.
          </p>
        </div>
      </div>

      {/* Right Side - Auth Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 relative z-10">
        <div className="w-full max-w-md space-y-8">
          {/* Logo Section */}
          <div className="text-center space-y-6">
            <div className="flex justify-center">
              <div className="p-4 bg-gradient-to-r from-sarang-deep-purple to-sarang-accent-purple rounded-2xl shadow-2xl">
                <img 
                  src="/lovable-uploads/Sarang-logo-transparent.png" 
                  alt="Sarang Logo" 
                  className="h-16 w-16"
                />
              </div>
            </div>
            <div>
              <h2 className="text-4xl font-black bg-gradient-to-r from-sarang-deep-purple to-sarang-accent-purple bg-clip-text text-transparent">
                {isSignUp ? "Join Sarang" : "Welcome Back"}
              </h2>
              <p className="text-lg text-gray-700 dark:text-gray-300 mt-3 font-medium">
                {isSignUp 
                  ? "Create your account to start your healing journey" 
                  : "Sign in to continue your musical therapy experience"
                }
              </p>
            </div>
          </div>

          {/* Auth Card */}
          <Card className="glass-effect border-2 border-sarang-lavender/40 dark:border-sarang-accent-purple/30 shadow-2xl rounded-3xl overflow-hidden backdrop-blur-2xl">
            <CardContent className="p-8 space-y-6">{!pendingVerification ? (
                <>
                  {/* Spotify Button */}
                  <Button
                    onClick={handleSpotifyAuth}
                    disabled={loading}
                    className="w-full bg-gradient-to-r from-[#1DB954] to-[#1ed760] hover:from-[#1ed760] hover:to-[#1DB954] text-white py-4 rounded-2xl font-bold text-lg transition-all duration-300 flex items-center justify-center space-x-3 shadow-xl hover:shadow-2xl transform hover:-translate-y-1"
                  >
                    {loading ? (
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    ) : (
                      <>
                        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.42 1.56-.299.421-1.02.599-1.559.3z"/>
                        </svg>
                        <span>{isSignUp ? "Sign up" : "Login"} with Spotify</span>
                      </>
                    )}
                  </Button>

                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-sarang-lavender/30 dark:border-sarang-accent-purple/20"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <span className="px-4 bg-white/80 dark:bg-gray-800/80 text-gray-600 dark:text-gray-300 font-medium">Or continue with email</span>
                    </div>
                  </div>

                  {/* Email Sign In */}
                  <form onSubmit={handleEmailAuth} className="space-y-5">
                    <div className="space-y-3">
                      <Label htmlFor="email" className="text-gray-800 dark:text-gray-200 font-semibold">Email</Label>
                      <Input 
                        id="email" 
                        type="email" 
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="border-2 border-sarang-lavender/50 dark:border-sarang-accent-purple/40 focus:border-sarang-deep-purple dark:focus:border-sarang-accent-purple rounded-xl py-3 px-4 bg-white/80 dark:bg-gray-700/80 text-gray-900 dark:text-white font-medium transition-all duration-300"
                        disabled={loading}
                      />
                    </div>
                    
                    {isSignUp && (
                      <div className="space-y-3">
                        <Label htmlFor="username" className="text-gray-800 dark:text-gray-200 font-semibold">Username</Label>
                        <Input 
                          id="username" 
                          type="text" 
                          placeholder="Choose a username"
                          value={username}
                          onChange={(e) => setUsername(e.target.value)}
                          className="border-2 border-sarang-lavender/50 dark:border-sarang-accent-purple/40 focus:border-sarang-deep-purple dark:focus:border-sarang-accent-purple rounded-xl py-3 px-4 bg-white/80 dark:bg-gray-700/80 text-gray-900 dark:text-white font-medium transition-all duration-300"
                          disabled={loading}
                        />
                      </div>
                    )}
                    
                    <div className="space-y-3">
                      <Label htmlFor="password" className="text-gray-800 dark:text-gray-200 font-semibold">Password</Label>
                      <Input 
                        id="password" 
                        type="password" 
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="border-2 border-sarang-lavender/50 dark:border-sarang-accent-purple/40 focus:border-sarang-deep-purple dark:focus:border-sarang-accent-purple rounded-xl py-3 px-4 bg-white/80 dark:bg-gray-700/80 text-gray-900 dark:text-white font-medium transition-all duration-300"
                        disabled={loading}
                      />
                    </div>

                    <Button 
                      type="submit"
                      disabled={loading}
                      className="w-full bg-gradient-to-r from-sarang-deep-purple to-sarang-accent-purple hover:from-sarang-deep-purple/90 hover:to-sarang-accent-purple/90 text-white py-4 rounded-2xl font-bold text-lg transition-all duration-300 flex items-center justify-center space-x-3 shadow-xl hover:shadow-2xl transform hover:-translate-y-1"
                    >
                      {loading ? (
                        <div className="animate-spin rounded-full h-6 w-6 border-2 border-white border-t-transparent"></div>
                      ) : (
                        <>
                          <Mail className="w-5 h-5" />
                          <span>{isSignUp ? "Create Account" : "Sign In"}</span>
                        </>
                      )}
                    </Button>
                  </form>
                </>
              ) : (
                /* Verification Code Form */
                <div className="space-y-6">
                  <div className="text-center">
                    <div className="flex justify-center mb-4">
                      <div className="p-3 bg-gradient-to-r from-sarang-deep-purple to-sarang-accent-purple rounded-2xl">
                        <Mail className="h-8 w-8 text-white" />
                      </div>
                    </div>
                    <h3 className="text-2xl font-black text-gray-900 dark:text-white mb-3">
                      Verify Your Email
                    </h3>
                    <p className="text-gray-700 dark:text-gray-300 font-medium">
                      We sent a verification code to <strong className="text-sarang-deep-purple dark:text-sarang-accent-purple">{email}</strong>
                    </p>
                  </div>

                  <form onSubmit={handleVerifyEmail} className="space-y-5">
                    <div className="space-y-3">
                      <Label htmlFor="verification-code" className="text-gray-800 dark:text-gray-200 font-semibold">
                        Verification Code
                      </Label>
                      <Input 
                        id="verification-code" 
                        type="text" 
                        placeholder="Enter 6-digit code"
                        value={verificationCode}
                        onChange={(e) => setVerificationCode(e.target.value)}
                        className="border-2 border-sarang-lavender/50 dark:border-sarang-accent-purple/40 focus:border-sarang-deep-purple dark:focus:border-sarang-accent-purple rounded-xl py-3 px-4 bg-white/80 dark:bg-gray-700/80 text-gray-900 dark:text-white font-medium transition-all duration-300 text-center text-lg tracking-widest"
                        disabled={loading}
                        maxLength={6}
                      />
                    </div>

                    <Button 
                      type="submit"
                      disabled={loading || verificationCode.length !== 6}
                      className="w-full bg-gradient-to-r from-sarang-deep-purple to-sarang-accent-purple hover:from-sarang-deep-purple/90 hover:to-sarang-accent-purple/90 text-white py-4 rounded-2xl font-bold text-lg transition-all duration-300 flex items-center justify-center space-x-3 shadow-xl hover:shadow-2xl transform hover:-translate-y-1 disabled:opacity-50 disabled:transform-none"
                    >
                      {loading ? (
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      ) : (
                        <>
                          <ArrowRight className="w-5 h-5" />
                          <span>Verify Email</span>
                        </>
                      )}
                    </Button>
                  </form>

                  <div className="text-center">
                    <button
                      onClick={() => {
                        setPendingVerification(false);
                        setVerificationCode("");
                      }}
                      className="text-sm text-sarang-purple hover:text-sarang-purple/80 font-semibold transition-colors"
                      disabled={loading}
                    >
                      ← Back to sign up
                    </button>
                  </div>
                </div>
              )}

              {!pendingVerification && (
                /* Toggle Sign Up/Sign In */
                <div className="text-center">
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {isSignUp ? "Already have an account?" : "Don't have an account?"}
                    <button
                      onClick={handleToggleMode}
                      className="ml-1 text-sarang-purple hover:text-sarang-purple/80 font-semibold transition-colors"
                      disabled={loading}
                    >
                      {isSignUp ? "Sign In" : "Sign Up"}
                    </button>
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Auth;
