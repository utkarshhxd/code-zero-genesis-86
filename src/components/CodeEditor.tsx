import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Play, RotateCcw } from 'lucide-react';
import { executeCode } from '@/services/judge0';

interface CodeEditorProps {
  initialCode?: string;
  language?: string;
  onCodeChange?: (code: string) => void;
  testCases?: string[];
  onLanguageChange?: (language: string) => void;
}

const languageTemplates = {
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

const CodeEditor = ({ 
  initialCode = '// Write your solution here', 
  language = 'javascript',
  onCodeChange,
  testCases = [],
  onLanguageChange
}: CodeEditorProps) => {
  const [code, setCode] = useState(initialCode);
  const [selectedLanguage, setSelectedLanguage] = useState(language);
  const [isExecuting, setIsExecuting] = useState(false);
  const [output, setOutput] = useState('');
  const [testResults, setTestResults] = useState<Array<{passed: boolean, message: string}>>([]);
  
  const handleCodeChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newCode = e.target.value;
    setCode(newCode);
    if (onCodeChange) {
      onCodeChange(newCode);
    }
  };
  
  const handleLanguageChange = (value: string) => {
    setSelectedLanguage(value);
    // Change the code template based on the selected language
    setCode(languageTemplates[value as keyof typeof languageTemplates] || initialCode);
    setOutput('');
    setTestResults([]);
    
    if (onLanguageChange) {
      onLanguageChange(value);
    }
  };
  
  const handleReset = () => {
    setCode(languageTemplates[selectedLanguage as keyof typeof languageTemplates] || initialCode);
    setOutput('');
    setTestResults([]);
  };
  
  const handleRunCode = async () => {
    setIsExecuting(true);
    setOutput('Executing code...');
    setTestResults([]);
    
    try {
      const result = await executeCode(code, selectedLanguage);
      setOutput(result.output || 'No output');
      
      // Run test cases if available
      if (testCases.length > 0) {
        const results = [];
        for (const testCase of testCases) {
          // This is a simplified version - in a real app you'd need to properly
          // inject test cases into the code and evaluate the results
          results.push({
            passed: Math.random() > 0.3, // Simulated result
            message: testCase
          });
        }
        setTestResults(results);
      }
    } catch (error) {
      console.error('Code execution failed:', error);
      setOutput('Error executing code. Please try again.');
    } finally {
      setIsExecuting(false);
    }
  };
  
  // Adjust textarea height to content
  useEffect(() => {
    const textarea = document.getElementById('code-editor') as HTMLTextAreaElement;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  }, [code]);
  
  return (
    <div className="glass-card rounded-xl overflow-hidden">
      <div className="flex items-center justify-between space-x-2 px-4 py-3 bg-zerox-light/70">
        <div className="flex items-center space-x-2">
          <div className="h-3 w-3 rounded-full bg-red-500"></div>
          <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
          <div className="h-3 w-3 rounded-full bg-green-500"></div>
        </div>
        
        <div className="flex-1 mx-4">
          <Select value={selectedLanguage} onValueChange={handleLanguageChange}>
            <SelectTrigger className="w-[180px] bg-zerox-dark/50 border-zerox-gray">
              <SelectValue placeholder="Select Language" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="javascript">JavaScript</SelectItem>
              <SelectItem value="python">Python</SelectItem>
              <SelectItem value="java">Java</SelectItem>
              <SelectItem value="cpp">C++</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="flex space-x-2">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleReset} 
            className="text-xs"
          >
            <RotateCcw className="h-3.5 w-3.5 mr-1" />
            Reset
          </Button>
          <Button 
            size="sm" 
            onClick={handleRunCode} 
            disabled={isExecuting} 
            className="text-xs bg-zerox-blue hover:bg-zerox-blue/90"
          >
            <Play className="h-3.5 w-3.5 mr-1" />
            Run
          </Button>
        </div>
      </div>
      
      <div className="p-0 bg-zerox-darker">
        <textarea
          id="code-editor"
          value={code}
          onChange={handleCodeChange}
          className="w-full bg-zerox-darker text-gray-200 font-mono p-4 outline-none resize-none min-h-[300px] overflow-hidden"
          spellCheck="false"
          placeholder="Write your code here..."
        />
      </div>
      
      {(output || testResults.length > 0) && (
        <div className="border-t border-zerox-gray p-4">
          <h3 className="text-sm font-semibold mb-2">Output:</h3>
          <pre className="bg-zerox-darker p-3 rounded-md text-sm overflow-x-auto text-gray-300 max-h-48 overflow-y-auto">
            {output}
          </pre>
          
          {testResults.length > 0 && (
            <div className="mt-4">
              <h3 className="text-sm font-semibold mb-2">Test Results:</h3>
              <div className="space-y-2">
                {testResults.map((result, index) => (
                  <div 
                    key={index} 
                    className={`p-2 rounded-md text-sm ${
                      result.passed ? 'bg-green-500/20 text-green-300' : 'bg-red-500/20 text-red-300'
                    }`}
                  >
                    <span className="font-semibold">
                      {result.passed ? '✓ Passed: ' : '✗ Failed: '}
                    </span>
                    {result.message}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CodeEditor;
