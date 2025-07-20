
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

import Leaderboard from '@/components/Leaderboard';
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




import DashboardLayout from '@/components/DashboardLayout';
import SidebarAdventureMap from '@/components/SidebarAdventureMap';

function MainApp() {
  const [view, setView] = useState('welcome');
  const [selectedModuleId, setSelectedModuleId] = useState(null);
  const { state } = useCourse();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check Appwrite session on mount and handle magic link
  useEffect(() => {
    async function checkSession() {
      const urlParams = new URLSearchParams(window.location.search);
      const secret = urlParams.get('secret');
      const userId = urlParams.get('userId');
      if (secret && userId) {
        try {
          await account.createSession(userId, secret);
          window.history.replaceState({}, document.title, window.location.pathname);
        } catch (err) {}
      }
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
    // Subscribe button handler
    const handleSubscribe = async () => {
      try {
        const res = await fetch('/api/subscribe', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ userId: user?.$id }),
        });
        const data = await res.json();
        if (data.url) {
          window.location.href = data.url;
        } else {
          alert(data.error || 'Failed to start subscription');
        }
      } catch (err) {
        alert('Failed to start subscription');
      }
    };
    return (
      <nav className="w-full flex items-center justify-between bg-white border-b px-6 py-4 shadow-sm mb-4">
        <div className="flex items-center gap-4">
          <span className="font-extrabold text-xl text-purple-700 tracking-tight">AI Business Adventure</span>
          <Button variant="ghost" onClick={() => setView('overview')}>Course</Button>
          <Button variant="ghost" onClick={() => setView('profile')}>Profile</Button>
          <Button variant="ghost" onClick={() => setView('leaderboard')}>Leaderboard</Button>
          <Button variant="outline" onClick={handleSubscribe}>Subscribe</Button>
        </div>
        <div>
          <Button variant="outline" onClick={() => setView('overview')}>Modules</Button>
          <Button variant="destructive" onClick={handleLogout} className="ml-2">Logout</Button>
        </div>
      </nav>
    );
  }

  if (loading) return <div className="text-center p-8">Checking session...</div>;

  const needsAuth =
    (view === 'module' && selectedModuleId > 1 && !user) ||
    (view === 'profile' && !user) ||
    (view === 'overview' && state.progress > 1 && !user);

  if (needsAuth) {
    return <AuthForm onAuth={handleAuth} />;
  }

  // Show sidebar/dashboard layout for main app views
  if (['overview', 'module', 'profile', 'leaderboard'].includes(view)) {
    return (
      <DashboardLayout onSelectModule={(id) => { setSelectedModuleId(id); setView('module'); }}>
        {view !== 'profile' && view !== 'module' && <NavBar />}
        {view === 'overview' && <>
          <ProfileBar />
          <CourseOverview onSelectModule={(id) => { setSelectedModuleId(id); setView('module'); }} />
        </>}
        {view === 'module' && selectedModuleId && <ModuleView moduleId={selectedModuleId} onComplete={() => setView('overview')} />}
        {view === 'profile' && <UserProfile />}
        {view === 'leaderboard' && <Leaderboard currentUserId={user?.$id} />}
      </DashboardLayout>
    );
  }

  // Welcome and onboarding screens (no sidebar)
  return (
    <div className="min-h-screen bg-[#FAFAFB]">
      {view === 'welcome' && <WelcomeScreen onStart={() => setView((!state.onboarding || Object.keys(state.onboarding).length === 0) ? 'onboarding' : 'overview')} />}
      {view === 'onboarding' && <Onboarding onComplete={() => setView('overview')} />}
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




