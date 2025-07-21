import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx';
import { Rocket, Trophy, Brain, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button.jsx';

function WelcomeScreen({ onStart }) {
  return (
    <>
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
      <InstallPWAButton />
    </>
  );
}


export default WelcomeScreen;

function InstallInstructionsModal({ onClose }) {
  const [isIOS, setIsIOS] = useState(false);
  const [isAndroid, setIsAndroid] = useState(false);

  useEffect(() => {
    setIsIOS(/iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream);
    setIsAndroid(/Android/.test(navigator.userAgent));
  }, []);

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Install App</CardTitle>
          <CardDescription>Follow the steps for your browser to install the app.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {isIOS && (
            <div className="space-y-2">
              <p>1. Tap the <strong>Share</strong> button in Safari.</p>
              <p>2. Scroll down and tap <strong>'Add to Home Screen'</strong>.</p>
            </div>
          )}
          {isAndroid && (
            <div className="space-y-2">
              <p>1. Tap the <strong>three dots</strong> in the top right corner of Chrome.</p>
              <p>2. Tap <strong>'Install app'</strong> or <strong>'Add to Home screen'</strong>.</p>
            </div>
          )}
          {!isIOS && !isAndroid && (
            <p>Look for an install icon in your browser's address bar or menu to add this app to your desktop.</p>
          )}
        </CardContent>
        <CardContent>
          <Button onClick={onClose} className="w-full">Close</Button>
        </CardContent>
      </Card>
    </div>
  );
}

function InstallPWAButton() {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showInstructions, setShowInstructions] = useState(false);

  useEffect(() => {
    const handler = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };
    window.addEventListener('beforeinstallprompt', handler);
    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        setDeferredPrompt(null);
      }
    } else {
      setShowInstructions(true);
    }
  };

  return (
    <>
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={handleInstallClick}
          className="bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600 text-white px-6 py-3 rounded-full shadow-lg flex items-center gap-2 animate-bounce"
          aria-label="Download Mobile App"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v12m0 0l-4-4m4 4l4-4m-8 8h8" />
          </svg>
          Download App
        </Button>
      </div>
      {showInstructions && <InstallInstructionsModal onClose={() => setShowInstructions(false)} />}
    </>
  );
}
