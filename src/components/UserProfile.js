import React from "react";
import { useCourse } from '@/context/CourseContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx';
import { Award, Badge } from 'lucide-react';

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
            <span key={i} className="bg-yellow-300 text-black px-2 py-1 rounded">{b}</span>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

export default UserProfile;
