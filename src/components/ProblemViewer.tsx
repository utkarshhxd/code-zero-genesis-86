
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
    easy: 'bg-green-500/20 text-green-400',
    medium: 'bg-yellow-500/20 text-yellow-400',
    hard: 'bg-red-500/20 text-red-400'
  };
  
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success('Copied to clipboard');
  };
  
  return (
    <div className="glass-card rounded-xl overflow-hidden">
      <div className="px-6 py-4 bg-zerox-light/60 border-b border-zerox-gray/50">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-white">{title}</h2>
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${difficultyColors[difficulty]}`}>
            {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
          </span>
        </div>
      </div>
      
      <div className="p-6">
        <Tabs defaultValue="description">
          <TabsList className="grid grid-cols-3 mb-6">
            <TabsTrigger value="description">Description</TabsTrigger>
            <TabsTrigger value="examples">Examples</TabsTrigger>
            <TabsTrigger value="hints">Hints</TabsTrigger>
          </TabsList>
          
          <TabsContent value="description" className="text-gray-300 space-y-4">
            <div className="prose prose-invert max-w-none">
              <div dangerouslySetInnerHTML={{ __html: description }} />
            </div>
            
            <div className="mt-6">
              <h3 className="text-lg font-semibold mb-2">Constraints:</h3>
              <ul className="list-disc list-inside space-y-1 text-gray-400">
                {constraints.map((constraint, index) => (
                  <li key={index}>{constraint}</li>
                ))}
              </ul>
            </div>
          </TabsContent>
          
          <TabsContent value="examples" className="space-y-6">
            {examples.map((example, index) => (
              <div key={index} className="bg-zerox-light/30 p-4 rounded-lg">
                <div className="mb-4">
                  <h4 className="text-sm font-semibold text-gray-400 mb-2">Example {index + 1}:</h4>
                  <div className="flex flex-col space-y-4">
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold text-gray-500">Input:</span>
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
                        <span className="text-xs font-semibold text-gray-500">Output:</span>
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
                    <span className="font-semibold">Explanation:</span> {example.explanation}
                  </div>
                )}
              </div>
            ))}
          </TabsContent>
          
          <TabsContent value="hints" className="space-y-4 text-gray-300">
            {hints && hints.length > 0 ? (
              <div className="space-y-4">
                {hints.map((hint, index) => (
                  <div key={index} className="bg-zerox-light/30 p-4 rounded-lg">
                    <h4 className="text-sm font-semibold mb-1">Hint {index + 1}:</h4>
                    <p>{hint}</p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center p-6">
                <p className="text-gray-400">No hints available for this problem.</p>
                {solution && (
                  <Button 
                    variant="outline" 
                    className="mt-4" 
                    onClick={() => setShowSolution(!showSolution)}
                  >
                    {showSolution ? 'Hide Solution' : 'Show Solution'}
                  </Button>
                )}
              </div>
            )}
            
            {showSolution && solution && (
              <div className="mt-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-semibold">Solution:</h3>
                  <button 
                    onClick={() => copyToClipboard(solution)}
                    className="text-gray-500 hover:text-gray-300"
                  >
                    <CopyIcon className="h-4 w-4" />
                  </button>
                </div>
                <pre className="bg-zerox-darker p-4 rounded-lg text-sm overflow-x-auto text-gray-300">
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
