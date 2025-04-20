
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Code, Settings, User } from 'lucide-react';

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 w-full bg-zerox-darker/70 backdrop-blur-md border-b border-zerox-gray/30 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <div className="bg-gradient-to-r from-zerox-blue to-zerox-purple p-[1px] rounded-md">
                <div className="bg-zerox-darker h-8 w-8 flex items-center justify-center rounded-md">
                  <Code className="h-5 w-5 text-white" />
                </div>
              </div>
              <span className="ml-2 text-xl font-bold gradient-text">Zero X</span>
            </Link>
          </div>
          
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-4">
              <Link to="/" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                Home
              </Link>
              <Link to="/problems" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                Problems
              </Link>
              <Link to="/learn" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                Learn
              </Link>
              <Button variant="outline" className="ml-4">
                Sign In
              </Button>
              <Button className="bg-gradient-to-r from-zerox-blue to-zerox-purple hover:opacity-90 transition-opacity">
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
              <Button className="w-full bg-gradient-to-r from-zerox-blue to-zerox-purple hover:opacity-90 transition-opacity">
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
