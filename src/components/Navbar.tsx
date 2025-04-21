
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Logo from "./Logo"; // Use new Logo component

// Styles for nav link 3D hover - use Tailwind + custom
const navLinkBase =
  "nav-link text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium relative will-change-transform transition-all duration-200";
const navLink3d =
  "group perspective-[600px] hover:scale-[1.08] active:scale-95 focus:scale-105";
const navLinkAfter =
  "after:absolute after:left-0 after:top-0 after:w-full after:h-full after:rounded-md after:transition-all after:duration-300 after:content-[''] after:-z-10";

const navLink3dHover =
  "hover:after:bg-gradient-to-br hover:after:from-[#bdc3c7]/70 hover:after:via-[#888] hover:after:to-[#2c3e50]/70 hover:after:blur-sm hover:after:opacity-30";
const navLinkActiveShadow =
  "hover:shadow-[0_6px_24px_0_rgb(44,62,80,0.15)] hover:z-10";
const desktopNavStyle =
  "ml-10 flex items-center space-x-4";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 w-full bg-[#23272b]/70 backdrop-blur-2xl border-b border-[#4b4b4d] z-50 shadow-[0_2px_22px_0_#bdc3c744]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-2 select-none">
            <Link to="/" className="flex items-center group focus:outline-none hover:scale-105 transition duration-300">
              <Logo size={38} />
              <span className="ml-2 text-xl font-bold" style={{
                background: "linear-gradient(90deg, #bdc3c7, #2c3e50)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text"
              }}>Zero X</span>
            </Link>
          </div>

          <div className="hidden md:block">
            <div className={desktopNavStyle}>
              <Link
                to="/"
                className={`${navLinkBase} ${navLink3d} ${navLinkAfter} ${navLink3dHover} ${navLinkActiveShadow}`}
                tabIndex={0}
                style={{ fontWeight: 600 }}
              >
                Home
              </Link>
              <Link
                to="/problems"
                className={`${navLinkBase} ${navLink3d} ${navLinkAfter} ${navLink3dHover} ${navLinkActiveShadow}`}
                tabIndex={0}
                style={{ fontWeight: 600 }}
              >
                Problems
              </Link>
              <Link
                to="/learn"
                className={`${navLinkBase} ${navLink3d} ${navLinkAfter} ${navLink3dHover} ${navLinkActiveShadow}`}
                tabIndex={0}
                style={{ fontWeight: 600 }}
              >
                Learn
              </Link>
              <Button
                variant="outline"
                className="ml-4 transform hover:scale-105 hover:-translate-y-0.5 transition-all duration-300 hover:shadow-[0_0_15px_#8884] font-semibold text-[#444] bg-[#e8eaec] border-[#b3b6b7]"
                style={{
                  boxShadow: "0 1px 8px 0 #babdbe21",
                  background: "linear-gradient(90deg,#bdc3c7 20%,#e6eaef 100%)",
                  color: "#2c3e50"
                }}
              >
                Sign In
              </Button>
              <Button
                className="bg-gradient-to-r from-[#bdc3c7] to-[#2c3e50] hover:opacity-95 transition-all duration-300 transform hover:scale-105 hover:-translate-y-0.5 hover:shadow-[0_0_18px_#58595c66] font-semibold border-0 text-[#f8f9fa]"
                style={{
                  background: "linear-gradient(90deg, #bdc3c7 0%, #2c3e50 100%)",
                  color: "#222"
                }}
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
      {/* Mobile menu, with similar 3D effect if open */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#23272b]/95 backdrop-blur-lg border-b border-[#3e4144]">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link to="/" className={`block px-3 py-2 rounded-md text-base font-medium text-gray-200 hover:text-white hover:bg-gradient-to-r hover:from-[#bdc3c7]/70 hover:to-[#2c3e50]/70 transition-all`}>Home</Link>
            <Link to="/problems" className={`block px-3 py-2 rounded-md text-base font-medium text-gray-200 hover:text-white hover:bg-gradient-to-r hover:from-[#bdc3c7]/70 hover:to-[#2c3e50]/70 transition-all`}>Problems</Link>
            <Link to="/learn" className={`block px-3 py-2 rounded-md text-base font-medium text-gray-200 hover:text-white hover:bg-gradient-to-r hover:from-[#bdc3c7]/70 hover:to-[#2c3e50]/70 transition-all`}>Learn</Link>
            <div className="pt-4 flex flex-col space-y-2">
              <Button variant="outline" className="w-full bg-[#dfdfe0]/90 text-[#23272b] border-[#bdc3c7] hover:bg-[#bdc3c7]">Sign In</Button>
              <Button className="w-full bg-gradient-to-r from-[#bdc3c7] to-[#2c3e50] hover:opacity-95 transition-opacity text-[#23272b]">Sign Up</Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
