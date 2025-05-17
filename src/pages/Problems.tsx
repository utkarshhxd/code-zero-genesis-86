
import { useState } from 'react';
import Navbar from '@/components/Navbar';
import ProblemViewer from '@/components/ProblemViewer';
import CodeEditor from '@/components/CodeEditor';
import ProblemGenerator from '@/components/ProblemGenerator';
import ProblemSelection from '@/components/ProblemSelection';
import ProblemList, { Problem } from '@/components/ProblemList';
import CodeGrader from '@/components/CodeGrader';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Book, Code } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Link } from 'react-router-dom';

const defaultProblem: Problem = {
  id: 0,
  title: "Two Sum",
  difficulty: "easy" as const,
  description: `<p>Given an array of integers <code>nums</code> and an integer <code>target</code>, return indices of the two numbers such that they add up to <code>target</code>.</p>
    <p>You may assume that each input would have exactly one solution, and you may not use the same element twice.</p>
    <p>You can return the answer in any order.</p>`,
  examples: [
    {
      input: 'nums = [2,7,11,15], target = 9',
      output: '[0,1]',
      explanation: 'Because nums[0] + nums[1] == 9, we return [0, 1].'
    },
    {
      input: 'nums = [3,2,4], target = 6',
      output: '[1,2]',
      explanation: 'Because nums[1] + nums[2] == 6, we return [1, 2].'
    }
  ],
  constraints: [
    '2 <= nums.length <= 10^4',
    '-10^9 <= nums[i] <= 10^9',
    '-10^9 <= target <= 10^9',
    'Only one valid answer exists.'
  ],
  hints: [
    'Try using a hash map to store values you\'ve seen so far.',
    'For each number, check if its complement (target - num) exists in the hash map.',
    'If it does, you found your pair!'
  ],
  solution: `function twoSum(nums, target) {
  const map = new Map();
  
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    
    if (map.has(complement)) {
      return [map.get(complement), i];
    }
    
    map.set(nums[i], i);
  }
  
  return null;
}`
};

const defaultTestCases = [
  'Input: nums = [2,7,11,15], target = 9 | Expected: [0,1]',
  'Input: nums = [3,2,4], target = 6 | Expected: [1,2]',
  'Input: nums = [3,3], target = 6 | Expected: [0,1]'
];

const initialCodeTemplates = {
  javascript: `/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
function twoSum(nums, target) {
  // Your solution here
};`,
  python: `def two_sum(nums, target):
    """
    :type nums: List[int]
    :type target: int
    :rtype: List[int]
    """
    # Your solution here
    pass`,
  java: `class Solution {
    public int[] twoSum(int[] nums, int target) {
        // Your solution here
        return new int[]{0, 0};
    }
}`,
  cpp: `class Solution {
public:
    vector<int> twoSum(vector<int>& nums, int target) {
        // Your solution here
        return {};
    }
};`
};

const Problems = () => {
  const [view, setView] = useState<'selection' | 'generate' | 'view'>('selection');
  const [currentProblem, setCurrentProblem] = useState<Problem>(defaultProblem);
  const [currentLanguage, setCurrentLanguage] = useState('javascript');
  const [currentCode, setCurrentCode] = useState(initialCodeTemplates.javascript);
  const [showGeneratePanel, setShowGeneratePanel] = useState(false);
  const [testCases, setTestCases] = useState(defaultTestCases);
  const [activeTab, setActiveTab] = useState<'code' | 'problem'>('problem');
  
  const handleProblemGenerated = (problem: any) => {
    setCurrentProblem(problem);
    setShowGeneratePanel(false);
    setView('view');
    
    // Update test cases based on the problem examples
    if (problem.examples) {
      const newTestCases = problem.examples.map((example: any) => 
        `Input: ${example.input} | Expected: ${example.output}`
      );
      setTestCases(newTestCases);
    }
    
    // Generate starter code
    const codeTemplate = initialCodeTemplates[currentLanguage as keyof typeof initialCodeTemplates] || 
      `// Problem: ${problem.title}\n// Difficulty: ${problem.difficulty}\n\n// Your code here`;
    
    setCurrentCode(codeTemplate);
  };
  
  const handleLanguageChange = (language: string) => {
    setCurrentLanguage(language);
    setCurrentCode(initialCodeTemplates[language as keyof typeof initialCodeTemplates] || currentCode);
  };

  const handleSelectionChoice = (type: 'generate' | 'view') => {
    setView(type);
    if (type === 'generate') {
      setActiveTab('problem');
    }
  };

  const handleBackToSelection = () => {
    setView('selection');
  };

  return (
    <div className="h-screen overflow-hidden bg-zerox-dark flex flex-col">
      <Navbar />
      
      <main className="flex flex-1 pt-16 overflow-hidden"> {/* Added overflow-hidden and flex-1 */}
        {view !== 'selection' && <ProblemList onSelectProblem={(problem) => setCurrentProblem(problem)} />}
        
        <div className={`flex-1 ${view !== 'selection' ? 'animate-subtle-fade' : ''} overflow-y-auto`}>
          {view === 'selection' ? (
            <ProblemSelection onSelect={handleSelectionChoice} />
          ) : (
            <div className="h-full flex flex-col">
              {/* Header with back button */}
              <div className="p-4 border-b border-zerox-gray/10 flex items-center gap-4">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="border-zerox-gray/20 bg-transparent hover:bg-zerox-gray/10"
                  onClick={handleBackToSelection}
                >
                  <ArrowLeft className="h-4 w-4 mr-1" />
                  Back
                </Button>
                
                {view === 'view' && (
                  <Tabs 
                    defaultValue="problem" 
                    value={activeTab} 
                    onValueChange={(value) => setActiveTab(value as 'problem' | 'code')}
                    className="ml-4"
                  >
                    <TabsList className="bg-zerox-light/30">
                      <TabsTrigger value="problem" className="gap-2 data-[state=active]:bg-zerox-blue/20">
                        <Book className="h-4 w-4" />
                        Problem
                      </TabsTrigger>
                      <TabsTrigger value="code" className="gap-2 data-[state=active]:bg-zerox-blue/20">
                        <Code className="h-4 w-4" />
                        Solution
                      </TabsTrigger>
                    </TabsList>
                  </Tabs>
                )}
              </div>

              {/* Main content area */}
              <div className="flex-1 overflow-y-auto p-6">
                {view === 'generate' ? (
                  <div className="max-w-2xl mx-auto">
                    <ProblemGenerator onProblemGenerated={handleProblemGenerated} />
                  </div>
                ) : (
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {activeTab === 'problem' ? (
                      <ProblemViewer {...currentProblem} />
                    ) : (
                      <div className="space-y-5">
                        <CodeEditor 
                          initialCode={currentCode}
                          language={currentLanguage}
                          onCodeChange={setCurrentCode}
                          testCases={testCases}
                          onLanguageChange={handleLanguageChange}
                        />
                        <CodeGrader 
                          code={currentCode}
                          language={currentLanguage}
                          problemTitle={currentProblem.title}
                        />
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Problems;

