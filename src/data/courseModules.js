// src/data/courseModules.js
// Contains the onboarding questions and all course modules for the AI Business Adventure

export const onboardingQuestions = [
  {
    id: 1,
    question: "What do you want to be when you grow up?",
    type: "text",
  },
  {
    id: 2,
    question: "What are your favorite subjects or activities?",
    type: "text",
  },
  {
    id: 3,
    question: "How do you like to learn (e.g., reading, watching videos, hands-on activities)?",
    type: "text",
  },
  {
    id: 4,
    question: "What games or apps do you enjoy?",
    type: "text",
  },
  {
    id: 5,
    question: "Have you ever thought about starting your own business? If so, what kind?",
    type: "text",
  },
];

export const courseModules = [
  {
    id: 1,
    title: "Introduction to Entrepreneurship",
    objective: "Understand what a business is and why people start them.",
    keyConcepts: [
      "Definition of a business.",
      "Reasons for starting a business (solving problems, earning money).",
      "Stories of young entrepreneurs (e.g., Moziah Bridges of Mo’s Bows).",
      "Basic financial concepts: income, expenses, profit."
    ],
    activity: "Brainstorm a list of community problems and propose business ideas to solve them.",
    prompt: "What problem do you want to solve with your business?",
    resource: "https://kidentrepreneurship.com/"
  },
  {
    id: 2,
    title: "Developing a Business Idea",
    objective: "Learn how to identify opportunities and create business ideas.",
    keyConcepts: [
      "What is a business idea?",
      "How to spot opportunities in your community.",
      "Examples of simple business ideas for kids."
    ],
    activity: "List 3 business ideas you could start as a kid.",
    prompt: "Describe one business idea you would like to try.",
    resource: "https://www.kidpreneurs.org/"
  },
  {
    id: 3,
    title: "Business Planning",
    objective: "Learn to plan and structure a business.",
    keyConcepts: [
      "What is a business plan?",
      "Setting goals and making a plan.",
      "Basic steps to start a business."
    ],
    activity: "Create a simple business plan for your idea.",
    prompt: "What is the first step you will take to start your business?",
    resource: "https://www.sba.gov/business-guide/plan-your-business/write-your-business-plan"
  },
  {
    id: 4,
    title: "Marketing and Sales",
    objective: "Understand how to promote and sell products.",
    keyConcepts: [
      "What is marketing?",
      "Ways to tell people about your business.",
      "How to make your first sale."
    ],
    activity: "Design a flyer or social media post for your business.",
    prompt: "How would you convince someone to buy your product?",
    resource: "https://www.youthbiz.org/marketing-for-kids/"
  },
  {
    id: 5,
    title: "Introduction to AI",
    objective: "Understand AI and its role in everyday life.",
    keyConcepts: [
      "What is Artificial Intelligence?",
      "Examples of AI in daily life.",
      "How AI is changing the world."
    ],
    activity: "Find 2 examples of AI you use or see every day.",
    prompt: "Describe one way AI helps people.",
    resource: "https://www.ibm.com/topics/artificial-intelligence"
  },
  {
    id: 6,
    title: "Learning AI with Free Platforms",
    objective: "Gain hands-on experience with AI and coding.",
    keyConcepts: [
      "Free AI and coding platforms for kids.",
      "How to start learning to code.",
      "Simple AI projects for beginners."
    ],
    activity: "Try a beginner AI or coding activity online.",
    prompt: "What did you build or learn with AI or code?",
    resource: "https://machinelearningforkids.co.uk/"
  },
  {
    id: 7,
    title: "AI in Business",
    objective: "Explore how AI enhances business operations.",
    keyConcepts: [
      "How businesses use AI.",
      "Examples of AI in real companies.",
      "Benefits and challenges of using AI."
    ],
    activity: "Research a business that uses AI and share what you learned.",
    prompt: "How could you use AI in your own business?",
    resource: "https://www.sba.gov/blog/ai-small-business"
  },
  {
    id: 8,
    title: "Global Entrepreneurship",
    objective: "Understand global markets and international business.",
    keyConcepts: [
      "What is a global business?",
      "How businesses sell products around the world.",
      "Cultural differences in business."
    ],
    activity: "Find a product in your home that was made in another country.",
    prompt: "Why do you think businesses sell products in other countries?",
    resource: "https://www.kids-world-travel-guide.com/international-business.html"
  },
  {
    id: 9,
    title: "Financial Literacy",
    objective: "Learn money management and investing basics.",
    keyConcepts: [
      "What is financial literacy?",
      "Saving, spending, and investing.",
      "Why money management is important."
    ],
    activity: "Create a simple budget for your business or allowance.",
    prompt: "How would you save and spend your business earnings?",
    resource: "https://www.practicalmoneyskills.com/"
  },
  {
    id: 10,
    title: "Content Creation vs. Ownership",
    objective: "Understand the value of business ownership.",
    keyConcepts: [
      "Difference between creating content and owning a business.",
      "Why ownership matters.",
      "Examples of young business owners."
    ],
    activity: "List 2 things you own and 2 things you use but don’t own.",
    prompt: "Why do you think owning a business is valuable?",
    resource: "https://www.kidpreneurs.org/ownership/"
  },
  {
    id: 11,
    title: "Activities and Projects",
    objective: "Apply learning through real-world projects.",
    keyConcepts: [
      "Project-based learning.",
      "Examples of kid business projects.",
      "How to start your own project."
    ],
    activity: "Start a mini business project at home or school.",
    prompt: "Describe your project and what you learned.",
    resource: "https://www.kidpreneurs.org/projects/"
  },
  {
    id: 12,
    title: "Reflection and Growth",
    objective: "Reflect on learning and set future goals.",
    keyConcepts: [
      "Why reflection is important.",
      "How to set goals for the future.",
      "Celebrating your progress."
    ],
    activity: "Write a letter to your future self about your business journey.",
    prompt: "What is one goal you have for your future?",
    resource: "https://www.mindsetworks.com/"
  }
];
