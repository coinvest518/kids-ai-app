// src/context/CourseContext.js
import React, { createContext, useContext, useEffect, useState } from "react";
import { onboardingQuestions, courseModules } from "@/data/courseModules";
import { databases, account } from "@/lib/appwrite";

const defaultState = {
  onboarding: {},
  progress: 0,
  xp: 0,
  level: 1,
  badges: [],
  unlockedModules: [1],
};

const CourseContext = createContext();

export function CourseProvider({ children }) {

  const [state, setState] = useState(defaultState);
  const [loadingProgress, setLoadingProgress] = useState(true);
  const [progressError, setProgressError] = useState(null);

  // Load progress from Appwrite or localStorage on mount
  useEffect(() => {
    async function loadProgress() {
      setLoadingProgress(true);
      setProgressError(null);
      try {
        // Try to get Appwrite user
        const user = await account.get();
        const doc = await databases.getDocument('687ce805001d6e9bc6c7', '687ce9cf0019368b4632', user.$id);
        if (doc && doc.data) {
          setState((prev) => ({ ...prev, ...doc.data }));
        }
        // Mark as logged in for later
        window.__isAppwriteUser = true;
      } catch (err) {
        // If not logged in, load from localStorage
        if (err.code === 401 || err.code === 403) {
          try {
            const local = localStorage.getItem('courseProgress');
            if (local) {
              setState((prev) => ({ ...prev, ...JSON.parse(local) }));
            }
          } catch (e) {/* ignore */}
          window.__isAppwriteUser = false;
        } else if (err.code !== 404) {
          setProgressError(err.message);
        }
      } finally {
        setLoadingProgress(false);
      }
    }
    loadProgress();
  }, []);

  // Save progress to Appwrite or localStorage whenever state changes (except onboarding)
  useEffect(() => {
    async function saveProgress() {
      // Only save if not loading
      if (loadingProgress) return;
      // If logged in, save to Appwrite
      if (window.__isAppwriteUser) {
        try {
          const user = await account.get();
          await databases.updateDocument(
            '687ce805001d6e9bc6c7',
            '687ce9cf0019368b4632',
            user.$id,
            {
              progress: state.progress,
              xp: state.xp,
              level: state.level,
              badges: state.badges,
              unlockedModules: state.unlockedModules,
            }
          );
        } catch (err) {
          // If doc doesn't exist, create it
          if (err.code === 404) {
            try {
              const user = await account.get();
              await databases.createDocument(
                '687ce805001d6e9bc6c7',
                '687ce9cf0019368b4632',
                user.$id,
                {
                  progress: state.progress,
                  xp: state.xp,
                  level: state.level,
                  badges: state.badges,
                  unlockedModules: state.unlockedModules,
                },
                [`user:${user.$id}`]
              );
            } catch (e) {/* ignore */}
          }
        }
      } else {
        // Not logged in, save to localStorage
        try {
          localStorage.setItem(
            'courseProgress',
            JSON.stringify({
              progress: state.progress,
              xp: state.xp,
              level: state.level,
              badges: state.badges,
              unlockedModules: state.unlockedModules,
            })
          );
        } catch (e) {/* ignore */}
      }
    }
    saveProgress();
  }, [state.progress, state.xp, state.level, state.badges, state.unlockedModules, loadingProgress]);

  const answerOnboarding = (answers) => {
    setState((prev) => ({ ...prev, onboarding: answers }));
  };

  const completeModule = async (moduleId, xpEarned = 100) => {
    setState((prev) => {
      const nextModule = moduleId + 1;
      const unlocked = prev.unlockedModules.includes(nextModule)
        ? prev.unlockedModules
        : [...prev.unlockedModules, nextModule];
      const newXP = prev.xp + xpEarned;
      const newLevel = Math.floor(newXP / 300) + 1;
      return {
        ...prev,
        progress: Math.max(prev.progress, moduleId),
        xp: newXP,
        level: newLevel,
        unlockedModules: unlocked,
      };
    });

    // Also update Appwrite users collection for leaderboard
    if (window.__isAppwriteUser) {
      try {
        const user = await account.get();
        // Try to update user doc in 'users' collection
        try {
          await databases.updateDocument(
            '687ce805001d6e9bc6c7', // Your DB ID
            '687ce881002df232bfad', // Users collection ID
            user.$id,
            {
              username: user.name || user.email || user.$id,
              xp: state.xp + xpEarned,
              level: Math.floor((state.xp + xpEarned) / 300) + 1,
              badges: state.badges,
            }
          );
        } catch (err) {
          if (err.code === 404) {
            // If not found, create it
            await databases.createDocument(
              '687ce805001d6e9bc6c7',
              '687ce881002df232bfad',
              user.$id,
              {
                username: user.name || user.email || user.$id,
                xp: state.xp + xpEarned,
                level: Math.floor((state.xp + xpEarned) / 300) + 1,
                badges: state.badges,
              },
              [`user:${user.$id}`]
            );
          }
        }
      } catch (e) {/* ignore */}
    }
  };

  const earnBadge = (badge) => {
    setState((prev) =>
      prev.badges.includes(badge)
        ? prev
        : { ...prev, badges: [...prev.badges, badge] }
    );
  };

  return (
    <CourseContext.Provider
      value={{
        state,
        onboardingQuestions,
        courseModules,
        answerOnboarding,
        completeModule,
        earnBadge,
        loadingProgress,
        progressError,
      }}
    >
      {children}
    </CourseContext.Provider>
  );
}

export function useCourse() {
  return useContext(CourseContext);
}
