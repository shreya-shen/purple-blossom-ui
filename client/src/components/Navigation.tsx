
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { HeadphonesIcon, User, LogOut, Menu, X } from "lucide-react";
import { useUser, useClerk } from '@clerk/clerk-react';
import { toast } from "sonner";
import { ThemeToggle } from "@/components/ThemeToggle";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const Navigation = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { isSignedIn, user } = useUser();
  const { signOut } = useClerk();

  const navItems = [
    { path: "/", label: "Home" },
    { path: "/mood-history", label: "History" },
    { path: "/about", label: "About" },
  ];

  const handleSignOut = async () => {
    try {
      await signOut();
      toast.success("Signed out successfully");
      navigate("/");
    } catch (error) {
      toast.error("Error signing out");
    }
  };

  return (
    <nav className="glass-effect sticky top-0 z-50 border-b border-sarang-lavender/20 dark:border-sarang-accent-purple/20">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-18">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="relative">
              <img 
                src="/lovable-uploads/Sarang-logo-transparent.png" 
                alt="Sarang Logo" 
                className="h-10 w-10 sm:h-12 sm:w-12 transition-transform duration-300 group-hover:scale-110"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-sarang-deep-purple to-sarang-accent-purple bg-clip-text text-transparent">
                Sarang
              </span>
              <span className="text-xs font-medium text-sarang-purple/70 dark:text-sarang-periwinkle/70 -mt-1">
                Music Therapy
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8 xl:space-x-10">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`text-sm font-semibold transition-all duration-300 hover:text-sarang-deep-purple dark:hover:text-sarang-accent-purple relative group ${
                  location.pathname === item.path
                    ? "text-sarang-deep-purple dark:text-sarang-accent-purple"
                    : "text-gray-700 dark:text-gray-300"
                }`}
              >
                {item.label}
                <span className={`absolute -bottom-2 left-0 w-0 h-0.5 bg-gradient-to-r from-sarang-deep-purple to-sarang-accent-purple transition-all duration-300 group-hover:w-full ${
                  location.pathname === item.path ? "w-full" : ""
                }`} />
              </Link>
            ))}
            
            <ThemeToggle />
            
            {!isSignedIn ? (
              <Link to="/auth">
                <Button className="bg-gradient-to-r from-sarang-deep-purple to-sarang-accent-purple hover:from-sarang-deep-purple/90 hover:to-sarang-accent-purple/90 text-white px-6 xl:px-8 py-2.5 rounded-full font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-sarang-purple/30 text-sm">
                  Sign In
                </Button>
              </Link>
            ) : (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-10 w-10 rounded-full border-2 border-sarang-lavender dark:border-sarang-accent-purple hover:border-sarang-deep-purple dark:hover:border-sarang-periwinkle transition-colors duration-300">
                    <User className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56 glass-effect border-sarang-lavender/30 dark:border-sarang-accent-purple/30" align="end" forceMount>
                  <DropdownMenuItem className="font-normal text-gray-900 dark:text-gray-100 focus:bg-sarang-lavender/20 dark:focus:bg-sarang-accent-purple/20">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">
                        {user?.primaryEmailAddress?.emailAddress || user?.firstName || 'User'}
                      </p>
                      <p className="text-xs leading-none text-muted-foreground">
                        via Clerk
                      </p>
                    </div>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate('/settings')} className="text-gray-900 dark:text-gray-100 focus:bg-sarang-lavender/20 dark:focus:bg-sarang-accent-purple/20">
                    Settings
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleSignOut} className="text-gray-900 dark:text-gray-100 focus:bg-sarang-lavender/20 dark:focus:bg-sarang-accent-purple/20">
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden flex items-center space-x-2">
            <ThemeToggle />
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="h-9 w-9"
            >
              {mobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-sarang-lavender/30 dark:border-sarang-accent-purple/30 glass-effect">
            <div className="px-4 pt-4 pb-6 space-y-3">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block px-4 py-3 rounded-xl text-base font-medium transition-all duration-300 ${
                    location.pathname === item.path
                      ? "text-sarang-deep-purple dark:text-sarang-accent-purple bg-sarang-cream dark:bg-sarang-dark-purple/30 shadow-md"
                      : "text-gray-700 dark:text-gray-300 hover:text-sarang-deep-purple dark:hover:text-sarang-accent-purple hover:bg-sarang-lavender/20 dark:hover:bg-sarang-accent-purple/10"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
              
              <div className="pt-4 border-t border-sarang-lavender/30 dark:border-sarang-accent-purple/30">
                {!isSignedIn ? (
                  <Link to="/auth" onClick={() => setMobileMenuOpen(false)}>
                    <Button className="w-full bg-gradient-to-r from-sarang-deep-purple to-sarang-accent-purple hover:from-sarang-deep-purple/90 hover:to-sarang-accent-purple/90 text-white py-3 rounded-xl font-semibold transition-all duration-300 shadow-lg">
                      Sign In
                    </Button>
                  </Link>
                ) : (
                  <div className="space-y-3">
                    <div className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300 bg-sarang-cream/50 dark:bg-sarang-dark-purple/20 rounded-xl">
                      {user?.primaryEmailAddress?.emailAddress || user?.firstName || 'User'}
                    </div>
                    <Button
                      variant="ghost"
                      onClick={() => {
                        navigate('/settings');
                        setMobileMenuOpen(false);
                      }}
                      className="w-full justify-start text-gray-600 dark:text-gray-300 hover:bg-sarang-lavender/20 dark:hover:bg-sarang-accent-purple/10"
                    >
                      Settings
                    </Button>
                    <Button
                      variant="ghost"
                      onClick={() => {
                        handleSignOut();
                        setMobileMenuOpen(false);
                      }}
                      className="w-full justify-start text-gray-600 dark:text-gray-300 hover:bg-sarang-lavender/20 dark:hover:bg-sarang-accent-purple/10"
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      Sign Out
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};
