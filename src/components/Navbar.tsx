
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Code, Menu, X } from 'lucide-react';

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 w-full bg-zerox-darker border-b border-zerox-gray/10 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <div className="bg-gradient-to-r from-zerox-blue to-zerox-purple rounded-md h-8 w-8 flex items-center justify-center">
                <Code className="h-4 w-4 text-white" />
              </div>
              <span className="ml-2 text-lg font-medium text-white">CodeZero</span>
            </Link>
          </div>
          
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-4">
              <Link 
                to="/" 
                className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm"
              >
                Home
              </Link>
              <Link 
                to="/problems" 
                className="text-white bg-zerox-gray/20 px-3 py-2 rounded-md text-sm font-medium"
              >
                Problems
              </Link>
              <Link 
                to="/learn" 
                className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm"
              >
                Learn
              </Link>
              <Button 
                variant="outline" 
                className="border-zerox-gray/30 text-gray-300 hover:bg-zerox-gray/20 hover:text-white"
              >
                Sign In
              </Button>
              <Button 
                className="bg-zerox-blue hover:bg-zerox-blue/90 text-white"
              >
                Sign Up
              </Button>
            </div>
          </div>
          
          <div className="md:hidden flex items-center">
            <button
              type="button"
              className="p-2 rounded-md text-gray-400 hover:text-white focus:outline-none"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <span className="sr-only">Open main menu</span>
              {mobileMenuOpen ? (
                <X className="block h-6 w-6" />
              ) : (
                <Menu className="block h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden bg-zerox-darker border-b border-zerox-gray/10">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link to="/" className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base">
              Home
            </Link>
            <Link to="/problems" className="text-white bg-zerox-gray/20 block px-3 py-2 rounded-md text-base font-medium">
              Problems
            </Link>
            <Link to="/learn" className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base">
              Learn
            </Link>
            <div className="pt-4 flex flex-col space-y-2">
              <Button variant="outline" className="w-full border-zerox-gray/30 text-gray-300">
                Sign In
              </Button>
              <Button 
                className="w-full bg-zerox-blue hover:bg-zerox-blue/90 text-white"
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
