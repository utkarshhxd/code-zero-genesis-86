
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { generateProblem } from '@/services/openai';
import { toast } from "sonner";
import { Loader2 } from 'lucide-react';

interface ProblemGeneratorProps {
  onProblemGenerated: (problem: any) => void;
}

const ProblemGenerator = ({ onProblemGenerated }: ProblemGeneratorProps) => {
  const [topic, setTopic] = useState('');
  const [difficulty, setDifficulty] = useState('medium');
  const [complexity, setComplexity] = useState([50]); // 0-100 scale
  const [customInstructions, setCustomInstructions] = useState('');
  const [generating, setGenerating] = useState(false);
  
  const handleGenerate = async () => {
    if (!topic) {
      toast.error('Please specify a topic for the problem');
      return;
    }
    
    setGenerating(true);
    
    try {
      const problem = await generateProblem({
        topic,
        difficulty,
        complexity: complexity[0],
        customInstructions
      });
      
      onProblemGenerated(problem);
      toast.success('Problem generated successfully!');
    } catch (error) {
      console.error('Failed to generate problem:', error);
      toast.error('Failed to generate problem. Please try again.');
    } finally {
      setGenerating(false);
    }
  };
  
  return (
    <div className="glass-card rounded-xl p-6 space-y-6">
      <h2 className="text-xl font-bold text-white">Generate New Problem</h2>
      
      <div className="space-y-4">
        <div>
          <label htmlFor="topic" className="block text-sm font-medium text-gray-300 mb-1">
            Topic or Data Structure
          </label>
          <Input
            id="topic"
            placeholder="e.g., Arrays, Linked Lists, Binary Trees"
            className="bg-zerox-light/30 border-zerox-gray text-white"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
          />
        </div>
        
        <div>
          <label htmlFor="difficulty" className="block text-sm font-medium text-gray-300 mb-1">
            Difficulty Level
          </label>
          <Select value={difficulty} onValueChange={setDifficulty}>
            <SelectTrigger id="difficulty" className="bg-zerox-light/30 border-zerox-gray text-white">
              <SelectValue placeholder="Select difficulty" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="easy">Easy</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="hard">Hard</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">
            Problem Complexity
          </label>
          <div className="pt-2 px-2">
            <Slider
              value={complexity}
              max={100}
              step={1}
              onValueChange={setComplexity}
              className="py-4"
            />
            <div className="flex justify-between text-xs text-gray-400 mt-1">
              <span>Simple</span>
              <span>Complex</span>
            </div>
          </div>
        </div>
        
        <div>
          <label htmlFor="instructions" className="block text-sm font-medium text-gray-300 mb-1">
            Custom Instructions (Optional)
          </label>
          <Textarea
            id="instructions"
            placeholder="Add any specific requirements or constraints for the problem..."
            className="bg-zerox-light/30 border-zerox-gray text-white min-h-[100px]"
            value={customInstructions}
            onChange={(e) => setCustomInstructions(e.target.value)}
          />
        </div>
      </div>
      
      <Button 
        onClick={handleGenerate} 
        disabled={generating} 
        className="w-full bg-gradient-to-r from-zerox-blue to-zerox-purple hover:opacity-90 transition-opacity"
      >
        {generating ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Generating...
          </>
        ) : (
          'Generate Problem'
        )}
      </Button>
    </div>
  );
};

export default ProblemGenerator;
