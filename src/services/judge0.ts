
// This is a simplified service for demonstrating Judge0 integration
// In a real app, you would make API calls to your backend which handles the Judge0 API key

interface CodeExecutionResult {
  output?: string;
  error?: string;
  status?: string;
  executionTime?: number;
}

export async function executeCode(
  code: string,
  language: string = 'javascript'
): Promise<CodeExecutionResult> {
  console.log(`Executing ${language} code:`, code);
  
  // This is a mock response for demonstration purposes
  // In a real app, you would make an API call to Judge0
  
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  // Mock successful execution for simple code
  if (code.includes('console.log') || code.includes('return') || code.includes('print')) {
    return {
      output: language === 'javascript' 
        ? 'Hello, world!\n> [1, 2, 3, 4, 5]\n> Array(5) [ 1, 2, 3, 4, 5 ]' 
        : language === 'python'
        ? 'Hello, world!\n[1, 2, 3, 4, 5]'
        : 'Execution successful. Output: "Hello, world!"',
      status: 'Accepted',
      executionTime: 0.034
    };
  }
  
  // Mock error for code with syntax errors
  if (code.includes('syntax error') || code.includes('//error') || code.includes('#error')) {
    return {
      error: language === 'javascript'
        ? 'SyntaxError: Unexpected token (3:12)'
        : language === 'python'
        ? 'SyntaxError: invalid syntax (line 3)'
        : 'Compilation Error',
      status: 'Error',
      executionTime: 0.021
    };
  }
  
  // Default mock response
  return {
    output: 'Code executed successfully with no output.',
    status: 'Accepted',
    executionTime: 0.028
  };
}

export async function testCode(
  code: string,
  testCases: string[],
  language: string = 'javascript'
): Promise<Array<{ passed: boolean; message: string }>> {
  console.log(`Testing ${language} code with test cases:`, testCases);
  
  // This is a mock response for demonstration purposes
  // In a real app, you would actually run the tests
  
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  // Return mock test results
  return testCases.map((testCase, index) => {
    // Randomly determine if test passes or fails for demonstration
    const passed = Math.random() > 0.3;
    
    return {
      passed,
      message: passed
        ? `Test case ${index + 1} passed: ${testCase}`
        : `Test case ${index + 1} failed: Expected output doesn't match.`
    };
  });
}
