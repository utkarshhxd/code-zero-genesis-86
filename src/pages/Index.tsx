
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import { ArrowRight, Code, BookOpen, Server, Database } from 'lucide-react';

const Index = () => {
  const features = [
    {
      icon: <Code className="h-10 w-10 text-zerox-blue" />,
      title: "Practice Coding",
      description: "Solve algorithm challenges with our interactive code editor and get instant feedback."
    },
    {
      icon: <Database className="h-10 w-10 text-zerox-blue-light" />,
      title: "Master Data Structures",
      description: "Build strong foundations with hands-on exercises covering essential data structures."
    },
    {
      icon: <BookOpen className="h-10 w-10 text-zerox-purple" />,
      title: "Learn Algorithms",
      description: "Understand complex algorithms with step-by-step solutions and visualizations."
    }
  ];

  return (
    <div className="min-h-screen bg-zerox-dark">
      <Navbar />
      
      <main>
        <Hero />
        
        {/* Features Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-zerox-darker">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-white">
                Practice. Learn. Master.
              </h2>
              <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                Everything you need to excel in technical interviews and coding assessments.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <div 
                  key={index}
                  className="bg-zerox-dark p-8 rounded-xl border border-zerox-gray/10 hover:border-zerox-blue/20 transition-all"
                >
                  <div className="h-14 w-14 rounded-full bg-zerox-blue/5 flex items-center justify-center mb-6">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                  <p className="text-gray-400">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Call to Action */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-zerox-dark to-zerox-darker">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">Ready to improve your coding skills?</h2>
            <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
              Start solving problems today and take your programming abilities to the next level.
            </p>
            
            <Button 
              asChild 
              size="lg"
              className="text-white px-8 py-7 text-lg transition-all" 
              style={{
                background: "linear-gradient(90deg, #00b4d8 0%, #0077b6 100%)",
              }}
            >
              <Link to="/problems">
                Get Started <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </section>
      </main>
      
      {/* Footer */}
      <footer className="bg-zerox-darker py-12 px-4 border-t border-zerox-gray/10">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-6 md:mb-0">
              <Link to="/" className="flex items-center">
                <Server className="h-6 w-6 text-zerox-blue mr-2" />
                <span className="text-xl font-bold text-white">Zero X</span>
              </Link>
            </div>
            
            <div className="flex space-x-8 items-center">
              <Link to="/" className="text-gray-400 hover:text-white transition-colors">Home</Link>
              <Link to="/problems" className="text-gray-400 hover:text-white transition-colors">Problems</Link>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">About</a>
            </div>
          </div>
          
          <div className="mt-8 pt-8 border-t border-zerox-gray/10 text-center text-gray-500 text-sm">
            <p>&copy; {new Date().getFullYear()} Zero X. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
