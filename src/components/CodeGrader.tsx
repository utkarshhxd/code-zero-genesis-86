
import { useState } from 'react';
import { Award, Star, StarHalf, StarOff } from 'lucide-react';

interface GradingCriteria {
  name: string;
  description: string;
  score: number;
  maxScore: number;
}

interface CodeGraderProps {
  code: string;
  language: string;
  problemTitle: string;
  expectedOutput?: string;
}

const CodeGrader = ({ code, language, problemTitle, expectedOutput }: CodeGraderProps) => {
  const [isGrading, setIsGrading] = useState(false);
  const [criteria, setCriteria] = useState<GradingCriteria[]>([]);
  const [overallScore, setOverallScore] = useState(0);
  const [feedback, setFeedback] = useState('');
  
  const gradeCode = () => {
    setIsGrading(true);
    
    // Simulate grading process
    setTimeout(() => {
      // This would be replaced with actual evaluation logic
      // In a real app, you would send the code to a backend for evaluation
      const newCriteria: GradingCriteria[] = [
        {
          name: 'Correctness',
          description: 'Does the code produce the correct output?',
          score: Math.floor(Math.random() * 5) + 1,
          maxScore: 5
        },
        {
          name: 'Efficiency',
          description: 'Is the algorithm optimal in terms of time/space complexity?',
          score: Math.floor(Math.random() * 5) + 1,
          maxScore: 5
        },
        {
          name: 'Code Style',
          description: 'Does the code follow modern coding conventions?',
          score: Math.floor(Math.random() * 5) + 1,
          maxScore: 5
        },
        {
          name: 'Readability',
          description: 'Is the code easy to read and understand?',
          score: Math.floor(Math.random() * 5) + 1,
          maxScore: 5
        }
      ];
      
      const totalScore = newCriteria.reduce((sum, item) => sum + item.score, 0);
      const maxPossibleScore = newCriteria.reduce((sum, item) => sum + item.maxScore, 0);
      const calculatedOverallScore = Math.round((totalScore / maxPossibleScore) * 100);
      
      // Generate relevant feedback based on the code language and problem
      const feedbackMessages = [
        `Your solution to "${problemTitle}" uses a good approach.`,
        language === 'javascript' ? 'Consider using modern ES6+ features.' : 'Good use of language features.',
        code.length > 500 ? 'Your solution could be more concise.' : 'Clean, concise implementation.',
        `Overall score: ${calculatedOverallScore}%`
      ];
      
      setCriteria(newCriteria);
      setOverallScore(calculatedOverallScore);
      setFeedback(feedbackMessages.join(' '));
      setIsGrading(false);
    }, 1500);
  };
  
  const renderStars = (score: number, maxScore: number) => {
    const stars = [];
    for (let i = 1; i <= maxScore; i++) {
      if (i <= score) {
        stars.push(<Star key={i} className="h-4 w-4 text-yellow-400" />);
      } else if (i - 0.5 <= score) {
        stars.push(<StarHalf key={i} className="h-4 w-4 text-yellow-400" />);
      } else {
        stars.push(<StarOff key={i} className="h-4 w-4 text-gray-500" />);
      }
    }
    return <div className="flex">{stars}</div>;
  };
  
  return (
    <div className="mt-4">
      <button
        onClick={gradeCode}
        disabled={isGrading}
        className="w-full bg-zerox-blue hover:bg-zerox-blue/90 text-white py-2 px-4 rounded-md flex items-center justify-center transition-colors"
      >
        {isGrading ? (
          <span className="flex items-center">
            <span className="animate-spin mr-2">⟳</span> Grading Code...
          </span>
        ) : (
          <span className="flex items-center">
            <Award className="h-4 w-4 mr-2" /> Grade My Solution
          </span>
        )}
      </button>
      
      {criteria.length > 0 && (
        <div className="mt-4 bg-zerox-light/30 p-4 rounded-lg">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Code Assessment</h3>
            <div className="flex items-center bg-zerox-blue/20 px-3 py-1 rounded-full">
              <Award className="h-4 w-4 mr-1 text-zerox-blue" />
              <span className="font-bold">{overallScore}%</span>
            </div>
          </div>
          
          <div className="space-y-3">
            {criteria.map((item, index) => (
              <div key={index} className="flex justify-between items-center">
                <div>
                  <p className="font-medium">{item.name}</p>
                  <p className="text-xs text-gray-400">{item.description}</p>
                </div>
                {renderStars(item.score, item.maxScore)}
              </div>
            ))}
          </div>
          
          <div className="mt-4 p-3 bg-zerox-darker rounded-md">
            <h4 className="text-sm font-semibold mb-2">Feedback:</h4>
            <p className="text-sm text-gray-300">{feedback}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default CodeGrader;
