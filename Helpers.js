// helpers.js — small pure functions shared by several screens (no React here).

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
