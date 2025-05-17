
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CopyIcon, ExternalLink } from 'lucide-react';
import { toast } from 'sonner';

interface ProblemViewerProps {
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

const ProblemViewer = ({
  title,
  difficulty,
  description,
  examples,
  constraints,
  hints,
  solution
}: ProblemViewerProps) => {
  const [showSolution, setShowSolution] = useState(false);
  
  const difficultyColors = {
    easy: 'bg-green-500/10 text-green-400',
    medium: 'bg-yellow-500/10 text-yellow-400',
    hard: 'bg-red-500/10 text-red-400'
  };
  
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success('Copied to clipboard');
  };
  
  return (
    <div className="glass-panel rounded-lg overflow-hidden animate-subtle-fade">
      <div className="px-5 py-4 bg-zerox-darker/60 border-b border-zerox-gray/20">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-medium text-white">{title}</h2>
          <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${difficultyColors[difficulty]}`}>
            {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
          </span>
        </div>
      </div>
      
      <div className="p-5">
        <Tabs defaultValue="problem" className="w-full">
          <TabsList className="grid grid-cols-2 mb-5">
            <TabsTrigger value="problem">Problem</TabsTrigger>
            <TabsTrigger value="hints">Hints</TabsTrigger>
          </TabsList>
          
          <TabsContent value="problem" className="text-gray-300 space-y-4">
            <div className="prose prose-invert max-w-none">
              <div dangerouslySetInnerHTML={{ __html: description }} />
            </div>
            
            <div className="mt-5">
              <h3 className="text-base font-medium mb-2">Constraints:</h3>
              <ul className="list-disc list-inside space-y-1 text-gray-400 text-sm">
                {constraints.map((constraint, index) => (
                  <li key={index}>{constraint}</li>
                ))}
              </ul>
            </div>
            
            <div className="mt-5 space-y-4">
              <h3 className="text-base font-medium mb-2">Examples:</h3>
              {examples.map((example, index) => (
                <div key={index} className="bg-zerox-darker/60 p-4 rounded-md">
                  <div className="mb-3">
                    <h4 className="text-sm font-medium text-gray-300 mb-2">Example {index + 1}:</h4>
                    <div className="flex flex-col space-y-3">
                      <div>
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-medium text-gray-500">Input:</span>
                          <button 
                            onClick={() => copyToClipboard(example.input)}
                            className="text-gray-500 hover:text-gray-300"
                          >
                            <CopyIcon className="h-3.5 w-3.5" />
                          </button>
                        </div>
                        <pre className="mt-1 bg-zerox-darker p-2 rounded text-sm overflow-x-auto text-gray-300">
                          {example.input}
                        </pre>
                      </div>
                      
                      <div>
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-medium text-gray-500">Output:</span>
                          <button 
                            onClick={() => copyToClipboard(example.output)}
                            className="text-gray-500 hover:text-gray-300"
                          >
                            <CopyIcon className="h-3.5 w-3.5" />
                          </button>
                        </div>
                        <pre className="mt-1 bg-zerox-darker p-2 rounded text-sm overflow-x-auto text-gray-300">
                          {example.output}
                        </pre>
                      </div>
                    </div>
                  </div>
                  
                  {example.explanation && (
                    <div className="mt-2 text-sm text-gray-400">
                      <span className="font-medium">Explanation:</span> {example.explanation}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="hints" className="space-y-4 text-gray-300">
            {hints && hints.length > 0 ? (
              <div className="space-y-3">
                {hints.map((hint, index) => (
                  <div key={index} className="bg-zerox-darker/60 p-4 rounded-md">
                    <h4 className="text-sm font-medium mb-1">Hint {index + 1}:</h4>
                    <p className="text-sm text-gray-400">{hint}</p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center p-5">
                <p className="text-gray-400 text-sm">No hints available for this problem.</p>
                {solution && (
                  <Button 
                    variant="outline" 
                    className="mt-4 text-xs" 
                    onClick={() => setShowSolution(!showSolution)}
                  >
                    {showSolution ? 'Hide Solution' : 'Show Solution'}
                  </Button>
                )}
              </div>
            )}
            
            {showSolution && solution && (
              <div className="mt-5">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-base font-medium">Solution:</h3>
                  <button 
                    onClick={() => copyToClipboard(solution)}
                    className="text-gray-500 hover:text-gray-300"
                  >
                    <CopyIcon className="h-4 w-4" />
                  </button>
                </div>
                <pre className="bg-zerox-darker p-4 rounded-md text-sm overflow-x-auto text-gray-300">
                  {solution}
                </pre>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ProblemViewer;
