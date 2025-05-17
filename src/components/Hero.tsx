
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <div className="relative overflow-hidden pt-16">
      {/* Background decorations */}
      <div className="absolute top-0 left-1/4 w-1/2 h-1/2 bg-zerox-blue/10 rounded-full filter blur-3xl opacity-20"></div>
      <div className="absolute bottom-0 right-1/4 w-1/2 h-1/2 bg-zerox-purple/10 rounded-full filter blur-3xl opacity-20"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 text-center">
        <h1 className="sm:text-5xl md:text-6xl font-extrabold font-josefin text-white text-4xl">
          <span className="block md:inline-block align-middle font-['Canicule_Display_Typeface'] capitalize" style={{
            fontSize: '0.8em',
            textTransform: 'capitalize'
          }}>Master</span>
          <span className="mx-2 text-transparent bg-clip-text bg-gradient-to-r from-zerox-blue to-zerox-blue-light text-[1.15em] font-josefin font-extrabold">
            Data Structures
          </span>
          <span className="block md:inline-block align-middle font-['Canicule_Display_Typeface'] capitalize" style={{
            fontSize: '0.8em',
            textTransform: 'capitalize'
          }}>And</span>
          <span className="mx-2 text-transparent bg-clip-text bg-gradient-to-r from-zerox-blue to-zerox-blue-light text-[1.15em] font-josefin font-extrabold">
            Algorithms
          </span>
        </h1>
        <p className="mt-6 max-w-2xl mx-auto text-xl text-gray-300">
          Zero X helps you prepare for technical interviews with AI-generated coding challenges, solutions, and real-time feedback.
        </p>
        
        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            asChild 
            className="text-white px-8 py-6 text-lg border-0 hover:shadow-lg hover:shadow-zerox-blue/20 transition-all" 
            style={{
              background: "linear-gradient(90deg, rgba(0,180,216,1) 0%, rgba(114,9,183,1) 100%)",
            }}
          >
            <Link to="/problems">
              Start Coding <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
          <Button variant="outline" className="px-8 py-6 text-lg border-zerox-gray/30 hover:bg-zerox-gray/20">
            Learn More
          </Button>
        </div>
        
        <div className="mt-16 relative">
          <div className="glass-card rounded-xl p-1 max-w-4xl mx-auto">
            <div className="bg-zerox-dark rounded-lg overflow-hidden">
              <div className="flex items-center space-x-2 px-4 py-2 bg-zerox-light/50">
                <div className="h-3 w-3 rounded-full bg-red-500"></div>
                <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
                <div className="h-3 w-3 rounded-full bg-green-500"></div>
                <div className="ml-2 text-sm text-gray-400">Zero X Code Editor</div>
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
            <div className="h-12 w-32 bg-gradient-to-r from-zerox-blue to-zerox-purple rounded-full blur-xl opacity-30"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
