import { List } from "lucide-react";
import { ScrollArea } from "./ui/scroll-area";

export interface Problem {
  id: number;
  title: string;
  difficulty: 'easy' | 'medium' | 'hard';
  description: string;
  examples: Array<{
    input: string;
    output: string;
    explanation?: string;
  }>;
  constraints: string[];
  hints?: string[];
  solution?: string;
}

interface ProblemListProps {
  onSelectProblem?: (problem: Problem) => void;
}

const problems: Problem[] = [
  { 
    id: 1, 
    title: 'Two Sum', 
    difficulty: 'easy', 
    description: 'Find two numbers that add up to a target',
    examples: [
      {
        input: 'nums = [2,7,11,15], target = 9',
        output: '[0,1]',
        explanation: 'Because nums[0] + nums[1] == 9, we return [0, 1].'
      }
    ],
    constraints: ['2 <= nums.length <= 10^4', '-10^9 <= nums[i] <= 10^9'],
    hints: ['Try using a hash map to store values'],
    solution: 'function twoSum(nums, target) { /* solution code */ }'
  },
  { 
    id: 2, 
    title: 'Add Two Numbers', 
    difficulty: 'medium', 
    description: 'Add two numbers represented by linked lists',
    examples: [
      {
        input: 'l1 = [2,4,3], l2 = [5,6,4]',
        output: '[7,0,8]',
        explanation: '342 + 465 = 807.'
      }
    ],
    constraints: ['The number of nodes in each linked list is in the range [1, 100]'],
    hints: ['Keep track of the carry using a variable']
  },
  { 
    id: 3, 
    title: 'Longest Substring', 
    difficulty: 'medium', 
    description: 'Find longest substring without repeating characters',
    examples: [
      {
        input: 's = "abcabcbb"',
        output: '3',
        explanation: 'The answer is "abc", with the length of 3.'
      }
    ],
    constraints: ['0 <= s.length <= 5 * 10^4', 's consists of English letters, digits, symbols and spaces.']
  },
  { 
    id: 4, 
    title: 'Median of Arrays', 
    difficulty: 'hard', 
    description: 'Find median of two sorted arrays',
    examples: [
      {
        input: 'nums1 = [1,3], nums2 = [2]',
        output: '2.00000',
        explanation: 'Merged array = [1,2,3] and median is 2.'
      }
    ],
    constraints: ['nums1.length == m', 'nums2.length == n', '0 <= m <= 1000', '0 <= n <= 1000']
  },
  { 
    id: 5, 
    title: 'Palindrome Number', 
    difficulty: 'easy', 
    description: 'Determine if a number reads the same backward',
    examples: [
      {
        input: 'x = 121',
        output: 'true',
        explanation: '121 reads as 121 from left to right and from right to left.'
      }
    ],
    constraints: ['-2^31 <= x <= 2^31 - 1']
  }
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
