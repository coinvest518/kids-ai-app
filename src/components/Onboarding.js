// src/components/Onboarding.js


import React, { useState } from "react";
import { useCourse } from "@/context/CourseContext";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card.jsx';
import { Rocket } from 'lucide-react';
import { databases, account } from '@/lib/appwrite';
import AuthForm from './AuthForm';

// You may need to import Button if not already imported
import { Button } from '@/components/ui/button.jsx';

function Onboarding({ onComplete = () => {} }) {
  const { onboardingQuestions, answerOnboarding } = useCourse();
  const [answers, setAnswers] = useState({});
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showAuth, setShowAuth] = useState(false);
  const [user, setUser] = useState(null);

  const handleChange = (e) => {
    setAnswers({ ...answers, [step]: e.target.value });
  };

  const handleNext = async () => {
    if (step < onboardingQuestions.length - 1) {
      setStep(step + 1);
    } else {
      setLoading(true);
      setError(null);
      // Try to get user, but allow guest
      let loggedInUser = null;
      try {
        loggedInUser = await account.get();
      } catch (e) {
        loggedInUser = null;
      }
      if (loggedInUser) {
        try {
          await databases.createDocument(
            'user_data',
            'onboarding',
            loggedInUser.$id,
            { answers }
          );
        } catch (err) {
          setError(err.message || 'Failed to save onboarding');
          setLoading(false);
          return;
        }
      } else {
        // Save locally for guests
        try {
          localStorage.setItem('onboardingAnswers', JSON.stringify(answers));
        } catch (e) {/* ignore */}
      }
      answerOnboarding(answers);
      setLoading(false);
      setShowAuth(true); // Show auth popup after onboarding
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl bg-white/90 backdrop-blur-sm shadow-2xl">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 p-4 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full w-20 h-20 flex items-center justify-center">
            <Rocket className="w-10 h-10 text-white" />
          </div>
          <CardTitle className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            Welcome! Let's get to know you
          </CardTitle>
          <CardDescription className="text-lg text-gray-600 mt-2">
            Answer a few quick questions to personalize your adventure.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {error && <div className="text-red-600 text-center">{error}</div>}
          <div className="mb-4">
            <label className="block mb-2 font-medium text-purple-700 text-lg">
              {onboardingQuestions[step].question}
            </label>
            <input
              className="w-full border-2 border-purple-300 rounded px-4 py-3 text-lg focus:outline-none focus:ring-2 focus:ring-purple-400 transition"
              type="text"
              value={answers[step] || ""}
              onChange={handleChange}
              placeholder="Type your answer..."
              disabled={loading}
            />
          </div>
          <button
            className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-3 text-lg font-semibold rounded-full shadow-lg transform hover:scale-105 transition-all duration-200"
            onClick={handleNext}
            disabled={loading}
          >
            {loading ? 'Saving...' : (step < onboardingQuestions.length - 1 ? "Next" : "Start Adventure!")}
          </button>
        </CardContent>
      </Card>
      {showAuth && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full relative">
            <button className="absolute top-2 right-2 text-gray-500 hover:text-gray-800" onClick={() => { setShowAuth(false); onComplete(); }}>&times;</button>
            <h2 className="text-xl font-bold mb-4 text-center">Want to save your progress?</h2>
            <p className="mb-4 text-center">Create an account or log in to save your adventure and unlock all modules!<br/>You can skip this step and start with Module 1 as a guest.</p>
            <AuthForm onAuth={(u) => { setUser(u); setShowAuth(false); onComplete(); }} />
            <Button className="w-full mt-4" variant="outline" onClick={() => { setShowAuth(false); onComplete(); }}>
              Skip for now
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Onboarding;
