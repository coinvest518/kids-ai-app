import React from 'react';
import { Button } from '@/components/ui/button.jsx';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx';
import { Rocket, Trophy, Brain, BookOpen } from 'lucide-react';

const WelcomeScreen = ({ onStart }) => (
  <div className="min-h-screen bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 flex items-center justify-center p-4">
    <Card className="w-full max-w-2xl bg-white/90 backdrop-blur-sm shadow-2xl">
      <CardHeader className="text-center">
        <div className="mx-auto mb-4 p-4 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full w-20 h-20 flex items-center justify-center">
          <Rocket className="w-10 h-10 text-white" />
        </div>
        <CardTitle className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
          AI Business Adventure
        </CardTitle>
        <CardDescription className="text-lg text-gray-600 mt-2">
          Start your entrepreneurial journey and learn AI! 🚀
        </CardDescription>
      </CardHeader>
      <CardContent className="text-center space-y-6">
        <p className="text-gray-700 text-lg">
          Welcome, young entrepreneur! Ready to build amazing businesses with the power of AI?
        </p>
        <div className="grid grid-cols-3 gap-4 my-6">
          <div className="text-center">
            <div className="bg-blue-100 p-3 rounded-full mx-auto w-16 h-16 flex items-center justify-center mb-2">
              <BookOpen className="w-8 h-8 text-blue-600" />
            </div>
            <p className="text-sm font-medium">12 Fun Modules</p>
          </div>
          <div className="text-center">
            <div className="bg-green-100 p-3 rounded-full mx-auto w-16 h-16 flex items-center justify-center mb-2">
              <Trophy className="w-8 h-8 text-green-600" />
            </div>
            <p className="text-sm font-medium">Earn Rewards</p>
          </div>
          <div className="text-center">
            <div className="bg-purple-100 p-3 rounded-full mx-auto w-16 h-16 flex items-center justify-center mb-2">
              <Brain className="w-8 h-8 text-purple-600" />
            </div>
            <p className="text-sm font-medium">Learn AI</p>
          </div>
        </div>
        <Button 
          onClick={onStart}
          className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-3 text-lg font-semibold rounded-full shadow-lg transform hover:scale-105 transition-all duration-200"
        >
          Start Your Adventure! 🎮
        </Button>
      </CardContent>
    </Card>
  </div>
);

export default WelcomeScreen;
