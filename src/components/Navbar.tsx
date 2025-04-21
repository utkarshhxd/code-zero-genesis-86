import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Zap } from 'lucide-react';

const gradientStyle = {
  background: "linear-gradient(123deg, rgba(212, 223, 232, 0.77), rgba(58, 116, 152, 1), rgba(0, 43, 77, 1))"
};

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 w-full bg-zerox-darker/70 backdrop-blur-md border-b border-zerox-gray/30 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center group transition-all duration-300 hover:scale-105">
              <div className="bg-zerox-blue rounded-full h-8 w-8 flex items-center justify-center relative overflow-hidden">
                <Zap className="h-5 w-5 text-white transform -rotate-12" />
                <div className="absolute inset-0 bg-gradient-to-tr from-zerox-blue/0 via-white/20 to-transparent rotate-45 translate-x-full group-hover:translate-x-0 transition-transform duration-300" />
              </div>
              <span className="ml-2 text-xl font-bold text-white">Zero X</span>
            </Link>
          </div>
          
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-4">
              <Link 
                to="/" 
                className="nav-link text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transform hover:-translate-y-0.5 transition-all duration-300 hover:shadow-[0_0_15px_rgba(0,180,216,0.3)] relative before:absolute before:inset-0 before:bg-zerox-blue/10 before:rounded-md before:scale-x-0 before:origin-right hover:before:scale-x-100 before:transition-transform before:-z-10 hover:scale-105"
              >
                Home
              </Link>
              <Link 
                to="/problems" 
                className="nav-link text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transform hover:-translate-y-0.5 transition-all duration-300 hover:shadow-[0_0_15px_rgba(114,9,183,0.3)] relative before:absolute before:inset-0 before:bg-zerox-purple/10 before:rounded-md before:scale-x-0 before:origin-right hover:before:scale-x-100 before:transition-transform before:-z-10"
              >
                Problems
              </Link>
              <Link 
                to="/learn" 
                className="nav-link text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transform hover:-translate-y-0.5 transition-all duration-300 hover:shadow-[0_0_15px_rgba(0,180,216,0.3)] relative before:absolute before:inset-0 before:bg-zerox-blue/10 before:rounded-md before:scale-x-0 before:origin-right hover:before:scale-x-100 before:transition-transform before:-z-10"
              >
                Learn
              </Link>
              <Button 
                variant="outline" 
                className="ml-4 transform hover:scale-105 hover:-translate-y-0.5 transition-all duration-300 hover:shadow-[0_0_15px_rgba(255,255,255,0.2)]"
              >
                Sign In
              </Button>
              <Button 
                className="text-white transition-all duration-300 transform hover:scale-105 hover:-translate-y-0.5 hover:shadow-[0_0_20px_rgba(114,9,183,0.4)] border-0"
                style={gradientStyle}
              >
                Sign Up
              </Button>
            </div>
          </div>
          
          <div className="md:hidden flex items-center">
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white focus:outline-none"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <span className="sr-only">Open main menu</span>
              {mobileMenuOpen ? (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden bg-zerox-darker/95 backdrop-blur-md border-b border-zerox-gray/30">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link to="/" className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium">
              Home
            </Link>
            <Link to="/problems" className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium">
              Problems
            </Link>
            <Link to="/learn" className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium">
              Learn
            </Link>
            <div className="pt-4 flex flex-col space-y-2">
              <Button variant="outline" className="w-full">
                Sign In
              </Button>
              <Button 
                className="w-full text-white border-0"
                style={gradientStyle}
              >
                Sign Up
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
