
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Link } from 'react-router-dom';
import { Eye, EyeOff, Mail, Lock, UserPlus } from 'lucide-react';
import Navbar from '@/components/Navbar';

const SignUp = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle sign up logic here
    console.log('Sign up with:', { name, email, password });
  };

  return (
    <div className="min-h-screen bg-zerox-dark">
      <Navbar />
      
      <div className="pt-28 pb-16 px-4 sm:px-6 lg:px-8 max-w-md mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white">Create an Account</h1>
          <p className="mt-2 text-gray-400">Join CodeZero to start practicing today</p>
        </div>
        
        <div className="bg-zerox-darker rounded-xl p-6 border border-zerox-gray/10">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-white">Full Name</Label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <UserPlus className="h-5 w-5 text-gray-500" />
                </div>
                <Input
                  id="name"
                  type="text"
                  placeholder="John Doe"
                  className="bg-zerox-dark border-zerox-gray/20 pl-10 text-white"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email" className="text-white">Email</Label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-500" />
                </div>
                <Input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  className="bg-zerox-dark border-zerox-gray/20 pl-10 text-white"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password" className="text-white">Password</Label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-500" />
                </div>
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className="bg-zerox-dark border-zerox-gray/20 pl-10 text-white"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={8}
                />
                <button 
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-500 hover:text-gray-300" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-500 hover:text-gray-300" />
                  )}
                </button>
              </div>
              <p className="text-xs text-gray-500">Password must be at least 8 characters</p>
            </div>
            
            <div className="flex items-center">
              <input
                id="terms"
                name="terms"
                type="checkbox"
                className="h-4 w-4 rounded border-gray-300 text-zerox-blue focus:ring-zerox-blue"
                required
              />
              <label htmlFor="terms" className="ml-2 block text-sm text-gray-400">
                I agree to the <a href="#" className="text-zerox-blue hover:underline">Terms of Service</a> and <a href="#" className="text-zerox-blue hover:underline">Privacy Policy</a>
              </label>
            </div>
            
            <Button 
              type="submit" 
              className="w-full py-6" 
              style={{
                background: "linear-gradient(90deg, #00b4d8 0%, #0077b6 100%)",
              }}
            >
              Sign Up
            </Button>
            
            <div className="text-center text-gray-400">
              Already have an account?{" "}
              <Link to="/signin" className="text-zerox-blue hover:underline">
                Sign In
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
