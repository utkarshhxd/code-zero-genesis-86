
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

interface ProblemSelectionProps {
  onSelect: (type: 'generate' | 'view') => void;
}

const ProblemSelection = ({ onSelect }: ProblemSelectionProps) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-3">
          <span>Master</span> Coding Challenges 
          <span className="font-nikea"> and </span> Get Graded
        </h2>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Practice with AI-generated problems or browse our collection. Submit your solutions and get instant feedback on your code quality.
        </p>
      </div>
      
      <Button 
        variant="outline" 
        size="lg"
        className="h-16 glass-card flex items-center justify-center gap-4 px-8 hover:scale-105 transition-all duration-300
                   bg-zerox-blue hover:bg-zerox-blue/90 text-white font-bold text-lg shadow-lg hover:shadow-zerox-blue/20"
        onClick={() => onSelect('generate')}
      >
        <Plus className="h-6 w-6" />
        Generate New Problem
      </Button>
    </div>
  );
};

export default ProblemSelection;
