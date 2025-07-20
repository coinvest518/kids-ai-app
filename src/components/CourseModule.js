"use client";

import { useState } from "react";
import { useCourse } from "@/context/CourseContext";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
// Replacing custom Tabs with simple useState-based tabs
import { Collapsible, CollapsibleContent } from "@/components/ui/collapsible";
import {
  BookOpen,
  Target,
  Trophy,
  Gamepad2,
  Plus,
  CheckCircle2,
  Star,
  ChevronDown,
  ChevronRight,
  ChevronLeft,
  Award,
  Zap,
  Clock,
  Users,
} from "lucide-react";

import AskAIBox from "./AskAIBox";

export default function CourseModule({
  moduleNumber = 1,
  title = "Introduction to Entrepreneurship",
  description = "Learn what business is and why people start them",
  objective = "Understand what a business is and why people start them.",
  keyConcepts = [
    { id: "1", title: "Definition of a business", completed: false },
    { id: "2", title: "Reasons for starting a business (solving problems, earning money)", completed: false },
    { id: "3", title: "Stories of young entrepreneurs (e.g., Moziah Bridges of Mo's Bows)", completed: false },
    { id: "4", title: "Basic financial concepts: income, expenses, profit", completed: false },
  ],
  activities = [
    {
      id: "1",
      title: "Community Problem Brainstorm",
      description: "Brainstorm a list of community problems and propose business ideas to solve them.",
      type: "text",
      completed: false,
    },
  ],
  challenges = [
    {
      id: "1",
      question: "What problem do you want to solve with your business?",
      completed: false,
    },
  ],
  extraResources = [
    "Young Entrepreneur Success Stories",
    "Business Basics Video Series",
    "Financial Literacy for Kids",
  ],
  xpReward = 100,
  estimatedTime = "45 minutes",
  difficulty = "Beginner",
  aiContext,
  onBack,
}) {
  const [conceptsState, setConceptsState] = useState(keyConcepts);
  const [activitiesState, setActivitiesState] = useState(activities);
  const [challengesState, setChallengesState] = useState(challenges);
  const [isExpanded, setIsExpanded] = useState(true);
  const [showCompletion, setShowCompletion] = useState(false);
  // Tabs state
  const tabList = [
    { value: "content", label: "Content" },
    { value: "activities", label: "Activities" },
    { value: "challenges", label: "Challenges" },
    { value: "resources", label: "Resources" },
  ];
  const [activeTab, setActiveTab] = useState("content");
  const { loadingProgress } = useCourse();

  const totalItems = conceptsState.length + activitiesState.length + challengesState.length;
  const completedItems =
    conceptsState.filter((c) => c.completed).length +
    activitiesState.filter((a) => a.completed).length +
    challengesState.filter((c) => c.completed).length;
  const progressPercentage = (completedItems / totalItems) * 100;

  const toggleConcept = (id) => {
    setConceptsState((prev) =>
      prev.map((concept) => (concept.id === id ? { ...concept, completed: !concept.completed } : concept))
    );
  };

  const toggleActivity = (id) => {
    setActivitiesState((prev) =>
      prev.map((activity) => (activity.id === id ? { ...activity, completed: !activity.completed } : activity))
    );
  };

  const updateActivityResponse = (id, response) => {
    setActivitiesState((prev) =>
      prev.map((activity) => (activity.id === id ? { ...activity, userResponse: response } : activity))
    );
  };

  const toggleChallenge = (id) => {
    setChallengesState((prev) =>
      prev.map((challenge) => (challenge.id === id ? { ...challenge, completed: !challenge.completed } : challenge))
    );
  };

  const updateChallengeResponse = (id, response) => {
    setChallengesState((prev) =>
      prev.map((challenge) => (challenge.id === id ? { ...challenge, userResponse: response } : challenge))
    );
  };

  const handleCompleteModule = () => {
    if (progressPercentage === 100) {
      setShowCompletion(true);
    }
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case "Beginner":
        return "bg-green-500";
      case "Intermediate":
        return "bg-yellow-500";
      case "Advanced":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  if (loadingProgress) {
    return <div className="text-center p-8">Loading your progress...</div>;
  }

  return (
    <div className="w-full max-w-3xl md:max-w-4xl xl:max-w-5xl mx-auto p-2 sm:p-4 md:p-6 space-y-6">
      {/* In-Module Navigation Bar */}
      <div className="flex items-center justify-between mb-2">
        <button
          onClick={onBack}
          className="flex items-center gap-1 text-blue-600 hover:text-blue-800 font-medium px-2 py-1 rounded transition focus:outline-none focus:ring"
          aria-label="Back"
        >
          <ChevronLeft className="h-5 w-5" />
          <span className="hidden sm:inline">Back</span>
        </button>
        {/* Optionally, add a profile button here if needed */}
      </div>
      {/* Module Header + AI Box */}
      <Card className="border-l-4 border-l-blue-500 w-full md:w-[600px] xl:w-[700px] mx-auto rounded-2xl shadow-md transition-all">
        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="text-xs">
                  Module {moduleNumber}
                </Badge>
                <Badge className={`text-xs text-white ${getDifficultyColor(difficulty)}`}>{difficulty}</Badge>
              </div>
              <CardTitle className="text-2xl font-bold">{title}</CardTitle>
              <CardDescription className="text-base">{description}</CardDescription>
            </div>
            <Button variant="ghost" size="sm" onClick={() => setIsExpanded(!isExpanded)} className="shrink-0">
              {isExpanded ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
            </Button>
          </div>

          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              {estimatedTime}
            </div>
            <div className="flex items-center gap-1">
              <Zap className="h-4 w-4" />
              {xpReward} XP
            </div>
            <div className="flex items-center gap-1">
              <Users className="h-4 w-4" />
              {completedItems}/{totalItems} completed
            </div>
          </div>

          {/* Progress Bar */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Progress</span>
              <span>{Math.round(progressPercentage)}%</span>
            </div>
            <Progress value={progressPercentage} className="h-2" />
          </div>

          {/* AI Help Box always visible at top of card */}
          {aiContext && <AskAIBox context={aiContext} />}
        </CardHeader>

        <Collapsible open={isExpanded} onOpenChange={setIsExpanded}>
          <CollapsibleContent>
            <CardContent className="space-y-6">
              {/* Simple Tabs Implementation */}
              <div className="grid w-full grid-cols-4 mb-4">
                {tabList.map(tab => (
                  <button
                    key={tab.value}
                    className={`px-4 py-2 rounded-t ${activeTab === tab.value ? "bg-white font-bold" : "bg-gray-100"}`}
                    onClick={() => setActiveTab(tab.value)}
                    type="button"
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
              {/* Objective & Key Concepts */}
              {activeTab === "content" && (
                <div className="space-y-6">
                  {/* Objective */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-lg">
                        <Target className="h-5 w-5 text-blue-500" />
                        Learning Objective
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">{objective}</p>
                    </CardContent>
                  </Card>
                  {/* Key Concepts */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-lg">
                        <BookOpen className="h-5 w-5 text-green-500" />
                        Key Concepts
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {conceptsState.map((concept) => (
                          <div key={concept.id} className="flex items-start gap-3 p-3 rounded-lg border">
                            <Checkbox
                              checked={concept.completed}
                              onCheckedChange={() => toggleConcept(concept.id)}
                              className="mt-0.5"
                            />
                            <div className="flex-1">
                              <p className={`${concept.completed ? "line-through text-muted-foreground" : ""}`}>
                                {concept.title}
                              </p>
                            </div>
                            {concept.completed && <CheckCircle2 className="h-4 w-4 text-green-500" />}
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}
              {/* Activities */}
              {activeTab === "activities" && (
                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-lg">
                        <Trophy className="h-5 w-5 text-yellow-500" />
                        Activities
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {activitiesState.map((activity) => (
                          <div key={activity.id} className="p-4 rounded-lg border space-y-3">
                            <div className="flex items-start gap-3">
                              <Checkbox
                                checked={activity.completed}
                                onCheckedChange={() => toggleActivity(activity.id)}
                                className="mt-0.5"
                              />
                              <div className="flex-1">
                                <h4 className="font-medium">{activity.title}</h4>
                                <p className="text-sm text-muted-foreground mt-1">{activity.description}</p>
                              </div>
                              {activity.completed && <CheckCircle2 className="h-4 w-4 text-green-500" />}
                            </div>
                            <Textarea
                              placeholder="Write your response here..."
                              value={activity.userResponse || ""}
                              onChange={(e) => updateActivityResponse(activity.id, e.target.value)}
                              className="min-h-[100px]"
                            />
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}
              {/* Challenges */}
              {activeTab === "challenges" && (
                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-lg">
                        <Gamepad2 className="h-5 w-5 text-purple-500" />
                        Challenges
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {challengesState.map((challenge) => (
                          <div key={challenge.id} className="p-4 rounded-lg border space-y-3">
                            <div className="flex items-start gap-3">
                              <Checkbox
                                checked={challenge.completed}
                                onCheckedChange={() => toggleChallenge(challenge.id)}
                                className="mt-0.5"
                              />
                              <div className="flex-1">
                                <h4 className="font-medium">{challenge.question}</h4>
                              </div>
                              {challenge.completed && <CheckCircle2 className="h-4 w-4 text-green-500" />}
                            </div>
                            <Textarea
                              placeholder="Share your thoughts..."
                              value={challenge.userResponse || ""}
                              onChange={(e) => updateChallengeResponse(challenge.id, e.target.value)}
                              className="min-h-[80px]"
                            />
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}
              {/* Extra Resources */}
              {activeTab === "resources" && (
                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-lg">
                        <Plus className="h-5 w-5 text-orange-500" />
                        Extra Resources
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {extraResources.map((resource, index) => (
                          <div
                            key={index}
                            className="flex items-center gap-3 p-3 rounded-lg border hover:bg-muted/50 cursor-pointer"
                          >
                            <BookOpen className="h-4 w-4 text-muted-foreground" />
                            <span>{resource}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}
              {/* Complete Module Button */}
              <div className="flex justify-center pt-4">
                <Button onClick={handleCompleteModule} disabled={progressPercentage < 100} size="lg" className="px-8">
                  {progressPercentage === 100 ? "Complete Module" : `Complete ${Math.round(progressPercentage)}%`}
                </Button>
              </div>
            </CardContent>
          </CollapsibleContent>
        </Collapsible>
      </Card>

      {/* Completion Modal/Card */}
      {showCompletion && (
        <Card className="border-green-500 bg-green-50 dark:bg-green-950">
          <CardContent className="text-center py-8">
            <div className="space-y-4">
              <div className="flex justify-center">
                <div className="p-3 rounded-full bg-green-500 text-white">
                  <Award className="h-8 w-8" />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold text-green-700 dark:text-green-300">
                  Great job! You earned {xpReward} XP!
                </h3>
                <p className="text-green-600 dark:text-green-400 mt-2">Module completed successfully!</p>
              </div>
              <div className="flex justify-center gap-2">
                <Badge className="bg-green-500 text-white">
                  <Star className="h-3 w-3 mr-1" />
                  Progress Badge
                </Badge>
                <Badge className="bg-green-500 text-white">Completed!</Badge>
              </div>
              <Button
                onClick={() => setShowCompletion(false)}
                variant="outline"
                className="border-green-500 text-green-700 hover:bg-green-100"
              >
                Continue Learning
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
