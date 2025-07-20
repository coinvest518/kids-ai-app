
"use client";

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button.jsx';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx';
import { Progress } from '@/components/ui/progress.jsx';
import { Badge } from '@/components/ui/badge.jsx';
import { Star, Trophy, Rocket, Brain, Award, Users, BookOpen, Lightbulb, DollarSign, Globe, Play, Target } from 'lucide-react';
import './app.css';
import AdventureMap from '@/components/AdventureMap';
import ModuleView from '@/components/ModuleView';
import Onboarding from '@/components/Onboarding';
import ProfileBar from '@/components/ProfileBar';
import { useCourse, CourseProvider } from '@/context/CourseContext';
import AuthForm from '@/components/AuthForm';
import { account } from '@/lib/appwrite';
import WelcomeScreen from '@/components/WelcomeScreen';





function CourseOverview({ onSelectModule }) {
  const { courseModules, state } = useCourse();
  const totalModules = courseModules.length;
  const completed = state.progress;
  const percent = Math.round((completed / totalModules) * 100);
  return (
    <div className="max-w-4xl mx-auto p-6">
      <Card className="mb-8">
        <CardHeader className="flex flex-col items-center">
          <CardTitle className="text-3xl font-bold mb-2">AI Business Adventure</CardTitle>
          <CardDescription className="text-lg text-gray-600">Your journey to learn entrepreneurship and AI</CardDescription>
          <div className="w-full mt-4">
            <Progress value={percent} />
            <div className="flex justify-between text-sm mt-1">
              <span>{completed}/{totalModules} Modules Complete</span>
              <span>{percent}%</span>
            </div>
          </div>
        </CardHeader>
      </Card>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {courseModules.map((mod) => (
          <Card key={mod.id} className={`border-l-4 ${state.unlockedModules.includes(mod.id) ? 'border-l-blue-500' : 'border-l-gray-300 opacity-60'}`}>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <Badge variant="outline" className="text-xs">Module {mod.id}</Badge>
                <CardTitle className="text-lg font-bold mt-1">{mod.title}</CardTitle>
                <CardDescription className="text-sm mt-1">{mod.description || mod.objective}</CardDescription>
              </div>
              <div className="flex flex-col items-end gap-2">
                {state.progress >= mod.id && (
                  <Badge className="bg-green-500 text-white flex items-center"><Star className="w-3 h-3 mr-1" /> Complete</Badge>
                )}
                {!state.unlockedModules.includes(mod.id) && (
                  <Badge variant="secondary">Locked</Badge>
                )}
                <Button
                  size="sm"
                  className="mt-2"
                  disabled={!state.unlockedModules.includes(mod.id)}
                  onClick={() => onSelectModule(mod.id)}
                >
                  {state.progress >= mod.id ? 'Review' : 'Start'}
                </Button>
              </div>
            </CardHeader>
          </Card>
        ))}
      </div>
    </div>
  );
}

