
import { useState } from 'react';
import Navbar from '@/components/Navbar';
import ProblemViewer from '@/components/ProblemViewer';
import CodeEditor from '@/components/CodeEditor';
import ProblemGenerator from '@/components/ProblemGenerator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Cpu, List, Plus } from 'lucide-react';
import { Link } from 'react-router-dom';

const defaultProblem = {
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

const initialCode = `/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
function twoSum(nums, target) {
  // Your solution here
};`;

const Problems = () => {
  const [currentProblem, setCurrentProblem] = useState(defaultProblem);
  const [currentCode, setCurrentCode] = useState(initialCode);
  const [showGeneratePanel, setShowGeneratePanel] = useState(false);
  const [testCases, setTestCases] = useState(defaultTestCases);
  
  const handleProblemGenerated = (problem: any) => {
    setCurrentProblem(problem);
    setShowGeneratePanel(false);
    
    // Update test cases based on the problem examples
    if (problem.examples) {
      const newTestCases = problem.examples.map((example: any, index: number) => 
        `Input: ${example.input} | Expected: ${example.output}`
      );
      setTestCases(newTestCases);
    }
    
    // Generate starter code
    setCurrentCode(`/**
 * Problem: ${problem.title}
 * Difficulty: ${problem.difficulty}
 */
function solution(params) {
  // Your code here
}`);
  };
  
  return (
    <div className="min-h-screen bg-zerox-dark">
      <Navbar />
      
      <main className="pt-16">
        {/* Header with navigation */}
        <div className="bg-zerox-darker py-4 border-b border-zerox-gray/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Button variant="outline" size="sm" asChild>
                  <Link to="/">
                    <ArrowLeft className="h-4 w-4 mr-1" />
                    Back
                  </Link>
                </Button>
                <h1 className="text-xl font-bold text-white">{currentProblem.title}</h1>
              </div>
              
              <div className="flex items-center space-x-2">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setShowGeneratePanel(!showGeneratePanel)}
                >
                  {showGeneratePanel ? (
                    <>
                      <List className="h-4 w-4 mr-1" />
                      Show Problems
                    </>
                  ) : (
                    <>
                      <Plus className="h-4 w-4 mr-1" />
                      Generate New
                    </>
                  )}
                </Button>
              </div>
            </div>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Column: Problem or Generator */}
            <div>
              {showGeneratePanel ? (
                <ProblemGenerator onProblemGenerated={handleProblemGenerated} />
              ) : (
                <ProblemViewer {...currentProblem} />
              )}
            </div>
            
            {/* Right Column: Code Editor */}
            <div>
              <CodeEditor 
                initialCode={currentCode}
                language="javascript"
                onCodeChange={setCurrentCode}
                testCases={testCases}
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Problems;
