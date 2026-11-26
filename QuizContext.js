// ==============================================================
// FILE: QuizContext.js
// WHAT:  The app's GLOBAL STATE (Context API) + SAVING to the phone (AsyncStorage).
//        There is NO UI in this file. Every screen gets its data from here via useQuiz().
//
// DATA FLOW:
//   1. App starts -> Provider mounts -> useEffect([]) READS AsyncStorage -> setQuizzes/setAttempts
//   2. A screen calls addQuiz / updateQuiz / deleteQuiz / saveAttempt ...
//   3. That calls a setState -> every screen using useQuiz() re-renders
//   4. useEffect([quizzes]) / useEffect([attempts]) notices the change -> WRITES to AsyncStorage
// SEARCH (Ctrl+F):  [STATE]  [LOGIC]  [UI]  [NAVIGATION]  [STYLES]
// ==============================================================

// QuizContext.js
// GLOBAL STATE (Context API) + LOCAL DATA PERSISTENCE (AsyncStorage)
//
// Why Context? Before, App.js held the quiz and passed it down as props to each
// screen (lifting state up). With 4 tabs + 2 stack screens that becomes prop
// drilling, so any screen now calls useQuiz() to get what it needs.
//
// Data flow:
//   screen calls addQuiz()/updateQuiz()/... -> setQuizzes() -> state changes
//   -> every screen using useQuiz() re-renders (Update phase)
//   -> useEffect([quizzes]) below saves the new array to AsyncStorage.

import React, { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const QUIZZES_KEY = "@quizzes";
const ATTEMPTS_KEY = "@attempts";
const LEGACY_QUIZ_KEY = "@quiz_data"; // MCO 1 single-quiz key (migrated once)

const QuizContext = createContext(null);

export function QuizProvider({ children }) {
  // ==============================================================
  // [STATE] Global data shared by all screens
  // ==============================================================
  const [quizzes, setQuizzes] = useState([]); // every quiz the maker created
  const [attempts, setAttempts] = useState([]); // every submitted attempt
  const [isLoading, setIsLoading] = useState(true); // loading state
  const [error, setError] = useState(null); // error state

  // ==============================================================
  // [LOGIC] LOAD saved data when the app opens (AsyncStorage READ)
  // ==============================================================
  // ---------- READ (Mounting) ----------
  // Empty dependency array [] -> runs ONCE when the Provider mounts.
  useEffect(() => {
    const loadData = async () => {
      try {
        const savedQuizzes = await AsyncStorage.getItem(QUIZZES_KEY);
        const savedAttempts = await AsyncStorage.getItem(ATTEMPTS_KEY);
        const legacyQuiz = await AsyncStorage.getItem(LEGACY_QUIZ_KEY);

        if (savedQuizzes) {
          setQuizzes(JSON.parse(savedQuizzes)); // string -> array
        } else if (legacyQuiz) {
          // keep the quiz made with the old version of the app
          const oldQuiz = JSON.parse(legacyQuiz);
          setQuizzes([{ ...oldQuiz, createdAt: new Date().toISOString() }]);
        }

        if (savedAttempts) {
          setAttempts(JSON.parse(savedAttempts));
        }
      } catch (e) {
        setError("Could not load your saved data.");
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  // ==============================================================
  // [LOGIC] AUTO-SAVE whenever quizzes/attempts change (AsyncStorage WRITE)
  // ==============================================================
  // ---------- SAVE (Updating) ----------
  // Dependency array [quizzes, isLoading] -> runs whenever quizzes changes.
  // Skipped while loading so we never overwrite saved data with an empty array.
  useEffect(() => {
    if (isLoading) return;

    AsyncStorage.setItem(QUIZZES_KEY, JSON.stringify(quizzes)) // array -> string
      .catch(() => setError("Could not save your quizzes."));
  }, [quizzes, isLoading]);

  useEffect(() => {
    if (isLoading) return;

    AsyncStorage.setItem(ATTEMPTS_KEY, JSON.stringify(attempts))
      .catch(() => setError("Could not save your results."));
  }, [attempts, isLoading]);

  // ==============================================================
  // [LOGIC] CRUD functions that screens call (Create / Update / Delete)
  // ==============================================================
  // ---------- CRUD: quizzes ----------
  // CREATE
  const addQuiz = (quiz) => {
    setQuizzes((current) => [quiz, ...current]);
  };

  // UPDATE
  const updateQuiz = (id, changes) => {
    setQuizzes((current) =>
      current.map((quiz) =>
        quiz.id === id
          ? { ...quiz, ...changes, updatedAt: new Date().toISOString() }
          : quiz
      )
    );
  };

  // DELETE (past attempts stay in History because each attempt keeps its own copy of the questions)
  const deleteQuiz = (id) => {
    setQuizzes((current) => current.filter((quiz) => quiz.id !== id));
  };

  // ---------- CRUD: attempts ----------
  const saveAttempt = (attempt) => {
    setAttempts((current) => [attempt, ...current]);
  };

  const deleteAttempt = (id) => {
    setAttempts((current) => current.filter((a) => a.id !== id));
  };

  const clearAttempts = () => setAttempts([]);

  // ==============================================================
  // [LOGIC] Lookup helpers (find one quiz / attempt by id)
  // ==============================================================
  // ---------- Helpers (READ one) ----------
  const getQuizById = (id) => quizzes.find((quiz) => quiz.id === id);
  const getAttemptById = (id) => attempts.find((a) => a.id === id);

  const dismissError = () => setError(null);

  // ==============================================================
  // [LOGIC] Everything below is shared with the whole app through the Provider
  // ==============================================================
  return (
    <QuizContext.Provider
      value={{
        quizzes,
        attempts,
        isLoading,
        error,
        dismissError,
        addQuiz,
        updateQuiz,
        deleteQuiz,
        saveAttempt,
        deleteAttempt,
        clearAttempts,
        getQuizById,
        getAttemptById,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
}

// Custom hook so screens just write: const { quizzes } = useQuiz();
export function useQuiz() {
  const context = useContext(QuizContext);

  if (!context) {
    throw new Error("useQuiz must be used inside <QuizProvider>");
  }

  return context;
}