function UserProfile() {
  const { state } = useCourse();
  return (
    <Card className="max-w-md mx-auto mb-8 bg-green-50 border-green-500">
      <CardHeader className="flex flex-col items-center">
        <div className="p-3 rounded-full bg-green-500 text-white mb-2"><Award className="h-8 w-8" /></div>
        <CardTitle className="text-2xl font-bold text-green-700">Your Profile</CardTitle>
        <CardDescription className="text-green-600 mt-2">Level {state.level} Entrepreneur</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center gap-2">
        <div className="flex items-center gap-2 text-lg">
          <span className="font-bold">XP:</span> <span>{state.xp}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="font-bold">Badges:</span>
          {state.badges.length === 0 && <span className="text-gray-400">None yet</span>}
          {state.badges.map((b, i) => (
            <Badge key={i} className="bg-yellow-300 text-black">{b}</Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}



  function MainApp() {

    const [view, setView] = useState('welcome');
    const [selectedModuleId, setSelectedModuleId] = useState(null);
    const { state } = useCourse();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Check Appwrite session on mount and handle magic link
    useEffect(() => {
      async function checkSession() {
        // Check for magic link params
        const urlParams = new URLSearchParams(window.location.search);
        const secret = urlParams.get('secret');
        const userId = urlParams.get('userId');
        if (secret && userId) {
          try {
            await account.createSession(userId, secret);
            // Remove query params from URL
            window.history.replaceState({}, document.title, window.location.pathname);
          } catch (err) {
            // Optionally handle error
          }
        }
        // Now check session
        account.get()
          .then(setUser)
          .catch(() => setUser(null))
          .finally(() => setLoading(false));
      }
      checkSession();
    }, []);

    const handleAuth = (userObj) => {
      setUser(userObj);
      setView((!state.onboarding || Object.keys(state.onboarding).length === 0) ? 'onboarding' : 'overview');
    };

    const handleLogout = async () => {
      await account.deleteSession('current');
      setUser(null);
      setView('welcome');
    };

    function NavBar() {
      return (
        <nav className="w-full flex items-center justify-between bg-white border-b px-6 py-4 shadow-sm mb-4">
          <div className="flex items-center gap-4">
            <span className="font-extrabold text-xl text-purple-700 tracking-tight">AI Business Adventure</span>
            <Button variant="ghost" onClick={() => setView('overview')}>Course</Button>
            <Button variant="ghost" onClick={() => setView('profile')}>Profile</Button>
          </div>
          <div>
            <Button variant="outline" onClick={() => setView('overview')}>Modules</Button>
            <Button variant="destructive" onClick={handleLogout} className="ml-2">Logout</Button>
          </div>
        </nav>
      );
    }

    if (loading) return <div className="text-center p-8">Checking session...</div>;

    // Only require auth if user tries to access module > 1 or profile, or after module 1 is completed
    const needsAuth =
      (view === 'module' && selectedModuleId > 1 && !user) ||
      (view === 'profile' && !user) ||
      (view === 'overview' && state.progress > 1 && !user);

    if (needsAuth) {
      return <AuthForm onAuth={handleAuth} />;
    }

    return (
      <div className="min-h-screen bg-[#FAFAFB]">
        {view !== 'welcome' && view !== 'onboarding' && (user || state.progress <= 1) && <NavBar />}
        {view === 'welcome' && <WelcomeScreen onStart={() => setView((!state.onboarding || Object.keys(state.onboarding).length === 0) ? 'onboarding' : 'overview')} />}
        {view === 'onboarding' && <Onboarding onComplete={() => setView('overview')} />}
        {view === 'overview' && <>
          <ProfileBar />
          <AdventureMap onSelectModule={(id) => { setSelectedModuleId(id); setView('module'); }} />
          <CourseOverview onSelectModule={(id) => { setSelectedModuleId(id); setView('module'); }} />
        </>}
        {view === 'module' && selectedModuleId && <ModuleView moduleId={selectedModuleId} onComplete={() => setView('overview')} />}
        {view === 'profile' && <UserProfile />}
      </div>
    );
  }


// Wrap MainApp with CourseProvider to provide context
export default function AppWithProvider(props) {
  return (
    <CourseProvider>
      <MainApp {...props} />
    </CourseProvider>
  );
}

// Course modules data
const modules = [
  {
    id: 1,
    title: "Introduction to Entrepreneurship",
    icon: Rocket,
    color: "bg-blue-500",
    description: "Learn what business is and why people start them",
    xp: 100,
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
    icon: Lightbulb,
    color: "bg-yellow-500",
    description: "Identify opportunities and create business ideas",
    xp: 150,
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
    icon: Target,
    color: "bg-green-500",
    description: "Learn to plan and structure a business",
    xp: 200,
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
    icon: Users,
    color: "bg-purple-500",
    description: "Understand how to promote and sell products",
    xp: 150,
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
    icon: Brain,
    color: "bg-pink-500",
    description: "Understand AI and its role in everyday life",
    xp: 200,
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
    icon: BookOpen,
    color: "bg-indigo-500",
    description: "Gain hands-on experience with AI and coding",
    xp: 250,
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
    icon: Brain,
    color: "bg-cyan-500",
    description: "Explore how AI enhances business operations",
    xp: 200,
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
    icon: Globe,
    color: "bg-orange-500",
    description: "Understand global markets and international business",
    xp: 180,
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
    icon: DollarSign,
    color: "bg-emerald-500",
    description: "Learn money management and investing basics",
    xp: 220,
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
    icon: Trophy,
    color: "bg-red-500",
    description: "Understand the value of business ownership",
    xp: 150,
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
    icon: Play,
    color: "bg-teal-500",
    description: "Apply learning through real-world projects",
    xp: 300,
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
    icon: Award,
    color: "bg-violet-500",
    description: "Reflect on learning and set future goals",
    xp: 100,
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
]



