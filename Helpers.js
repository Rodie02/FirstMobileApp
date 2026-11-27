// ==============================================================
// FILE: helpers.js
// WHAT:  Small reusable functions. NO UI and NO React state in this file.
// USED BY: Answer (scoring, timer format), Results (scoring), History/Quizzes (dates, confirm dialogs).
// SEARCH (Ctrl+F):  [STATE]  [LOGIC]  [UI]  [NAVIGATION]  [STYLES]
// ==============================================================

import { Alert, Platform } from "react-native";

// [LOGIC] Animations can run on the native thread on phones, but not on web.
export const USE_NATIVE_DRIVER = Platform.OS !== "web";

// ==============================================================
// [LOGIC] Cross-platform dialogs (web uses window.confirm, phone uses Alert)
// ==============================================================
// Alert.alert() with buttons does NOT work on web, so these two helpers
// use the browser dialogs on web and the native Alert on phones.

// Yes/No confirmation. Runs onConfirm only if the user agrees.
export const confirmAction = (title, message, onConfirm, confirmText = "Delete") => {
  if (Platform.OS === "web") {
    if (window.confirm(`${title}\n\n${message}`)) {
      onConfirm();
    }
    return;
  }

  Alert.alert(title, message, [
    { text: "Cancel", style: "cancel" },
    { text: confirmText, style: "destructive", onPress: onConfirm },
  ]);
};

// Simple message with an OK button
export const showMessage = (title, message) => {
  if (Platform.OS === "web") {
    window.alert(message ? `${title}\n\n${message}` : title);
    return;
  }

  Alert.alert(title, message);
};

// helpers.js — small pure functions shared by several screens (no React here).

// ==============================================================
// [LOGIC] Answer checking and scoring
//      normalizeAnswer -> checkAnswer (one question) -> scoreQuiz (whole quiz)
// ==============================================================
export const normalizeAnswer = (answer) =>
  String(answer || "")
    .trim()
    .toLowerCase()
    .replace(/\s+/g, " ");

// Returns true/false for one question
export const checkAnswer = (question, userAnswer) => {
  const user = normalizeAnswer(userAnswer);
  const correct = normalizeAnswer(question.correctAnswer);

  if (!user) return false;

  if (question.type === "Enumeration") {
    const toItems = (text) =>
      text
        .split(",")
        .map((item) => item.trim())
        .filter((item) => item !== "");

    const userItems = toItems(user).sort();
    const correctItems = toItems(correct).sort();

    if (userItems.length !== correctItems.length) return false;

    return userItems.every((item, i) => item === correctItems[i]);
  }

  return user === correct;
};

// Scores a whole quiz. Used when SUBMITTING (to save the score)
// and when REVIEWING (to show right/wrong per question).
export const scoreQuiz = (questions, answers) => {
  const results = questions.map((question) => {
    const userAnswer = answers[question.id] || "";
    return {
      ...question,
      userAnswer,
      isCorrect: checkAnswer(question, userAnswer),
    };
  });

  const correctCount = results.filter((r) => r.isCorrect).length;
  const totalQuestions = results.length;
  const percentage =
    totalQuestions > 0 ? Math.round((correctCount / totalQuestions) * 100) : 0;

  return { results, correctCount, totalQuestions, percentage };
};

// ==============================================================
// [LOGIC] Formatting helpers (seconds -> mm:ss, ISO date -> readable)
// ==============================================================
// 75 -> "01:15"
export const formatTime = (totalSeconds = 0) => {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
};

export const formatDate = (isoString) => {
  if (!isoString) return "";
  return new Date(isoString).toLocaleString();
};
