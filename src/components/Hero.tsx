
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const greyGradient = "linear-gradient(90deg, #bdc3c7 0%, #2c3e50 100%)";

// New gradient-text class using only grey colors.
const gradientTextClass = "text-transparent bg-clip-text";
const gradientTextStyle = {
  background: greyGradient,
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  backgroundClip: "text"
};

const Hero = () => {
  return (
    <div className="relative overflow-hidden pt-16">
      {/* Background decorations, using grey palette */}
      <div className="absolute top-0 left-1/4 w-1/2 h-1/2 bg-[#bdc3c7]/10 rounded-full filter blur-3xl opacity-20"></div>
      <div className="absolute bottom-0 right-1/4 w-1/2 h-1/2 bg-[#2c3e50]/10 rounded-full filter blur-3xl opacity-20"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 text-center">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white">
          Master <span className={gradientTextClass} style={gradientTextStyle}>Data Structures</span> and <span className={gradientTextClass} style={gradientTextStyle}>Algorithms</span>
        </h1>
        <p className="mt-6 max-w-2xl mx-auto text-xl text-gray-300">
          Zero X helps you prepare for technical interviews with AI-generated coding challenges, solutions, and real-time feedback.
        </p>
        
        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild className="text-white px-8 py-6 text-lg border-0 shadow-[0_2px_16px_#2225]" style={{
            background: greyGradient
          }}>
            <Link to="/problems">
              Start Coding <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
          <Button variant="outline" className="px-8 py-6 text-lg text-[#23272b] border-[#bdc3c7] hover:bg-[#ececec]">
            Learn More
          </Button>
        </div>
        
        <div className="mt-16 relative">
          <div className="glass-card rounded-xl p-1 max-w-4xl mx-auto" style={{
            border: '1.5px solid #bdc3c7',
            background: "rgba(44,62,80,0.85)",
            boxShadow: "0 2px 26px #23272b22"
          }}>
            <div className="bg-[#23272b] rounded-lg overflow-hidden">
              <div className="flex items-center space-x-2 px-4 py-2 bg-[#23272b]/60">
                <div className="h-3 w-3 rounded-full bg-gray-500"></div>
                <div className="h-3 w-3 rounded-full bg-gray-300"></div>
                <div className="h-3 w-3 rounded-full bg-gray-500"></div>
                <div className="ml-2 text-sm text-gray-300">Zero X Code Editor</div>
              </div>
              <div className="p-6 text-left overflow-hidden">
                <pre className="text-sm sm:text-base text-gray-200 font-mono overflow-x-auto">
                  <code>{`// Zero X: AI-Powered Data Structure Challenge
function twoSum(nums, target) {
  const map = new Map();
  
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    
    if (map.has(complement)) {
      return [map.get(complement), i];
    }
    
    map.set(nums[i], i);
  }
  
  return null;
}`}</code>
                </pre>
              </div>
            </div>
          </div>
          
          <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2">
            <div className="h-12 w-32 rounded-full blur-xl opacity-20"
              style={{background: greyGradient}} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
