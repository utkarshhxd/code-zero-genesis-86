
import { List } from "lucide-react";
import { ScrollArea } from "./ui/scroll-area";

interface Problem {
  id: number;
  title: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

const problems: Problem[] = [
  { id: 1, title: 'Two Sum', difficulty: 'easy' },
  { id: 2, title: 'Add Two Numbers', difficulty: 'medium' },
  { id: 3, title: 'Longest Substring', difficulty: 'medium' },
  // Add more problems as needed
];

const ProblemList = () => {
  const getDifficultyColor = (difficulty: Problem['difficulty']) => {
    switch (difficulty) {
      case 'easy':
        return 'text-green-500';
      case 'medium':
        return 'text-yellow-500';
      case 'hard':
        return 'text-red-500';
    }
  };

  return (
    <div className="w-72 bg-zerox-darker border-r border-zerox-gray/20 h-screen">
      <div className="p-4 border-b border-zerox-gray/20">
        <h2 className="text-xl font-bold flex items-center gap-2">
          <List className="h-5 w-5" />
          Previous Problems
        </h2>
      </div>
      <ScrollArea className="h-[calc(100vh-64px)]">
        <div className="p-4 space-y-2">
          {problems.map((problem) => (
            <button
              key={problem.id}
              className="w-full text-left p-3 rounded hover:bg-zerox-gray/10 transition-colors"
            >
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-400">#{problem.id}</span>
                <span className={`text-sm ${getDifficultyColor(problem.difficulty)}`}>
                  {problem.difficulty}
                </span>
              </div>
              <div className="mt-1 font-medium">{problem.title}</div>
            </button>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};

export default ProblemList;
