
// This is a simplified service for demonstrating OpenAI integration
// In a real app, you would make API calls to your backend which handles the OpenAI API key

interface ProblemGenerationOptions {
  topic: string;
  difficulty: string;
  complexity: number;
  customInstructions?: string;
}

export async function generateProblem(options: ProblemGenerationOptions) {
  console.log('Generating problem with options:', options);
  
  // This is a mock response for demonstration purposes
  // In a real app, you would make an API call to OpenAI
  
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  // Return mock data based on the options
  const difficultyLevel = options.difficulty;
  const topic = options.topic;
  
  // Mock response data
  if (topic.toLowerCase().includes('array')) {
    return {
      title: `${difficultyLevel === 'easy' ? 'Two Sum' : difficultyLevel === 'medium' ? 'Three Sum' : 'Four Sum'} Problem`,
      difficulty: difficultyLevel,
      description: `<p>Given an array of integers <code>nums</code> and an integer <code>target</code>, return indices of the ${difficultyLevel === 'easy' ? 'two' : difficultyLevel === 'medium' ? 'three' : 'four'} numbers such that they add up to <code>target</code>.</p>
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
  } else if (topic.toLowerCase().includes('tree') || topic.toLowerCase().includes('binary')) {
    return {
      title: `${difficultyLevel === 'easy' ? 'Invert Binary Tree' : difficultyLevel === 'medium' ? 'Validate Binary Search Tree' : 'Serialize and Deserialize Binary Tree'}`,
      difficulty: difficultyLevel,
      description: `<p>Given the <code>root</code> of a binary tree, ${difficultyLevel === 'easy' ? 'invert the tree, and return its root.' : difficultyLevel === 'medium' ? 'determine if it is a valid binary search tree (BST).' : 'serialize and deserialize the tree.'}</p>
        <p>${difficultyLevel === 'medium' ? 'A valid BST is defined as follows: The left subtree of a node contains only nodes with keys less than the node\'s key. The right subtree of a node contains only nodes with keys greater than the node\'s key. Both the left and right subtrees must also be binary search trees.' : difficultyLevel === 'hard' ? 'The encoded string should be as compact as possible.' : ''}</p>`,
      examples: [
        {
          input: `root = [4,2,7,1,3,6,9]`,
          output: `[4,7,2,9,6,3,1]`,
          explanation: difficultyLevel === 'easy' ? 'The inverted tree swaps left and right children for every node.' : 'The serialized tree.'
        }
      ],
      constraints: [
        'The number of nodes in the tree is in the range [0, 100]',
        '-100 <= Node.val <= 100'
      ],
      hints: [
        'Try using a recursive approach.',
        'For each node, swap its left and right children.',
        'Then recursively invert the left and right subtrees.'
      ],
      solution: `function invertTree(root) {
  if (!root) return null;
  
  // Swap the left and right children
  const temp = root.left;
  root.left = root.right;
  root.right = temp;
  
  // Recursively invert the subtrees
  invertTree(root.left);
  invertTree(root.right);
  
  return root;
}`
    };
  } else {
    return {
      title: `${difficultyLevel === 'easy' ? 'Valid Parentheses' : difficultyLevel === 'medium' ? 'Longest Palindromic Substring' : 'Regular Expression Matching'}`,
      difficulty: difficultyLevel,
      description: `<p>${difficultyLevel === 'easy' ? 'Given a string s containing just the characters \'(\', \')\', \'{\', \'}\', \'[\' and \']\', determine if the input string is valid.' : difficultyLevel === 'medium' ? 'Given a string s, return the longest palindromic substring in s.' : 'Given an input string s and a pattern p, implement regular expression matching with support for \'.\' and \'*\' where: \'.\' Matches any single character. \'*\' Matches zero or more of the preceding element.'}</p>`,
      examples: [
        {
          input: difficultyLevel === 'easy' ? 's = "()[]{}"' : 's = "babad"',
          output: difficultyLevel === 'easy' ? 'true' : '"bab" or "aba"',
          explanation: difficultyLevel === 'easy' ? 'The brackets are balanced and properly nested.' : 'Both "bab" and "aba" are valid longest palindromic substrings.'
        }
      ],
      constraints: [
        difficultyLevel === 'easy' ? '1 <= s.length <= 10^4' : '1 <= s.length <= 1000',
        difficultyLevel === 'easy' ? 's consists of parentheses only \'()[]{}\'' : 's consist of only lowercase English letters'
      ],
      hints: [
        difficultyLevel === 'easy' ? 'Use a stack to keep track of opening brackets.' : 'Try expanding around centers of the string.',
        difficultyLevel === 'easy' ? 'When you encounter a closing bracket, check if it matches the most recent opening bracket.' : 'Each character can be the center of a palindrome.',
        difficultyLevel === 'easy' ? 'If it does match, pop the opening bracket from the stack.' : 'Also consider cases where the center is between two characters.'
      ],
      solution: difficultyLevel === 'easy' ? 
`function isValid(s) {
  const stack = [];
  const map = {
    ')': '(',
    '}': '{',
    ']': '['
  };
  
  for (let i = 0; i < s.length; i++) {
    const char = s[i];
    
    if (char === '(' || char === '{' || char === '[') {
      stack.push(char);
    } else {
      const lastOpening = stack.pop();
      if (map[char] !== lastOpening) {
        return false;
      }
    }
  }
  
  return stack.length === 0;
}` : 
`function longestPalindrome(s) {
  if (!s || s.length < 1) return "";
  
  let start = 0;
  let maxLength = 1;
  
  function expandAroundCenter(left, right) {
    while (left >= 0 && right < s.length && s[left] === s[right]) {
      const currentLength = right - left + 1;
      if (currentLength > maxLength) {
        maxLength = currentLength;
        start = left;
      }
      left--;
      right++;
    }
  }
  
  for (let i = 0; i < s.length; i++) {
    // Expand around center for odd-length palindromes
    expandAroundCenter(i, i);
    // Expand around center for even-length palindromes
    expandAroundCenter(i, i + 1);
  }
  
  return s.substring(start, start + maxLength);
}`
    };
  }
}

// For demonstration only - in a real app you'd handle this in your backend
export async function generateSolution(problemDescription: string, language: string = 'javascript') {
  // Mock delay
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  // Return a mock solution based on the language
  if (language === 'javascript') {
    return `function solution(nums, target) {
  const map = new Map();
  
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    
    if (map.has(complement)) {
      return [map.get(complement), i];
    }
    
    map.set(nums[i], i);
  }
  
  return null;
}`;
  } else if (language === 'python') {
    return `def solution(nums, target):
    seen = {}
    for i, num in enumerate(nums):
        complement = target - num
        if complement in seen:
            return [seen[complement], i]
        seen[num] = i
    return None`;
  } else {
    return `// Solution would be generated in ${language}`;
  }
}
