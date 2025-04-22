
import { Button } from "@/components/ui/button";
import { Plus, List, Award } from "lucide-react";

interface ProblemSelectionProps {
  onSelect: (type: 'generate' | 'view') => void;
}

const ProblemSelection = ({ onSelect }: ProblemSelectionProps) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-3">
          <span className="font-nikea">Master</span> Coding Challenges 
          <span className="font-nikea"> and </span> Get Graded
        </h2>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Practice with AI-generated problems or browse our collection. Submit your solutions and get instant feedback on your code quality.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl w-full px-4">
        <Button 
          variant="outline" 
          className="h-48 glass-card flex flex-col items-center justify-center gap-4 p-8 hover:scale-105 transition-transform"
          onClick={() => onSelect('generate')}
        >
          <Plus className="h-12 w-12" />
          <div className="text-center">
            <h3 className="text-xl font-semibold mb-2">Generate New Problem</h3>
            <p className="text-sm text-gray-400">Create a new AI-generated coding challenge tailored to your skill level</p>
          </div>
        </Button>

        <Button 
          variant="outline" 
          className="h-48 glass-card flex flex-col items-center justify-center gap-4 p-8 hover:scale-105 transition-transform"
          onClick={() => onSelect('view')}
        >
          <List className="h-12 w-12" />
          <div className="text-center">
            <h3 className="text-xl font-semibold mb-2">View Problems</h3>
            <p className="text-sm text-gray-400">Browse through existing coding challenges and get your solutions graded</p>
          </div>
        </Button>
      </div>
    </div>
  );
};

export default ProblemSelection;
