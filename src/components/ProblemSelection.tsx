
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

interface ProblemSelectionProps {
  onSelect: (type: 'generate' | 'view') => void;
}

const ProblemSelection = ({ onSelect }: ProblemSelectionProps) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-8 animate-subtle-fade">
      <div className="text-center mb-6 max-w-lg">
        <h2 className="text-3xl font-medium mb-3 text-white">
          Practice Coding Problems
        </h2>
        <p className="text-gray-400 text-sm">
          Generate custom coding challenges or browse our collection. 
          Get instant feedback on your solutions.
        </p>
      </div>
      
      <Button 
        onClick={() => onSelect('generate')}
        className="flex items-center gap-2 px-6 py-6 bg-zerox-blue hover:bg-zerox-blue/90 text-white 
                 rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-zerox-blue/20 hover:-translate-y-1"
      >
        <Plus className="h-5 w-5" />
        <span className="font-medium">Generate Problem</span>
      </Button>
    </div>
  );
};

export default ProblemSelection;
