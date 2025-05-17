
import { List } from "lucide-react";
import { ScrollArea } from "./ui/scroll-area";

interface Problem {
  id: number;
  title: string;
  difficulty: 'easy' | 'medium' | 'hard';
  description: string;
}

interface ProblemListProps {
  onSelectProblem?: (problem: Problem) => void;
}

const problems: Problem[] = [
  { id: 1, title: 'Two Sum', difficulty: 'easy', description: 'Find two numbers that add up to a target' },
  { id: 2, title: 'Add Two Numbers', difficulty: 'medium', description: 'Add two numbers represented by linked lists' },
  { id: 3, title: 'Longest Substring', difficulty: 'medium', description: 'Find longest substring without repeating characters' },
  { id: 4, title: 'Median of Arrays', difficulty: 'hard', description: 'Find median of two sorted arrays' },
  { id: 5, title: 'Palindrome Number', difficulty: 'easy', description: 'Determine if a number reads the same backward' },
  // Add more problems as needed
];

const ProblemList = ({ onSelectProblem }: ProblemListProps) => {
  const getDifficultyColor = (difficulty: Problem['difficulty']) => {
    switch (difficulty) {
      case 'easy':
        return 'text-green-400 bg-green-500/10';
      case 'medium':
        return 'text-yellow-400 bg-yellow-500/10';
      case 'hard':
        return 'text-red-400 bg-red-500/10';
    }
  };

  return (
    <div className="w-64 bg-zerox-darker border-r border-zerox-gray/10 h-full flex flex-col">
      <div className="p-4 border-b border-zerox-gray/10 flex items-center">
        <List className="h-5 w-5 mr-2 text-zerox-blue" />
        <h2 className="text-base font-medium">Problems</h2>
      </div>
      <ScrollArea className="flex-1">
        <div className="p-3 space-y-1.5">
          {problems.map((problem, index) => (
            <button
              key={problem.id}
              className="w-full text-left p-3 rounded-md hover:bg-zerox-light/20 transition-all duration-200 
                       animate-subtle-fade problem-item opacity-0"
              style={{ animationDelay: `${index * 50}ms` }}
              onClick={() => onSelectProblem?.(problem)}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-500">#{problem.id}</span>
                <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${getDifficultyColor(problem.difficulty)}`}>
                  {problem.difficulty}
                </span>
              </div>
              <div className="mt-1 font-medium text-white/90">
                {problem.title}
              </div>
              <p className="text-xs text-gray-400 mt-1 line-clamp-2">
                {problem.description}
              </p>
            </button>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};

export default ProblemList;
