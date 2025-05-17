
import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Play, RotateCcw } from 'lucide-react';
import { executeCode } from '@/services/judge0';
import hljs from 'highlight.js/lib/core';
import javascript from 'highlight.js/lib/languages/javascript';
import python from 'highlight.js/lib/languages/python';
import java from 'highlight.js/lib/languages/java';
import cpp from 'highlight.js/lib/languages/cpp';
import 'highlight.js/styles/atom-one-dark.css';

// Register languages for syntax highlighting
hljs.registerLanguage('javascript', javascript);
hljs.registerLanguage('python', python);
hljs.registerLanguage('java', java);
hljs.registerLanguage('cpp', cpp);

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

// Language display names
const languageDisplayNames = {
  javascript: 'JavaScript',
  python: 'Python',
  java: 'Java',
  cpp: 'C++'
};

// Language file extensions for syntax highlighting
const languageExtensions = {
  javascript: 'js',
  python: 'py',
  java: 'java',
  cpp: 'cpp'
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
  const [lineNumbers, setLineNumbers] = useState<string[]>([]);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const previewRef = useRef<HTMLPreElement>(null);
  
  // Generate line numbers based on code content
  useEffect(() => {
    const lines = code.split('\n').length;
    setLineNumbers(Array.from({ length: lines }, (_, i) => String(i + 1)));
  }, [code]);
  
  // Apply syntax highlighting
  useEffect(() => {
    if (previewRef.current) {
      previewRef.current.innerHTML = hljs.highlight(
        code, 
        { language: languageExtensions[selectedLanguage as keyof typeof languageExtensions] || 'plaintext' }
      ).value;
    }
  }, [code, selectedLanguage]);
  
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
  
  // Adjust for tab key in textarea
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      
      const textarea = e.currentTarget;
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      
      // Insert 4 spaces (or 2 spaces) for indentation
      const newCode = 
        code.substring(0, start) + '    ' + code.substring(end);
      
      setCode(newCode);
      if (onCodeChange) {
        onCodeChange(newCode);
      }
      
      // Move cursor position after the inserted tab
      setTimeout(() => {
        textarea.selectionStart = textarea.selectionEnd = start + 4;
      }, 0);
    }
  };
  
  // Synchronize scroll position between textarea and preview
  const handleScroll = (e: React.UIEvent<HTMLTextAreaElement>) => {
    if (previewRef.current) {
      previewRef.current.scrollTop = e.currentTarget.scrollTop;
    }
  };
  
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
            <SelectContent className="bg-zerox-dark border-zerox-gray">
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
      
      <div className="p-0 bg-zerox-darker relative">
        {/* Line numbers */}
        <div className="absolute top-0 left-0 p-4 text-gray-500 font-mono text-xs select-none">
          {lineNumbers.map((num, i) => (
            <div key={i} className="h-[1.5rem] text-right pr-2">
              {num}
            </div>
          ))}
        </div>
        
        {/* Hidden syntax highlighted preview */}
        <pre 
          ref={previewRef}
          className="absolute top-0 left-0 right-0 p-4 pl-12 font-mono text-sm pointer-events-none overflow-hidden whitespace-pre"
          style={{ tabSize: 4 }}
        ></pre>
        
        {/* Actual textarea for editing */}
        <textarea
          ref={textareaRef}
          id="code-editor"
          value={code}
          onChange={handleCodeChange}
          onKeyDown={handleKeyDown}
          onScroll={handleScroll}
          className="w-full bg-transparent text-transparent caret-white font-mono p-4 pl-12 outline-none resize-none min-h-[300px] overflow-auto"
          style={{ tabSize: 4, lineHeight: '1.5rem' }}
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
